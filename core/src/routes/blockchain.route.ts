import { Router } from "express";
import { getAllBlocks, getBlockchainDifficulty, getLastBlock, getWelcome, postBlock } from "../controllers/blockchain.controller";
import { getPendingTransactions, postTransaction } from "../controllers/transaction.controller";
import { getWalletBalance } from "../controllers/wallet.controller";

const blockchainRouter = Router();

blockchainRouter.get("/", getWelcome);
blockchainRouter.get("/blocks", getLastBlock);
blockchainRouter.get("/blocks/all", getAllBlocks);
blockchainRouter.post("/blocks", postBlock);
blockchainRouter.post("/transactions", postTransaction);
blockchainRouter.get("/transactions", getPendingTransactions);
blockchainRouter.get("/balance/:wallet", getWalletBalance);
blockchainRouter.get("/difficulty", getBlockchainDifficulty);

export default blockchainRouter;