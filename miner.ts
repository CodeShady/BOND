import { createHash } from "crypto";

// --- CONFIGURE THESE VALUES ---
const DIFFICULTY = 16; // Must match your backend
const height = 2; // Set to the next block height
const previous_hash = "00001cf1c4e5cf13a5d948af19117c35568f664d079c89453eedc63564f98dba"; // Set to last block's hash
const transactions: any = [{ to: "finn.wallet", from: "genesis.wallet" }]; // Fill with your transactions
const timestamp = new Date().toISOString(); // Or set manually
// ------------------------------

function hexToBinary(hex: string): string {
  return hex.split('').map(char =>
    parseInt(char, 16).toString(2).padStart(4, '0')
  ).join('');
}

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

function mineBlock() {
  let nonce = 0;
  let hash = "";
  const target = "0".repeat(DIFFICULTY);

  while (true) {
    hash = calculateHash(height, timestamp, transactions, previous_hash, nonce);
    const binaryHash = hexToBinary(hash);
    if (binaryHash.startsWith(target)) {
      break;
    }
    nonce++;
    // Optional: log progress every 100000 tries
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
}

const minedBlock = mineBlock();
console.log("Mined block:\n", JSON.stringify(minedBlock, null, 2));
