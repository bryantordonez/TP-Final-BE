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
exports.disconnectDb = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
process.loadEnvFile();
const URI_DB = process.env.URI_DB;
if (!URI_DB) {
    throw new Error("Database URI is not defined. Set 'URI_DB' in .env");
}
const connectDb = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (uri = URI_DB) {
    try {
        yield mongoose_1.default.connect(uri);
        console.log("Database connection successful");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Database connection failed:", error.message);
        }
        else {
            console.error("Unknown error occurred while connecting to the database");
        }
        process.exit(1);
    }
});
exports.connectDb = connectDb;
const disconnectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.log("Database disconnection successful");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error while disconnecting from the database:", error.message);
        }
        else {
            console.error("Unknown error occurred while disconnecting from the database");
        }
    }
});
exports.disconnectDb = disconnectDb;
//# sourceMappingURL=DBconfig.js.map