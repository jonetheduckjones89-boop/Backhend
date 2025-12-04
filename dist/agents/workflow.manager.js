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
exports.WorkflowManager = void 0;
const ingestion_agent_1 = require("./ingestion.agent");
const classification_agent_1 = require("./classification.agent");
const analysis_agent_1 = require("./analysis.agent");
const action_agent_1 = require("./action.agent");
const rewrite_agent_1 = require("./rewrite.agent");
const insight_agent_1 = require("./insight.agent");
class WorkflowManager {
    constructor() {
        this.ingestionAgent = new ingestion_agent_1.IngestionAgent();
        this.classificationAgent = new classification_agent_1.ClassificationAgent();
        this.analysisAgent = new analysis_agent_1.AnalysisAgent();
        this.actionAgent = new action_agent_1.ActionAgent();
        this.rewriteAgent = new rewrite_agent_1.RewriteAgent();
        this.insightAgent = new insight_agent_1.InsightAgent();
    }
    run(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Starting Workflow for:', filePath);
            // 1. Ingestion
            const text = yield this.ingestionAgent.run(filePath);
            // 2. Classification
            const docType = yield this.classificationAgent.run(text);
            // 3. Analysis (Parallel with others if possible, but sequential for simplicity now)
            const analysis = yield this.analysisAgent.run(text);
            // 4. Actions
            const actions = yield this.actionAgent.run({ text, docType });
            // 5. Rewrite
            const rewritten = yield this.rewriteAgent.run(text);
            // 6. Insights
            const insights = yield this.insightAgent.run({ text, docType });
            return {
                document_type: docType,
                summary: analysis.summary, // Assuming analysis returns summary
                action_steps: actions,
                rewritten: rewritten,
                insights: insights,
                timeline: analysis.timeline, // Assuming analysis returns timeline
                html: `<div class="result">...</div>` // Placeholder
            };
        });
    }
}
exports.WorkflowManager = WorkflowManager;
