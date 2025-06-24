"use client";

import { useWallet } from "@/lib/hooks/useWallet";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { useMemo } from "react";
import Image from "next/image";

const UserAvatar = () => {
  const { address } = useWallet();

  const avatar = useMemo(() => {
    if (!address) return;

    return createAvatar(thumbs, {
      seed: address,
      scale: 80,
      backgroundType: ["solid"],
      backgroundColor: ["3374ff"]
    });
  }, [address]);

  return (
    <div className="rounded-full w-12 h-12 overflow-clip">
      {avatar && <Image src={avatar.toDataUri()} width={64} height={64} alt="Avatar" />}
    </div>
  );
};

export default UserAvatar;
