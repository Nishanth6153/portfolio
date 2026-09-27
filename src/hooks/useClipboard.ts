import { useState, useCallback } from 'react';

export function useClipboard(timeout = 2500) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-secure or older contexts
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
        return true;
      } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
      }
    },
    [timeout]
  );

  return { hasCopied, copy };
}
