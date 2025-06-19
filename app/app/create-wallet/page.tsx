"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { generatePrivateKey } from '@/lib/crypto';
import { savePrivateKey } from '@/lib/actions/wallet';

const CreateWalletPage = () => {
  const router = useRouter();
  const privateKey = generatePrivateKey();

  const handleSubmitPrivateKey = async () => {
    try {
      await savePrivateKey(privateKey);
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
          <Key /> Continue
        </Button>
      </div>
    </div>
  );
};

export default CreateWalletPage;
