import { createGenesisBlock } from "../blockchain/genesis";
import Database from "./database";

// Database connection/init logic
const db = new Database("data/blockchain.sqlite");

// Blockchain table schema
const createBlockchainTable = `
  CREATE TABLE IF NOT EXISTS blockchain (
    height INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    transactions TEXT NOT NULL,
    previous_hash TEXT NOT NULL,
    nonce INTEGER NOT NULL,
    hash TEXT NOT NULL
  );
`;

// Database setup
db.executeQuery(createBlockchainTable).then(async () => {
  console.log("Blockchain table ensured.");
  await createGenesisBlock();
}).catch((error) => {
  console.error("Error creating blockchain table:", error);
});

export default db;