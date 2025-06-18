import { createVerify } from "crypto";
import { BlockTransaction } from "../blockchain/block";
import { createHash } from "crypto";

export const verifySignature = (transaction: BlockTransaction) => {
  // Exclude signature and txid from the message
  const { signature, publicKey } = transaction;

  // Ensure sender matches hash of publicKey
  const publicKeyHash = createHash("sha256").update(publicKey).digest("hex");
  if (transaction.sender !== publicKeyHash) {
    throw new Error("Sender address must be the hash of the 'publicKey'");
  }

  const message = `${transaction.sender}${transaction.recipient}${transaction.amount}${transaction.timestamp}${transaction.message}`;

  const verify = createVerify("SHA256");
  verify.update(message);
  verify.end();

  try {
    // Signature is expected to be in hex/base64, publicKey in PEM or hex
    return verify.verify(publicKey, signature, "hex");
  } catch {
    return false;
  }
};