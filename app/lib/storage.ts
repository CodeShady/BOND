import * as secp from '@noble/secp256k1';
import { createHash } from 'crypto';

export const getUserPublicKey = () => {
  return localStorage.getItem("publick") || "";
};

export const getUserPrivateKey = () => {
  return localStorage.getItem("privatek") || "";
};

export const getUserAddress = () => {
  return localStorage.getItem("wallet") || "";
};

/**
 * Get a public key hex string from a private key hex string
 */
export function getPublicKeyHex(privateKeyHex: string): string {
  // Ensure the private key is a valid hex string (64 chars, no 0x prefix)
  const cleanHex = privateKeyHex.startsWith('0x') ? privateKeyHex.slice(2) : privateKeyHex;
  if (cleanHex.length !== 64) throw new Error('Private key must be 64 hex characters');

  // Get public key as Uint8Array
  const publicKey = secp.getPublicKey(cleanHex);

  // Convert to hex string
  return Buffer.from(publicKey).toString('hex');
}

export const generatePrivateKey = () => {
  // Generate a random private key (Uint8Array)
  const privateKey = secp.utils.randomPrivateKey();

  // Convert private key to hex
  const privateKeyHex = secp.etc.bytesToHex(privateKey);

  return privateKeyHex;
};

export function getWalletAddress(publicKeyHex: string): string {
  return createHash("sha256").update(publicKeyHex).digest("hex");
}

export const savePrivateKey = (pk: string) => {
  // Generate public key from private key
  const publicKey = getPublicKeyHex(pk);

  // Get wallet address
  const walletAddress = getWalletAddress(publicKey);
  
  // Save private key to localStorage
  localStorage.setItem("privatek", pk);
  localStorage.setItem("publick", publicKey);
  localStorage.setItem("wallet", walletAddress);
};
