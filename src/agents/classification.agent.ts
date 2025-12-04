import { BaseAgent } from './base.agent';
import { generateCompletion } from '../services/openai.service';

export class ClassificationAgent extends BaseAgent {
    name = 'Classification Agent';
    description = 'Classifies the document type.';

    protected async execute(text: string): Promise<string> {
        const prompt = `Classify the following document into one of these categories: Contract, Invoice, Proposal, Business Note, Meeting Data, Policy, Legal Document.
    
    Document Snippet:
    ${text.substring(0, 1000)}
    
    Return ONLY the category name.`;

        const result = await generateCompletion(prompt);
        return result.trim();
    }
}
