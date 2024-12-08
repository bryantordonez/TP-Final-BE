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
        const transaction = yield TransactionModel_1.default.getAllTransactions();
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.getAllTransactions = getAllTransactions;
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mount, store, date, status } = req.body;
    const { error } = transactionSchema_1.transactionSchema.validate({ mount, store, date, status });
    if (error) {
        console.log('/addTransaction: transactionSchema error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }
    const transaction = { mount, store, date, status };
    try {
        const newTransaction = yield TransactionModel_1.default.addTransaction(transaction);
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.addTransaction = addTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { mount, store, date, status } = req.body;
        const { error } = transactionSchema_1.transactionSchema.validate({ mount, store, date, status });
        if (error) {
            console.log('/updateTransaction: transactionSchema error:', error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }
        const transactionUpdated = yield TransactionModel_1.default.updateTransaction(id, { mount, store, date, status });
        if (transactionUpdated) {
            console.log('/updateTransaction: transaction updated successfully');
            res.status(200).json(transactionUpdated);
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transactionDeleted = yield TransactionModel_1.default.deleteTransaction(id);
        if (transactionDeleted) {
            console.log('/deleteTransaction: transaction deleted successfully');
            res.status(200).json(transactionDeleted);
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.deleteTransaction = deleteTransaction;
//# sourceMappingURL=transactionController.js.map