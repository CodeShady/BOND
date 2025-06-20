"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Key } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePrivateKey } from "@/lib/actions/wallet";
import { getPublicKey } from "@/lib/crypto";
import { handleError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
      handleError(
        "Public key failed to generate, meaning private key is invalid.",
        error
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-center space-y-2">
          <h3 className="h3">What&apos;s your private key?</h3>
          <p className="muted">(don&apos;t worry, we won&apos;t share this)</p>
        </div>

        <Input
          placeholder="Private Key"
          onChange={(e) => setPrivateKey(e.target.value)}
          value={privateKey}
        />

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

          <Button className="pr-4!" onClick={handleSubmit}>
            <Key /> Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExistingWalletPage;
