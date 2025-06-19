export interface Transaction {
  txid: string;
  sender: string;
  recipient: string;
  amount: number;
  timestamp: string;
  message: string;
  signature: string;
  publicKey: string;
}

export interface NewTransaction {
  sender: string;
  recipient: string;
  amount: number;
  timestamp: string;
  message: string;
  publicKey: string;
}