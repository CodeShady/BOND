import { createHash } from "crypto";
import { hexToBinary } from "../utils/hash.util";
import { DIFFICULTY } from "../config";
import { verifySignature } from "../utils/crypto.util";
import { mempool } from "./mempool";
import db from "../db";
import { isCoinbaseTx } from "../utils/coinbase.util";

export interface BlockTransaction {
  txid: string;
  sender: string;
  recipient: string;
  amount: number;
  timestamp: string;
  message: string;
  signature: string;
  publicKey: string;
}

export interface BlockProps {
  height: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  nonce: number;
}

export class Block {
  height: number;
  timestamp: string;
  transactions: BlockTransaction[];
  previous_hash: string;
  nonce: number;
  hash: string;

  constructor({ height, timestamp, transactions, previous_hash, nonce }: BlockProps) {
    this.height = height;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previous_hash = previous_hash;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  async insert() {
    // Ensure there ARE transactions present
    if (this.transactions.length <= 0) throw new Error("Block must contain at least one transaction");

    // Ensure first transaction is a coinbase tx
    const coinbaseTx = this.transactions[0];
    if (!isCoinbaseTx(coinbaseTx)) {
      throw new Error(`First transaction must be coinbase tx to miner address with "coinbase" as sender.`);
    }

    // Proof of work check
    const binaryHash = hexToBinary(this.hash);
    if (!binaryHash.startsWith("0".repeat(DIFFICULTY))) {
      throw new Error("Proof of Work not satisifed");
    }

    // Iterate through each transaction in block
    for (const tx of this.transactions.slice(1)) {
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

    // Match each tx with tx in mempool
    const txids = this.transactions.slice(1).map((tx) => tx.txid);
    if (!mempool.hasAll(txids)) {
      throw new Error("Block contains transaction(s) not present in mempool");
    }

    // Save to database
    await db.executeQuery(`INSERT INTO blockchain (height, timestamp, transactions, previous_hash, nonce, hash) VALUES (?, ?, ?, ?, ?, ?)`, [
      this.height,
      this.timestamp,
      JSON.stringify(this.transactions),
      this.previous_hash,
      this.nonce,
      this.hash
    ]);

    // Remove transactions only after successful insert
    mempool.clear(txids);
  }

  calculateHash(): string {
    const blockString = `${this.height}${this.timestamp}${JSON.stringify(this.transactions)}${this.previous_hash}${this.nonce}`;
    return createHash("sha256").update(blockString).digest("hex");
  }
}