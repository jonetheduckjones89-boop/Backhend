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
exports.ClassificationAgent = void 0;
const base_agent_1 = require("./base.agent");
const openai_service_1 = require("../services/openai.service");
class ClassificationAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Classification Agent';
        this.description = 'Classifies the document type.';
    }
    execute(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Classify the following document into one of these categories: Contract, Invoice, Proposal, Business Note, Meeting Data, Policy, Legal Document.
    
    Document Snippet:
    ${text.substring(0, 1000)}
    
    Return ONLY the category name.`;
            const result = yield (0, openai_service_1.generateCompletion)(prompt);
            return result.trim();
        });
    }
}
exports.ClassificationAgent = ClassificationAgent;
