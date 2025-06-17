import { NextFunction, Request, Response } from "express";
import { BlockTransaction } from "../blockchain/block";
import { mempool } from "../blockchain/mempool";
import { fetchWalletBalance } from "../blockchain";

export const postTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionData = req.body;

    if (transactionData.sender === transactionData.recipient) throw new Error("Sender cannot be recipient");
    if (!transactionData.sender) throw new Error("Sender is required");
    if (!transactionData.recipient) throw new Error("Recipient is required");
    if (!transactionData.amount) throw new Error("Amount is required");
    if (transactionData.amount <= 0) throw new Error("Amount is invalid");

    const transaction: BlockTransaction = {
      txid: "",
      sender: transactionData.sender,
      recipient: transactionData.recipient,
      amount: transactionData.amount,
      timestamp: new Date().toISOString(),
      message: transactionData.message || "",
    };

    // Get the balance of the sender
    const balance = await fetchWalletBalance(transactionData.sender);

    if (balance < transactionData.amount) {
      throw new Error("Sender does not have sufficient funds");
    }

    // Add to mempool
    mempool.add(transaction);

    // Response
    res.status(200).json({ status: "OK" });
  } catch (error) {
    next(error);
  }
};

export const getPendingTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPendingTransactions = mempool.getAll();

    res.status(200).json(allPendingTransactions);
  } catch (error) {
    next(error);
  }
};