import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { activateAmbientSound } from '../audio/ambientAudio';

interface SakuraLoaderProps {
  setHasEntered: React.Dispatch<React.SetStateAction<boolean>>;
}

const petals = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 41) % 100}%`,
  delay: `${((index * 17) % 110) / 10}s`,
  duration: `${10 + ((index * 11) % 90) / 10}s`,
  drift: `${((index * 23) % 150) - 75}px`,
  size: `${4 + (index % 4)}px`,
}));

export const SakuraLoader: React.FC<SakuraLoaderProps> = ({ setHasEntered }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const progress = useRef({ value: 0 });
  const holding = useRef(false);
  const completing = useRef(false);
  const exiting = useRef(false);

  useEffect(() => () => {
    gsap.killTweensOf(progress.current);
    gsap.killTweensOf(rootRef.current);
  }, []);

  const updateRing = () => {
    if (ringRef.current) ringRef.current.style.strokeDashoffset = `${283 * (1 - progress.current.value)}`;
  };

  const release = (activateSound: boolean) => {
    if (!holding.current) return;
    holding.current = false;
    if (completing.current) {
      if (activateSound && !exiting.current) {
        exiting.current = true;
        void activateAmbientSound();
        gsap.timeline({ onComplete: () => setHasEntered(true) }).to(rootRef.current, {
          opacity: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          pointerEvents: 'none',
        });
      }
      return;
    }
    gsap.killTweensOf(progress.current);
    gsap.to(progress.current, { value: 0, duration: 0.22, ease: 'power2.out', onUpdate: updateRing });
  };

  const begin = () => {
    if (holding.current || completing.current) return;
    holding.current = true;
    gsap.killTweensOf(progress.current);
    gsap.to(progress.current, {
      value: 1,
      duration: 1.8,
      ease: 'none',
      onUpdate: updateRing,
      onComplete: () => {
        completing.current = true;
      },
    });
  };

  return (
    <div ref={rootRef} className="sakura-loader" role="dialog" aria-label="Enter portfolio">
      <div className="sakura-river" aria-hidden="true">
        {petals.map((petal, index) => (
          <i
            key={index}
            className="sakura-petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              '--drift': petal.drift,
              '--petal-size': petal.size,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <button
        className="sakura-hold"
        type="button"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          begin();
        }}
        onPointerUp={() => release(true)}
        onPointerCancel={() => release(false)}
        onKeyDown={(event) => {
          if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
            event.preventDefault();
            begin();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === ' ' || event.key === 'Enter') release(true);
        }}
        aria-label="Hold to enter"
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="sakura-ring-track" cx="50" cy="50" r="45" />
          <circle ref={ringRef} className="sakura-ring-progress" cx="50" cy="50" r="45" />
        </svg>
        <span>HOLD TO ENTER</span>
      </button>
      <p className="sakura-caption">NISHANTH G <i /> FATHOMLESS MIDNIGHT</p>
    </div>
  );
};
