import db from "../db";
import { isValidTimestamp, validateISOStringTimestamp } from "../utils/time.util";
import { Block, BlockTransaction } from "./block";
import { mempool } from "./mempool";

// Blockchain logic (add block, validate, etc.)
export const insertBlock = async (blockData: any) => {
  const lastBlock = await fetchLatestBlock();
  if (!lastBlock) throw new Error("No blocks in chain");

  // Check previous hash and height
  if (blockData.previous_hash !== lastBlock.hash) throw new Error("Invalid previous hash");
  if (blockData.height !== lastBlock.height + 1) throw new Error("Invalid block height");
  if (!isValidTimestamp(blockData.timestamp)) throw new Error("Invalid timestamp string");
  
  // Validate timestamp
  validateISOStringTimestamp(blockData.timestamp, lastBlock.timestamp);

  // Recreate block and verify hash
  const block = new Block({
    height: blockData.height,
    timestamp: blockData.timestamp,
    transactions: blockData.transactions,
    previous_hash: blockData.previous_hash,
    nonce: blockData.nonce,
  });

  // Insert block
  await block.insert();
};

export const fetchLatestBlock = async () => {
  const rows = await db.executeQuery("SELECT * FROM blockchain ORDER BY height DESC LIMIT 1");
  if (rows.length === 0) return null;
  const blockData = rows[0];

  return new Block({
    height: blockData.height,
    timestamp: blockData.timestamp,
    transactions: JSON.parse(blockData.transactions),
    previous_hash: blockData.previous_hash,
    nonce: blockData.nonce
  });
};

export const fetchAllBlocks = async (direction: "ASC" | "DESC" = "DESC") => {
  const rows = await db.executeQuery(`SELECT * FROM blockchain ORDER BY height ${direction}`);
  
  return rows.map((block: any) => ({
    ...block,
    transactions: JSON.parse(block.transactions)
  }))
};

/**
 * Fetch the balance of a wallet based on confirmed transactions
 */
export const fetchWalletBalance = async (address: string): Promise<number> => {
  let balance = 0;

  const allBlocks = await fetchAllBlocks();
  for (const block of allBlocks) {
    for (const tx of block.transactions) {
      if (tx.recipient === address) balance += tx.amount;
      if (tx.sender === address) balance -= tx.amount;
    }
  }

  return balance;
}

/**
 * Calculates the total amount of pending outgoing transactions for a given address.
 *
 * Iterates through all transactions in the mempool and sums the amounts of transactions
 * where the sender matches the specified address.
 *
 * @param address - The address for which to calculate the pending outgoing amount.
 * @returns The total amount of pending outgoing transactions for the given address.
 */
export const fetchPendingOutgoingAmount = (address: string) => {
  let total = 0;
  for (const tx of mempool.fetchAll()) {
    if (tx.sender === address) {
      total += tx.amount;
    }
  }
  return total;
};



export const fetchWalletTransactions = async (address: string): Promise<BlockTransaction[]> => {
  const transactions = [];

  // Fetch all blocks
  const allBlocks = await fetchAllBlocks();

  // Iterate through each block's transactions
  for (const block of allBlocks) {
    for (const tx of block.transactions) {
      if (tx.sender === address || tx.recipient === address)
        transactions.push(tx);
    }
  }

  return transactions;
};

export const fetchPendingWalletTransactions = async (address: string): Promise<BlockTransaction[]> => {
  const transactions = [];

  // Iterate through each mempool transaction
  for (const tx of mempool.fetchAll()) {
    if (tx.sender === address || tx.recipient === address)
      transactions.push(tx);
  }
  
  return transactions;
};
