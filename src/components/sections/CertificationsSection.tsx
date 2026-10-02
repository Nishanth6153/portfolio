import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="certifications-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            07 — INDUSTRY ACCREDITATION
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-16">
        <ScrollHeading
          id="certifications-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>VERIFIED</span>
          <span className="text-[#FF9812]">CREDENTIALS.</span>
        </ScrollHeading>
        <p className="text-sm font-mono-code text-[#FAFAF7]/50 mt-3 max-w-lg">
          Accredited industry foundations spanning IBM AI, Microsoft Azure, MongoDB, and NPTEL Cloud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <ScrollMaskReveal key={cert.id} borderRadius="24px" delay={idx * 0.05}>
            <div
              className="h-full p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 group"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.85) 0%, rgba(12,12,12,0.95) 100%)',
                border: '1px solid rgba(255,152,18,0.14)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div>
                {/* Issuer + year */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{
                        background: 'rgba(255,152,18,0.12)',
                        border: '1px solid rgba(255,152,18,0.25)',
                      }}
                    >
                      <ShieldCheck className="w-4 h-4 text-[#FF9812]" />
                    </div>
                    <span className="text-xs font-mono-code font-bold tracking-widest text-[#FF9812]">
                      {cert.issuer}
                    </span>
                  </div>
                  {cert.year && (
                    <span className="text-[10px] font-mono-code text-[#FAFAF7]/40 px-2 py-0.5 rounded-full bg-white/[0.04]">
                      {cert.year}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold tracking-tight mb-4 text-[#FAFAF7] group-hover:text-[#FF9812] transition-colors">
                  {cert.title}
                </h3>
              </div>

              {/* Skills */}
              <div
                className="pt-4 border-t border-white/[0.08]"
              >
                <p className="text-[9px] font-mono-code tracking-widest mb-3 text-[#B8BEC0]/80 uppercase">
                  ACCREDITED COMPETENCIES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono-code px-2.5 py-1 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(250,250,247,0.70)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollMaskReveal>
        ))}
      </div>
    </section>
  );
};
