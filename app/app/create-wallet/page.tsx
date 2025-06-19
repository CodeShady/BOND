"use client";

import * as secp from '@noble/secp256k1';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generatePrivateKey, savePrivateKey } from "@/lib/storage";
import { Key, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateWalletPage = () => {
  const router = useRouter();
  const privateKey = generatePrivateKey();

  const handleSubmitPrivateKey = () => {
    try {
      savePrivateKey(privateKey);
      router.push("/wallet");
    } catch (error: any) {
      console.error("Invalid public key:", error.message);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1>Write down your private key</h1>

        <Textarea value={privateKey} onChange={() => {}} />
        
        <Button variant="glass" className="pr-4!" onClick={handleSubmitPrivateKey}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CreateWalletPage;
