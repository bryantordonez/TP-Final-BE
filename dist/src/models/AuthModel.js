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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = require("./mongooseSchema/userSchema");
process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET || "";
const User = mongoose_1.default.model("user", userSchema_1.userSchemaDB);
const register = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User.create({
            username,
            password: yield bcryptjs_1.default.hash(password, 10),
            email
        });
        return {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        };
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("AuthModel: register: Error:", err.message);
        }
        throw new Error("Internal server error");
    }
});
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.password || !(yield bcryptjs_1.default.compare(password, user.password))) {
            throw new Error("Incorrect username or password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        console.log("token created successfully");
        return token;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("AuthModel: login: Error:", err.message);
        }
        throw new Error("Internal server error");
    }
});
exports.default = { User, register, login };
//# sourceMappingURL=AuthModel.js.map