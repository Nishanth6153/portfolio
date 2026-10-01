import React, { useState } from 'react';
import { Cpu, Terminal, Code2, Database, Wrench, Binary, Check } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-ml':       <Cpu      className="w-4 h-4 text-[#FF9812]" />,
  'programming': <Terminal className="w-4 h-4 text-[#6ecf7f]" />,
  'web-backend': <Code2    className="w-4 h-4 text-[#FFB347]" />,
  'databases':   <Database className="w-4 h-4 text-[#6ecf7f]" />,
  'devops-infra':<Wrench   className="w-4 h-4 text-[#FF9812]" />,
  'core-cs':     <Binary   className="w-4 h-4 text-[#86efac]" />,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="skills-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6ecf7f' }} />
            04 — TECHNICAL CAPABILITIES
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-14">
        <ScrollHeading
          id="skills-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>TECHNICAL</span>
          <span className="text-[#FF9812]">COMPETENCIES.</span>
        </ScrollHeading>
        <p className="text-sm font-mono-code text-[#FAFAF7]/50 mt-3 max-w-lg">
          Languages, machine learning runtimes, containerization architectures, and core software engineering fundamentals.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300 cursor-pointer ${
            activeCategory === 'all' ? 'text-black font-bold' : ''
          }`}
          style={activeCategory === 'all' ? {
            background: 'linear-gradient(135deg, #FFB347, #FF9812)',
            boxShadow: '0 4px 18px rgba(255,152,18,0.40)',
          } : {
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,152,18,0.18)',
            color: 'rgba(250,250,247,0.55)',
          }}
        >
          ALL DISCIPLINES
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id ? 'text-black font-bold' : ''
            }`}
            style={activeCategory === cat.id ? {
              background: 'linear-gradient(135deg, #FFB347, #FF9812)',
              boxShadow: '0 4px 18px rgba(255,152,18,0.40)',
            } : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(250,250,247,0.55)',
            }}
          >
            {categoryIcons[cat.id]}
            <span>{cat.title.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cat, i) => (
          <ScrollMaskReveal key={cat.id} borderRadius="24px" delay={i * 0.06}>
            <div
              className="p-6 md:p-7 rounded-3xl h-full flex flex-col justify-between transition-all duration-300 group"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.85) 0%, rgba(12,12,12,0.95) 100%)',
                border: '1px solid rgba(255,152,18,0.14)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    {categoryIcons[cat.id]}
                    <h3 className="font-display text-lg text-white tracking-wide">{cat.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#FF9812]/70">
                    {cat.skills.length} TOOLS
                  </span>
                </div>

                <p className="text-xs text-[#FAFAF7]/50 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl flex items-center justify-between transition-all duration-200"
                      style={{
                        background: skill.highlight ? 'rgba(255,152,18,0.08)' : 'rgba(255,255,255,0.025)',
                        border: skill.highlight ? '1px solid rgba(255,152,18,0.25)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: skill.highlight ? '#FF9812' : '#6ecf7f' }}
                        />
                        <span className="text-xs font-mono-code text-[#FAFAF7]/85 truncate">
                          {skill.name}
                        </span>
                      </div>
                      {skill.tag && (
                        <span
                          className="text-[8px] font-mono-code px-1.5 py-0.5 rounded ml-1 shrink-0"
                          style={{
                            background: 'rgba(255,152,18,0.14)',
                            color: '#FFB347',
                          }}
                        >
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono-code text-[#FAFAF7]/35">
                <span>VERIFIED PRODUCTION PROFICIENCY</span>
                <Check className="w-3.5 h-3.5 text-[#6ecf7f]" />
              </div>
            </div>
          </ScrollMaskReveal>
        ))}
      </div>
    </section>
  );
};
