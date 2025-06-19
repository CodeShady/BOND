"use client";

import { fetchUserBalance } from "@/lib/api/fetchUserBalance";
import { getUserAddress } from "@/lib/storage";
import { useEffect, useState } from "react";

const UserBalance = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = await fetchUserBalance(getUserAddress());
      setBalance(response);
      setLoading(false);
    })();
  }, []);
  
  return loading ? "--.--" : balance;
};

export default UserBalance;