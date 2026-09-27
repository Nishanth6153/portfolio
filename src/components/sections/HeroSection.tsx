import React, { useRef } from 'react';
import { ArrowDown, FileText, ArrowUpRight, Zap, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const panelScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.90]);
  const panelY       = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const portraitY    = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const bgWordY      = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#FF9812' }}
    >
      {/* ── Outer orange background — large PORTFOLIO ghost text ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgWordY }}
      >
        <span
          className="font-display whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(12rem, 28vw, 22rem)',
            color: 'rgba(255,255,255,0.10)',
            userSelect: 'none',
            letterSpacing: '0.05em',
          }}
        >
          PORTFOLIO
        </span>
      </motion.div>

      {/* ── Ambient orange blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,200,80,0.20) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[45vw] h-[45vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,80,0,0.25) 0%, transparent 65%)' }}
        />
        {/* Large circular orange shape behind portrait — like the reference */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,90,0,0.40) 0%, rgba(180,60,0,0.20) 50%, transparent 70%)' }}
        />
      </div>

      {/* ── BRAND MARK above the panel (like Omnic Studio label) ── */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* No outer brand — handled by Navbar */}
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN ROUNDED PANEL  — matches Ref 1 composition exactly
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 w-full mx-4 md:mx-8 lg:mx-16 overflow-visible"
        style={{
          maxWidth: '1120px',
          scale: panelScale,
          y: panelY,
          opacity: panelOpacity,
        }}
      >
        {/* The rounded panel container */}
        <div
          className="relative rounded-[28px] overflow-hidden"
          style={{
            boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.25)',
            minHeight: '68vh',
          }}
        >
          {/* LEFT DARK PANEL */}
          <div
            className="absolute inset-y-0 left-0 w-[62%] z-0"
            style={{
              background: 'linear-gradient(135deg, #0D0D00 0%, #1A0E00 40%, #2D1500 70%, #3D1A00 100%)',
            }}
          >
            {/* Warm gradient overlay mimicking orange light on dark — like the reference */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 70% 40%, rgba(255,100,0,0.28) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* RIGHT WHITE PANEL */}
          <div
            className="absolute inset-y-0 right-0 w-[42%] z-0"
            style={{
              background: 'linear-gradient(160deg, #FAFAF7 0%, #F2EDE8 100%)',
            }}
          />

          {/* Grid layout inside panel */}
          <div className="relative z-10 grid grid-cols-12 min-h-[68vh]">

            {/* ── LEFT COLUMN: Headline + CTA ── */}
            <div className="col-span-5 flex flex-col justify-between p-8 md:p-10 xl:p-12">

              {/* Top: logo mark + role label */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-[11px] font-display tracking-[0.25em] mb-0.5" style={{ color: 'rgba(255,152,18,0.75)' }}>
                  CREATIVE
                </p>
                <p className="text-[11px] font-display tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.55)' }}>
                  AI / DATA SCIENCE ENGINEER
                </p>
              </motion.div>

              {/* Center: Giant headline */}
              <motion.div
                className="my-auto py-6"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <h1
                  id="hero-heading"
                  className="font-display leading-[0.92]"
                  style={{ fontSize: 'clamp(3.4rem, 7.5vw, 6.2rem)', color: '#FFFFFF', letterSpacing: '0.02em' }}
                >
                  CREATE<br />
                  <span style={{ color: '#FF9812' }}>BUILD</span><br />
                  SOLVE.
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="text-sm leading-relaxed mt-5 max-w-[260px]"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                >
                  Intelligent systems, data-driven applications &amp; modern software — engineered from first principles.
                </motion.p>
              </motion.div>

              {/* Bottom: CTAs + stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-5"
              >
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#work"
                    onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 font-display tracking-wider"
                    style={{
                      background: '#FAFAF7',
                      color: '#111111',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FAFAF7'; }}
                  >
                    VIEW WORK
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="/assets/Nishanth-G-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-display tracking-wider"
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.20)',
                      color: '#FFFFFF',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; }}
                  >
                    <FileText className="w-4 h-4" />
                    RÉSUMÉ
                  </a>
                </div>

                {/* Stats row — like "50+ Projects / 20+ Clients" in reference */}
                <div
                  className="flex items-center gap-5 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
                >
                  {[
                    { val: '4+',     label: 'PROJECTS' },
                    { val: '8.15',   label: 'CGPA' },
                    { val: '1+',     label: 'YRS EXP' },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <p className="font-display text-white leading-none" style={{ fontSize: '1.5rem' }}>{val}</p>
                      <p className="text-[10px] font-display mt-0.5 tracking-wider" style={{ color: 'rgba(255,152,18,0.70)' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── CENTER: PORTRAIT (col-span-4, absolute positioned to bleed) ── */}
            {/* placeholder spacer — the portrait is positioned absolute over the panel */}
            <div className="col-span-3" />

            {/* ── RIGHT COLUMN: Availability + info cards ── */}
            <div className="col-span-4 flex flex-col justify-between p-8 md:p-10 xl:p-12">

              {/* Top nav links — like the reference */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-end gap-5"
              >
                {['WORK', 'ABOUT', 'SKILLS', 'CONTACT'].map((label) => (
                  <button
                    key={label}
                    onClick={() => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[11px] font-mono-code tracking-widest transition-colors"
                    style={{ color: '#555555' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#111111'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>

              {/* Middle: Availability headline — "AVAILABLE FOR / Freelance Projects" */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="my-auto py-6"
              >
                <div
                  className="inline-flex items-center gap-1.5 mb-3 text-[11px] font-display tracking-widest"
                  style={{ color: '#CC6600' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
                  AVAILABLE FOR
                </div>
                <h2
                  className="font-display leading-tight mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#111111', lineHeight: 1.1 }}
                >
                  Internships &amp;<br />
                  <span style={{ color: '#FF9812' }}>Collaborations</span>
                </h2>

                {/* Service-style cards — matching ref right side cards */}
                <div className="space-y-2.5">
                  {[
                    { icon: '⚡', title: 'Edge AI & ML', desc: 'On-device inference, TFLite' },
                    { icon: '</>', title: 'Full-Stack Dev',  desc: 'FastAPI, React, Supabase' },
                    { icon: '◎', title: 'Data Engineering', desc: 'Pipelines, analytics, MLOps' },
                  ].map(({ icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group cursor-default"
                      style={{
                        background: 'rgba(255,152,18,0.06)',
                        border: '1px solid rgba(255,152,18,0.12)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.12)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.30)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.06)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.12)';
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                          style={{ background: 'rgba(255,152,18,0.15)', color: '#FF9812' }}
                        >
                          {icon}
                        </span>
                        <div>
                          <p className="text-xs font-display tracking-wider" style={{ color: '#111111' }}>{title}</p>
                          <p className="text-[10px]" style={{ color: '#888888' }}>{desc}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: '#FF9812' }} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom: Testimonial card — like the reference */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(255,152,18,0.08)',
                  border: '1px solid rgba(255,152,18,0.20)',
                }}
              >
                <span className="text-xl leading-none font-display" style={{ color: '#FF9812' }}>"</span>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: '#444444' }}>
                  Building the intersection of <strong style={{ color: '#111' }}>applied machine learning</strong>, edge computing &amp; modern software — where data meets deterministic engineering.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold font-display"
                    style={{ background: 'linear-gradient(135deg, #FFB347, #FF9812)' }}
                  >
                    N
                  </div>
                  <div>
                    <p className="text-[12px] font-display tracking-wider" style={{ color: '#111' }}>Nishanth G</p>
                    <p className="text-[9px]" style={{ color: '#888' }}>NGPIT, 2024–Present</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>{/* /grid */}

        </div>{/* /rounded panel */}

        {/* ══════════════════════════════════════════════════════════════
            PORTRAIT — High-res transparent cutout placed IN FRONT
            Positioned at center seam of dark/white panel split.
            Overlaps the frame in front with warm ambient glow.
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute z-20 pointer-events-none select-none"
          style={{
            left: '33%',
            bottom: '-16px',
            width: 'clamp(300px, 37%, 500px)',
            y: portraitY,
          }}
          initial={{ opacity: 0, y: 70, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Wrapper with fade mask at bottom edge */}
          <div
            style={{
              height: 'clamp(420px, 84vh, 740px)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
            }}
          >
            <img
              src="/assets/portrait.png"
              alt="Nishanth G — AI & Data Science Engineer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center bottom',
                filter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.55)) drop-shadow(0 0 50px rgba(255,152,18,0.28))',
              }}
              draggable={false}
            />
          </div>
        </motion.div>

      </motion.div>{/* /panel wrapper */}

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[9px] font-mono-code tracking-[0.3em]" style={{ color: 'rgba(17,17,17,0.55)' }}>
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: 'rgba(17,17,17,0.55)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};
