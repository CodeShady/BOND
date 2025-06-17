import { NextFunction, Request, Response } from "express";
import { fetchWalletBalance } from "../blockchain";

export const getWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.wallet) throw new Error("Wallet is required");

    const balance = await fetchWalletBalance(req.params.wallet);

    res.status(200).json({
      balance
    })
  } catch (error) {
    next(error);
  }
};