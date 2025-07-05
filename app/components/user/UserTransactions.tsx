"use client";

import { fetchConfirmedTransactions, fetchPendingTransactions } from "@/lib/api/fetchTransactions";
import { useEffect, useState } from "react";
import { useWallet } from "@/lib/hooks/useWallet";
import { Transaction } from "@/types";
import TransactionCard from "../TransactionCard";

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
    <div className="overflow-y-scroll space-y-2">
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {pending.map((tx, index) => <TransactionCard key={index} pending={true} transaction={tx} transactionDirection={tx.sender === address ? "inbound" : "outbound"} />)}
      {confirmed.map((tx, index) => <TransactionCard key={index} pending={false} transaction={tx} transactionDirection={tx.sender === address ? "inbound" : "outbound"} />)}
    </div>
  );
};

export default UserTransactions;
