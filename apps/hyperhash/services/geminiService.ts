
import { GenerationParams, Hashtag } from '../types';

let lastController: AbortController | null = null;

async function fetchWithRetry(url: string, init: RequestInit, retries = 2): Promise<Response> {
    try {
        const res = await fetch(url, init);
        if (!res.ok) {
            if ((res.status >= 500 || res.status === 429) && retries > 0) {
                const retryAfter = Number(res.headers.get('Retry-After') || '0');
                const delay = retryAfter > 0 ? retryAfter * 1000 : (300 * (3 - retries));
                await new Promise(r => setTimeout(r, delay));
                return fetchWithRetry(url, init, retries - 1);
            }
            throw new Error(`Request failed: ${res.status}`);
        }
        return res;
    } catch (e) {
        if (retries > 0) {
            await new Promise(r => setTimeout(r, 300 * (3 - retries)));
            return fetchWithRetry(url, init, retries - 1);
        }
        throw e;
    }
}

export const generateHashtags = async (params: GenerationParams): Promise<Hashtag[]> => {
    if (lastController) lastController.abort();
    const controller = new AbortController();
    lastController = controller;

    const res = await fetchWithRetry('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: controller.signal,
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
        const msg = data?.error || 'Unexpected server response';
        throw new Error(msg);
    }
    return data as Hashtag[];
};
