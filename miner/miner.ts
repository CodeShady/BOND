import { createHash } from "crypto";

// --- CONFIGURE THESE VALUES ---
const DIFFICULTY = 16; // Must match your backend
const height = 3; // Set to the next block height
const previous_hash = "00000beedfd66599f423feb219aa44cec55d7892e466e0622958f5459c3aa7ab"; // Set to last block's hash
const transactions: any = [
  {
    "txid": "c70f2507a3dd7dc939bbda8acaa5a5a5c05aa89935cbb6e0ce1fbaa572cda0c0",
    "sender": "c6c818acf2726191d738b5970d6fcb7fe1214890a79d8d1d23b2f764de9711c3",
    "recipient": "void",
    "amount": 4200.0042,
    "timestamp": "2025-06-18T00:26:31.249Z",
    "message": "Burned!",
    "signature": "3045022100fd209f9679ec9a5278a38d9b18f601c9cb465cfdc580c68ba1803c4099b7d73202202676229e69492aabf2358aa237811acbe5360c2d68f8b017d8ebf4db74ab6d09",
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
