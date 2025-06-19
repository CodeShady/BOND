"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { savePrivateKey } from "@/lib/storage";
import { Key, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [privateKey, setPrivateKey] = useState<string>("");

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
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <Textarea placeholder="Private Key" onChange={(e) => setPrivateKey(e.target.value)} value={privateKey} />
        
        <Button variant="glass" className="pr-4!" onClick={handleSubmitPrivateKey}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
