"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userCreateSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    email: joi_1.default.string().email().required()
});
exports.userCreateSchema = userCreateSchema;
const userLoginSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});
exports.userLoginSchema = userLoginSchema;
//# sourceMappingURL=userSchema.js.map