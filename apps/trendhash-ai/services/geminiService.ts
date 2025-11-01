
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

    const prompt = `
        You are a highly advanced AI assistant, "TrendHash," specializing in social media marketing and trend analysis. 
        Your task is to generate viral, trend-driven, multilingual hashtags. You have access to real-time Google Trends data to inform your decisions.

        Analyze the following user-provided content and the generation parameters. Based on this, generate exactly 15 optimized hashtags.

        **User Content:** "${content}"
        **Target Platform:** "${platform}"
        **Desired Style:** "${style}" (Options: Organic, Trending, Branded, Hybrid). The Hybrid style should be a smart mix of all other styles.
        **Language:** "${language}"

        For each hashtag, provide:
        1.  \`hashtag\`: The hashtag itself, starting with #.
        2.  \`trend_score\`: An integer score from 0 to 100, representing its current viral potential based on Google Trends and social media momentum. A higher score means it's more likely to be trending.
        3.  \`reason\`: A very brief, one-sentence explanation for why this hashtag is a good choice and what its score reflects.

        Your output MUST be a valid JSON array matching the provided schema. Do not include any markdown formatting like \`\`\`json.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
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
