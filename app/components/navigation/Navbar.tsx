import { Github, Globe2, LogOut, Wallet } from "lucide-react";
import { Button } from "../ui/button";
import UserAvatar from "../user/UserAvatar";
import Link from "next/link";
import { logout } from "@/lib/actions/wallet";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <UserAvatar />

      <div className="flex gap-1 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/wallet">
            <Wallet />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" asChild>
          <Link href="/explore">
            <Globe2 />
          </Link>
        </Button>

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
  );
};

export default Navbar;
