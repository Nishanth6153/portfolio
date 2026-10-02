import React from 'react';
import { Trophy, Flag, Award } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="achievements-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            06 — HONORS &amp; RECOGNITION
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-16">
        <ScrollHeading
          id="achievements-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>AWARDS &amp;</span>
          <span className="text-[#FF9812]">MILESTONES.</span>
        </ScrollHeading>
        <p className="text-sm font-mono-code text-[#FAFAF7]/50 mt-3 max-w-lg">
          National hackathon demonstrations, competitive innovation project expos, and ecosystem fellowships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {achievements.map((item, idx) => {
          const isHighlight = item.highlight;
          return (
            <ScrollMaskReveal key={item.id} borderRadius="0px" delay={idx * 0.05}>
              <div
                className="h-full py-7 border-t border-white/10 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon + year + badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="text-[#B8BEC0]"
                    >
                      {item.badge === '1ST PLACE' ? (
                        <Trophy className="w-5 h-5 text-[#FF9812]" />
                      ) : item.badge === 'NATIONAL LEVEL' ? (
                        <Flag className="w-5 h-5 text-[#B8BEC0]" />
                      ) : (
                        <Award className="w-5 h-5 text-[#FF9812]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code text-[#FAFAF7]/40">
                        {item.year}
                      </span>
                      {item.badge && (
                        <span
                          className="text-[9px] font-mono-code font-bold tracking-wider"
                          style={{
                            color: isHighlight ? '#FF9812' : '#B8BEC0',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-mono-code tracking-widest block text-[#FF9812]/80 uppercase">
                      {item.position}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-[#FAFAF7] group-hover:text-[#FF9812] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FAFAF7]/55 font-medium">
                      {item.organization}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-[#FAFAF7]/50">
                    {item.description}
                  </p>
                </div>

              </div>
            </ScrollMaskReveal>
          );
        })}
      </div>
    </section>
  );
};
