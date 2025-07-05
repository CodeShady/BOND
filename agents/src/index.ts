import { createAgentContext, loadAgents, saveAgents, shortenedAddressBook } from "./agents.js";
import { getPublicKey, getWalletAddress } from "./crypto.js";
import { askLLMForResponse } from "./llm.js";
import { postTransaction, signTransaction } from "./transaction.js";
import { NewTransaction } from "./types.js";

let lastAgentIndex: number | null = null; // Track last agent

const startAgents = async () => {
  const agents = loadAgents();
  
  // Build a list of eligible indices (exclude lastAgentIndex)
  const eligibleIndices = agents.map((_: any, i: number) => i).filter((i: number) => i !== lastAgentIndex);
  const randomAgentChoice = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
  const randomAgent = agents[randomAgentChoice];
  lastAgentIndex = randomAgentChoice; // Update tracker

  const agentContext = await createAgentContext(agents, randomAgentChoice);
  console.log("\n====== Agent Context ======\n", agentContext);

  const response = await askLLMForResponse(agentContext);
  console.log("\n====== LLM Response ======\n", response);

  // Update (the ORIGINAL VALUE) agent notes
  agents[randomAgentChoice].notes = response.notes;
  
  console.log("\n====== STATUS ======\n");

  if (!response.skip) {
    // Form basic transaction from LLM data
    const recipientAddress = shortenedAddressBook[response.recipient];
    if (!recipientAddress) throw new Error(`Recipient address was not found in shortenedAddressBook[]`);

    const pubKey = getPublicKey(randomAgent.privateKey);

    const transaction: NewTransaction = {
      sender: getWalletAddress(pubKey),
      recipient: recipientAddress,
      amount: response.amount,
      message: response.message,
      timestamp: new Date().toISOString(),
      publicKey: pubKey
    };
    const signedTransaction = await signTransaction(transaction, randomAgent.privateKey);
    const postedTransaction = await postTransaction(signedTransaction);

    if (postedTransaction) {
      console.log("Network ACCEPTED agent's request!");
    } else {
      console.log("Network REJECETED agent's request!");
    }
  } else {
    console.log("Agent requested to skip.");
  }

  // Save agent's data (assuming it was overwritten with more data)
  saveAgents(agents);
};

function runRandomly() {
  const MIN_DELAY = 12 * 60_000; // 12 minutes
  const MAX_DELAY = 45 * 60_000; // 45 minutes
  const BURST_CHANCE = 0.1;      // 10% chance for a short burst

  async function loop() {
    const numAgents = Math.random() < BURST_CHANCE
      ? Math.floor(Math.random() * 3) + 2   // 2–4 agents in burst
      : Math.random() < 0.7
        ? 1                                 // most of the time, just 1
        : 2;                                // occasionally 2

    try {
      for (let i = 0; i < numAgents; i++) {
        await startAgents();
        await sleep(1000 + Math.random() * 2000); // small pause between agents
      }
    } catch (err) {
      console.error("Agent run failed:", err);
    }

    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    setTimeout(loop, delay);
  }

  function sleep(ms: number) {
    console.log("Sleeping...");
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loop();
}

runRandomly();