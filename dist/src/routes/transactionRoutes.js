"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const transactionController_1 = require("../controllers/transactionController");
const transactionRoutes = (0, express_1.Router)();
exports.transactionRoutes = transactionRoutes;
transactionRoutes.get("/transactions", authMiddleware_1.auth, transactionController_1.getAllTransactions);
transactionRoutes.post("/addTransaction", authMiddleware_1.auth, transactionController_1.addTransaction);
transactionRoutes.put("/updateTransaction/:id", authMiddleware_1.auth, transactionController_1.updateTransaction);
transactionRoutes.delete("/refundTransaction/:id", authMiddleware_1.auth, transactionController_1.deleteTransaction);
//# sourceMappingURL=transactionRoutes.js.map