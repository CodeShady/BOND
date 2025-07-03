import fs from "fs";
import { getPublicKey, getWalletAddress } from "./crypto.js";
import { fetchAllTransactions, fetchBalance, fetchTransactions } from "./fetch.js";
import { Transaction } from "./types.js";

export const shortenedAddressBook: Record<string, string> = {};
const AGENT_PATH = "./agents.json";
const LLM_TRANSACTION_LIMIT = 10;

export const loadAgents = () => {
  return JSON.parse(fs.readFileSync(AGENT_PATH, "utf-8"));
};

export const saveAgents = (agents: any) => {
  fs.writeFileSync(AGENT_PATH, JSON.stringify(agents, null, 2));
};

export const createAgentContext = async (agent: any) => {
  // Loop over each agent in list
  const prompt = [];
  const publicKey = await getPublicKey(agent.privateKey);
  const walletAddress = getWalletAddress(publicKey);
  const transactions = await fetchTransactions(walletAddress);
  const allTransactions = await fetchAllTransactions();
  const balance = await fetchBalance(walletAddress);

  prompt.push("# About You");
  prompt.push(agent.prompt);

  if (agent.notes) {
    prompt.push("\n# Personal Notes");
    prompt.push(agent.notes);
  }
  
  prompt.push("\n# Your Wallet");
  prompt.push(`Address: ${walletAddress.slice(0, 8)}`);
  prompt.push(`Balance: ${balance} BOND`);

  prompt.push(`\n# Your Recent Transactions (oldest to newest):`);
  
  // Loop through each transaction
  if (transactions.length === 0) prompt.push("None");
  transactions.reverse().slice(-LLM_TRANSACTION_LIMIT).map((tx: Transaction) => {
    // Add any found addresses to the lookup "address bookup"
    const shortenedSender = tx.sender.slice(0, 8);
    const shortenedRecipient = tx.recipient.slice(0, 8);
    
    shortenedAddressBook[shortenedSender] = tx.sender;
    shortenedAddressBook[shortenedRecipient] = tx.recipient;

    // Add transaction log
    prompt.push(`- ${shortenedSender} → ${shortenedRecipient}: ${tx.amount} BOND ${tx.message ? `(${tx.message})` : ""}`);
  });

  prompt.push(`\n# Recent Blockchain Transactions (oldest to newest):`);

  if (allTransactions.length === 0) prompt.push("None");
  allTransactions.reverse().slice(-LLM_TRANSACTION_LIMIT).map((tx: Transaction) => {
    // Add any found addresses to the lookup "address bookup"
    const shortenedSender = tx.sender.slice(0, 8);
    const shortenedRecipient = tx.recipient.slice(0, 8);
    
    shortenedAddressBook[shortenedSender] = tx.sender;
    shortenedAddressBook[shortenedRecipient] = tx.recipient;

    // Add transaction log
    prompt.push(`- ${shortenedSender} → ${shortenedRecipient}: ${tx.amount} BOND ${tx.message ? `(${tx.message})` : ""}`);
  });

  // Finish
  return prompt.join("\n");
};