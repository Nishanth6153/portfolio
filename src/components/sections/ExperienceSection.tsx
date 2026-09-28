import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';
import { ScrollHeading } from '../animations/ScrollTypography';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="experience-heading"
    >
      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          05 — INDUSTRY TRACK RECORD
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ PROFESSIONAL INTERNSHIP ]
        </span>
      </div>

      {/* ── Headline with Masked Reveal ── */}
      <div className="mb-16">
        <ScrollHeading
          as="h2"
          id="experience-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          INDUSTRY
          <span className="text-[#FF9812] block">EXPERIENCE.</span>
        </ScrollHeading>
      </div>

      {/* ── Experience Cards ── */}
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-8 md:p-12 rounded-3xl relative overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.85) 0%, rgba(16,18,14,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.18)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Ambient amber corner glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,152,18,0.10) 0%, transparent 70%)',
              }}
            />

            {/* Header: Role, Company, Period, Location */}
            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 pb-8 border-b border-white/10"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FF9812]" />
                  <span className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80">
                    {exp.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide">
                  {exp.role}
                </h3>
                <p className="text-base font-semibold text-[#FAFAF7]/80">
                  {exp.company}
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-xs font-mono-code text-white/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#FF9812]" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9812]" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            {/* Workflows & Engineering Responsibilities */}
            <div className="mb-8 space-y-4">
              <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80">
                ENGINEERING WORKFLOWS &amp; RESPONSIBILITIES
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70 font-sans">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-[#FF9812]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables & Demonstrated Skills */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono-code tracking-widest text-white/40 mr-2">
                SKILLS APPLIED:
              </span>
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-mono-code px-3 py-1 rounded-full text-white/70 bg-white/5 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
