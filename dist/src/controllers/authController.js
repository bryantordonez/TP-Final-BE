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
exports.login = exports.register = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const userSchema_1 = require("./joi/userSchema");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const { error } = userSchema_1.userCreateSchema.validate({ username, password, email });
        if (error) {
            console.log('/register: userCreateSchema error:', error.details[0].message);
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const newUser = yield AuthModel_1.default.register(username, password, email);
        if (newUser) {
            console.log("authController: register: new user created successfully");
            res.status(201).json(newUser);
            return;
        }
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error("authController: register: error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { error } = userSchema_1.userLoginSchema.validate({ username, password });
        if (error) {
            console.log('/login: userLoginSchema error:', error.details[0].message);
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const token = yield AuthModel_1.default.login(username, password);
        res.status(200).json({ token });
    }
    catch (err) {
        console.error("authController: login: error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map