import ReceiveTransaction from "@/components/transactions/ReceiveTransaction";
import SendTransaction from "@/components/transactions/SendTransaction";
import UserBalance from "@/components/user/UserBalance";
import UserTransactions from "@/components/user/UserTransactions";
import UserAvatar from "@/components/user/UserAvatar";
import { Github, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/wallet";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const WalletPage = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <UserAvatar />

        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/CodeShady/bond" target="_blank">
              <Github />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-8 bg-gradient-to-br from-primary to-primary/15 rounded-3xl">
        <h3 className="text-base text-white/50">Wallet Balance</h3>

        <div className="flex gap-2 items-end justify-between">
          <h1 className="text-5xl font-medium text-white">
            <UserBalance />
          </h1>
          <h2 className="flex items-center gap-1 text-2xl font-medium text-white">
            BOND
          </h2>
        </div>
      
        <div className="flex items-center gap-2 mt-4">
          <SendTransaction />
          <ReceiveTransaction />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-base text-muted-foreground">Transaction History</h3>

        <UserTransactions />
      </div>
    </div>
  );
};

export default WalletPage;
