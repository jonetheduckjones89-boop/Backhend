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
exports.RewriteAgent = void 0;
const base_agent_1 = require("./base.agent");
const openai_service_1 = require("../services/openai.service");
class RewriteAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Rewrite Agent';
        this.description = 'Rewrites content in a professional tone.';
    }
    execute(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Rewrite the following text to be professional, friendly, direct, and simple.
    
    Text:
    ${text.substring(0, 1500)}...`;
            return yield (0, openai_service_1.generateCompletion)(prompt);
        });
    }
}
exports.RewriteAgent = RewriteAgent;
