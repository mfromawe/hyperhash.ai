import { GenerationParams, Hashtag } from '../types';

// Use backend API instead of direct Gemini SDK calls (API key should stay on server)
export const generateHashtags = async (params: GenerationParams): Promise<Hashtag[]> => {
    const { content, platform, style, language } = params;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, platform, style, language }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `Request failed: ${response.status}`);
        }

        const result = await response.json();
        
        if (!Array.isArray(result)) {
            throw new Error('Invalid response format from server');
        }

        // Map the backend response to our Hashtag type
        const hashtags: Hashtag[] = result.map((item: any) => ({
            hashtag: item.hashtag || item.tag || '',
            trend_score: item.trend_score || 0,
            reason: item.reason || '',
        }));

        return hashtags.sort((a, b) => b.trend_score - a.trend_score);

    } catch (error) {
        console.error("Error generating hashtags:", error);
        throw error instanceof Error ? error : new Error("Failed to generate hashtags");
    }
};
