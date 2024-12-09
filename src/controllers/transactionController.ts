import { Request, Response } from "express";
import TransactionModel from "../models/TransactionModel";
import { transactionInterface } from "../interfaces/TransactionInterface";
import { transactionSchema } from "./joi/transactionSchema";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
      const transactions = await TransactionModel.getAllTransactions();
      res.json(transactions);
  } catch (error: unknown) {
      if (error instanceof Error) {
          res.status(500).json({ status: 500, error: error.message });
      } else {
          res.status(500).json({ status: 500, error: "Unknown error occurred" });
      }
  }
};

const addTransaction = async (req: Request, res: Response): Promise<void> => {
  const { mount, merchant, date, status } = req.body;

  const { error } = transactionSchema.validate({ mount, merchant, date, status });
  if (error) {
      console.log('/addTransaction: transactionSchema error:', error.details[0].message);
      res.status(400).json({ error: error.details[0].message });
      return;
  }

  const transaction: transactionInterface = { mount, merchant, date, status };

  try {
    const newTransaction = await TransactionModel.addTransaction(transaction);
    res.status(201).json(newTransaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("transactionController: addTransaction: error:", error);
      res.status(500).json({ status: 500, error: "Internal server error" });
    } else {
      res.status(500).json({ status: 500, error: "Unknown error occurred" });
    }
  }
};

const updateTransaction = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const { mount, merchant, date, status } = req.body;

    const { error } = transactionSchema.validate({ mount, merchant, date, status });
    if (error) {
        console.log('/updateTransaction: transactionSchema error:', error.details[0].message);
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const transactionUpdated = await TransactionModel.updateTransaction(id, { mount, merchant, date, status });
    if (transactionUpdated) {
      console.log('/updateTransaction: transaction updated successfully');
      res.status(200).json(transactionUpdated);
    } else {
      res.status(404).json({ status: 404, error: "Transaction not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("/transactionController: updateTransaction: error:", error);
      res.status(500).json({ status: 500, error: "Internal server error" });
    } else {
      res.status(500).json({ status: 500, error: "Unknown error occurred" });
    }
  }
}

const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
      const transactionDeleted = await TransactionModel.deleteTransaction(id);
      if (transactionDeleted) {
          console.log('/deleteTransaction: transaction deleted successfully');
          res.status(200).json(transactionDeleted);
      } else {
          res.status(404).json({ status: 404, error: "Transaction not found" });
      }
  } catch (error: unknown) {
      if (error instanceof Error) {
          res.status(500).json({ status: 500, error: error.message });
      } else {
          res.status(500).json({ status: 500, error: "Unknown error occurred" });
      }
  }
};

export { getAllTransactions, addTransaction, updateTransaction, deleteTransaction }