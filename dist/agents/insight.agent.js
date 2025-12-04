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
exports.InsightAgent = void 0;
const base_agent_1 = require("./base.agent");
const openai_service_1 = require("../services/openai.service");
class InsightAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Insight Agent';
        this.description = 'Generates strategic insights.';
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Analyze this ${input.docType} for risks, opportunities, missing data, and next best decisions.
    
    Document Snippet:
    ${input.text.substring(0, 2000)}
    
    Return JSON array of strings.`;
            const response = yield (0, openai_service_1.generateCompletion)(prompt, 'You are a JSON generator. Output valid JSON only.');
            try {
                const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(jsonStr);
            }
            catch (e) {
                return ['Failed to generate insights'];
            }
        });
    }
}
exports.InsightAgent = InsightAgent;
