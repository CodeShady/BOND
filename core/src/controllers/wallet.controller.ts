import { NextFunction, Request, Response } from "express";
import { fetchPendingWalletTransactions, fetchWalletBalance, fetchWalletTransactions } from "../blockchain";

export const getWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.wallet) throw new Error("Address is required");

    const balance = await fetchWalletBalance(req.params.wallet);

    res.status(200).json({
      balance
    })
  } catch (error) {
    next(error);
  }
};

export const getWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.wallet) throw new Error("Address is required");

    const transactions = await fetchWalletTransactions(req.params.wallet);

    res.status(200).json({
      transactions
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.wallet) throw new Error("Address is required");

    const transactions = await fetchPendingWalletTransactions(req.params.wallet);
    
    res.status(200).json({
      transactions
    });
  } catch (error) {
    next(error);
  }
};