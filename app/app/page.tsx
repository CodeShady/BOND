import { Button } from "@/components/ui/button";
import { Key, Plus } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex items-center flex-col gap-6">
        <div className="bg-foreground/25 rounded-full text-5xl p-4">💸</div>
        <h1 className="text-5xl font-medium">$BOND</h1>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button variant="glass" className="pr-4!" asChild>
            <Link href="/create-wallet">
              <Plus /> Create new wallet
            </Link>
          </Button>

          <Button variant="glass" className="pr-4!" asChild>
            <Link href="/existing-wallet">
              <Key /> Use existing wallet
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
