import { createHash } from "crypto";

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
  transactions: any[];
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

  calculateHash(): string {
    const blockString = `${this.height}${this.timestamp}${JSON.stringify(this.transactions)}${this.previous_hash}${this.nonce}`;
    return createHash("sha256").update(blockString).digest("hex");
  }
}