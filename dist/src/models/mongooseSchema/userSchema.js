"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchemaDB = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
}, { versionKey: false, timestamps: true });
exports.userSchemaDB = userSchemaDB;
userSchemaDB.index({ username: 1, email: 1 }, { unique: true });
//# sourceMappingURL=userSchema.js.map