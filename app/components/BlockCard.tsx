import { Block, Transaction } from "@/types";
import HashDisplay from "./ui/HashDisplay";
import TimeAgo from "./ui/TimeAgo";
import TransactionCard from "./TransactionCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";

const BlockCard = ({ block }: { block: Block }) => {
  return (
    <Collapsible className="w-full bg-white/15 rounded-md border flex flex-col gap-2">
      <div className="p-4">
        <span className="text-xs text-muted-foreground">
          <TimeAgo iso={block.timestamp} />
        </span>

        <div className="flex justify-between items-center">
          <span className="muted">Block {block.height}</span>

          <div className="flex gap-2 items-center">
            <HashDisplay hash={block.hash} />
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      <CollapsibleContent>
        {block.transactions.map((transactions: Transaction, index: number) => (
          <TransactionCard
            key={index}
            transaction={transactions}
            pending={false}
            className="border-t border-l-0 border-r-0 border-b-0 rounded-none"
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BlockCard;
