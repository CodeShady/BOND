import { NextFunction, Request, Response } from "express";
import { fetchAllBlocks, fetchLatestBlock, insertBlock } from "../blockchain";
import { Block } from "../blockchain/block";

export const getWelcome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate blockchain and return status
    const allBlocks = await fetchAllBlocks("ASC");

    let blockchainValid = true;
    let lastHash: string;
    allBlocks.map((block: any) => {
      // Recreate block from data
      const recreatedBlock = new Block(block);

      if (recreatedBlock.height !== 0) {

        // Check if hashes match
        if (recreatedBlock.hash !== block.hash) blockchainValid = false;
        
        // Check if previous hash is equal to the actual previous hash
        if (recreatedBlock.previous_hash !== lastHash) blockchainValid = false;
      }
      lastHash = recreatedBlock.hash;
    });

    res.send("Welcome to the $BOND network!<br/>" + `Blockchain is ${blockchainValid ? "valid ✅" : "invalid ❌"}`);
  } catch (error) {
    next(error);
  }
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
