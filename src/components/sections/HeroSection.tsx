import React, { useRef, useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Sparkles, Send, Zap, Cpu, Database, Globe, Brain } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Track mouse coordinates for interactive 2.5D layered parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 28, // max 14px tilt
        y: (e.clientY / innerHeight - 0.5) * 20, // max 10px tilt
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Coordinated scroll transforms
  const portraitY   = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
  const contentY    = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const contentFade = useTransform(scrollYProgress, [0, 0.65], [1, 0.1]);
  const bgWordY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-name"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #100b04 0%, #161008 45%, #0d0d0d 100%)',
      }}
    >
      {/* ── Background Editorial Watermark: NISHANTH ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ y: bgWordY }}
        aria-hidden="true"
      >
        <span
          className="font-display whitespace-nowrap leading-none tracking-wider"
          style={{
            fontSize: 'clamp(9rem, 23vw, 24rem)',
            color: 'rgba(255,152,18,0.045)',
            userSelect: 'none',
          }}
        >
          NISHANTH
        </span>
      </motion.div>

      {/* ── Subtle dot-grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundSize: '28px 28px',
          backgroundImage: 'radial-gradient(rgba(255,152,18,0.07) 1px, transparent 1px)',
        }}
      />

      {/* ── Warm Living Ambient Floor Pool ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Living world floor lightpool — larger, richer */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(255,152,18,0.22) 0%, rgba(110,207,127,0.07) 55%, transparent 78%)',
          }}
        />
        {/* Warm top right sunspot */}
        <div
          className="absolute -top-24 right-1/4 w-[50vw] h-[50vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,179,71,0.14) 0%, transparent 68%)',
          }}
        />
        {/* Left accent glow — living green */}
        <div
          className="absolute top-1/3 -left-20 w-[35vw] h-[35vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(110,207,127,0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Main Stage Grid Container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[78vh]">

          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN: Editorial Narrative, Headline & CTA System
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center z-10"
            style={{ y: contentY, opacity: contentFade }}
          >
            {/* 1. Eyebrow badge — Sylva Living World identity */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6 w-fit"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,152,18,0.25)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6ecf7f' }} />
              <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#FAFAF7]/90">
                01 — LIVING WORLD
              </span>
              <span className="text-[#FF9812] text-xs">&bull;</span>
              <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#FF9812]">
                AI &amp; DATA SCIENCE
              </span>
            </motion.div>

            {/* 2. Main Name & Role */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="space-y-1 mb-4"
            >
              <h1
                id="hero-name"
                className="font-display tracking-tight leading-[0.88]"
                style={{
                  fontSize: 'clamp(3.8rem, 8.5vw, 7.2rem)',
                  color: '#FAFAF7',
                }}
              >
                NISHANTH G.
              </h1>
              <p
                className="font-display tracking-wide leading-none"
                style={{
                  fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)',
                  color: '#FF9812',
                }}
              >
                INTELLIGENCE, ENGINEERED.
              </p>
            </motion.div>

            {/* Mobile-only prominent portrait centerpiece */}
            <div className="lg:hidden relative flex justify-center my-4 select-none pointer-events-none">
              <div
                className="relative w-[280px] h-[320px] rounded-2xl overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,152,18,0.25) 0%, transparent 70%)',
                  }}
                />
                <img
                  src="/assets/portrait.png"
                  alt="Nishanth G"
                  className="w-full h-full object-contain object-bottom drop-shadow-xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* 3. Engineering introduction */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-8"
              style={{ color: 'rgba(250,250,247,0.75)' }}
            >
              Engineering intelligent systems, edge computer vision models, and resilient full-stack applications.
              Merging the organic living depth of nature with deterministic mathematical software.
            </motion.p>

            {/* 4. PRIMARY & SECONDARY CTA SYSTEM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              {/* PRIMARY HERO CTA: Explore My Work */}
              <button
                type="button"
                id="hero-cta-explore"
                onClick={() => scrollToSection('work')}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-display text-sm tracking-widest font-semibold transition-all duration-300 shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFB347 0%, #FF9812 60%, #E8820A 100%)',
                  color: '#0D0D0D',
                  boxShadow: '0 8px 30px rgba(255,152,18,0.35)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 38px rgba(255,152,18,0.50)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(255,152,18,0.35)';
                }}
              >
                <span>EXPLORE MY WORK</span>
                <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:translate-y-[-1px] transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                </span>
              </button>

              {/* SECONDARY CTA: Contact */}
              <button
                type="button"
                id="hero-cta-contact"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-display text-sm tracking-widest transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#FAFAF7',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.50)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
                }}
              >
                <Send className="w-4 h-4 text-[#FF9812]" />
                <span>LET&apos;S TALK</span>
              </button>

              {/* Résumé PDF Download */}
              <a
                href="/assets/Nishanth-G-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full font-display text-sm tracking-widest transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,152,18,0.25)',
                  color: '#FFB347',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.10)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#FF9812';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.25)';
                }}
              >
                <FileText className="w-4 h-4" />
                <span>RÉSUMÉ</span>
              </a>
            </motion.div>

            {/* 5. Key Metrics / Credential Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg"
            >
              {[
                { val: '4+', label: 'CORE SYSTEMS', sub: 'Production projects' },
                { val: '8.15', label: 'ACADEMIC CGPA', sub: 'Dr. N.G.P. Tech' },
                { val: 'SIH’25', label: 'NATIONAL FORUM', sub: 'Sustainability' },
              ].map(({ val, label, sub }) => (
                <div key={label}>
                  <p className="font-display text-2xl sm:text-3xl text-white leading-none">{val}</p>
                  <p className="text-[10px] font-mono-code text-[#FF9812] tracking-wider mt-1">{label}</p>
                  <p className="text-[9px] text-white/40 font-mono-code">{sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: SUBSTANTIALLY LARGER 2.5D FOREGROUND PORTRAIT
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden lg:flex lg:col-span-6 xl:col-span-5 relative items-end justify-center z-20 pointer-events-none select-none"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.94, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Ambient Backing Glow behind Portrait */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,152,18,0.22) 0%, rgba(110,207,127,0.08) 45%, transparent 70%)',
              }}
            />

            {/* 2.5D Layered Parallax Wrapper */}
            <div
              className="relative w-full flex items-end justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
              }}
            >
              {/* Portrait Container — Substantially enlarged, dominant, unclipped */}
              <div
                className="relative overflow-visible"
                style={{
                  width: 'clamp(360px, 46vw, 640px)',
                  height: 'clamp(480px, 78vh, 820px)',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
                }}
              >
                <img
                  src="/assets/portrait.png"
                  alt="Nishanth G — Artificial Intelligence & Data Science Engineer"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.65)) contrast(1.04) brightness(1.02)',
                  }}
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Floating Status Pill — anchored next to portrait */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="absolute bottom-10 -right-2 sm:right-4 z-30 pointer-events-auto hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl"
                style={{
                  background: 'rgba(15,15,15,0.85)',
                  border: '1px solid rgba(255,152,18,0.30)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#6ecf7f] animate-ping" />
                <div>
                  <p className="text-[10px] font-mono-code text-white/90 font-medium">AVAILABLE FOR INTERNSHIPS</p>
                  <p className="text-[8px] font-mono-code text-[#FF9812]">Applied AI &amp; Software Eng</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#FAFAF7]/50">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-[#FF9812]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* ── Technology Ticker Marquee ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t" style={{ borderColor: 'rgba(255,152,18,0.10)' }}>
        <div className="flex animate-marquee whitespace-nowrap py-2.5" style={{ width: 'max-content' }}>
          {[
            { icon: <Cpu className="w-3 h-3" />, label: 'EDGE AI' },
            { icon: <Brain className="w-3 h-3" />, label: 'MACHINE LEARNING' },
            { icon: <Database className="w-3 h-3" />, label: 'PYTHON / FASTAPI' },
            { icon: <Globe className="w-3 h-3" />, label: 'REACT / TYPESCRIPT' },
            { icon: <Zap className="w-3 h-3" />, label: 'TENSORFLOW LITE' },
            { icon: <Cpu className="w-3 h-3" />, label: 'COMPUTER VISION' },
            { icon: <Database className="w-3 h-3" />, label: 'SUPABASE / DOCKER' },
            { icon: <Sparkles className="w-3 h-3" />, label: 'MOBILENETV2' },
            { icon: <Brain className="w-3 h-3" />, label: 'NLP / LLM' },
            { icon: <Globe className="w-3 h-3" />, label: 'THREE.JS / WEBGL' },
            { icon: <Zap className="w-3 h-3" />, label: 'SMART INDIA HACKATHON' },
            // Duplicate for seamless loop
            { icon: <Cpu className="w-3 h-3" />, label: 'EDGE AI' },
            { icon: <Brain className="w-3 h-3" />, label: 'MACHINE LEARNING' },
            { icon: <Database className="w-3 h-3" />, label: 'PYTHON / FASTAPI' },
            { icon: <Globe className="w-3 h-3" />, label: 'REACT / TYPESCRIPT' },
            { icon: <Zap className="w-3 h-3" />, label: 'TENSORFLOW LITE' },
            { icon: <Cpu className="w-3 h-3" />, label: 'COMPUTER VISION' },
            { icon: <Database className="w-3 h-3" />, label: 'SUPABASE / DOCKER' },
            { icon: <Sparkles className="w-3 h-3" />, label: 'MOBILENETV2' },
            { icon: <Brain className="w-3 h-3" />, label: 'NLP / LLM' },
            { icon: <Globe className="w-3 h-3" />, label: 'THREE.JS / WEBGL' },
            { icon: <Zap className="w-3 h-3" />, label: 'SMART INDIA HACKATHON' },
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-6 text-[9px] font-mono-code tracking-[0.22em]"
              style={{ color: 'rgba(255,152,18,0.45)' }}
            >
              <span style={{ color: 'rgba(110,207,127,0.55)' }}>{item.icon}</span>
              {item.label}
              <span className="w-1 h-1 rounded-full bg-[#FF9812]/25 ml-4" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
