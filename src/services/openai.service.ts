import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OPENAI_API_KEY is not set in environment variables.');
}

export const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Fallback to avoid crash on startup if key missing
});

export async function generateCompletion(prompt: string, systemPrompt: string = 'You are a helpful assistant.'): Promise<string> {
    if (!apiKey) throw new Error("OPENAI_API_KEY not set.");

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        });

        return response.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate completion');
    }
}
