import { createHash } from "crypto";

// --- CONFIGURE THESE VALUES ---
const DIFFICULTY = 16; // Must match your backend
const height = 1; // Set to the next block height
const previous_hash = "9df741644986ccb50d6a2a4ba9bec25e354a7aadef4a094105416d76f242b7a5"; // Set to last block's hash
const transactions: any = [
  {
    "txid": "fc90929ead4b520e8e16da95507c48027d5d629631321b3979224757e8ad63f9",
    "sender": "c6c818acf2726191d738b5970d6fcb7fe1214890a79d8d1d23b2f764de9711c3",
    "recipient": "void",
    "amount": 0.4,
    "timestamp": "2025-06-17T22:43:30.036Z",
    "message": "These coins will burn, forever to be lost.",
    "signature": "30450220673e83a54ca302c083c89642dde1eb80d9d00b9d398d55a959139881f5ef18eb022100fec7d2a6668532df5267c616985ce6a314911e110afe03657744cc6284d2545c",
    "publicKey": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEXOBpohFODQXT08ypY6jQxpTLQLWq5Qsc\nZKkti7u1ZKelu7Qpv2vDN5MuUHwQpWTVo4wcVehSCqSwvXx+RlZz8A==\n-----END PUBLIC KEY-----\n"
  }
]; // Fill with your transactions
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
