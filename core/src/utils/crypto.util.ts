import * as secp from "@noble/secp256k1";
import { BlockTransaction } from "../blockchain/block";
import { createHash } from "crypto";

export const verifySignature = (transaction: BlockTransaction) => {
  const { signature, publicKey } = transaction;

  // Ensure publicKey is a valid hex string
  if (!/^[0-9a-fA-F]+$/.test(publicKey)) {
    throw new Error("Invalid public key, must be a hex string");
  }

  // Ensure sender matches hash of publicKey
  const publicKeyHash = createHash("sha256").update(publicKey).digest("hex");
  if (transaction.sender !== publicKeyHash) {
    throw new Error("Sender address must be the hash of the 'publicKey'");
  }

  const message = `${transaction.sender}${transaction.recipient}${transaction.amount}${transaction.timestamp}${transaction.message}`;

  try {
    // Signature and publicKey are hex strings
    // Hash the message
    const msgHash = createHash("sha256").update(message).digest();

    // secp.verify expects Uint8Array
    const sigBytes = Uint8Array.from(Buffer.from(signature, "hex"));
    const pubKeyBytes = Uint8Array.from(Buffer.from(publicKey, "hex"));

    return secp.verify(sigBytes, msgHash, pubKeyBytes);
  } catch {
    return false;
  }
};