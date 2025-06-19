"use client";

import { useWallet } from "@/lib/hooks/useWallet";
import { createAvatar } from "@dicebear/core";
import { notionistsNeutral, thumbs } from "@dicebear/collection";
import { useMemo } from "react";
import Image from "next/image";

const UserAvatar = () => {
  const { address } = useWallet();

  if (!address) return;

  const avatar = useMemo(() => {
    return createAvatar(thumbs, {
      seed: address,
      scale: 80,
      backgroundType: ["gradientLinear"]
    });
  }, []);

  return (
    <div className="rounded-full w-10 h-10 overflow-clip">
      <Image src={avatar.toDataUri()} width={64} height={64} alt="Avatar" />
    </div>
  );
};

export default UserAvatar;
