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
const express_1 = require("express");
const workflow_manager_1 = require("../agents/workflow.manager");
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filePath, fileType } = req.body;
        if (!filePath) {
            return res.status(400).json({ error: 'FilePath is required' });
        }
        // Initialize Workflow
        const workflow = new workflow_manager_1.WorkflowManager();
        const result = yield workflow.run(filePath);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
