import { BaseAgent } from './base.agent';
import { generateCompletion } from '../services/openai.service';

export class ActionAgent extends BaseAgent {
    name = 'Action Agent';
    description = 'Generates actionable steps.';

    protected async execute(input: { text: string; docType: string }): Promise<string[]> {
        const prompt = `Based on this ${input.docType}, generate 10-30 concrete action steps.
    
    Document Snippet:
    ${input.text.substring(0, 2000)}
    
    Return JSON array of strings: ["Step 1", "Step 2"]`;

        const response = await generateCompletion(prompt, 'You are a JSON generator. Output valid JSON only.');
        try {
            const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (e) {
            return ['Failed to generate actions'];
        }
    }
}
