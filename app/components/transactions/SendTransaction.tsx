"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { signTransaction } from "@/lib/transaction";
import { postTransaction } from "@/lib/api";
import { Textarea } from "../ui/textarea";
import { useWallet } from "@/lib/hooks/useWallet";
import ConfirmAlert from "./ConfirmAlert";

const SendTransaction = () => {
  const { privateKey, publicKey, address } = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  if (!privateKey || !publicKey || !address) return ;

  const handleSend = async () => {
    const transaction = await signTransaction({
      sender: address,
      recipient,
      amount: Number(amount),
      timestamp: new Date().toISOString(),
      message: message,
      publicKey: publicKey
    }, privateKey);

    console.log(transaction);

    postTransaction(transaction);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="glass" className="pr-4!">
            <ArrowUp /> Send
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make Transaction</DialogTitle>
            <DialogDescription>
              Make a transaction to somebody
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="address">Wallet Address</Label>
              <Input id="address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={() => setShowConfirmation(true)}>Confirm & Send</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlert open={showConfirmation} onClose={() => setShowConfirmation(false)} confirmTransaction={handleSend} />
    </>
  );
};

export default SendTransaction;
