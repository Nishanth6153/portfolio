import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { projects } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';
import { ProjectModal } from '../ui/ProjectModal';
import { GlassAiButton } from '../threeui/GlassAiButton';

export const WorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="work-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            03 — PRODUCTION &amp; RESEARCH SYSTEMS
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-16">
        <ScrollHeading
          id="work-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>ENGINEERED</span>
          <span className="text-[#FF9812]">SOLUTIONS.</span>
        </ScrollHeading>
        <p className="text-sm font-mono-code text-[#FAFAF7]/50 mt-3 max-w-lg">
          Autonomous systems, industrial scheduling engines, and edge deep learning architectures built for production reliability.
        </p>
      </div>

      {/* Projects list */}
      <div className="space-y-8">
        {projects.map((project, idx) => (
          <ScrollMaskReveal key={project.id} borderRadius="28px" delay={idx * 0.08}>
            <article
              className="project-card group cursor-pointer transition-all duration-300"
              onClick={() => setSelectedProject(project)}
              aria-labelledby={`project-title-${project.id}`}
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.85) 0%, rgba(13,13,13,0.95) 100%)',
                border: '1px solid rgba(255,152,18,0.18)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              }}
            >
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Left: Project info */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Number + category */}
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono-code text-xs font-bold px-3 py-1 rounded-lg"
                        style={{
                          background: 'rgba(255,152,18,0.12)',
                          border: '1px solid rgba(255,152,18,0.30)',
                          color: '#FF9812',
                        }}
                      >
                        {project.number}
                      </span>
                      <span
                        className="text-[10px] font-mono-code tracking-widest text-[#FAFAF7]/40 uppercase"
                      >
                        {project.category}
                      </span>

                      {project.metrics && project.metrics.length > 0 && (
                        <span
                          className="ml-auto text-[10px] font-mono-code px-2.5 py-1 rounded-full border border-[#FF9812]/20"
                          style={{
                            background: 'rgba(255,152,18,0.06)',
                            color: '#FFB347',
                          }}
                        >
                          {project.metrics[0].label}: {project.metrics[0].value}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3
                        id={`project-title-${project.id}`}
                        className="text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 text-[#FAFAF7] group-hover:text-[#FF9812]"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono-code text-[#FF9812]/80">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-[#FAFAF7]/65">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="skill-tag text-[11px]">{tech}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="btn-orange text-xs py-2 px-5 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        SYSTEM CASE STUDY
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-dark-ghost text-xs py-2 px-4 cursor-pointer"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          CODE REPOSITORY
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Metrics + features panel */}
                  <div className="lg:col-span-5">
                    <div
                      className="p-6 rounded-2xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255,152,18,0.04)',
                        border: '1px solid rgba(255,152,18,0.14)',
                      }}
                    >
                      {/* Glow accent */}
                      <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.12) 0%, transparent 70%)' }}
                      />

                      {/* Metrics */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          {project.metrics.map(({ label, value }) => (
                            <div key={label} className="text-center p-2 rounded-xl bg-white/[0.02]">
                              <p
                                className="font-display text-2xl text-[#FF9812] leading-none"
                              >
                                {value}
                              </p>
                              <p className="text-[9px] font-mono-code mt-1 text-[#FAFAF7]/40">
                                {label.toUpperCase()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="divider-orange mb-5" />

                      {/* Feature list */}
                      <ul className="space-y-2.5">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-[#FAFAF7]/65">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 bg-[#FF9812]"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Expand hint */}
                      <div className="mt-5 flex items-center gap-2 text-[10px] font-mono-code text-[#FF9812]/70">
                        <Maximize2 className="w-3 h-3" />
                        CLICK TO EXPAND FULL ARCHITECTURE &amp; OUTCOMES
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom hover bar */}
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #FF9812, #6ecf7f, transparent)' }}
              />
            </article>
          </ScrollMaskReveal>
        ))}
      </div>

      {/* ── INTERACTIVE APPLIED AI FEATURE SHOWCASE (GlassAiButton Refined Integration) ── */}
      <ScrollMaskReveal borderRadius="28px" delay={0.2}>
        <div
          className="mt-14 p-8 md:p-10 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,18,22,0.85) 0%, rgba(10,12,14,0.95) 100%)',
            border: '1px solid rgba(140,170,255,0.20)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Subtle cosmic glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(100,140,220,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono-code tracking-widest">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>INTERACTIVE AI SHADER EXPERIMENT</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide">
                PHOTONIC NEURAL ORB &bull; THREEUI INTEGRATION
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                An embedded WebGL 2 particle galaxy showcasing real-time GPU shader computation.
                Move your cursor across the glass surface to bend the magnetic field, or click to trigger the photon burst.
              </p>
              <div className="flex flex-wrap gap-4 pt-1 justify-center lg:justify-start text-[10px] font-mono-code text-white/45">
                <span>&bull; WebGL 2 Dispersion</span>
                <span>&bull; Particle Kinetic Mesh</span>
                <span>&bull; Zero-Latency GPU Pipe</span>
              </div>
            </div>

            {/* Elegantly proportioned GlassAiButton */}
            <div className="shrink-0 flex items-center justify-center">
              <div
                className="relative rounded-full p-1"
                style={{
                  boxShadow: '0 0 40px rgba(100,140,240,0.18)',
                }}
              >
                <GlassAiButton
                  style={{
                    width: 'clamp(280px, 32vw, 380px)',
                    height: 'clamp(85px, 9vw, 110px)',
                    borderRadius: '999px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollMaskReveal>

      {/* Case study modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
