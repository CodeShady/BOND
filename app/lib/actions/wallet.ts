"use server";

import { cookies } from "next/headers";

export const savePrivateKey = async (pk: string) => {
  (await cookies()).set("pk", pk);
};

// export const savePrivateKey = (pk: string) => {
//   // Generate public key from private key
//   const publicKey = getPublicKeyHex(pk);

//   // Get wallet address
//   const walletAddress = getWalletAddress(publicKey);
  
//   // Save private key to localStorage
//   localStorage.setItem("privatek", pk);
//   localStorage.setItem("publick", publicKey);
//   localStorage.setItem("wallet", walletAddress);
// };
