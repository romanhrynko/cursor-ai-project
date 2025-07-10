import { useState } from 'react';

export function useCopyToClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  return {
    copiedId,
    handleCopy,
  };
} 