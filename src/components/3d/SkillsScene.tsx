import React, { useEffect, useRef } from 'react';
import { SceneContainer } from './SceneContainer';
import { SceneContainerProps } from '../../types/portfolio';

export const SkillsScene: React.FC<SceneContainerProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Matrix particles
    const cols = 8;
    const rows = 6;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          const x = i * spacingX;
          const y = j * spacingY;
          const offset = Math.sin(time + (i * 0.4) + (j * 0.6)) * 4;

          const active = (i + j) % 3 === 0;

          ctx.fillStyle = active ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.15)';
          ctx.beginPath();
          ctx.arc(x, y + offset, active ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fill();

          if (i < cols) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.beginPath();
            ctx.moveTo(x, y + offset);
            ctx.lineTo((i + 1) * spacingX, y + Math.sin(time + ((i + 1) * 0.4) + (j * 0.6)) * 4);
            ctx.stroke();
          }
        }
      }

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
      title="Skills Matrix"
      className={className}
      aspectRatio="aspect-[16/9] md:aspect-[21/9]"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md">
          <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">ENGINEERING TAXONOMY</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">End-to-End System Capabilities & Tooling</p>
        </div>
      </div>
    </SceneContainer>
  );
};
