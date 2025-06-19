"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePrivateKey } from "@/lib/actions/wallet";
import { getPublicKey } from "@/lib/crypto";
import { handleError } from "@/lib/utils";

const ExistingWalletPage = () => {
  const router = useRouter();
  const [privateKey, setPrivateKey] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // Test the private key by generating a public key
      const publicKey = getPublicKey(privateKey);
      
      if (publicKey) {
        // Save the private key
        await savePrivateKey(privateKey);

        // Redirect user to wallet
        router.push("/wallet");
      }
    } catch (error) {
      handleError("Public key failed to generate, meaning private key is invalid.", error);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center gap-2 w-full">
        <Textarea
          placeholder="Private Key"
          onChange={(e) => setPrivateKey(e.target.value)}
          value={privateKey}
        />

        <Button variant="glass" className="pr-4!" onClick={handleSubmit}>
          <Key /> Continue
        </Button>
      </div>
    </div>
  );
};

export default ExistingWalletPage;
