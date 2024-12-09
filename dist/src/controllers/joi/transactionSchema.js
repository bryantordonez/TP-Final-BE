"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const transactionSchema = joi_1.default.object({
    mount: joi_1.default.number().precision(2).positive().required(),
    merchant: joi_1.default.string().max(50).required(),
    date: joi_1.default.string().pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/).required(),
    status: joi_1.default.string().valid('pending', 'approved', 'declined', null).default('pending').optional()
});
exports.transactionSchema = transactionSchema;
//# sourceMappingURL=transactionSchema.js.map