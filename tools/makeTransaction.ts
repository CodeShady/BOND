import { createSign, createHash } from "crypto";
import * as fs from "fs";
import * as readline from "readline";

// Load wallet keys from files (adjust paths as needed)
const privateKey = fs.readFileSync("./wallet_private.pem", "utf8");
const publicKey = fs.readFileSync("./wallet_public.pem", "utf8");

// Compute sender address as SHA-256 hash of publicKey
const sender = createHash("sha256").update(publicKey).digest("hex");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
  console.log(`Your sender address (derived from your public key):\n${sender}\n`);
  const recipient = await ask("Recipient address: ");
  const amount = await ask("Amount: ");
  const message = await ask("Message (optional): ");

  const timestamp = new Date().toISOString();

  const transaction = {
    sender,
    recipient,
    amount: Number(amount),
    timestamp,
    message
  };

  // Create the message string (must match server-side verification)
  const messageString = `${transaction.sender}${transaction.recipient}${transaction.amount}${transaction.timestamp}${transaction.message}`;

  // Sign the message
  const sign = createSign("SHA256");
  sign.update(messageString);
  sign.end();
  const signature = sign.sign(privateKey, "hex");

  // Build the signed transaction
  const signedTransaction = {
    ...transaction,
    signature,
    publicKey
  };

  console.log("\nSigned Transaction JSON:\n");
  console.log(JSON.stringify(signedTransaction, null, 2));

  rl.close();
})();