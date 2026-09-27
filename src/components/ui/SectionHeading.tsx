import React from 'react';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  tagline,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      <div className={`flex items-center gap-3 mb-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="font-mono text-xs tracking-widest text-zinc-500 font-medium">
          {number}
        </span>
        <span className="h-px w-6 bg-zinc-800" />
        {tagline && (
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {tagline}
          </span>
        )}
      </div>

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-zinc-400 max-w-2xl text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
