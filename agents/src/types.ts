export interface Agent {
  privateKey: string;
  prompt: string;
  notes: string;
}

export interface Block {
  height: number;
  timestamp: string;
  transactions: Transaction[];
  previous_hash: string;
  nonce: number;
  hash: string;
}

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

export interface LLMResponse {
  skip: boolean;
  recipient: string;
  amount: number;
  message: string;
  notes: string;
}