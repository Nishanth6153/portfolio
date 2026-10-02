import React from 'react';
import { GraduationCap, MapPin, Cpu, Code, Sparkles, Terminal, Layers, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollParagraph, ScrollMaskReveal } from '../animations/ScrollTypography';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Ambient depth lighting ── */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(214,221,226,0.035) 0%, transparent 70%)' }}
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

      {/* ── Exceptional Scroll-Driven Staggered Heading ── */}
      <div className="mb-20">
        <ScrollHeading
          id="about-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', color: '#FAFAF7' }}
        >
          <span>NISHANTH G.</span>
          <span className="text-[#FF9812]">INTELLIGENCE, ENGINEERED.</span>
        </ScrollHeading>

        <p
          className="text-sm font-mono-code tracking-widest mt-4 uppercase text-[#FF9812]/80"
        >
          B.Tech in Artificial Intelligence &amp; Data Science &bull; Systems &amp; Machine Learning
        </p>
      </div>

      {/* ── Main Editorial Grid: Narrative Storytelling + Academic Foundation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* ── LEFT COLUMN: Personal Narrative & Engineering Philosophy ── */}
        <div className="lg:col-span-7 space-y-12">

          {/* Narrative Chapter 01: Who I Am */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9812]" />
              <h3 className="text-xs font-display tracking-widest uppercase text-[#FF9812]">
                The Core Pursuit
              </h3>
            </div>
            <ScrollParagraph
              className="text-lg md:text-xl font-sans"
              style={{ color: 'rgba(250,250,247,0.88)' }}
              highlightWords={['Nishanth', 'Artificial', 'Intelligence', 'Data', 'Science', 'resilient', 'production']}
              highlightColor="#FFB347"
            >
              I am Nishanth — an engineer pursuing my B.Tech in Artificial Intelligence &amp; Data Science at Dr. N.G.P. Institute of Technology. I work at the intersection where statistical machine learning leaves the laboratory and becomes resilient, high-speed production software.
            </ScrollParagraph>
          </div>

          {/* Narrative Chapter 02: What I Explore */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8BEC0]" />
              <h3 className="text-xs font-display tracking-widest uppercase text-[#B8BEC0]">
                Technical Direction &amp; Systems Exploration
              </h3>
            </div>
            <ScrollParagraph
              className="text-base"
              style={{ color: 'rgba(250,250,247,0.65)' }}
              highlightWords={['deterministic', 'on-device', 'computer', 'vision', 'FastAPI', 'Docker', 'latency']}
              highlightColor="#B8BEC0"
            >
              Where many treat machine learning as black-box experimentation, I approach it through the lens of deterministic systems engineering. My core explorations center on on-device edge computer vision, quantized neural networks (MobileNetV2, TensorFlow Lite), and asynchronous high-throughput backends.
            </ScrollParagraph>
            <ScrollParagraph
              className="text-base"
              style={{ color: 'rgba(250,250,247,0.55)' }}
              highlightWords={['sub-50ms', 'latency', 'edge', 'silicon', 'connectivity']}
              highlightColor="#FF9812"
            >
              I prioritize sub-50ms execution latency, deterministic memory envelopes, and fault-tolerant architecture — ensuring models run reliably whether synchronized with distributed databases or operating on edge silicon with zero internet connectivity.
            </ScrollParagraph>
          </div>

          {/* Narrative Chapter 03: What I Build */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9812]" />
              <h3 className="text-xs font-display tracking-widest uppercase text-[#FF9812]">
                Tangible Engineering Output
              </h3>
            </div>
            <ScrollParagraph
              className="text-base"
              style={{ color: 'rgba(250,250,247,0.60)' }}
              highlightWords={['Smart', 'CNC', 'Production', 'Scheduler', 'Sustatio', 'Smart', 'India', 'Hackathon']}
              highlightColor="#FAFAF7"
            >
              My engineering output spans industrial optimization and edge diagnostics: from building a Smart CNC Production Scheduler that dynamically re-routes factory spindle queues under real-time constraints, to designing Sustatio (presented at Smart India Hackathon 2025 and showcase at UDHAYAM ’26), and creating an entirely offline mobile crop-disease classifier.
            </ScrollParagraph>
          </div>

          {/* ── Engineering Philosophy Manifesto Block ── */}
          <ScrollMaskReveal borderRadius="28px">
            <div
              className="relative p-7 md:p-8 rounded-3xl overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, rgba(26,14,0,0.65) 0%, rgba(13,13,13,0.92) 100%)',
                border: '1px solid rgba(255,152,18,0.25)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255,152,18,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Subtle top corner ambient glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.18) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-display tracking-widest text-[#FF9812]">
                    ENGINEERING PHILOSOPHY
                  </span>
                  <Terminal className="w-4 h-4 text-[#FF9812]/70" />
                </div>

                <blockquote
                  className="font-display text-lg md:text-xl leading-snug tracking-wide text-[#FAFAF7]"
                >
                  &ldquo;Probabilistic models require deterministic foundations. True intelligence in software is not merely achieving accuracy in training, but ensuring resilience, sub-millisecond execution, and architectural clarity in production.&rdquo;
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
                      <p className="text-[10px] font-mono-code text-[#FF9812]/70">
                        AI &amp; Data Science Engineer
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#FAFAF7]/40">
                    COIMBATORE, TN
                  </span>
                </div>
              </div>
            </div>
          </ScrollMaskReveal>

        </div>

        {/* ── RIGHT COLUMN: Verified Academic Foundation & Focus Pillars ── */}
        <div className="lg:col-span-5 space-y-8">

          {/* ── Academic Foundation Card ── */}
          <ScrollMaskReveal borderRadius="28px">
            <div
              className="p-7 md:p-8 rounded-3xl space-y-6 relative overflow-hidden"
              style={{
                background: 'rgba(17,17,17,0.85)',
                border: '1px solid rgba(255,152,18,0.22)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 35px rgba(255,152,18,0.06)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FF9812]" />
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
                <h3 className="text-xl md:text-2xl font-display tracking-wide text-white leading-tight">
                  B.Tech — Artificial Intelligence &amp; Data Science
                </h3>
                <p className="text-sm font-semibold text-[#FAFAF7]/80">
                  Dr. N.G.P. Institute of Technology
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#FAFAF7]/45">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9812]" />
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
                  <span className="text-[10px] font-display tracking-widest block mb-0.5 text-[#FF9812]/75">
                    CUMULATIVE STANDING
                  </span>
                  <p className="font-display" style={{ fontSize: '2.8rem', color: '#FF9812', lineHeight: 1 }}>
                    8.15
                    <span className="text-xs font-sans font-normal ml-1 text-[#FAFAF7]/45">/ 10 CGPA</span>
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-display tracking-widest text-[#FAFAF7]"
                    style={{
                      background: 'rgba(255,152,18,0.15)',
                      border: '1px solid rgba(255,152,18,0.35)',
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#FF9812]" />
                    FIRST CLASS
                  </span>
                  <p className="text-[9px] font-mono-code mt-1 text-[#FAFAF7]/40">
                    Autonomous Affiliation
                  </p>
                </div>
              </div>

              {/* Core Theoretical Disciplines */}
              <div className="space-y-3">
                <p className="text-[10px] font-display tracking-widest uppercase text-[#FF9812]/70">
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
                      style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(250,250,247,0.70)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#FF9812]" />
                      <span className="truncate">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollMaskReveal>

          {/* ── Core Competency Pillars ── */}
          <ScrollMaskReveal borderRadius="28px" delay={0.1}>
            <div
              className="p-7 md:p-8 rounded-3xl space-y-4"
              style={{
                background: 'rgba(17,17,17,0.75)',
                border: '1px solid rgba(214,221,226,0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8BEC0]" />
                <p className="text-[11px] font-display tracking-widest uppercase text-[#B8BEC0]">
                  CORE SPECIALIZATION AREAS
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  {
                    icon: <Cpu className="w-4 h-4 text-[#FF9812]" />,
                    title: 'Edge AI & Quantized Inference',
                    desc: 'Optimized MobileNetV2 and TFLite execution on constrained edge devices',
                  },
                  {
                    icon: <Code className="w-4 h-4 text-[#B8BEC0]" />,
                    title: 'Asynchronous Full-Stack Backends',
                    desc: 'Sub-50ms REST APIs built with Python, FastAPI, and Supabase PostgreSQL',
                  },
                  {
                    icon: <Layers className="w-4 h-4 text-[#FFB347]" />,
                    title: 'Production Containerization',
                    desc: 'Multi-stage Dockerized services engineered for resilient continuous deployment',
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-3.5 rounded-2xl transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      {icon}
                      <p className="text-xs font-display tracking-wide text-white">{title}</p>
                    </div>
                    <p className="text-[11px] text-[#FAFAF7]/50 pl-6 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollMaskReveal>

        </div>
      </div>
    </section>
  );
};
