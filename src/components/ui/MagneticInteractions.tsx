import React, { useEffect } from 'react';
import gsap from 'gsap';

export const MagneticInteractions: React.FC = () => {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;
    let active: HTMLElement | null = null;
    let moveX: ((value: number) => void) | null = null;
    let moveY: ((value: number) => void) | null = null;
    const findTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>('[data-magnetic="true"]') : null;
    const reset = (element: HTMLElement) => {
      gsap.killTweensOf(element, 'x,y');
      gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
    };
    const enter = (event: PointerEvent) => {
      const target = findTarget(event.target);
      if (!target || target === active) return;
      if (active) reset(active);
      active = target;
      moveX = gsap.quickTo(target, 'x', { duration: 0.28, ease: 'power3.out' });
      moveY = gsap.quickTo(target, 'y', { duration: 0.28, ease: 'power3.out' });
    };
    const move = (event: PointerEvent) => {
      if (!active || !moveX || !moveY) return;
      const bounds = active.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12);
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.12);
    };
    const leave = (event: PointerEvent) => {
      const target = findTarget(event.target);
      if (target && target === active && findTarget(event.relatedTarget) !== active) {
        reset(active);
        active = null;
        moveX = null;
        moveY = null;
      }
    };
    document.addEventListener('pointerover', enter, { passive: true });
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    return () => {
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      if (active) reset(active);
    };
  }, []);

  return null;
};