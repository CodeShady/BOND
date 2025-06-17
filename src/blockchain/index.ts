import db from "../db";
import { validateISOStringTimestamp } from "../utils/time";
import { Block } from "./block";

// Blockchain logic (add block, validate, etc.)
export const submitBlock = async (blockData: any) => {
  const lastBlock = await getLastBlock();
  if (!lastBlock) throw new Error("No blocks in chain");

  // Check previous hash and height
  if (blockData.previous_hash !== lastBlock.hash) throw new Error(`Invalid previous hash`);
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

  // TODO: Check PoW here

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

export const getLastBlock = async () => {
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