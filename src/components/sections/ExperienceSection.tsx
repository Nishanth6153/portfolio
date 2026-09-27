import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';
import { RevealOnScroll } from '../animations/RevealOnScroll';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="experience-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">04 — PROFESSIONAL EXPERIENCE</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="experience-heading"
          className="font-display mb-16"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          INDUSTRY<br />
          <span style={{ color: '#FF9812' }}>EXPERIENCE.</span>
        </h2>
      </RevealOnScroll>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <RevealOnScroll key={exp.id} delay={0.1 + idx * 0.05}>
            <div
              className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,152,18,0.15)',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.06) 0%, transparent 70%)' }}
              />

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 pb-8"
                   style={{ borderBottom: '1px solid rgba(255,152,18,0.10)' }}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" style={{ color: '#FF9812' }} />
                    <span className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.60)' }}>
                      {exp.type}
                    </span>
                  </div>
                  <h3
                    className="font-display"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FAFAF7', lineHeight: 1 }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-base font-semibold" style={{ color: 'rgba(250,250,247,0.65)' }}>
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-2 text-xs font-mono-code" style={{ color: 'rgba(250,250,247,0.40)' }}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#FF9812' }} />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#FF9812' }} />
                    {exp.location}
                  </div>
                </div>
              </div>

              {/* Workflows */}
              <div className="mb-8 space-y-4">
                <p className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.55)' }}>
                  ENGINEERING WORKFLOWS &amp; RESPONSIBILITIES
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(250,250,247,0.55)' }}>
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#FF9812' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div
                className="mb-8 pt-6 space-y-4"
                style={{ borderTop: '1px solid rgba(255,152,18,0.08)' }}
              >
                <p className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.55)' }}>
                  VERIFIED DELIVERABLES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {exp.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl flex items-start gap-2.5 text-xs"
                      style={{
                        background: 'rgba(255,152,18,0.05)',
                        border: '1px solid rgba(255,152,18,0.12)',
                        color: 'rgba(250,250,247,0.55)',
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#FF9812' }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill tags */}
              <div
                className="pt-6 flex flex-wrap gap-2"
                style={{ borderTop: '1px solid rgba(255,152,18,0.08)' }}
              >
                {exp.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};
