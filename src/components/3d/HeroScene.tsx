import React, { useEffect, useRef } from 'react';
import { SceneContainer } from './SceneContainer';
import { SceneContainerProps } from '../../types/portfolio';

export const HeroScene: React.FC<SceneContainerProps> = ({
  className = '',
  interactive = true,
  onSceneReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / width - 0.5) * 40;
      mouseRef.current.targetY = (clientY / height - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Procedural nodes representing an intelligent neural geometric network
    const nodeCount = 38;
    const nodes: { x: number; y: number; z: number; vx: number; vy: number; baseR: number; phase: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.5) * 260,
        z: (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseR: Math.random() * 1.8 + 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let angleY = 0;
    let angleX = 0;

    const render = (time: number) => {
      // Smooth interpolation for mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      angleY += 0.003;
      angleX = Math.sin(time * 0.0005) * 0.15 + (mouseRef.current.y * 0.005);
      const curAngleY = angleY + (mouseRef.current.x * 0.005);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 350;

      // Project 3D nodes to 2D
      const projectedNodes: { px: number; py: number; scale: number; alpha: number; z: number }[] = [];

      nodes.forEach((node) => {
        node.phase += 0.02;
        // Rotation around Y
        const cosY = Math.cos(curAngleY);
        const sinY = Math.sin(curAngleY);
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotation around X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const depth = z2 + 300;
        const scale = fov / Math.max(depth, 50);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.1, Math.min(0.9, (z2 + 150) / 300));

        projectedNodes.push({ px, py, scale, alpha, z: z2 });
      });

      // Draw connecting lines with subtle gray opacity
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.strokeStyle = `rgba(228, 228, 231, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projectedNodes.forEach((p, idx) => {
        const radius = nodes[idx].baseR * p.scale * 0.8;
        ctx.fillStyle = `rgba(244, 244, 245, ${p.alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(radius, 1.2), 0, Math.PI * 2);
        ctx.fill();

        // Subtle outer aura on focal nodes
        if (idx % 6 === 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(radius * 2.5, 4), 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Ambient concentric orbit rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 140, 70, angleX * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 210, 105, -angleX * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    if (onSceneReady) onSceneReady();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, onSceneReady]);

  return (
    <SceneContainer
      title="Hero Neural Topology"
      className={className}
      aspectRatio="aspect-[4/3] md:aspect-square"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />
      {/* Visual metadata overlay */}
      <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-between text-[10px] text-zinc-500 font-mono pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-ping inline-block" />
          <span>NEURAL TOPOLOGY // APPLIED AI</span>
        </span>
        <span>PHASE 1: CANVAS_RT</span>
      </div>
    </SceneContainer>
  );
};
