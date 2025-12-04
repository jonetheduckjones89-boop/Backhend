import { BaseAgent } from './base.agent';
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export class IngestionAgent extends BaseAgent {
    name = 'Ingestion Agent';
    description = 'Extracts text from PDF and DOCX files.';

    protected async execute(filePath: string): Promise<string> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const ext = filePath.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return data.text;
        } else if (ext === 'docx') {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        } else if (ext === 'txt' || ext === 'md') {
            return fs.readFileSync(filePath, 'utf-8');
        } else {
            throw new Error(`Unsupported file type: ${ext}`);
        }
    }
}
