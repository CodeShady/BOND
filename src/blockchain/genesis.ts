import db from "../db";
import { Block } from "./block";

export const createGenesisBlock = async () => {
  // Check if the blockchain table is empty
  const rows = await db.executeQuery("SELECT COUNT(*) as count FROM blockchain");

  if (rows[0].count === 0) {
    // Genesis block data
    const genesisBlock = new Block({
      height: 0,
      timestamp: new Date().toISOString(),
      transactions: [],
      previous_hash: "0",
      nonce: 0,
    });

    // Insert genesis block
    await db.executeQuery(`INSERT INTO blockchain (height, timestamp, transactions, previous_hash, nonce, hash) VALUES (?, ?, ?, ?, ?, ?)`, [
      genesisBlock.height,
      genesisBlock.timestamp,
      JSON.stringify(genesisBlock.transactions),
      genesisBlock.previous_hash,
      genesisBlock.nonce,
      genesisBlock.hash,
    ])
  }
};