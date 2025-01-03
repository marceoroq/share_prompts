import { useState } from "react";

export default function useCopy(text) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return [copied, handleCopy];
}
