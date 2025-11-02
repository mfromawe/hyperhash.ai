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

    // Optimized shorter prompt for faster response with explicit JSON structure
    const prompt = `Generate 15 viral ${language} hashtags for ${platform} (${style} style) about: "${content}".

Return ONLY a JSON array (no markdown, no code blocks) with this exact structure:
[
  {
    "hashtag": "#example",
    "trend_score": 85,
    "reason": "brief explanation"
  }
]`;

    // Try generating content; if the model is not available for this API version,
    // the SDK will throw. If we receive a 404 model-not-found error, try a safe fallback model.
    let geminiRes: any;
    try {
      geminiRes = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }]}],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 2000 },
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
            generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 2000 },
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
    
    // Clean up potential markdown code blocks
    if (text.startsWith('```json')) {
      text = text.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    } else if (text.startsWith('```')) {
      text = text.replace(/```\s*/g, '').trim();
    }
    
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(text);
    } catch (_e) {
      console.error('Failed to parse Gemini response:', text);
      return res.status(502).json({ error: 'Upstream model returned invalid JSON', details: text.substring(0, 200) });
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
