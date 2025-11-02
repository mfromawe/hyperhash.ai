import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple in-memory rate limit (best-effort only in serverless)
const WINDOW_MS = 60_000; // 60s
const LIMIT = 60; // 60 requests per IP per minute
const buckets = new Map<string, { count: number; reset: number }>();

function getClientIp(req: any): string {
  const xff = (req.headers['x-forwarded-for'] as string | undefined) || '';
  const ip = xff.split(',')[0]?.trim() || (req.headers['x-real-ip'] as string | undefined) || (req.socket as any)?.remoteAddress || 'unknown';
  return ip;
}

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count < LIMIT) {
    b.count += 1;
    return { ok: true };
  }
  return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter || 60));
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again shortly.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: missing GEMINI_API_KEY' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { content, platform, style, language } = body || {};

    if (!content || !platform || !style || !language) {
      return res.status(400).json({ error: 'Missing required fields: content, platform, style, language' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the project's preferred model name; fall back if unavailable in this API/version.
    const preferredModelName = 'gemini-2.5-pro';
    let model: any;
    try {
      model = genAI.getGenerativeModel({ model: preferredModelName });
    } catch (e) {
      // If getting preferred model fails synchronously, try a generic call to list models is possible
      console.warn('Preferred model init failed, will attempt to continue and let SDK return a helpful error', e);
      model = genAI.getGenerativeModel({ model: preferredModelName });
    }

    // Simplified prompt that works reliably with Gemini
    const prompt = `You are a hashtag generator. Generate exactly 15 trending hashtags for ${platform} about: "${content}". 
Style: ${style}. Language: ${language}.

For each hashtag, provide:
- hashtag: the actual hashtag with # symbol
- trend_score: number between 0-100 indicating popularity
- reason: brief 1-sentence explanation

Respond ONLY with a valid JSON array. Example format:
[{"hashtag":"#Example","trend_score":85,"reason":"Popular trend"},{"hashtag":"#Test","trend_score":75,"reason":"Growing topic"}]

Your JSON array:`;

    // Try generating content; if the model is not available for this API version,
    // the SDK will throw. If we receive a 404 model-not-found error, try a safe fallback model.
    let geminiRes: any;
    try {
      geminiRes = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }]}],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2500 },
      });
    } catch (e: any) {
      console.warn('Model generateContent failed; attempting fallback model if applicable', e?.message || e);
      // If it's a model-not-found (404) from the SDK, try a common fallback.
      const msg = e?.message || '';
      if (msg.includes('is not found') || msg.includes('Not Found')) {
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
          geminiRes = await fallbackModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }]}],
            generationConfig: { temperature: 0.8, maxOutputTokens: 2500 },
          });
        } catch (fallbackErr) {
          // rethrow original error to be handled below
          throw e;
        }
      } else {
        throw e;
      }
    }

    let text = (geminiRes.response?.text?.() || '').trim();
    
    // Aggressive cleaning of markdown and extra text
    if (text.includes('```json')) {
      const match = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) text = match[1].trim();
    } else if (text.includes('```')) {
      const match = text.match(/```\s*([\s\S]*?)\s*```/);
      if (match) text = match[1].trim();
    }
    
    // Remove any text before first [ and after last ]
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      text = text.substring(firstBracket, lastBracket + 1);
    }
    
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      console.error('Parse error:', parseError);
      return res.status(502).json({ 
        error: 'Upstream model returned invalid JSON', 
        details: text.substring(0, 300),
        hint: 'The AI model did not return valid JSON format'
      });
    }

    parsed.sort((a, b) => (b?.trend_score || 0) - (a?.trend_score || 0));
    return res.status(200).json(parsed);
  } catch (err: any) {
    console.error('API /api/generate error:', err);
    // Log stack if available for easier debugging in server logs
    if (err && err.stack) console.error(err.stack);

    // In production keep the response generic to avoid leaking internals.
    const clientMessage = process.env.NODE_ENV === 'production' ? 'Failed to generate hashtags' : (err?.message || 'Failed to generate hashtags');
    return res.status(500).json({ error: clientMessage });
  }
}
