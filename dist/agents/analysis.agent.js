"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisAgent = void 0;
const base_agent_1 = require("./base.agent");
const openai_service_1 = require("../services/openai.service");
class AnalysisAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Analysis Agent';
        this.description = 'Analyzes text for summary and timeline.';
    }
    execute(text) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield (0, openai_service_1.generateCompletion)(prompt, 'You are a JSON generator. Output valid JSON only.');
            try {
                // Clean up potential markdown code blocks
                const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(jsonStr);
            }
            catch (e) {
                console.error('Failed to parse Analysis JSON', e);
                return { summary: 'Analysis failed', timeline: [] };
            }
        });
    }
}
exports.AnalysisAgent = AnalysisAgent;
