import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassAiButton } from '../threeui/GlassAiButton';
import { ScrollHeading, ScrollParagraph } from '../animations/ScrollTypography';
import { Cpu, Sparkles, Orbit, Layers } from 'lucide-react';

export const AiExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="ai"
      aria-labelledby="ai-heading"
      className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* ── Ambient warm floor glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,152,18,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-16">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          06 — EXPERIMENTAL LAB
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.50)' }}>
          [ THREEUI PHOTONICS ]
        </span>
      </div>

      {/* ── Main Content Grid: Description on Left, Interactive Glass Orb on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial: Concept & Engineering Insight */}
        <div className="lg:col-span-6 space-y-6">
          <ScrollHeading
            as="h2"
            id="ai-heading"
            className="font-display leading-[0.92] text-white"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)' }}
          >
            PHOTONICS &amp;
            <span className="text-[#FF9812] block">DISPERSION LAB.</span>
          </ScrollHeading>

          <ScrollParagraph
            text="Exploring advanced WebGL shaders, photonics dispersion, and interactive particle dynamics. This registered ThreeUI component renders a physical glass galaxy orb with magnetic pointer interaction and ripple propagation."
            highlightWords={['WebGL', 'shaders', 'photonics', 'dispersion', 'ThreeUI', 'particle']}
            className="text-base sm:text-lg text-white/70 max-w-lg"
          />

          {/* Technical Specs Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: <Cpu className="w-4 h-4 text-[#FF9812]" />, label: 'Shader Pass', val: 'GLSL Dispersion' },
              { icon: <Orbit className="w-4 h-4 text-[#FF9812]" />, label: 'Particles', val: 'Magnetic Well' },
              { icon: <Layers className="w-4 h-4 text-[#FF9812]" />, label: 'Isolation', val: 'Sandboxed Frame' },
            ].map(({ icon, label, val }) => (
              <div
                key={label}
                className="p-3.5 rounded-2xl"
                style={{
                  background: 'rgba(24,28,22,0.60)',
                  border: '1px solid rgba(255,152,18,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">{icon}</div>
                <p className="text-[10px] font-mono-code text-white/40">{label}</p>
                <p className="text-xs font-display text-white tracking-wider mt-0.5">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Glass AI Button at proper refined proportions */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-center justify-center"
          style={{ y: yPos }}
        >
          <div
            className="relative p-8 sm:p-12 rounded-[28px] w-full flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, rgba(24,28,22,0.85) 0%, rgba(13,14,12,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.20)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Top label inside container */}
            <div className="flex items-center justify-between w-full mb-8 pb-3 border-b border-white/10 text-[10px] font-mono-code text-white/50">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#FF9812]" />
                INTERACTIVE DEMO
              </span>
              <span>CLICK TO BURST</span>
            </div>

            {/* The Glass AI Button at refined proportions (NOT an oversized monstrosity) */}
            <div className="relative my-4">
              <GlassAiButton
                style={{
                  width: 'clamp(280px, 40vw, 360px)',
                  height: '84px',
                  borderRadius: '999px',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
                }}
              />
            </div>

            {/* Helper Caption */}
            <p className="text-[11px] font-mono-code text-white/40 text-center mt-6 tracking-wider">
              Hover to magnetize pointer • Click to trigger photon ripple
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
