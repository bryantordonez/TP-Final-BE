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
exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.getAllTransactions = void 0;
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
const transactionSchema_1 = require("./joi/transactionSchema");
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield TransactionModel_1.default.getAllTransactions();
        res.json(transactions);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ status: 500, error: error.message });
        }
        else {
            res.status(500).json({ status: 500, error: "Unknown error occurred" });
        }
    }
});
exports.getAllTransactions = getAllTransactions;
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mount, merchant, date, status } = req.body;
    const { error } = transactionSchema_1.transactionSchema.validate({ mount, merchant, date, status });
    if (error) {
        console.log('/addTransaction: transactionSchema error:', error.details[0].message);
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const transaction = { mount, merchant, date, status };
    try {
        const newTransaction = yield TransactionModel_1.default.addTransaction(transaction);
        res.status(201).json(newTransaction);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("transactionController: addTransaction: error:", error);
            res.status(500).json({ status: 500, error: "Internal server error" });
        }
        else {
            res.status(500).json({ status: 500, error: "Unknown error occurred" });
        }
    }
});
exports.addTransaction = addTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { mount, merchant, date, status } = req.body;
        const { error } = transactionSchema_1.transactionSchema.validate({ mount, merchant, date, status });
        if (error) {
            console.log('/updateTransaction: transactionSchema error:', error.details[0].message);
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const transactionUpdated = yield TransactionModel_1.default.updateTransaction(id, { mount, merchant, date, status });
        if (transactionUpdated) {
            console.log('/updateTransaction: transaction updated successfully');
            res.status(200).json(transactionUpdated);
        }
        else {
            res.status(404).json({ status: 404, error: "Transaction not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("/transactionController: updateTransaction: error:", error);
            res.status(500).json({ status: 500, error: "Internal server error" });
        }
        else {
            res.status(500).json({ status: 500, error: "Unknown error occurred" });
        }
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transactionDeleted = yield TransactionModel_1.default.deleteTransaction(id);
        if (transactionDeleted) {
            console.log('/deleteTransaction: transaction deleted successfully');
            res.status(200).json(transactionDeleted);
        }
        else {
            res.status(404).json({ status: 404, error: "Transaction not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ status: 500, error: error.message });
        }
        else {
            res.status(500).json({ status: 500, error: "Unknown error occurred" });
        }
    }
});
exports.deleteTransaction = deleteTransaction;
//# sourceMappingURL=transactionController.js.map