import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add('has-custom-cursor');
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1, opacity: 0 });
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3.out' });
    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('a, button, [data-cursor="interactive"]'));

    const move = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.to(cursor, { opacity: 1, duration: 0.16, overwrite: 'auto' });
    };
    const hover = (event: PointerEvent) => {
      if (isInteractive(event.target)) {
        gsap.to(cursor, { scale: 3, opacity: 0.55, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
      }
    };
    const leave = (event: PointerEvent) => {
      if (isInteractive(event.target) && !isInteractive(event.relatedTarget)) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
      }
    };
    const hide = () => gsap.to(cursor, { opacity: 0, duration: 0.18, overwrite: 'auto' });

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', hide);
    document.addEventListener('pointerover', hover, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', hide);
      document.removeEventListener('pointerover', hover);
      document.removeEventListener('pointerout', leave);
      gsap.killTweensOf(cursor);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};