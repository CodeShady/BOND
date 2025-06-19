import { NewTransaction } from "@/types";
import * as secp from "@noble/secp256k1";
import { createHash } from "crypto";

export const signTransaction = async (transaction: NewTransaction, privateKeyHex: string) => {
  const transactionString = `${transaction.sender}${transaction.recipient}${transaction.amount}${transaction.timestamp}${transaction.message}`;

  // Hash the transaction string
  const msgHash = createHash("sha256").update(transactionString).digest();

  // Sign with noble-secp256k1 (privateKeyHex must be 64 hex chars)
  const signature = await secp.signAsync(msgHash, privateKeyHex);

  // Signature is Uint8Array, convert it to hex string
  const signatureHex = signature.toCompactHex();

  return {
    ...transaction,
    signature: signatureHex,
  };
};