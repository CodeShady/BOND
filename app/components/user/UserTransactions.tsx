"use client";

import { fetchConfirmedTransactions, fetchPendingTransactions } from "@/lib/api/fetchTransactions";
import { ArrowDown, ArrowRight, ArrowUp, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import HashDisplay from "../ui/HashDisplay";
import TimeAgo from "../ui/TimeAgo";
import { useWallet } from "@/lib/hooks/useWallet";
import { Transaction } from "@/types";

const UserTransactions = () => {
  const { address } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmed, setConfirmed] = useState<Transaction[]>([]);
  const [pending, setPending] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!address) return ;
    
    (async() => {
      const conf = await fetchConfirmedTransactions(address);
      const pend = await fetchPendingTransactions(address);

      setConfirmed(conf);
      setPending(pend.reverse());

      setLoading(false);
    })();
  }, [address]);

  return (
    <div className="overflow-y-scroll">
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {pending.map((tx, index) => <TransactionCard key={index} pending={true} tx={tx} />)}
      {confirmed.map((tx, index) => <TransactionCard key={index} pending={false} tx={tx} />)}
    </div>
  );
};

const TransactionCard = ({ pending, tx }: { pending: boolean; tx: Transaction }) => {
  const { address } = useWallet();

  if (!address) return ;

  return (
    <div className="w-full bg-white/15 rounded-xl p-4 mb-2 shadow-sm border flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold flex items-center gap-1">
          <span className="text-lg text-muted-foreground font-medium">{tx.sender === address ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</span>
          <span>{tx.amount}</span>
          <span className="text-sm text-muted-foreground font-medium">BOND</span>
        </span>
        <span className="text-sm text-muted-foreground"><TimeAgo iso={tx.timestamp} /></span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HashDisplay hash={tx.sender} />
          <ArrowRight size={16} className="text-muted-foreground" />
          <HashDisplay hash={tx.recipient} />
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
      {tx.message && (
        <div className="mt-1 text-sm text-muted-foreground italic truncate">
          {tx.message}
        </div>
      )}
    </div>
  );
};

export default UserTransactions;
