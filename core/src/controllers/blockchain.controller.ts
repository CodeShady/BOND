import { NextFunction, Request, Response } from "express";
import { DIFFICULTY, fetchAllBlocks, fetchLatestBlock, insertBlock } from "../blockchain";

export const getBlockchainDifficulty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      difficulty: DIFFICULTY
    });
  } catch (error) {
    next(error);
  }
};

export const getWelcome = async (req: Request, res: Response, next: NextFunction) => {
  res.send("👋 Hi from the $BOND network!");
};

export const getLastBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lastBlock = await fetchLatestBlock();
    res.status(200).json(lastBlock);
  } catch (error) {
    next(error);
  }
};

export const getAllBlocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBlocks = await fetchAllBlocks();
    res.status(200).json(allBlocks);
  } catch (error) {
    next(error);
  }
};

export const postBlock = async (req: Request, res: Response, next: NextFunction) => {
  const blockData = req.body;

  try {
    await insertBlock(blockData);
    res.status(201).json({ status: "OK" });
  } catch (error) {
    next(error);
  }
};
