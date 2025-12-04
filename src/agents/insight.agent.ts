import { BaseAgent } from './base.agent';
import { generateCompletion } from '../services/openai.service';

export class InsightAgent extends BaseAgent {
    name = 'Insight Agent';
    description = 'Generates strategic insights.';

    protected async execute(input: { text: string; docType: string }): Promise<string[]> {
        const prompt = `Analyze this ${input.docType} for risks, opportunities, missing data, and next best decisions.
    
    Document Snippet:
    ${input.text.substring(0, 2000)}
    
    Return JSON array of strings.`;

        const response = await generateCompletion(prompt, 'You are a JSON generator. Output valid JSON only.');
        try {
            const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (e) {
            return ['Failed to generate insights'];
        }
    }
}
