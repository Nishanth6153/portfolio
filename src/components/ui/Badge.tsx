import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'highlight' | 'accent' | 'mono';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-zinc-900/90 text-zinc-300 border border-zinc-800/80',
    outline: 'bg-transparent text-zinc-400 border border-zinc-800',
    highlight: 'bg-zinc-100 text-zinc-950 font-medium border border-white',
    accent: 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/60',
    mono: 'bg-zinc-950 text-zinc-400 font-mono border border-zinc-800 text-[10px] tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
