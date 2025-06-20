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
import { ArrowDown } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { useWallet } from "@/lib/hooks/useWallet";
import { Button } from "../ui/button";

const ReceiveTransaction = () => {
  const { address } = useWallet();
  const { Image } = useQRCode();

  if (!address) return ;

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
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              text={address}
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

          <div className="w-full space-y-3">
            <Label htmlFor="address">Your Address</Label>
            <Input id="address" value={address} onChange={() => {}} />
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
