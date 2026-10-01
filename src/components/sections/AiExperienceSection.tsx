import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassAiButton } from '../threeui/GlassAiButton';

export const AiExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const labelY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.05, 0.5], [60, 0]);
  const headOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.1, 0.55], [50, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="ai"
      aria-labelledby="ai-heading"
      className="relative w-full overflow-hidden"
      style={{ background: '#0A0A0A', minHeight: '100svh' }}
    >
      {/* ── Ambient background glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(100,140,220,0.08) 0%, rgba(60,100,200,0.04) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(80,120,255,0.06) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Content layout: top editorial, center button, bottom description ── */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-24">

        {/* ── Section eyebrow ── */}
        <motion.div
          style={{ y: labelY, opacity: labelOpacity }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            08 — AI EXPERIENCE
          </span>
          <div className="divider-orange w-20 hidden sm:block" />
          <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.40)' }}>
            [ GPT 6 SOL ]
          </span>
        </motion.div>

        {/* ── Main headline ── */}
        <motion.div
          style={{ y: headY, opacity: headOpacity }}
          className="text-center mb-6"
        >
          <h2
            id="ai-heading"
            className="font-display leading-[0.90]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              color: '#FAFAF7',
              letterSpacing: '0.02em',
            }}
          >
            THE FUTURE OF
            <br />
            <span style={{ color: '#FF9812' }}>INTELLIGENCE</span>
          </h2>
        </motion.div>

        <motion.p
          style={{ y: subY, opacity: subOpacity }}
          className="text-center max-w-md mb-16 md:mb-20"
        >
          <span style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.875rem',
            lineHeight: '1.7',
            display: 'block',
          }}>
            A glass galaxy orb — where AI meets photonics.
            Hover to magnetize. Click to activate the burst.
          </span>
        </motion.p>

        {/* ── GLASS AI BUTTON — Hero showcase at massive scale ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full flex items-center justify-center"
          style={{ flex: '1 1 auto' }}
        >
          {/* Outer ring glow decoration */}
          <div className="relative">
            {/* Animated ring 1 */}
            <div
              className="absolute -inset-8 rounded-full opacity-20 animate-spin-slow pointer-events-none"
              style={{
                border: '1px solid rgba(140,170,255,0.30)',
                borderTopColor: 'rgba(140,170,255,0.80)',
              }}
            />
            {/* Animated ring 2 */}
            <div
              className="absolute -inset-16 rounded-full opacity-10 pointer-events-none"
              style={{
                animation: 'spin-slow 35s linear infinite reverse',
                border: '1px solid rgba(100,140,255,0.40)',
                borderBottomColor: 'rgba(255,152,18,0.60)',
              }}
            />
            {/* Glow halo */}
            <div
              className="absolute -inset-12 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(100,140,220,0.12) 0%, transparent 70%)',
              }}
            />

            {/* ── THE BUTTON — full original source, large and dominant ── */}
            <GlassAiButton
              style={{
                width: 'clamp(340px, 55vw, 720px)',
                height: 'clamp(120px, 18vw, 240px)',
                borderRadius: '999px',
              }}
            />
          </div>
        </motion.div>

        {/* ── Bottom descriptor cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl mt-16 md:mt-20 grid grid-cols-3 gap-4"
        >
          {[
            { icon: '◎', label: 'Three.js r170', desc: 'Embedded GPU renderer' },
            { icon: '◈', label: 'WebGL 2', desc: 'Deep-space glass shader' },
            { icon: '⬡', label: 'Particle Burst', desc: 'Click activation system' },
          ].map(({ icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="block text-xl mb-2"
                style={{ color: 'rgba(140,170,255,0.60)' }}
              >
                {icon}
              </span>
              <p
                className="text-[11px] font-display tracking-widest mb-0.5"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {label}
              </p>
              <p
                className="text-[10px] font-mono-code"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-[9px] font-mono-code tracking-[0.3em]"
          style={{ color: 'rgba(255,152,18,0.35)' }}
        >
          SCROLL TO CONTINUE
        </motion.p>

      </div>
    </section>
  );
};
