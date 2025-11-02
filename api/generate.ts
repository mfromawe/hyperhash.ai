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
    // Use a stable model name; fall back if unavailable in this API/version.
    const preferredModelName = 'gemini-pro';
    let model: any;
    try {
      model = genAI.getGenerativeModel({ model: preferredModelName });
    } catch (e) {
      // If getting preferred model fails synchronously, try a generic call to list models is possible
      console.warn('Preferred model init failed, will attempt to continue and let SDK return a helpful error', e);
      model = genAI.getGenerativeModel({ model: preferredModelName });
    }

    const prompt = `
      You are a highly advanced AI assistant, "HyperHash," specializing in social media marketing and trend analysis.
      Your task is to generate viral, trend-driven, multilingual hashtags. You have access to real-time Google Trends data to inform your decisions.

      Analyze the following user-provided content and the generation parameters. Based on this, generate exactly 15 optimized hashtags.

      User Content: "${content}"
      Target Platform: "${platform}"
      Desired Style: "${style}" (Options: Organic, Trending, Branded, Hybrid). The Hybrid style should be a smart mix of all other styles.
      Language: "${language}"

      For each hashtag, provide:
      1) hashtag: The hashtag itself, starting with #.
      2) trend_score: An integer score from 0 to 100, representing its current viral potential based on Google Trends and social media momentum.
      3) reason: A very brief, one-sentence explanation for why this hashtag is a good choice and what its score reflects.

      Your output MUST be a valid JSON array of objects. Do not include any markdown formatting.
    `;

    // Try generating content; if the model is not available for this API version,
    // the SDK will throw and our catch block will handle it.
    const geminiRes = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }]}],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    });

    const text = (geminiRes.response?.text?.() || '').trim();
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(text);
    } catch (_e) {
      return res.status(502).json({ error: 'Upstream model returned invalid JSON' });
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
