// Generate a wallet (run this once per user)
import { generateKeyPairSync } from "crypto";

const { publicKey, privateKey } = generateKeyPairSync("ec", {
  namedCurve: "secp256k1", // Use secp256k1 for Bitcoin/Ethereum compatibility
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" }
});

console.log("Public Key:\n", publicKey);
console.log("Private Key:\n", privateKey);
