"use client";

import { fetchUserBalance } from "@/lib/api/fetchUserBalance";
import { useWallet } from "@/lib/hooks/useWallet";
import { useEffect, useState } from "react";

const UserBalance = () => {
  const { address } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (!address) return ;
      const response = await fetchUserBalance(address);
      setBalance(response);
      setLoading(false);
    })();
  }, []);
  
  return loading ? "--.--" : balance;
};

export default UserBalance;