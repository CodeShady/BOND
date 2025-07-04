import * as secp from '@noble/secp256k1';
import { createHash } from 'crypto';

/**
 * Get a public key hex string from a private key hex string
 */
/**
 * Returns the public key (hex string) for a given private key (hex string).
 * @param privateKeyHex - 64-character hex string (with or without 0x prefix)
 */
export function getPublicKey(privateKeyHex: string): string {
  // Ensure the private key is a valid hex string (64 chars, no 0x prefix)
  const cleanHex = privateKeyHex.startsWith('0x') ? privateKeyHex.slice(2) : privateKeyHex;
  if (cleanHex.length !== 64) throw new Error('Private key must be 64 hex characters');
  if (!/^[0-9a-fA-F]{64}$/.test(cleanHex)) throw new Error('Invalid hex string');

  // Get public key as Uint8Array
  const publicKey = secp.getPublicKey(cleanHex);

  // Convert to hex string
  return Buffer.from(publicKey).toString('hex');
}

/**
 * Generates a random private key as a 64-character hex string.
 */
export const generatePrivateKey = (): string => {
  // Generate a random private key (Uint8Array)
  const privateKey = secp.utils.randomPrivateKey();

  // Convert private key to hex
  const privateKeyHex = secp.etc.bytesToHex(privateKey);

  return privateKeyHex;
};

/**
 * Derives a wallet address by hashing the public key (hex string) with SHA-256.
 * @param publicKeyHex - Hex string of the public key
 */
export function getWalletAddress(publicKey: string): string {
  return createHash("sha256").update(publicKey).digest("hex");
}