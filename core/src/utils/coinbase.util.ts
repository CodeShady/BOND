import { BlockTransaction } from "../blockchain/block";
import { BLOCK_REWARD } from "../config";
import { isValidTimestamp } from "./time.util";

export const isCoinbaseTx = (tx: BlockTransaction): boolean => {
  if (tx.sender !== "coinbase") return false;
  if (!isValidTimestamp(tx.timestamp)) throw new Error("coinbase tx contains invalid timestamp.");
  if (tx.amount !== BLOCK_REWARD) throw new Error("coinbase tx contains invalid reward.");
  return true;
};