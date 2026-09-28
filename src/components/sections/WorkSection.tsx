import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, ExternalLink, Code2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { projects } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { ScrollHeading } from '../animations/ScrollTypography';
import { ProjectModal } from '../ui/ProjectModal';

export const WorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="work-heading"
    >
      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          03 — SELECTED WORK
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ PRODUCTION SYSTEMS ]
        </span>
      </div>

      {/* ── Main Headline with Scroll-driven Masked Line Reveals ── */}
      <div className="mb-16">
        <ScrollHeading
          as="h2"
          id="work-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          ENGINEERED
          <span className="text-[#FF9812] block">SOLUTIONS.</span>
        </ScrollHeading>
        <p className="text-sm sm:text-base text-white/50 max-w-xl mt-4 font-sans">
          Production systems, edge AI architectures, and full-stack software solving tangible physical and algorithmic problems.
        </p>
      </div>

      {/* ── Projects List with Sylva Living World Cards ── */}
      <div className="space-y-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.80) 0%, rgba(16,18,14,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.18)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.45)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,152,18,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.18)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Number, Title, Subtitle, Description */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Number & Category */}
                <div className="flex items-center gap-3">
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
                  <span className="text-[10px] font-mono-code tracking-widest text-white/40">
                    {project.category}
                  </span>
                  {project.metrics && project.metrics.length > 0 && (
                    <span
                      className="ml-auto text-[10px] font-mono-code px-2.5 py-1 rounded-md"
                      style={{
                        background: 'rgba(255,152,18,0.10)',
                        border: '1px solid rgba(255,152,18,0.20)',
                        color: '#FFB347',
                      }}
                    >
                      {project.metrics[0].label}: {project.metrics[0].value}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display tracking-wide text-white group-hover:text-[#FFB347] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-[#FF9812]/80 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/70 font-sans">
                  {project.description}
                </p>

                {/* Technologies Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono-code px-3 py-1 rounded-full text-white/60"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.10)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Action Buttons & Key Metrics */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 pt-2 lg:pt-0">
                
                {/* Metric pill cards */}
                {project.metrics && project.metrics.length > 1 && (
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-black/30 border border-white/5">
                    {project.metrics.slice(1).map((m, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] font-mono-code text-white/40">{m.label}</p>
                        <p className="text-xs font-display text-white tracking-wider mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive CTA buttons */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-display text-xs tracking-widest transition-all duration-300 w-full"
                    style={{
                      background: 'rgba(255,152,18,0.15)',
                      border: '1px solid rgba(255,152,18,0.35)',
                      color: '#FF9812',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#FF9812';
                      (e.currentTarget as HTMLElement).style.color = '#0D0E0C';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.15)';
                      (e.currentTarget as HTMLElement).style.color = '#FF9812';
                    }}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>VIEW CASE STUDY</span>
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-display text-xs tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>REPOSITORY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
