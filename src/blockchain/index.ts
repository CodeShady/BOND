import db from "../db";
import { hexToBinary } from "../utils/hash.util";
import { validateISOStringTimestamp } from "../utils/time.util";
import { Block } from "./block";

const DIFFICULTY = 16; // Number of leading zero bits required

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

  // Proof of work check
  const binaryHash = hexToBinary(block.hash);
  if (!binaryHash.startsWith("0".repeat(DIFFICULTY))) {
    throw new Error("Proof of Work not satisifed");
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