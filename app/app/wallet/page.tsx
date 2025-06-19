import SendTransaction from "@/components/send-transaction";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserBalance from "@/components/user/UserBalance";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";

const WalletPage = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="bg-accent rounded-full w-10 h-10" />
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base text-muted-foreground">Total Balance</h3>

        <div className="flex gap-4 items-end">
          <h1 className="text-5xl font-medium">
            <UserBalance />
          </h1>
          <h2 className="flex items-center gap-1 text-2xl text-muted-foreground">
            BOND
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SendTransaction />

        <Button variant="glass" className="pr-4!">
          <ArrowDown /> Receive
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base text-muted-foreground">History</h3>

        <div className="border rounded-2xl w-full p-2 flex gap-2">
          <div className="aspect-square h-10 bg-white/15 rounded-full flex items-center justify-center">
            <ArrowDown />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <h4 className="font-medium">c6c8...11c3</h4>
              <h4 className="font-medium">+4.3128</h4>
            </div>
            <h4 className="font-medium text-muted-foreground">
              2025-06-18 26:31.24
            </h4>
            <h4 className="mt-2 font-medium">Here's a gift for you!</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
