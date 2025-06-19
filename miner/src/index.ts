import axios from "axios";
import dotenv from "dotenv";
import { createHash } from "crypto";
import urlJoin from "url-join";

// Env
dotenv.config();

// Configuration
const CORE_API_URL = process.env.CORE_API_URL || "http://localhost:7123";
const CHECK_INTERVAL_MINUTES = 2;

const fetchDifficulty = async () => {
  try {
    const response = await axios.get(urlJoin(CORE_API_URL, "/api/difficulty"));
    return response.data.difficulty;
  } catch (error: any) {
    console.error("Error fetching blockchain difficulty:", error.message);
    return null;
  }
};

const fetchPendingTransactions = async () => {
  try {
    const response = await axios.get(urlJoin(CORE_API_URL, "/api/pending"));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching pending transactions:", error.message);
    return [];
  }
};

const fetchLastBlock = async () => {
  try {
    const response = await axios.get(urlJoin(CORE_API_URL, "/blocks"));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching pending last block:", error.message);
    return null;
  }
};

function calculateHash(
  height: number,
  timestamp: string,
  transactions: any[],
  previous_hash: string,
  nonce: number
): string {
  const blockString = `${height}${timestamp}${JSON.stringify(transactions)}${previous_hash}${nonce}`;
  return createHash("sha256").update(blockString).digest("hex");
}

export const hexToBinary = (hex: string): string => {
  return hex.split('').map(char => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
};

const mineBlock = async (difficulty: number, transactions: any[], lastBlock: any) => {
  let nonce = 0;
  let hash = "";
  const target = "0".repeat(difficulty);
  const height = lastBlock.height + 1;
  const timestamp = new Date().toISOString();
  const previous_hash = lastBlock.hash;

  while (true) {
    hash = calculateHash(height, timestamp, transactions, previous_hash, nonce);
    const binaryHash = hexToBinary(hash);
    if (binaryHash.startsWith(target)) break;

    nonce++;

    if (nonce % 100000 === 0) {
      process.stdout.write(`\rTried ${nonce} nonces...`);
    }
  }

  return {
    height,
    timestamp,
    transactions,
    previous_hash,
    nonce,
    hash,
  };
};

const postBlock = async (block: any) => {
  try {
    const response = await axios.post(`${CORE_API_URL}/blocks`, block);
    if (response.data.status !== "OK") {
      throw new Error(response.data);
    }
  } catch (error: any) {
    console.error("Block was rejected:", error.message);
  }
}

const checkMempoolAndMine = async () => {
  const difficulty = await fetchDifficulty();
  const lastBlock = await fetchLastBlock();
  const transactions = await fetchPendingTransactions();
  
  if (difficulty == null || lastBlock == null) {
    console.error("Cannot mine: missing difficulty or last block.");
    return;
  }

  console.log(`Found ${transactions.length} transactions in mempool`);
  if (transactions.length > 0) {
    const block = await mineBlock(difficulty, transactions, lastBlock);
    console.log("=== Found block ===");
    console.table(block);
    await postBlock(block);
  }

  console.log("Done");
};

const startMiner = () => {
  setInterval(checkMempoolAndMine, CHECK_INTERVAL_MINUTES * 60 * 1000);
  // Initially check immedately
  checkMempoolAndMine();
};

startMiner();