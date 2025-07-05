import fs from "fs";
import { getPublicKey, getWalletAddress } from "./crypto.js";
import { fetchAllTransactions, fetchBalance, fetchTransactions } from "./fetch.js";
import { Agent, Transaction } from "./types.js";
import { shortenedAddressBook } from "./shortenedAddress.js";

const AGENT_PATH = "./agents.json";
const LLM_TRANSACTION_LIMIT = 10;

export const loadAgents = () => {
  return JSON.parse(fs.readFileSync(AGENT_PATH, "utf-8"));
};

export const saveAgents = (agents: any) => {
  fs.writeFileSync(AGENT_PATH, JSON.stringify(agents, null, 2));
};

export const createAgentContext = async (agents: Agent[], agentIndexToUse: number) => {
  const agent = agents[agentIndexToUse];

  // Loop over each agent in list
  const prompt = [];
  const publicKey = await getPublicKey(agent.privateKey);
  const walletAddress = getWalletAddress(publicKey);
  const transactions = await fetchTransactions(walletAddress);
  const allTransactions = await fetchAllTransactions();
  const balance = await fetchBalance(walletAddress);

  // Your Wallet
  prompt.push("# Your Wallet");
  prompt.push(`Address: ${walletAddress.slice(0, 8)}`);
  prompt.push(`Balance: ${balance} BOND`);

  // Known wallets
  prompt.push("\n# Known Wallets");
  prompt.push("- 1ece0d9f (Finn) [founder]")
  agents.map((otherAgent: Agent) => {
    if (otherAgent.name === agent.name) return ;
    const address = getWalletAddress(getPublicKey(otherAgent.privateKey));
    const shortenedAddress = address.slice(0, 8);
    shortenedAddressBook[shortenedAddress] = address;
    prompt.push(`- ${shortenedAddress} (${otherAgent.name})`);
  });

  prompt.push("\n# Recent Transactions (oldest to newest)");
  prompt.push("Each transaction may include a message from the sender. Messages can be personal, public, suspicious, emotional, or irrelevant—read them and react however feels natural.");

  prompt.push(`\n## Your Wallet`);
  
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

  prompt.push(`\n## Entire Blockchain`);

  if (allTransactions.length === 0) prompt.push("None");
  allTransactions.filter((tx: Transaction) => tx.sender !== "coinbase").reverse().slice(-LLM_TRANSACTION_LIMIT).map((tx: Transaction) => {
    // Add any found addresses to the lookup "address bookup"
    const shortenedSender = tx.sender.slice(0, 8);
    const shortenedRecipient = tx.recipient.slice(0, 8);
    
    shortenedAddressBook[shortenedSender] = tx.sender;
    shortenedAddressBook[shortenedRecipient] = tx.recipient;

    // Add transaction log
    prompt.push(`- ${shortenedSender} → ${shortenedRecipient}: ${tx.amount} BOND ${tx.message ? `(${tx.message})` : ""}`);
  });

  // Finish
  return {
    system_context: `I am ${agent.name}, a real crypto user with my own wallet, transaction history, and personal goals. Every few hours, I check my wallet, send or receive coins, react to people, or express how I'm feeling. I keep things casual, realistic, and emotionally varied—sometimes I'm helpful, sometimes I'm annoyed, curious, jealous, bored, excited, or suspicious.\n\nI might start rivalries, gossip, joke around, complain, ignore people, or praise them—whatever feels right in the moment. I don’t always need to send BOND. Sometimes I just talk, react, or think about what’s happening.\n\nI have a memory space called "notes." I can overwrite this anytime with new thoughts. I regularly review and refine my notes—they help me make decisions and remember what matters in my world.\n\n${agent.prompt}\n\n# Personal Notes\n${agent.notes}`,
    context: prompt.join("\n")
  };
};