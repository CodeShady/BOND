import { Transaction } from "@/types";
import HashDisplay from "./ui/HashDisplay";
import TimeAgo from "./ui/TimeAgo";
import { ArrowRight, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TransactionCard = ({ transaction, pending, className="" }: { transaction: Transaction; pending: boolean; className?: string }) => {
  return (
    <div className={cn("w-full bg-white/15 rounded-xl p-4 border flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold flex items-center gap-1">
          <span>{transaction.amount}</span>
          <span className="text-sm text-muted-foreground font-medium">BOND</span>
        </span>
        <span className="text-sm text-muted-foreground"><TimeAgo iso={transaction.timestamp} /></span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HashDisplay hash={transaction.sender} />
          <ArrowRight size={16} className="text-muted-foreground" />
          <HashDisplay hash={transaction.recipient} />
        </div>
        
        <span
          className={`text-sm px-2 py-1.5 rounded-full font-semibold ${
            pending
              ? "bg-transparent border text-warning"
              : "bg-transparent border text-success"
          }`}
        >
          {pending ? <Clock size={16} /> : <Check size={16} />}
        </span>
      </div>
      {transaction.message && (
        <div className="mt-1 text-sm text-muted-foreground italic">
          &ldquo;{transaction.message}&rdquo;
        </div>
      )}
    </div>
  );
};

export default TransactionCard;