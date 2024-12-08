import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { addTransaction, getAllTransactions, updateTransaction, deleteTransaction } from "../controllers/transactionController";

const transactionRoutes = Router();

transactionRoutes.get("/transactions", auth, getAllTransactions);
transactionRoutes.post("/addTransaction", auth, addTransaction);
transactionRoutes.put("/updateTransaction/:id", auth, updateTransaction);
transactionRoutes.delete("/refundTransaction/:id", auth, deleteTransaction);

export { transactionRoutes }