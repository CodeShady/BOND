import { Router } from "express";
import { getAllBlocks, getLastBlock, getWelcome, postBlock } from "../controllers/blockchain.controller";

const blockchainRouter = Router();

blockchainRouter.get("/", getWelcome)
blockchainRouter.get("/blocks", getLastBlock);
blockchainRouter.get("/blocks/all", getAllBlocks);
blockchainRouter.post("/blocks", postBlock);

export default blockchainRouter;