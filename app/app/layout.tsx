import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/lib/hooks/useWallet";
import { cookies } from "next/headers";
import { getPublicKey, getWalletAddress } from "@/lib/crypto";

const openSans = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOND Wallet",
  description: "Your BOND wallet",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const privateKey = (await cookies()).get("pk")?.value || null;
  const publicKey = privateKey ? getPublicKey(privateKey) : null;
  const address = publicKey ? getWalletAddress(publicKey) : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.className} antialiased overflow-x-hidden`}>
        {/* Background gradient blobs */}
        <div className="pointer-events-none fixed top-1/2 -left-20 w-80 h-80 bg-accent/25 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="pointer-events-none fixed top-0 -right-20 w-80 h-80 bg-accent/25 rounded-full blur-[100px]" />

        <WalletProvider
          value={{
            publicKey,
            privateKey,
            address,
          }}
        >
          <div className="p-4 max-w-xl md:mx-auto">{children}</div>
        </WalletProvider>
      </body>
    </html>
  );
}
