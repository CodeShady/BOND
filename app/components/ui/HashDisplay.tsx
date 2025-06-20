import React from "react";

interface HashDisplayProps {
  hash: string;
  chars?: number; // Number of chars to show at start and end
  className?: string;
}

const HashDisplay: React.FC<HashDisplayProps> = ({ hash, chars = 4, className = "" }) => {
  if (!hash || hash.length <= chars * 2) {
    return <span className={`font-mono text-sm break-all ${className}`}>{hash}</span>;
  }
  const start = hash.slice(0, chars);
  const end = hash.slice(-chars);

  return (
    <span
      className={`font-mono text-sm px-2.5 py-1 rounded-full bg-border tracking-wider ${className}`}
      title={hash}
    >
      {start}
      <span className="text-muted-foreground">…</span>
      {end}
    </span>
  );
};

export default HashDisplay;