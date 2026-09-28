import React from 'react';
import { GraduationCap, MapPin, Cpu, Code, Sparkles, Terminal, Layers, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../animations/RevealOnScroll';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Ambient depth lighting (orange & amber glows) ── */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,130,10,0.08) 0%, transparent 70%)' }}
      />

      {/* ── Section Eyebrow Header ── */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-16">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            02 — IDENTITY &amp; PHILOSOPHY
          </span>
          <div className="divider-orange flex-1" />
          <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
            [ COIMBATORE, TN ]
          </span>
        </div>
      </RevealOnScroll>

      {/* ── Editorial Staggered Name & Intro Headline ── */}
      <div className="mb-20">
        <RevealOnScroll delay={0.05}>
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h2
                id="about-heading"
                className="font-display tracking-tight leading-[0.90]"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', color: '#FAFAF7' }}
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                NISHANTH G.
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                className="font-display tracking-tight leading-[0.92]"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', color: '#FF9812' }}
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                INTELLIGENCE, ENGINEERED.
              </motion.p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p
            className="text-sm font-mono-code tracking-widest mt-4 uppercase"
            style={{ color: 'rgba(255,152,18,0.70)' }}
          >
            B.Tech in Artificial Intelligence &amp; Data Science &bull; Systems &amp; Machine Learning
          </p>
        </RevealOnScroll>
      </div>

      {/* ── Main Editorial Grid: Narrative Storytelling + Academic Foundation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* ── LEFT COLUMN: Personal Narrative & Engineering Philosophy ── */}
        <div className="lg:col-span-7 space-y-10">

          {/* Narrative Chapter 01: Who I Am */}
          <RevealOnScroll delay={0.1}>
            <div className="space-y-4">
              <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2" style={{ color: '#FF9812' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF9812' }} />
                The Core Pursuit
              </h3>
              <p className="text-lg md:text-xl leading-relaxed font-sans" style={{ color: 'rgba(250,250,247,0.85)' }}>
                I am <strong className="text-white font-semibold">Nishanth</strong> — an engineer pursuing my B.Tech in{' '}
                <span className="text-[#FF9812] font-semibold">Artificial Intelligence &amp; Data Science</span> at{' '}
                <strong className="text-white font-semibold">Dr. N.G.P. Institute of Technology</strong>. I work at the intersection where statistical machine learning leaves the laboratory and becomes resilient, high-speed production software.
              </p>
            </div>
          </RevealOnScroll>

          {/* Narrative Chapter 02: What I Explore */}
          <RevealOnScroll delay={0.15}>
            <div className="space-y-4">
              <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2" style={{ color: '#FF9812' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF9812' }} />
                Technical Direction &amp; Systems Exploration
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(250,250,247,0.60)' }}>
                Where many treat machine learning as black-box experimentation, I approach it through the lens of{' '}
                <strong className="text-[#FAFAF7]">deterministic systems engineering</strong>. My core explorations center on{' '}
                <span className="text-[#FFB347]">on-device edge computer vision</span>,{' '}
                <span className="text-[#FFB347]">quantized deep neural networks (MobileNetV2, TensorFlow Lite)</span>, and{' '}
                <span className="text-[#FFB347]">asynchronous high-throughput backends (FastAPI, Docker, PostgreSQL)</span>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(250,250,247,0.50)' }}>
                I prioritize sub-50ms execution latency, deterministic memory envelopes, and fault-tolerant architecture — ensuring models run reliably whether synchronized with distributed databases or operating on edge silicon with zero internet connectivity.
              </p>
            </div>
          </RevealOnScroll>

          {/* Narrative Chapter 03: What I Build */}
          <RevealOnScroll delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2" style={{ color: '#FF9812' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF9812' }} />
                Tangible Engineering Output
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(250,250,247,0.55)' }}>
                My engineering output spans industrial optimization and edge diagnostics: from building a{' '}
                <strong className="text-white">Smart CNC Production Scheduler</strong> that dynamically re-routes factory spindle queues under real-time constraints, to designing{' '}
                <strong className="text-white">Sustatio</strong> (presented at <span className="text-[#FF9812]">Smart India Hackathon 2025</span> and showcase at <span className="text-[#FF9812]">UDHAYAM ’26</span>), and creating an entirely offline mobile crop-disease classifier with 90–99% inference confidence.
              </p>
            </div>
          </RevealOnScroll>

          {/* ── Engineering Philosophy Manifesto Block ── */}
          <RevealOnScroll delay={0.25}>
            <div
              className="relative p-7 md:p-8 rounded-3xl overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, rgba(26,14,0,0.6) 0%, rgba(13,13,13,0.85) 100%)',
                border: '1px solid rgba(255,152,18,0.22)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255,152,18,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Subtle top corner ambient glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.15) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-display tracking-widest" style={{ color: '#FF9812' }}>
                    ENGINEERING PHILOSOPHY
                  </span>
                  <Terminal className="w-4 h-4" style={{ color: 'rgba(255,152,18,0.6)' }} />
                </div>

                <blockquote
                  className="font-display text-lg md:text-xl leading-snug tracking-wide"
                  style={{ color: '#FAFAF7' }}
                >
                  "Probabilistic models require deterministic foundations. True intelligence in software is not merely achieving accuracy in training, but ensuring resilience, sub-millisecond execution, and architectural clarity in production."
                </blockquote>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-display text-xs font-bold text-black"
                      style={{ background: 'linear-gradient(135deg, #FFB347, #FF9812)' }}
                    >
                      N
                    </div>
                    <div>
                      <p className="text-xs font-display tracking-wider text-white">Nishanth G</p>
                      <p className="text-[10px] font-mono-code" style={{ color: 'rgba(255,152,18,0.60)' }}>
                        AI &amp; Data Science Engineer
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code" style={{ color: 'rgba(250,250,247,0.35)' }}>
                    EST. 2024
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* ── RIGHT COLUMN: Verified Academic Foundation & Focus Pillars ── */}
        <div className="lg:col-span-5 space-y-8">

          {/* ── Academic Foundation Card ── */}
          <RevealOnScroll delay={0.15} direction="left">
            <div
              className="p-7 md:p-8 rounded-3xl space-y-6 relative overflow-hidden"
              style={{
                background: 'rgba(17,17,17,0.78)',
                border: '1px solid rgba(255,152,18,0.22)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 35px rgba(255,152,18,0.06)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" style={{ color: '#FF9812' }} />
                  <span className="text-[11px] font-display tracking-widest text-[#FF9812]">
                    ACADEMIC FOUNDATION
                  </span>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-display tracking-widest"
                  style={{
                    background: 'rgba(255,152,18,0.12)',
                    border: '1px solid rgba(255,152,18,0.30)',
                    color: '#FF9812',
                  }}
                >
                  2024 — PRESENT
                </span>
              </div>

              {/* Degree Title & Institution */}
              <div className="space-y-2">
                <h3
                  className="text-xl md:text-2xl font-display tracking-wide text-white leading-tight"
                >
                  B.Tech — Artificial Intelligence &amp; Data Science
                </h3>
                <p className="text-sm font-semibold" style={{ color: 'rgba(250,250,247,0.80)' }}>
                  Dr. N.G.P. Institute of Technology
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono-code" style={{ color: 'rgba(250,250,247,0.40)' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: '#FF9812' }} />
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              {/* CGPA & Academic Standing */}
              <div
                className="py-4 px-5 rounded-2xl flex items-center justify-between"
                style={{
                  background: 'rgba(255,152,18,0.06)',
                  border: '1px solid rgba(255,152,18,0.15)',
                }}
              >
                <div>
                  <span className="text-[10px] font-display tracking-widest block mb-0.5" style={{ color: 'rgba(255,152,18,0.70)' }}>
                    CUMULATIVE STANDING
                  </span>
                  <p className="font-display" style={{ fontSize: '2.8rem', color: '#FF9812', lineHeight: 1 }}>
                    8.15
                    <span className="text-xs font-sans font-normal ml-1" style={{ color: 'rgba(250,250,247,0.45)' }}>/ 10 CGPA</span>
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-display tracking-widest"
                    style={{
                      background: 'rgba(255,152,18,0.15)',
                      border: '1px solid rgba(255,152,18,0.35)',
                      color: '#FAFAF7',
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#FF9812]" />
                    FIRST CLASS
                  </span>
                  <p className="text-[9px] font-mono-code mt-1" style={{ color: 'rgba(250,250,247,0.35)' }}>
                    Autonomous Affiliation
                  </p>
                </div>
              </div>

              {/* Core Theoretical Disciplines */}
              <div className="space-y-3">
                <p className="text-[10px] font-display tracking-widest uppercase" style={{ color: 'rgba(255,152,18,0.65)' }}>
                  THEORETICAL DISCIPLINES
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Data Structures & Algorithms',
                    'Deep Neural Networks',
                    'Computer Vision & CNNs',
                    'Relational Database Systems',
                    'Distributed Microservices',
                    'Discrete Mathematics',
                  ].map((subject) => (
                    <div
                      key={subject}
                      className="flex items-center gap-2 p-2 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(250,250,247,0.65)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#FF9812' }} />
                      <span className="truncate">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── Verified Technical Journey Pillars ── */}
          <RevealOnScroll delay={0.2} direction="left">
            <div className="space-y-3">
              <p className="text-[11px] font-display tracking-widest uppercase px-1" style={{ color: '#FF9812' }}>
                TECHNICAL FOCUS PILLARS
              </p>

              {[
                {
                  id: '01',
                  icon: <Cpu className="w-4 h-4" style={{ color: '#FF9812' }} />,
                  title: 'Edge AI & On-Device Vision',
                  tech: 'MobileNetV2 &bull; TFLite &bull; Quantization',
                  desc: 'Converting compute-heavy deep models into ultra-lightweight inference graphs for sub-second, 100% offline edge execution.',
                },
                {
                  id: '02',
                  icon: <Layers className="w-4 h-4" style={{ color: '#FF9812' }} />,
                  title: 'High-Throughput Backends',
                  tech: 'FastAPI &bull; Docker &bull; Supabase &bull; PostgreSQL',
                  desc: 'Architecting asynchronous REST microservices with real-time change data capture and sub-50ms recalculation thresholds.',
                },
                {
                  id: '03',
                  icon: <Code className="w-4 h-4" style={{ color: '#FF9812' }} />,
                  title: 'Modern Web & Spatial Interfaces',
                  tech: 'React 18 &bull; TypeScript &bull; Three.js &bull; Tailwind',
                  desc: 'Engineering cinematic, type-safe web interfaces backed by deterministic state machines and smooth scroll pipelines.',
                },
              ].map(({ id, icon, title, tech, desc }) => (
                <div
                  key={id}
                  className="p-5 rounded-2xl transition-all duration-300 group cursor-default"
                  style={{
                    background: 'rgba(17,17,17,0.75)',
                    border: '1px solid rgba(255,152,18,0.12)',
                    backdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.35)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.4), 0 0 25px rgba(255,152,18,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.12)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg" style={{ background: 'rgba(255,152,18,0.12)' }}>
                        {icon}
                      </span>
                      <h4 className="text-sm font-display tracking-wider text-white">{title}</h4>
                    </div>
                    <span className="text-[10px] font-mono-code" style={{ color: 'rgba(255,152,18,0.60)' }}>
                      // {id}
                    </span>
                  </div>
                  <p
                    className="text-[10px] font-mono-code mb-2"
                    style={{ color: 'rgba(255,152,18,0.70)' }}
                    dangerouslySetInnerHTML={{ __html: tech }}
                  />
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(250,250,247,0.50)' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* ── Verified Innovation Timeline & Recognitions ── */}
          <RevealOnScroll delay={0.25} direction="left">
            <div
              className="p-5 rounded-2xl space-y-3"
              style={{
                background: 'rgba(255,152,18,0.04)',
                border: '1px solid rgba(255,152,18,0.15)',
              }}
            >
              <div className="flex items-center gap-2 text-[11px] font-display tracking-widest text-[#FF9812]">
                <Award className="w-3.5 h-3.5" />
                <span>VERIFIED TIMELINE &amp; MILESTONES</span>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    year: '2026',
                    title: 'UDHAYAM ’26 Showcase',
                    desc: 'Selected & showcased Sustatio smart circular-economy management platform at national expo.',
                  },
                  {
                    year: '2025',
                    title: 'Smart India Hackathon (SIH 2025)',
                    desc: 'Shortlisted and presented Sustatio sustainability architecture at the nationwide hackathon.',
                  },
                  {
                    year: '2024',
                    title: 'Lysa Solutions Internship',
                    desc: 'Industry Project Intern in Coimbatore focusing on structured agile engineering, optimization, and code remediation.',
                  },
                ].map(({ year, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start pb-2.5 border-b border-white/5 last:border-b-0 last:pb-0">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code shrink-0"
                      style={{ background: 'rgba(255,152,18,0.12)', color: '#FF9812' }}
                    >
                      {year}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-[12px]">{title}</p>
                      <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: 'rgba(250,250,247,0.45)' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};
