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
      transactions: [
        {
          sender: "0000000000000000000000000000000000000000000000000000000000000000",
          recipient: "1ece0d9ff0cb58b3267006b3cc27b88322edc7d8f384296728f7663ffbdeca4d",
          amount: 42,
          timestamp: new Date().toISOString(),
        }
      ],
      previous_hash: "0000000000000000000000000000000000000000000000000000000000000000",
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