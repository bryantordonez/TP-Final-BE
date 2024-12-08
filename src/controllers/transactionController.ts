import { Request, Response } from "express";
import TransactionModel from "../models/TransactionModel";
import { transactionInterface } from "../interfaces/TransactionInterface";
import { transactionSchema } from "./joi/transactionSchema";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transaction = await TransactionModel.getAllTransactions()
    res.json(transaction)
  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message })
  }
}

const addTransaction = async (req: Request, res: Response): Promise<any> => { //review any
  const { mount, store, date, status } = req.body;

  const { error } = transactionSchema.validate({ mount, store, date, status });
  if (error) {
      console.log('/addTransaction: transactionSchema error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
  }

  const transaction: transactionInterface = { mount, store, date, status };

  try {
    const newTransaction = await TransactionModel.addTransaction(transaction);
    res.status(201).json(newTransaction);
  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

const updateTransaction = async (req: Request, res: Response) : Promise<any> => { //review any
  try {
    const { id } = req.params;
    const { mount, store, date, status } = req.body;

    const { error } = transactionSchema.validate({ mount, store, date, status });
    if (error) {
        console.log('/updateTransaction: transactionSchema error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const transactionUpdated = await TransactionModel.updateTransaction(id, { mount, store, date, status });
    if (transactionUpdated) {
      console.log('/updateTransaction: transaction updated successfully');
      res.status(200).json(transactionUpdated)
    }
  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const transactionDeleted = await TransactionModel.deleteTransaction(id)

    if (transactionDeleted) {
      console.log('/deleteTransaction: transaction deleted successfully');
      res.status(200).json(transactionDeleted)
    }
  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

export { getAllTransactions, addTransaction, updateTransaction, deleteTransaction }