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
const transactionSchema = new mongoose_1.default.Schema({
    mount: {
        type: Number,
        required: true,
    },
    store: {
        type: String,
        required: true,
        maxlength: 50,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined', null],
        default: 'pending',
    },
}, {
    versionKey: false
});
const Transaction = mongoose_1.default.model("transaction", transactionSchema);
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction.find();
        return transactions;
    }
    catch (error) {
        throw new Error("Error while getting transactions");
    }
});
const addTransaction = (dataTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = new Transaction(dataTransaction);
        yield newTransaction.save();
        return newTransaction;
    }
    catch (error) {
        throw new Error("Error while adding transaction");
    }
});
const updateTransaction = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTransaction = yield Transaction.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTransaction) {
            throw new Error("Transaction not found");
        }
        return updatedTransaction;
    }
    catch (error) {
        throw new Error("Error while updating transaction");
    }
});
const deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTransaction = yield Transaction.findByIdAndDelete(id);
        if (!deleteTransaction) {
            throw new Error("Transaction not found");
        }
        return deletedTransaction;
    }
    catch (error) {
        throw new Error("Error while deleting transaction");
    }
});
exports.default = { getAllTransactions, addTransaction, updateTransaction, deleteTransaction };
//# sourceMappingURL=TransactionModel.js.map