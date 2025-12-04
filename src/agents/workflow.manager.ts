import { IngestionAgent } from './ingestion.agent';
import { ClassificationAgent } from './classification.agent';
import { AnalysisAgent } from './analysis.agent';
import { ActionAgent } from './action.agent';
import { RewriteAgent } from './rewrite.agent';
import { InsightAgent } from './insight.agent';

export class WorkflowManager {
    private ingestionAgent: IngestionAgent;
    private classificationAgent: ClassificationAgent;
    private analysisAgent: AnalysisAgent;
    private actionAgent: ActionAgent;
    private rewriteAgent: RewriteAgent;
    private insightAgent: InsightAgent;

    constructor() {
        this.ingestionAgent = new IngestionAgent();
        this.classificationAgent = new ClassificationAgent();
        this.analysisAgent = new AnalysisAgent();
        this.actionAgent = new ActionAgent();
        this.rewriteAgent = new RewriteAgent();
        this.insightAgent = new InsightAgent();
    }

    async run(filePath: string) {
        console.log('Starting Workflow for:', filePath);

        try {
            // 1. Ingestion
            const text = await this.ingestionAgent.run(filePath);

            // 2. Classification
            const docType = await this.classificationAgent.run(text);

            // 3. Analysis (Parallel with others if possible, but sequential for simplicity now)
            const analysis = await this.analysisAgent.run(text);

            // 4. Actions
            const actions = await this.actionAgent.run({ text, docType });

            // 5. Rewrite
            const rewritten = await this.rewriteAgent.run(text);

            // 6. Insights
            const insights = await this.insightAgent.run({ text, docType });

            return {
                document_type: docType,
                summary: analysis.summary, // Assuming analysis returns summary
                action_steps: actions,
                rewritten: rewritten,
                insights: insights,
                timeline: analysis.timeline, // Assuming analysis returns timeline
                html: `<div class="result">...</div>` // Placeholder
            };
        } catch (error) {
            console.error("Workflow execution failed:", error);
            throw error;
        }
    }
}
