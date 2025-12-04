export abstract class BaseAgent {
    abstract name: string;
    abstract description: string;

    async run(input: any): Promise<any> {
        console.log(`[${this.name}] Starting...`);
        try {
            const result = await this.execute(input);
            console.log(`[${this.name}] Completed.`);
            return result;
        } catch (error) {
            console.error(`[${this.name}] Failed:`, error);
            throw error;
        }
    }

    protected abstract execute(input: any): Promise<any>;
}
