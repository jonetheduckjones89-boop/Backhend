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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionAgent = void 0;
const base_agent_1 = require("./base.agent");
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
class IngestionAgent extends base_agent_1.BaseAgent {
    constructor() {
        super(...arguments);
        this.name = 'Ingestion Agent';
        this.description = 'Extracts text from PDF and DOCX files.';
    }
    execute(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!fs_1.default.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            const ext = (_a = filePath.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (ext === 'pdf') {
                const dataBuffer = fs_1.default.readFileSync(filePath);
                const data = yield (0, pdf_parse_1.default)(dataBuffer);
                return data.text;
            }
            else if (ext === 'docx') {
                const result = yield mammoth_1.default.extractRawText({ path: filePath });
                return result.value;
            }
            else if (ext === 'txt' || ext === 'md') {
                return fs_1.default.readFileSync(filePath, 'utf-8');
            }
            else {
                throw new Error(`Unsupported file type: ${ext}`);
            }
        });
    }
}
exports.IngestionAgent = IngestionAgent;
