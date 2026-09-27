import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ show, message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-900/95 border border-zinc-700 text-zinc-100 text-xs font-mono shadow-2xl backdrop-blur-xl transition-all duration-300 pointer-events-none ${
        show
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <span className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </span>
      <span className="tracking-wide text-zinc-200">{message}</span>
      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
    </div>
  );
};
