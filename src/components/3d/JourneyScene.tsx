import React, { useEffect, useRef } from 'react';
import { SceneContainer } from './SceneContainer';
import { SceneContainerProps } from '../../types/portfolio';

export const JourneyScene: React.FC<SceneContainerProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let progress = 0;

    const render = () => {
      progress += 0.004;
      ctx.clearRect(0, 0, width, height);

      const cy = height / 2;

      // Draw horizontal baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, cy);
      ctx.lineTo(width - 30, cy);
      ctx.stroke();

      // Nodes along path
      const stops = [0.15, 0.38, 0.62, 0.85];
      stops.forEach((stop, i) => {
        const x = 30 + (width - 60) * stop;
        const pulse = Math.sin(progress * 4 + i) * 2;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(x, cy, 8 + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Traveling pulse particle
      const t = (progress % 1);
      const currentX = 30 + (width - 60) * t;
      ctx.fillStyle = 'rgba(244, 244, 245, 0.9)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(currentX, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SceneContainer
      title="Milestone Journey Trajectory"
      className={className}
      aspectRatio="aspect-[21/9]"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-2 left-4 text-[10px] font-mono text-zinc-500">
        EVOLUTION // 2024 — PRESENT
      </div>
    </SceneContainer>
  );
};
