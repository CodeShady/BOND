"use client";

import Navbar from "@/components/navigation/Navbar";
import BlockCard from "@/components/BlockCard";
import { useEffect, useState } from "react";
import { Block } from "@/types";
import { fetchAllBlocks } from "@/lib/api/fetchTransactions";

const ExplorePage = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    (async() => {
      const res = await fetchAllBlocks();
      setBlocks(res);
    })();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      <Navbar />

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-base text-muted-foreground">Explore The Blockchain</h3>

        {blocks.map((block: Block, index: number) => <BlockCard key={index} block={block} />)}
      </div>
    </div>
  );
};

export default ExplorePage;
