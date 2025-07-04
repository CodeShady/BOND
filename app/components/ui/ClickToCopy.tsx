'use client';

import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ClickToCopyProps {
  text: string;
  children: React.ReactNode;
}

export default function ClickToCopy({ text, children }: ClickToCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            onClick={handleCopy}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCopy()}
            className="inline-flex items-center cursor-pointer select-none outline-none focus:ring-2 focus:ring-ring rounded-xl"
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied!' : 'Click to copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
