import { BaseAgent } from './base.agent';
import { generateCompletion } from '../services/openai.service';

export class AnalysisAgent extends BaseAgent {
    name = 'Analysis Agent';
    description = 'Analyzes text for summary and timeline.';

    protected async execute(text: string): Promise<{ summary: string; timeline: any[] }> {
        const prompt = `Analyze the document and provide:
    1. A concise summary.
    2. A timeline of key dates and events.
    
    Return JSON format:
    {
      "summary": "...",
      "timeline": [{ "date": "...", "event": "..." }]
    }
    
    Document Snippet:
    ${text.substring(0, 2000)}`;

        const response = await generateCompletion(prompt, 'You are a JSON generator. Output valid JSON only.');
        try {
            // Clean up potential markdown code blocks
            const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error('Failed to parse Analysis JSON', e);
            return { summary: 'Analysis failed', timeline: [] };
        }
    }
}
