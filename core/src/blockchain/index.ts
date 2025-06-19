import db from "../db";
import { verifySignature } from "../utils/crypto.util";
import { hexToBinary } from "../utils/hash.util";
import { validateISOStringTimestamp } from "../utils/time.util";
import { Block, BlockTransaction } from "./block";
import { mempool } from "./mempool";

export const DIFFICULTY = 16; // Number of leading zero bits required

// Blockchain logic (add block, validate, etc.)
export const insertBlock = async (blockData: any) => {
  const lastBlock = await fetchLatestBlock();
  if (!lastBlock) throw new Error("No blocks in chain");

  // Check previous hash and height
  if (blockData.previous_hash !== lastBlock.hash) throw new Error("Invalid previous hash");
  if (blockData.height !== lastBlock.height + 1) throw new Error("Invalid block height"); 

  // Validate timestamp
  await validateISOStringTimestamp(blockData.timestamp, lastBlock.timestamp);

  // Recreate block and verify hash
  const block = new Block({
    height: blockData.height,
    timestamp: blockData.timestamp,
    transactions: blockData.transactions,
    previous_hash: blockData.previous_hash,
    nonce: blockData.nonce,
  });

  // Ensure there ARE transactions present
  if (block.transactions.length === 0) throw new Error("Block must contain at least one transaction");

  // Proof of work check
  const binaryHash = hexToBinary(block.hash);
  if (!binaryHash.startsWith("0".repeat(DIFFICULTY))) {
    throw new Error("Proof of Work not satisifed");
  }

  // Ensure all transactions have valid hashes
  for (const tx of block.transactions) {
    // Verify the signature of the transaction
    if (!verifySignature(tx)) {
      throw new Error(`Invalid signature for txid: ${tx.txid}`);
    }

    // Recompute txid from transaction fields (excluding txid)
    const { txid, ...txFields } = tx;
    const recomputedTxid = mempool.generateTxid(txFields as BlockTransaction);
    if (txid !== recomputedTxid) {
      throw new Error(`Transaction hash mismatch for txid: ${txid}`);
    }
  }

  // Clear mempool
  const txids = block.transactions.map((tx) => tx.txid);
  if (!mempool.hasAll(txids)) {
    throw new Error("Block contains transaction(s) not present in mempool");
  }

  // Save to database
  await db.executeQuery(`INSERT INTO blockchain (height, timestamp, transactions, previous_hash, nonce, hash) VALUES (?, ?, ?, ?, ?, ?)`, [
    block.height,
    block.timestamp,
    JSON.stringify(block.transactions),
    block.previous_hash,
    block.nonce,
    block.hash
  ]);

  // Remove transactions only after successful insert
  mempool.clear(txids);
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

export const fetchWalletBalance = async (address: string): Promise<number> => {
  let balance = 0;

  // Confirmed transactions
  const allBlocks = await fetchAllBlocks();
  for (const block of allBlocks) {
    for (const tx of block.transactions) {
      if (tx.recipient === address) balance += tx.amount;
      if (tx.sender === address) balance -= tx.amount;
    }
  }

  // Pending transactions
  for (const tx of mempool.fetchAll()) {
    if (tx.recipient === address) balance += tx.amount;
    if (tx.sender === address) balance -= tx.amount;
  }

  return balance;
}

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