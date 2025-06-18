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
          recipient: "c6c818acf2726191d738b5970d6fcb7fe1214890a79d8d1d23b2f764de9711c3",
          amount: 42,
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