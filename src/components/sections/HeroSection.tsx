import React, { useRef, Suspense, lazy } from 'react';
import { ArrowDown, ArrowUpRight, FileText, Send, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollHeading } from '../animations/ScrollTypography';

// ── Lazy-load the registered ThreeUI Sylva Living World scene ─────────────────
const SylvaLivingWorldScene = lazy(() =>
  import('@designcodeio/threeui').then((m) => ({ default: m.SylvaLivingWorldScene }))
);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll transforms for smooth 2.5D depth
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, #151813 0%, #0D0E0C 50%, #080908 100%)',
      }}
    >
      {/* ── 1. REGISTERED SYLVA LIVING WORLD 3D ENVIRONMENT ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-auto"
        style={{ opacity: sceneOpacity }}
        aria-hidden="true"
      >
        <Suspense
          fallback={
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: '#0D0E0C' }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-[#FF9812]/40 border-t-transparent animate-spin" />
            </div>
          }
        >
          <SylvaLivingWorldScene
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          />
        </Suspense>

        {/* Floor light pool — warm ambient light anchoring the living world floor */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(70% 45% at 50% 108%, rgba(255,152,18,0.22) 0%, rgba(255,152,18,0.06) 45%, transparent 75%), linear-gradient(180deg, transparent 60%, rgba(13,14,12,0.85) 100%)',
          }}
        />

        {/* Ambient warm orange glow behind Nishanth's portrait */}
        <div
          className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,152,18,0.18) 0%, rgba(232,130,10,0.08) 45%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* ── 2. VERTICAL COLUMN GUIDES (Sylva Living World structural grid) ── */}
      <div className="absolute inset-0 pointer-events-none z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between opacity-30">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── 3. MAIN HERO COMPOSITION (Content + Dominant Foreground Portrait) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 min-h-[100svh] flex flex-col justify-between">
        
        {/* Top spacer for navbar */}
        <div className="h-6 md:h-10" />

        {/* Grid: Left Editorial Typography & CTAs | Right Dominant Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">

          {/* ── LEFT COLUMN: Name, Headline, Intro, and Primary CTA (col-span-7) ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-7 z-30"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            {/* Editorial Sylva-style Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center gap-3"
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono-code tracking-[0.2em]"
                style={{
                  background: 'rgba(24,28,22,0.75)',
                  border: '1px solid rgba(255,152,18,0.30)',
                  backdropFilter: 'blur(16px)',
                  color: '#FFB347',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
                <span>NISHANTH G. // AI &amp; DATA SCIENCE</span>
              </div>

              <span className="hidden sm:inline text-[11px] font-mono-code tracking-widest text-white/40">
                [ NGPIT, TN ]
              </span>
            </motion.div>

            {/* Giant Editorial Headline */}
            <div className="space-y-1">
              <ScrollHeading
                as="h1"
                id="hero-heading"
                className="font-display leading-[0.90] tracking-[0.02em] text-white"
                style={{ fontSize: 'clamp(3.8rem, 8.5vw, 7.8rem)' }}
              >
                CREATE.
                <span className="text-[#FF9812] block">BUILD.</span>
                SOLVE.
              </ScrollHeading>
            </div>

            {/* Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl font-sans max-w-xl leading-relaxed"
              style={{ color: 'rgba(250,250,247,0.78)' }}
            >
              Engineering intelligent systems, on-device edge ML, and high-throughput software architectures from first principles.
            </motion.p>

            {/* ── Refined CTA System (Explore My Work + Contact + Résumé) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* PRIMARY HERO CTA: Explore My Work */}
              <button
                onClick={() => scrollToSection('work')}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display text-sm tracking-widest transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FFB347 0%, #FF9812 50%, #E8820A 100%)',
                  color: '#0D0E0C',
                  boxShadow: '0 8px 30px rgba(255,152,18,0.35), inset 0 1px rgba(255,255,255,0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 12px 40px rgba(255,152,18,0.50), inset 0 1px rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 30px rgba(255,152,18,0.35), inset 0 1px rgba(255,255,255,0.4)';
                }}
              >
                <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                <span className="font-bold">EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* SECONDARY CTA: Contact */}
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-display text-sm tracking-widest transition-all duration-300"
                style={{
                  background: 'rgba(24,28,22,0.70)',
                  border: '1px solid rgba(255,152,18,0.35)',
                  color: '#FAFAF7',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.18)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#FF9812';
                  (e.currentTarget as HTMLElement).style.color = '#FF9812';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(24,28,22,0.70)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.35)';
                  (e.currentTarget as HTMLElement).style.color = '#FAFAF7';
                }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>GET IN TOUCH</span>
              </button>

              {/* TERTIARY CTA: Résumé */}
              <a
                href="/assets/Nishanth-G-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-display text-xs tracking-widest transition-all duration-300 text-white/60 hover:text-white hover:bg-white/10"
              >
                <FileText className="w-3.5 h-3.5 text-[#FF9812]" />
                <span>RÉSUMÉ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Quick Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-8 pt-4 border-t border-white/10"
            >
              {[
                { val: '4+', label: 'PROJECTS' },
                { val: '8.15', label: 'CGPA' },
                { val: 'SIH ’25', label: 'PRESENTER' },
                { val: '100%', label: 'OFFLINE AI' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-display text-white text-xl sm:text-2xl leading-none">{val}</p>
                  <p className="text-[10px] font-mono-code tracking-wider text-[#FF9812]/75 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: DOMINANT FOREGROUND PORTRAIT (col-span-5) ── */}
          <motion.div
            className="lg:col-span-5 relative flex items-end justify-center lg:justify-end z-20 pointer-events-none select-none"
            style={{
              y: portraitY,
              scale: portraitScale,
            }}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Luminous Ambient Halo behind portrait */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full pointer-events-none -z-10"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,152,18,0.28) 0%, rgba(200,90,0,0.12) 50%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />

            {/* Nishanth's Actual Portrait cutout — Prominent, Foregrounded, Unclipped */}
            <div
              className="relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[620px]"
              style={{
                height: 'clamp(480px, 72vh, 800px)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
              }}
            >
              <img
                src="/assets/portrait.png"
                alt="Nishanth G — AI & Data Science Engineer"
                className="w-full h-full object-contain object-bottom"
                style={{
                  filter:
                    'drop-shadow(0 25px 60px rgba(0,0,0,0.85)) drop-shadow(0 0 50px rgba(255,152,18,0.30))',
                }}
                draggable={false}
              />
            </div>

            {/* Floating Live Status Card attached to portrait */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -bottom-2 -left-4 sm:left-4 z-30 pointer-events-auto"
            >
              <div
                className="p-3.5 sm:p-4 rounded-2xl max-w-[240px]"
                style={{
                  background: 'rgba(18,22,18,0.82)',
                  border: '1px solid rgba(255,152,18,0.25)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
                  <span className="text-[10px] font-mono-code tracking-widest text-[#4ade80]">
                    AVAILABLE NOW
                  </span>
                </div>
                <p className="text-xs font-display text-white tracking-wider leading-snug">
                  Internships &amp; Machine Learning Projects
                </p>
                <p className="text-[10px] font-mono-code text-[#FF9812]/80 mt-1">
                  Dr. N.G.P. Institute of Tech
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>{/* /grid */}

        {/* ── 4. SCROLL INDICATOR ── */}
        <motion.div
          className="flex flex-col items-center justify-center gap-2 pt-6 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#FF9812]/60">
            SCROLL INTO THE LIVING WORLD
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#FF9812]" />
          </motion.div>
        </motion.div>

      </div>{/* /container */}
    </section>
  );
};
