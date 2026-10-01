import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ScrollHeading — Masked Line / Word Reveal with Depth & Perspective
// ─────────────────────────────────────────────────────────────────────────────
export interface ScrollHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  id?: string;
  variant?: 'clip' | 'perspective' | 'mask';
}

export const ScrollHeading: React.FC<ScrollHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  style,
  stagger = 0.08,
  delay = 0,
  id,
  variant = 'perspective',
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lines = el.querySelectorAll<HTMLElement>('.heading-line-inner');
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      if (variant === 'clip') {
        gsap.fromTo(
          lines,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 40,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            opacity: 1,
            duration: 1.05,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'bottom 35%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      } else {
        // Perspective reveal with subtle 3D tilt & blur dissipation
        gsap.fromTo(
          lines,
          {
            yPercent: 105,
            rotateX: -14,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'bottom 30%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, variant]);

  // Recursively format children into line wraps
  const renderLines = () => {
    return React.Children.map(children, (child, idx) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return (
          <span key={idx} className="block overflow-hidden pb-0.5">
            <span className="heading-line-inner inline-block will-change-transform transform-gpu">
              {child}
            </span>
          </span>
        );
      }
      return (
        <span key={idx} className="block overflow-hidden pb-0.5">
          <span className="heading-line-inner inline-block will-change-transform transform-gpu">
            {child}
          </span>
        </span>
      );
    });
  };

  return (
    <Component
      ref={containerRef as any}
      id={id}
      className={`relative ${className}`}
      style={{ perspective: '1000px', ...style }}
    >
      {renderLines()}
    </Component>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ScrollParagraph — Progressive Luminous Word Reveal with Scrub
// ─────────────────────────────────────────────────────────────────────────────
export interface ScrollParagraphProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  highlightWords?: string[];
  highlightColor?: string;
  scrubSpeed?: number | boolean;
}

export const ScrollParagraph: React.FC<ScrollParagraphProps> = ({
  text,
  children,
  className = '',
  style,
  highlightWords = [],
  highlightColor = '#FF9812',
  scrubSpeed = 0.7,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const rawText = text || (typeof children === 'string' ? children : '');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const words = el.querySelectorAll<HTMLElement>('.scroll-word-item');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.22,
          filter: 'blur(3px)',
          y: 4,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.035,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: scrubSpeed,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [rawText, scrubSpeed]);

  if (!rawText) {
    return (
      <p ref={containerRef} className={className} style={style}>
        {children}
      </p>
    );
  }

  const words = rawText.split(/\s+/);

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === clean
        );

        return (
          <span
            key={i}
            className="scroll-word-item inline-block mr-[0.28em] will-change-transform transition-colors duration-200"
            style={isHighlight ? { color: highlightColor, fontWeight: 500 } : undefined}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. ScrollMaskReveal — ThreeUI-inspired Organic Curtain Reveal
// ─────────────────────────────────────────────────────────────────────────────
export interface ScrollMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  borderRadius?: string;
}

export const ScrollMaskReveal: React.FC<ScrollMaskRevealProps> = ({
  children,
  className = '',
  style,
  delay = 0,
  borderRadius = '20px',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: `inset(100% 0 0 0 round ${borderRadius})`,
          y: 35,
          opacity: 0,
        },
        {
          clipPath: `inset(0% 0 0 0 round ${borderRadius})`,
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 35%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, borderRadius]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
};
