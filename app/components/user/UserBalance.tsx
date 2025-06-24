"use client";

import { fetchUserBalance } from "@/lib/api/fetchUserBalance";
import { useWallet } from "@/lib/hooks/useWallet";
import { useEffect, useState } from "react";

const UserBalance = () => {
  const { address } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!address) return ;
    
    (async () => {
      const response = await fetchUserBalance(address);
      setBalance(response);
      setLoading(false);
    })();
  }, [address]);
  
  if (loading) return <>--.--</>;

  const balanceStr = balance.toFixed(2); // Adjust decimals as needed
  const [intPart, decPart] = balanceStr.split(".");

  return (
    <>
      {intPart}
      {decPart && (
        <span className="text-white/50 text-2xl">.{decPart}</span>
      )}
    </>
  );
};

export default UserBalance;