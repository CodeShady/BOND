"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { generatePrivateKey } from "@/lib/crypto";
import { savePrivateKey } from "@/lib/actions/wallet";
import { handleError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const CreateWalletPage = () => {
  const router = useRouter();
  const privateKey = generatePrivateKey();

  const handleSubmitPrivateKey = async () => {
    try {
      await savePrivateKey(privateKey);
      router.push("/wallet");
    } catch (error) {
      handleError("Invalid public key", error);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-center space-y-2">
          <h3 className="h3">Here&apos;s your new private key!</h3>
          <p className="muted">(make sure to write it down)</p>
        </div>

        <Input value={privateKey} onChange={() => {}} />

        <div className="space-x-2">
          <Button
            variant="glass"
            className="pr-4!"
            asChild
          >
            <Link href="/">
              <ArrowLeft /> Go Back
            </Link>
          </Button>
          <Button
            className="pr-4!"
            onClick={handleSubmitPrivateKey}
          >
            <Key /> Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateWalletPage;
