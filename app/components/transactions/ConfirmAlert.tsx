"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import HashDisplay from "../ui/HashDisplay";
import { ArrowRight } from "lucide-react";
import { useWallet } from "@/lib/hooks/useWallet";

const ConfirmAlert = ({ amount, recipient, open, onClose, confirmTransaction }: { amount: string; recipient: string; open: boolean; onClose: () => void; confirmTransaction: () => void }) => {
  const { address } = useWallet();

  if (!address) return ;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Review Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Transfers cannot be reversed.
          
            <div className="my-6 flex flex-col items-center gap-4">
              <span className="text-xl font-bold flex items-center gap-1">
                <span>{amount}</span>
                <span className="text-sm text-muted-foreground font-medium">BOND</span>
              </span>

              <div className="flex items-center gap-2">
                <HashDisplay hash={address} />
                <ArrowRight size={16} className="text-muted-foreground" />
                <HashDisplay hash={recipient} />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmTransaction}>Confirm & Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlert;
