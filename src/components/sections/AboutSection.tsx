import React from 'react';
import { GraduationCap, MapPin, Cpu, Code, Sparkles, Terminal, Layers, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollHeading, ScrollParagraph } from '../animations/ScrollTypography';
import { RevealOnScroll } from '../animations/RevealOnScroll';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Ambient depth lighting (orange & living ember glows) ── */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,130,10,0.07) 0%, transparent 70%)' }}
      />

      {/* ── Section Eyebrow Header ── */}
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

      {/* ── Editorial Staggered Name & Intro Headline with Scroll-driven Mask Reveals ── */}
      <div className="mb-20 space-y-2">
        <ScrollHeading
          as="h2"
          id="about-heading"
          className="font-display tracking-tight leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.2rem)' }}
        >
          NISHANTH G.
          <span className="text-[#FF9812] block">INTELLIGENCE, ENGINEERED.</span>
        </ScrollHeading>

        <p
          className="text-xs sm:text-sm font-mono-code tracking-widest uppercase mt-4"
          style={{ color: 'rgba(255,152,18,0.70)' }}
        >
          B.Tech in Artificial Intelligence &amp; Data Science &bull; Edge Machine Learning &amp; Resilient Systems
        </p>
      </div>

      {/* ── Main Editorial Grid: Narrative Storytelling + Academic Foundation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* ── LEFT COLUMN: Personal Narrative with Progressive Word Illumination ── */}
        <div className="lg:col-span-7 space-y-10">

          {/* Narrative Chapter 01: Core Pursuit */}
          <div className="space-y-4">
            <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2 text-[#FF9812]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9812]" />
              The Core Pursuit
            </h3>
            <ScrollParagraph
              text="I am Nishanth — an engineer pursuing my B.Tech in Artificial Intelligence & Data Science at Dr. N.G.P. Institute of Technology. I work at the intersection where statistical machine learning leaves the laboratory and becomes resilient, high-speed production software."
              highlightWords={['Nishanth', 'Artificial', 'Intelligence', 'Data', 'Science', 'Dr.', 'N.G.P.', 'production', 'software']}
              className="text-lg md:text-xl text-[#FAFAF7]/90 leading-relaxed font-sans"
            />
          </div>

          {/* Narrative Chapter 02: Systems Exploration */}
          <div className="space-y-4">
            <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2 text-[#FF9812]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9812]" />
              Technical Direction &amp; Systems Exploration
            </h3>
            <ScrollParagraph
              text="Where many treat machine learning as black-box experimentation, I approach it through the lens of deterministic systems engineering. My core explorations center on on-device edge computer vision, quantized deep neural networks (MobileNetV2, TensorFlow Lite), and asynchronous high-throughput backends (FastAPI, Docker, PostgreSQL)."
              highlightWords={['deterministic', 'systems', 'engineering', 'on-device', 'edge', 'computer', 'vision', 'MobileNetV2', 'TensorFlow', 'Lite', 'FastAPI', 'Docker', 'PostgreSQL']}
              className="text-base text-[#FAFAF7]/75 leading-relaxed"
            />
            <p className="text-sm leading-relaxed text-[#FAFAF7]/50 font-sans">
              I prioritize sub-50ms execution latency, deterministic memory envelopes, and fault-tolerant architecture — ensuring models run reliably whether synchronized with distributed databases or operating on edge silicon with zero internet connectivity.
            </p>
          </div>

          {/* Narrative Chapter 03: Tangible Engineering Output */}
          <div className="space-y-4">
            <h3 className="text-xs font-display tracking-widest uppercase flex items-center gap-2 text-[#FF9812]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9812]" />
              Tangible Engineering Output
            </h3>
            <ScrollParagraph
              text="My engineering output spans industrial optimization and edge diagnostics: from building a Smart CNC Production Scheduler that dynamically re-routes factory spindle queues under real-time constraints, to designing Sustatio (presented at Smart India Hackathon 2025 and showcase at UDHAYAM ’26), and creating an entirely offline mobile crop-disease classifier with 90–99% inference confidence."
              highlightWords={['Smart', 'CNC', 'Production', 'Scheduler', 'Sustatio', 'Smart', 'India', 'Hackathon', '2025', 'UDHAYAM', '’26', 'offline', 'crop-disease']}
              className="text-base text-[#FAFAF7]/75 leading-relaxed"
            />
          </div>

          {/* ── Engineering Philosophy Manifesto Block (Sylva Living World Glass Card) ── */}
          <div
            className="relative p-7 md:p-8 rounded-3xl overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.85) 0%, rgba(18,20,16,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.22)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#FF9812]" />
              <span className="text-xs font-display tracking-widest text-[#FF9812]">ENGINEERING PRINCIPLES</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/80 font-sans italic">
              "Great intelligence systems are not defined by parameter count alone. They are defined by determinism, minimal latency, edge autonomy, and the ability to solve physical bottlenecks in human workflows."
            </p>
            <div className="flex items-center gap-4 mt-6 pt-5 border-t border-white/10 text-xs font-mono-code text-white/50">
              <span>NISHANTH G.</span>
              <span>&bull;</span>
              <span>FIRST-PRINCIPLES DEVELOPER</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Academic Foundation & Core Pillars ── */}
        <div className="lg:col-span-5 space-y-6">

          {/* Academic Card */}
          <div
            className="p-7 rounded-3xl relative overflow-hidden"
            style={{
              background: 'rgba(24,28,22,0.75)',
              border: '1px solid rgba(255,152,18,0.20)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FF9812]/15 border border-[#FF9812]/25">
                  <GraduationCap className="w-5 h-5 text-[#FF9812]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]">UNDERGRADUATE EDUCATION</p>
                  <p className="text-sm font-display text-white tracking-wider">Dr. N.G.P. Institute of Tech</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl text-white leading-none">8.15</p>
                <p className="text-[9px] font-mono-code text-[#FF9812]">CGPA</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-white/60">
              <p className="font-medium text-white/80 text-sm">
                B.Tech in Artificial Intelligence &amp; Data Science
              </p>
              <div className="flex items-center gap-2 text-white/40">
                <MapPin className="w-3.5 h-3.5 text-[#FF9812]" />
                <span>Coimbatore, Tamil Nadu, India (2022–Present)</span>
              </div>
            </div>
          </div>

          {/* Three Architectural Pillars */}
          {[
            {
              icon: <Cpu className="w-4 h-4 text-[#FF9812]" />,
              title: 'EDGE & ON-DEVICE INFERENCE',
              desc: 'TFLite quantization, MobileNetV2, sub-50ms local frame classification without cloud dependencies.',
            },
            {
              icon: <Terminal className="w-4 h-4 text-[#FF9812]" />,
              title: 'HIGH-THROUGHPUT SYSTEMS',
              desc: 'FastAPI asynchronous microservices, Docker multi-stage containers, Supabase Realtime persistence.',
            },
            {
              icon: <Layers className="w-4 h-4 text-[#FF9812]" />,
              title: 'PRODUCTION RELIABILITY',
              desc: 'Load testing with k6, time-series telemetry via Prometheus & Grafana, latency budgeting.',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl transition-all duration-300 group"
              style={{
                background: 'rgba(24,28,22,0.55)',
                border: '1px solid rgba(255,152,18,0.12)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.35)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(24,28,22,0.80)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.12)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(24,28,22,0.55)';
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-lg bg-[#FF9812]/10 border border-[#FF9812]/20">{icon}</span>
                <p className="text-xs font-display tracking-widest text-white">{title}</p>
              </div>
              <p className="text-xs leading-relaxed text-white/50">{desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
