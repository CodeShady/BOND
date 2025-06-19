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
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import {
  getUserAddress,
  getUserPrivateKey,
  getUserPublicKey,
} from "@/lib/storage";
import { signTransaction } from "@/lib/transaction";
import { postTransaction } from "@/lib/api";
import { useQRCode } from "next-qrcode";

const ReceiveTransaction = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { Image } = useQRCode();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="glass" className="pr-4!">
          <ArrowDown /> Receive
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receive Transaction</DialogTitle>
          <DialogDescription>
            Receive a transaction from somebody
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center w-full gap-8">
          <div className="rounded-lg shadow-sm overflow-hidden">
            <Image
              text={getUserAddress()}
              options={{
                type: "image/jpeg",
                quality: 1,
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#000",
                  light: "#FFFFFF",
                },
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="address">Your Address</Label>
            <Input id="address" value={getUserAddress()} onChange={() => {}} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveTransaction;
