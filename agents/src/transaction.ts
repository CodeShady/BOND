import * as secp from "@noble/secp256k1";
import { createHash } from "crypto";
import { NewTransaction } from "./types";
import { CORE_API_URL } from "./env";
import urlJoin from "url-join";
import axios from "axios";

export const postTransaction = async (transaction: NewTransaction): Promise<boolean> => {
  const res = await axios.post(urlJoin(CORE_API_URL, "/api/transactions"), transaction);
  return res.status === 201;
};

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