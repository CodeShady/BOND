"use client";

import { fetchAllBlocks } from "@/lib/api/fetchTransactions";
import { ArrowDown, ArrowRight, ArrowUp, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import HashDisplay from "../ui/HashDisplay";
import TimeAgo from "../ui/TimeAgo";
import { useWallet } from "@/lib/hooks/useWallet";
import { Transaction } from "@/types";

const AllBlocks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Transaction[]>([]);

  useEffect(() => {
    (async() => {
      const blocks = await fetchAllBlocks();
      setBlocks(blocks.reverse());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="overflow-y-scroll">
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {blocks.map((block, index) => <BlockCard key={index} block={block} />)}
    </div>
  );
};

const BlockCard = ({ block }: { block: any }) => {
  return (
    <div className="w-full bg-white/15 rounded-xl p-4 mb-2 shadow-sm border flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold flex items-center gap-1">
          <span className="text-lg text-muted-foreground font-medium">{tx.sender === address ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</span>
          <span>{block.height}</span>
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
          &ldquo;{tx.message}&rdquo;
        </div>
      )}
    </div>
  );
};

export default AllBlocks;
