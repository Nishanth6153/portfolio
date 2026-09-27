import React, { useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { projects } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ProjectModal } from '../ui/ProjectModal';

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
          <span className="section-badge">03 — SELECTED WORK</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="work-heading"
          className="font-display mb-16"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          ENGINEERED<br />
          <span style={{ color: '#FF9812' }}>SOLUTIONS.</span>
        </h2>
      </RevealOnScroll>

      {/* Projects list */}
      <div className="space-y-6">
        {projects.map((project, idx) => (
          <RevealOnScroll key={project.id} delay={0.1 + idx * 0.05}>
            <article
              className="project-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              aria-labelledby={`project-title-${project.id}`}
            >
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Left: Project info */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Number + category */}
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'rgba(255,152,18,0.10)',
                          border: '1px solid rgba(255,152,18,0.25)',
                          color: '#FF9812',
                        }}
                      >
                        {project.number}
                      </span>
                      <span
                        className="text-[10px] font-mono-code tracking-widest"
                        style={{ color: 'rgba(250,250,247,0.35)' }}
                      >
                        {project.category}
                      </span>

                      {project.metrics && project.metrics.length > 0 && (
                        <span
                          className="ml-auto text-[10px] font-mono-code px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(255,152,18,0.08)',
                            color: 'rgba(255,152,18,0.75)',
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
                        className="text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300"
                        style={{ color: '#FAFAF7' }}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono-code" style={{ color: 'rgba(255,152,18,0.65)' }}>
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,247,0.50)' }}>
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="skill-tag">{tech}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="btn-orange text-xs py-2 px-4"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        CASE STUDY
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-dark-ghost text-xs py-2 px-4"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          CODE
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
                        background: 'rgba(255,152,18,0.05)',
                        border: '1px solid rgba(255,152,18,0.12)',
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
                            <div key={label} className="text-center">
                              <p
                                className="font-display text-2xl"
                                style={{ color: '#FF9812', lineHeight: 1 }}
                              >
                                {value}
                              </p>
                              <p className="text-[9px] font-mono-code mt-1" style={{ color: 'rgba(250,250,247,0.35)' }}>
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
                          <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: 'rgba(250,250,247,0.55)' }}>
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                              style={{ background: '#FF9812' }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Expand hint */}
                      <div className="mt-5 flex items-center gap-2 text-[10px] font-mono-code" style={{ color: 'rgba(255,152,18,0.55)' }}>
                        <Maximize2 className="w-3 h-3" />
                        CLICK TO EXPAND FULL CASE STUDY
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom hover bar */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #FF9812, #FFB347, transparent)' }}
              />
            </article>
          </RevealOnScroll>
        ))}
      </div>

      {/* Case study modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
