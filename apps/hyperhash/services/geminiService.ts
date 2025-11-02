
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, Hashtag } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            hashtag: {
                type: Type.STRING,
                description: 'The generated hashtag, including the # symbol.',
            },
            trend_score: {
                type: Type.NUMBER,
                description: 'A score from 0 to 100 indicating trend potential.',
            },
            reason: {
                type: Type.STRING,
                description: 'A brief justification for the hashtag and its score.',
            },
        },
        required: ['hashtag', 'trend_score', 'reason'],
    },
};

export const generateHashtags = async (params: GenerationParams): Promise<Hashtag[]> => {
    const { content, platform, style, language } = params;

    const prompt = `Generate 15 viral ${language} hashtags for ${platform} (${style} style) about: "${content}". Return JSON array with: hashtag (string with #), trend_score (0-100 int), reason (brief sentence). No markdown.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
                maxOutputTokens: 1500,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as Hashtag[];
        
        // Sort by trend_score descending
        return result.sort((a, b) => b.trend_score - a.trend_score);

    } catch (error) {
        console.error("Error generating hashtags:", error);
        throw new Error("Failed to generate hashtags. The model may have returned an invalid response.");
    }
};
