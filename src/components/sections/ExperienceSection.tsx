import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';

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
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            05 — PROFESSIONAL EXPERIENCE
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-16">
        <ScrollHeading
          id="experience-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>INDUSTRY</span>
          <span className="text-[#FF9812]">EXPERIENCE.</span>
        </ScrollHeading>
        <p className="text-sm font-mono-code text-[#FAFAF7]/50 mt-3 max-w-lg">
          Agile workflows, code optimization, systematic defect analysis, and cross-functional project execution.
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <ScrollMaskReveal key={exp.id} borderRadius="28px" delay={idx * 0.08}>
            <div
              className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.85) 0%, rgba(12,12,12,0.95) 100%)',
                border: '1px solid rgba(255,152,18,0.18)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,152,18,0.10) 0%, transparent 70%)' }}
              />

              {/* Header */}
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 pb-8"
                style={{ borderBottom: '1px solid rgba(255,152,18,0.10)' }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF9812]" />
                    <span className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80 uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <h3
                    className="font-display"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FAFAF7', lineHeight: 1 }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-base font-semibold text-[#FAFAF7]/75">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-2 text-xs font-mono-code text-[#FAFAF7]/45">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF9812]" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF9812]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Workflows */}
              <div className="mb-8 space-y-4">
                <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/70 uppercase">
                  ENGINEERING WORKFLOWS &amp; RESPONSIBILITIES
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#FAFAF7]/65">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-[#FF9812]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div
                className="mb-8 pt-6 space-y-4"
                style={{ borderTop: '1px solid rgba(255,152,18,0.08)' }}
              >
                <p className="text-[10px] font-mono-code tracking-widest text-[#6ecf7f]/80 uppercase">
                  KEY DELIVERABLES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {exp.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl flex items-start gap-2 text-xs text-[#FAFAF7]/70"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#6ecf7f]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills applied */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="skill-tag text-[11px]">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollMaskReveal>
        ))}
      </div>
    </section>
  );
};
