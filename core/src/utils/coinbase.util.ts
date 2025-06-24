import { BlockTransaction } from "../blockchain/block";
import { BLOCK_REWARD } from "../config";
import { isValidTimestamp } from "./time.util";

export const isCoinbaseTx = (tx: BlockTransaction): boolean => {
  if (tx.sender !== "coinbase" || tx.amount !== BLOCK_REWARD || !isValidTimestamp(tx.timestamp))
    return false;
  return true;
};