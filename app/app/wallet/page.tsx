import ReceiveTransaction from "@/components/transactions/ReceiveTransaction";
import SendTransaction from "@/components/transactions/SendTransaction";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserBalance from "@/components/user/UserBalance";
import UserTransactions from "@/components/user/UserTransactions";
import UserAvatar from "@/components/user/UserAvatar";

const WalletPage = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <UserAvatar />
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base text-muted-foreground">Total Balance</h3>

        <div className="flex gap-2 items-center">
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
        <ReceiveTransaction />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base text-muted-foreground">History</h3>

        <UserTransactions />
      </div>
    </div>
  );
};

export default WalletPage;
