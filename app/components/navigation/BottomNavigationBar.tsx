"use client";

import { LogOut, Telescope, WalletMinimal } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions/wallet";

export default function BottomNavigationBar() {
  return (
    <nav className="fixed border-t bottom-0 left-0 right-0 z-50 flex py-4 w-full items-center justify-around bg-white shadow-xl dark:bg-gray-900 dark:shadow-t-gray-800">
      <Link
        href="#"
        className="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-gray-900 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
        prefetch={false}
      >
        <WalletMinimal className="h-6 w-6" />
        <span className="text-xs">Wallet</span>
      </Link>

      <Link
        href="#"
        className="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-gray-900 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
        prefetch={false}
      >
        <Telescope className="h-6 w-6" />
        <span className="text-xs">Explore</span>
      </Link>

      <Link
        onClick={logout}
        href="#"
        className="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-gray-900 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
        prefetch={false}
      >
        <LogOut className="h-6 w-6" />
        <span className="text-xs">Logout</span>
      </Link>
    </nav>
  )
}
