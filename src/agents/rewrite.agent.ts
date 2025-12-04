import { BaseAgent } from './base.agent';
import { generateCompletion } from '../services/openai.service';

export class RewriteAgent extends BaseAgent {
    name = 'Rewrite Agent';
    description = 'Rewrites content in a professional tone.';

    protected async execute(text: string): Promise<string> {
        const prompt = `Rewrite the following text to be professional, friendly, direct, and simple.
    
    Text:
    ${text.substring(0, 1500)}...`;

        return await generateCompletion(prompt);
    }
}
