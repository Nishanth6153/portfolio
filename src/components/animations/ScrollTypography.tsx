import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// ScrollHeading: Masked line/word reveal coordinated with scroll position
// ─────────────────────────────────────────────────────────────────────────────
interface ScrollHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  id?: string;
}

export const ScrollHeading: React.FC<ScrollHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  style,
  stagger = 0.08,
  delay = 0,
  id,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targets = el.querySelectorAll('.scroll-heading-line');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y: '105%',
          opacity: 0,
          filter: 'blur(8px)',
          rotateX: -10,
        },
        {
          y: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: 0.95,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  // If children is a string or array of strings, we split lines by <br/> or line elements
  return (
    <Component
      ref={containerRef as any}
      id={id}
      className={`overflow-hidden ${className}`}
      style={style}
    >
      {React.Children.map(children, (child, idx) => {
        if (typeof child === 'string') {
          return (
            <span key={idx} className="block overflow-hidden">
              <span className="scroll-heading-line inline-block will-change-transform">
                {child}
              </span>
            </span>
          );
        }
        return (
          <span key={idx} className="block overflow-hidden">
            <span className="scroll-heading-line inline-block will-change-transform">
              {child}
            </span>
          </span>
        );
      })}
    </Component>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ScrollParagraph: Progressive word-by-word luminous illumination on scroll
// ─────────────────────────────────────────────────────────────────────────────
interface ScrollParagraphProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  highlightWords?: string[];
  highlightColor?: string;
}

export const ScrollParagraph: React.FC<ScrollParagraphProps> = ({
  text,
  className = '',
  style,
  highlightWords = [],
  highlightColor = '#FF9812',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const words = el.querySelectorAll('.scroll-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.22,
          filter: 'blur(2.5px)',
          y: 4,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.03,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        // Strip punctuation for matching
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span
            key={i}
            className="scroll-word inline-block mr-[0.28em] will-change-transform transition-colors duration-200"
            style={isHighlight ? { color: highlightColor, fontWeight: 600 } : undefined}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};
