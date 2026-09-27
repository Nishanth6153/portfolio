import React from 'react';
import { SceneContainerProps } from '../../types/portfolio';

interface ExtendedSceneContainerProps extends SceneContainerProps {
  children?: React.ReactNode;
  aspectRatio?: string;
  title?: string;
}

/**
 * SceneContainer: Pluggable wrapper designed for Phase 2 Three.js / R3F / Spline integration.
 * Ensures the website UI remains entirely decoupled from the underlying 3D implementation.
 */
export const SceneContainer: React.FC<ExtendedSceneContainerProps> = ({
  className = '',
  children,
  aspectRatio = 'aspect-square md:aspect-[4/3]',
  title = 'Interactive Visualization',
}) => {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-background-surface/80 border border-border-subtle group transition-all duration-500 hover:border-border-highlight/40 ${className}`}
      role="region"
      aria-label={title}
    >
      {/* Corner Apple-style precision crosshairs */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-600 select-none z-10 pointer-events-none tracking-wider">
        + 0.00, 0.00
      </div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-600 select-none z-10 pointer-events-none tracking-wider">
        ENGINEERED.AI
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-700 select-none z-10 pointer-events-none">
        [3D_READY_CONTAINER]
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-600 select-none z-10 pointer-events-none">
        60 FPS
      </div>

      {/* Render current phase placeholder / procedural canvas */}
      {children}
    </div>
  );
};
