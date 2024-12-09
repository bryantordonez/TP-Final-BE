import mongoose from "mongoose"
import { transactionInterface } from "../interfaces/TransactionInterface"

const transactionSchema = new mongoose.Schema({
  mount: {
    type: Number,
    required: true,
  },
  merchant: {
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
})

const Transaction = mongoose.model("transaction", transactionSchema)

const getAllTransactions = async () => {
  try {
    const transactions = await Transaction.find()
    return transactions
  } catch (error) {
    throw new Error("Error while getting transactions")
  }
}

const addTransaction = async (dataTransaction: transactionInterface) => {
  try {
    const newTransaction = new Transaction(dataTransaction)
    await newTransaction.save()
    return newTransaction
  } catch (error) {
    throw new Error("Error while adding transaction")
  }
}

const updateTransaction = async (id: string, updatedData: Partial<transactionInterface>) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, updatedData, { new: true })

    if (!updatedTransaction) {
      throw new Error("Transaction not found")
    }

    return updatedTransaction
  } catch (error) {
    throw new Error("Error while updating transaction")
  }
}

const deleteTransaction = async (id: string) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id)

    if (!deleteTransaction) {
      throw new Error("Transaction not found");
    }

    return deletedTransaction
  } catch (error) {
    throw new Error("Error while deleting transaction");
  }
}

export default { getAllTransactions, addTransaction, updateTransaction, deleteTransaction }