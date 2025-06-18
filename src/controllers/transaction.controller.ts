import { NextFunction, Request, Response } from "express";
import { BlockTransaction } from "../blockchain/block";
import { mempool } from "../blockchain/mempool";
import { fetchWalletBalance } from "../blockchain";
import { verifySignature } from "../utils/crypto.util";

export const postTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionData = req.body;

    if (transactionData.sender === transactionData.recipient) throw new Error("Sender cannot be recipient");
    if (!transactionData.sender) throw new Error("Sender is required");
    if (!transactionData.recipient) throw new Error("Recipient is required");
    if (!transactionData.amount) throw new Error("Amount is required");
    if (transactionData.amount <= 0) throw new Error("Amount is invalid");
    if (!transactionData.signature) throw new Error("Signature is required");
    if (!transactionData.publicKey) throw new Error("publicKey is required");
    if (!transactionData.timestamp) throw new Error("'timestamp' is required");

    const transaction: BlockTransaction = {
      txid: "",
      sender: transactionData.sender,
      recipient: transactionData.recipient,
      amount: transactionData.amount,
      timestamp: transactionData.timestamp,
      message: transactionData.message || "",
      signature: transactionData.signature,
      publicKey: transactionData.publicKey
    };

    // Verify signature
    if (!verifySignature(transaction)) {
      throw new Error("Invalid signature");
    }

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