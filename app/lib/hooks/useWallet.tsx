"use client";

import { createContext, useContext } from "react";

export type WalletContextType = {
  publicKey: string | null;
  privateKey: string | null;
  address: string | null;
};

const WalletContext = createContext<WalletContextType>({
  publicKey: null,
  privateKey: null,
  address: null,
});

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ value, children }: { value: WalletContextType; children: React.ReactNode }) => {
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}