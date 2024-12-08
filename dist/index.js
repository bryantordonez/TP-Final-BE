"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBconfig_1 = require("./src/config/DBconfig");
const transactionRoutes_1 = require("./src/routes/transactionRoutes");
const authRoutes_1 = require("./src/routes/authRoutes");
process.loadEnvFile();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.authRoutes); //ok
app.use("/api", transactionRoutes_1.transactionRoutes);
app.listen(PORT, () => {
    (0, DBconfig_1.connectDb)();
    console.log("Server is listening on port http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map