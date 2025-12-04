import { Router } from 'express';
import { WorkflowManager } from '../agents/workflow.manager';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { filePath, fileType } = req.body;

        if (!filePath) {
            return res.status(400).json({ error: 'FilePath is required' });
        }

        // Initialize Workflow
        const workflow = new WorkflowManager();
        const result = await workflow.run(filePath);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
