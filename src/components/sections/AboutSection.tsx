import React from 'react';
import { GraduationCap, MapPin, Cpu, Code, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../animations/RevealOnScroll';

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="about-heading"
    >
      {/* Ambient orange glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,152,18,0.07) 0%, transparent 70%)' }}
      />

      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">02 — PROFILE &amp; EDUCATION</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* ── Left: Editorial bio ── */}
        <div className="lg:col-span-7 space-y-8">
          <RevealOnScroll delay={0.05}>
            <h2
              id="about-heading"
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
            >
              ENGINEERING<br />
              <span style={{ color: '#FF9812' }}>INTELLIGENT</span><br />
              SYSTEMS.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(250,250,247,0.55)' }}>
              I am an <strong style={{ color: '#FF9812' }}>AI &amp; Data Science engineer</strong> focused
              on taking machine learning from experimental notebooks to resilient,
              production-ready software architectures. My engineering approach
              connects low-latency model inference, robust asynchronous backends with FastAPI,
              and type-safe frontends in React.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(250,250,247,0.40)' }}>
              Whether optimizing quantized computer vision networks for on-device execution
              or architecting multi-container production schedulers, I prioritize structural clarity,
              code maintainability, and measurable performance.
            </p>
          </RevealOnScroll>

          {/* Focus cards */}
          <RevealOnScroll delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  num: '01',
                  icon: <Cpu className="w-5 h-5" style={{ color: '#FF9812' }} />,
                  label: 'APPLIED FOCUS',
                  title: 'On-Device Edge Vision',
                  desc: 'MobileNetV2 and TFLite for zero-latency, offline machine intelligence.',
                },
                {
                  num: '02',
                  icon: <Code className="w-5 h-5" style={{ color: '#FF9812' }} />,
                  label: 'ARCHITECTURE',
                  title: 'Modern Full-Stack',
                  desc: 'FastAPI, Supabase, Docker, and React for high-throughput applications.',
                },
              ].map(({ num, icon, label, title, desc }) => (
                <div
                  key={num}
                  className="p-5 rounded-2xl transition-all duration-300 group cursor-default"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,152,18,0.12)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.35)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255,152,18,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.12)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 rounded-lg" style={{ background: 'rgba(255,152,18,0.10)' }}>
                      {icon}
                    </span>
                    <span className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.65)' }}>
                      {num} / {label}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-1.5" style={{ color: '#FAFAF7' }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(250,250,247,0.45)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Methodology tags */}
          <RevealOnScroll delay={0.3}>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Deterministic Algorithms', 'Edge Quantization', 'Microservice Design', 'Continuous Observability'].map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Right: Academic card ── */}
        <div className="lg:col-span-5 space-y-6">
          <RevealOnScroll delay={0.1} direction="left">
            <div
              className="p-7 rounded-3xl space-y-6 relative overflow-hidden"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,152,18,0.18)',
                boxShadow: '0 0 60px rgba(255,152,18,0.06)',
              }}
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.10) 0%, transparent 70%)' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" style={{ color: '#FF9812' }} />
                  <span className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.65)' }}>
                    ACADEMIC FOUNDATION
                  </span>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono-code"
                  style={{
                    background: 'rgba(255,152,18,0.12)',
                    border: '1px solid rgba(255,152,18,0.30)',
                    color: '#FF9812',
                  }}
                >
                  2024 — PRESENT
                </span>
              </div>

              {/* Degree */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight" style={{ color: '#FAFAF7' }}>
                  B.Tech — Artificial Intelligence &amp; Data Science
                </h3>
                <p className="text-sm font-medium" style={{ color: 'rgba(250,250,247,0.65)' }}>
                  Dr. N.G.P. Institute of Technology
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono-code" style={{ color: 'rgba(250,250,247,0.35)' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: '#FF9812' }} />
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              {/* CGPA highlight */}
              <div
                className="py-4 border-y flex items-center justify-between"
                style={{ borderColor: 'rgba(255,152,18,0.12)' }}
              >
                <div>
                  <span className="text-[10px] font-mono-code tracking-widest block mb-1" style={{ color: 'rgba(255,152,18,0.55)' }}>
                    ACADEMIC STANDING
                  </span>
                  <p className="font-display" style={{ fontSize: '2.5rem', color: '#FF9812', lineHeight: 1 }}>
                    8.15
                    <span className="text-sm font-sans font-normal ml-1" style={{ color: 'rgba(250,250,247,0.35)' }}>/ 10 CGPA</span>
                  </p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-xl text-xs font-mono-code"
                  style={{
                    background: 'rgba(255,152,18,0.10)',
                    border: '1px solid rgba(255,152,18,0.25)',
                    color: '#FF9812',
                  }}
                >
                  First Class
                </div>
              </div>

              {/* Core domains */}
              <div>
                <p className="text-[10px] font-mono-code tracking-widest mb-3" style={{ color: 'rgba(255,152,18,0.55)' }}>
                  CORE DOMAINS
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Data Structures', 'Algorithms', 'Machine Learning', 'Database Systems',
                    'Computer Vision', 'Operating Systems'].map((domain) => (
                    <div key={domain} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(250,250,247,0.55)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#FF9812' }} />
                      {domain}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255,152,18,0.05)', border: '1px solid rgba(255,152,18,0.10)' }}
              >
                <p className="text-[10px] font-mono-code tracking-widest mb-2" style={{ color: 'rgba(255,152,18,0.55)' }}>
                  ENGINEERING INTERESTS
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Edge AI', 'MLOps', 'Systems Design', 'Data Pipelines', 'API Architecture'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-[10px] font-mono-code"
                      style={{ background: 'rgba(255,152,18,0.10)', color: '#FF9812' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
