"use client";

import { Button } from "@/components/ui/button";
import { Key, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {
  const [step, setStep] = useState<number>(1);

  if (step === 0) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full h-full bg-foreground rounded-b-full flex justify-center items-end p-[5vw]">
            <div className="w-full aspect-square rounded-full bg-gradient-to-br from-accent to-indigo-600" />
          </div>
        </div>

        <div className="px-4 pt-8 pb-4">
          <h1 className="h1">
            Effortless.
            <br />
            Crypto.
            <br />
            Simplified.
          </h1>
          <p className="p mt-6 text-muted-foreground">
            Manage your wallet, send transactions, and explore the chain—without
            the chaos of other cryptos.
          </p>
        </div>

        <div className="mt-auto px-4 py-4">
          <Button className="w-full" onClick={() => setStep(1)}>
            Get Started Now
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex items-center justify-center relative">
          <h1 className="h1">$BOND</h1>
          
          <h1 className="absolute -translate-x-20 -translate-y-20 -rotate-12 h1 text-3xl blur-[2px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute translate-x-24 -translate-y-16 rotate-6 h1 text-2xl blur-[3px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute -translate-x-32 translate-y-10 -rotate-3 h1 text-4xl blur-[1px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute translate-x-10 translate-y-24 rotate-12 h1 text-xl blur-[4px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute -translate-x-10 translate-y-32 -rotate-6 h1 text-3xl blur-[2px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute translate-x-36 -translate-y-8 rotate-2 h1 text-2xl blur-[3px] text-muted-foreground">$BOND</h1>
          <h1 className="absolute -translate-x-40 translate-y-20 -rotate-8 h1 text-xl blur-[4px] text-muted-foreground">$BOND</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 p-4">
          <blockquote className="blockquote mb-6">
            &ldquo;I trust this more than my actual bank.&rdquo;<br /><span className="muted">-Brian</span>
          </blockquote>

          <Button className="w-full" asChild>
            <Link href="/create-wallet">
              <Plus /> Create new wallet
            </Link>
          </Button>

          <Button variant="glass" className="w-full" asChild>
            <Link href="/existing-wallet">
              <Key /> Use existing wallet
            </Link>
          </Button>
        </div>
      </div>
    );
  }
};

export default HomePage;
