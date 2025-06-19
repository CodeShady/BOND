"use client";

import { fetchUserBalance } from "@/lib/api/fetchUserBalance";
import { getUserAddress } from "@/lib/storage";
import { useEffect, useState } from "react";

const UserBalance = () => {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    (async () => {
      const response = await fetchUserBalance(getUserAddress());
      setBalance(response);
    })();
  }, []);
  
  return balance ? balance : "--.--";
};

export default UserBalance;