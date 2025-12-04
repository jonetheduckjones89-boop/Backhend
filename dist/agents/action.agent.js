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
exports.ActionAgent = void 0;
const base_agent_1 = require("./base.agent");
const openai_service_1 = require("../services/openai.service");
class ActionAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Action Agent';
        this.description = 'Generates actionable steps.';
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Based on this ${input.docType}, generate 10-30 concrete action steps.
    
    Document Snippet:
    ${input.text.substring(0, 2000)}
    
    Return JSON array of strings: ["Step 1", "Step 2"]`;
            const response = yield (0, openai_service_1.generateCompletion)(prompt, 'You are a JSON generator. Output valid JSON only.');
            try {
                const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(jsonStr);
            }
            catch (e) {
                return ['Failed to generate actions'];
            }
        });
    }
}
exports.ActionAgent = ActionAgent;
