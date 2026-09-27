import React, { useEffect, useRef } from 'react';
import { SceneContainer } from './SceneContainer';
import { SceneContainerProps } from '../../types/portfolio';

interface ProjectSceneExtendedProps extends SceneContainerProps {
  sceneId?: 'cnc' | 'sustatio' | 'plant' | 'perf';
}

export const ProjectScene: React.FC<ProjectSceneExtendedProps> = ({
  sceneId = 'cnc',
  className = '',
}) => {
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

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (sceneId === 'cnc') {
        // CNC G-code toolpath simulation & spindle orbit
        ctx.strokeStyle = 'rgba(244, 244, 245, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < 360; i += 5) {
          const rad = (i * Math.PI) / 180;
          const r = 50 + Math.sin(rad * 4 + tick) * 15;
          const x = cx + Math.cos(rad) * r;
          const y = cy + Math.sin(rad) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Laser cutting head position
        const headAngle = tick * 1.5;
        const hx = cx + Math.cos(headAngle) * (50 + Math.sin(headAngle * 4 + tick) * 15);
        const hy = cy + Math.sin(headAngle) * (50 + Math.sin(headAngle * 4 + tick) * 15);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Crosshairs on tool head
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(hx - 8, hy);
        ctx.lineTo(hx + 8, hy);
        ctx.moveTo(hx, hy - 8);
        ctx.lineTo(hx, hy + 8);
        ctx.stroke();
      } else if (sceneId === 'sustatio') {
        // Circular economy flow loop & node routing
        const loopRadius = 60;
        ctx.strokeStyle = 'rgba(244, 244, 245, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, loopRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 3 Orbiting resource points
        for (let i = 0; i < 3; i++) {
          const orbitAngle = tick + (i * Math.PI * 2) / 3;
          const ox = cx + Math.cos(orbitAngle) * loopRadius;
          const oy = cy + Math.sin(orbitAngle) * loopRadius;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(ox, oy, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.arc(ox, oy, 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner triangular topology
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const orbitAngle = tick + (i * Math.PI * 2) / 3;
          const ox = cx + Math.cos(orbitAngle) * loopRadius;
          const oy = cy + Math.sin(orbitAngle) * loopRadius;
          if (i === 0) ctx.moveTo(ox, oy);
          else ctx.lineTo(ox, oy);
        }
        ctx.closePath();
        ctx.stroke();
      } else if (sceneId === 'plant') {
        // Computer vision leaf contour & inference scanner
        ctx.strokeStyle = 'rgba(244, 244, 245, 0.35)';
        ctx.lineWidth = 1.2;

        // Leaf outline bezier
        ctx.beginPath();
        ctx.moveTo(cx, cy - 65);
        ctx.bezierCurveTo(cx + 60, cy - 40, cx + 55, cy + 30, cx, cy + 65);
        ctx.bezierCurveTo(cx - 55, cy + 30, cx - 60, cy - 40, cx, cy - 65);
        ctx.stroke();

        // Central vein
        ctx.beginPath();
        ctx.moveTo(cx, cy - 65);
        ctx.lineTo(cx, cy + 65);
        ctx.stroke();

        // Scanning line
        const scanY = cy - 60 + ((Math.sin(tick * 1.5) + 1) / 2) * 120;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 50, scanY);
        ctx.lineTo(cx + 50, scanY);
        ctx.stroke();

        // Target bounding box corner markers
        const boxSize = 75;
        const bLeft = cx - boxSize / 2;
        const bTop = cy - boxSize / 2;
        const bRight = cx + boxSize / 2;
        const bBottom = cy + boxSize / 2;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        // Top-left
        ctx.moveTo(bLeft, bTop + 10);
        ctx.lineTo(bLeft, bTop);
        ctx.lineTo(bLeft + 10, bTop);
        // Top-right
        ctx.moveTo(bRight - 10, bTop);
        ctx.lineTo(bRight, bTop);
        ctx.lineTo(bRight, bTop + 10);
        // Bottom-left
        ctx.moveTo(bLeft, bBottom - 10);
        ctx.lineTo(bLeft, bBottom);
        ctx.lineTo(bLeft + 10, bBottom);
        // Bottom-right
        ctx.moveTo(bRight - 10, bBottom);
        ctx.lineTo(bRight, bBottom);
        ctx.lineTo(bRight, bBottom - 10);
        ctx.stroke();
      } else {
        // Performance & Telemetry Waveform / Latency distribution
        ctx.strokeStyle = 'rgba(244, 244, 245, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const progress = x / width;
          const y =
            cy +
            Math.sin(progress * 12 + tick * 2) * 18 +
            Math.cos(progress * 6 - tick) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // p99 threshold marker line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, cy - 25);
        ctx.lineTo(width, cy - 25);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [sceneId]);

  return (
    <SceneContainer
      title={`Project Visual: ${sceneId}`}
      className={className}
      aspectRatio="aspect-[16/10]"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-400">
        SYS_TELEMETRY: {sceneId.toUpperCase()}
      </div>
    </SceneContainer>
  );
};
