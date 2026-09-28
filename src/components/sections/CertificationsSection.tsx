import React from 'react';
import { ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { ScrollHeading } from '../animations/ScrollTypography';

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="certifications-heading"
    >
      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          07 — PROFESSIONAL VALIDATION
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ INDUSTRY CREDENTIALS ]
        </span>
      </div>

      {/* ── Headline with Masked Reveal ── */}
      <div className="mb-16">
        <ScrollHeading
          as="h2"
          id="certifications-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          VERIFIED
          <span className="text-[#FF9812] block">CREDENTIALS.</span>
        </ScrollHeading>
      </div>

      {/* ── Certifications Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.80) 0%, rgba(16,18,14,0.90) 100%)',
              border: '1px solid rgba(255,152,18,0.15)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(16px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.45)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 20px 45px rgba(0,0,0,0.5), 0 0 30px rgba(255,152,18,0.08)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.15)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.35)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div>
              {/* Issuer + Year Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FF9812]/15 border border-[#FF9812]/25">
                    <ShieldCheck className="w-4 h-4 text-[#FF9812]" />
                  </div>
                  <span className="text-[11px] font-mono-code font-bold tracking-widest text-[#FF9812]">
                    {cert.issuer}
                  </span>
                </div>
                {cert.year && (
                  <span className="text-[10px] font-mono-code text-white/40">
                    {cert.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-4">
                {cert.title}
              </h3>
            </div>

            {/* Validated Skills */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-[9px] font-mono-code tracking-widest text-white/40 mb-2.5">
                VALIDATED SKILLS
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full text-white/60 bg-white/5 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
