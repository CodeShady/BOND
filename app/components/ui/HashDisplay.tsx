import React from "react";
import ClickToCopy from "./ClickToCopy";

interface HashDisplayProps {
  hash: string;
  chars?: number; // Number of chars to show at start and end
  className?: string;
}

const HashDisplay: React.FC<HashDisplayProps> = ({
  hash,
  chars = 4,
  className = "",
}) => {
  let element;

  if (!hash || hash.length <= chars * 2) {
    element = hash;
  } else {
    const start = hash.slice(0, chars);
    const end = hash.slice(-chars);

    element = (
      <>
        {start}
        <span className="text-muted-foreground">…</span>
        {end}
      </>
    );
  }

  return (
    <ClickToCopy text={hash}>
      <span
        className={`code text-xs px-2.5 py-1 rounded-full bg-accent tracking-wider ${className}`}
        title={hash}
      >
        {element}
      </span>
    </ClickToCopy>
  );
};

export default HashDisplay;
