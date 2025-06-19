import { createHash } from "crypto";
import { BlockTransaction } from "./block";

export class Mempool {
  private transactions: BlockTransaction[] = [];

  add(transaction: BlockTransaction) {
    this.transactions.push({
      ...transaction,
      txid: this.generateTxid(transaction)
    });
  }

  generateTxid(transaction: BlockTransaction) {
    const txString = `${transaction.sender}${transaction.recipient}${transaction.amount}${transaction.timestamp}${transaction.message}`;
    return createHash("sha256").update(txString).digest("hex");
  }

  fetchAll(): BlockTransaction[] {
    return this.transactions;
  }

  hasAll(txids: string[]): boolean {
    const mempoolTxids = new Set(this.transactions.map((tx => tx.txid)));
    return txids.every(txid => mempoolTxids.has(txid));
  }

  clear(txids: string[]) {
    this.transactions = this.transactions.filter(tx => !txids.includes(tx.txid));
  }
}

export const mempool = new Mempool();