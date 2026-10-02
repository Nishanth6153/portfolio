import React, { useState } from 'react';
import { Mail, FileText, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { ScrollHeading, ScrollMaskReveal } from '../animations/ScrollTypography';
import { useClipboard } from '../../hooks/useClipboard';
import { Toast } from '../ui/Toast';

export const ContactSection: React.FC = () => {
  const { hasCopied, copy } = useClipboard();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const emailAddress = 'nishant40y6153@gmail.com';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body    = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => { setSentSuccess(false); setFormData({ name: '', email: '', message: '' }); }, 4000);
  };

  const contacts = [
    { icon: <Mail className="w-4 h-4 text-[#FF9812]" />, label: 'DIRECT EMAIL', href: `mailto:${emailAddress}`, text: emailAddress },
    { icon: <GithubIcon className="w-4 h-4 text-[#B8BEC0]" />, label: 'GITHUB PROFILE', href: 'https://github.com/Nishanth6153', text: 'Nishanth6153' },
    { icon: <LinkedinIcon className="w-4 h-4 text-[#FFB347]" />, label: 'LINKEDIN NETWORK', href: 'https://linkedin.com/in/nishanth-gopalsamy', text: 'nishanth-gopalsamy' },
    { icon: <FileText className="w-4 h-4 text-[#B8BEC0]" />, label: 'CURRICULUM VITAE', href: '/assets/Nishanth-G-Resume.pdf', text: 'Download PDF Résumé' },
  ];

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="contact-heading"
    >
      {/* Living world floor lightpool */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,152,18,0.14) 0%, rgba(214,221,226,0.035) 50%, transparent 70%)',
        }}
      />

      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
            08 — CONNECT &amp; COLLABORATE
          </span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      {/* Exceptional Scroll Heading */}
      <div className="mb-16">
        <ScrollHeading
          id="contact-heading"
          variant="perspective"
          className="font-display tracking-tight leading-[0.90]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7' }}
        >
          <span>LET&apos;S BUILD</span>
          <span className="text-[#FF9812]">SOMETHING.</span>
        </ScrollHeading>
        <p className="text-base text-[#FAFAF7]/60 mt-3 max-w-xl">
          Open to applied AI engineering roles, technical internships, and collaborative software projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ── Left: Direct Channels ── */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollMaskReveal borderRadius="0px">
            <div
              className="py-3 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812] uppercase">
                  DIRECT CHANNELS
                </p>
                <span className="text-[10px] font-mono-code text-[#B8BEC0]">
                  READY FOR DISPATCH
                </span>
              </div>

              {/* Email copy row */}
              <div
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 shrink-0 text-[#FF9812]" />
                  <span className="text-xs font-mono-code truncate select-all text-[#FAFAF7]">
                    {emailAddress}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copy(emailAddress)}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-mono-code shrink-0 transition-all cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: hasCopied ? '#B8BEC0' : '#FF9812',
                  }}
                >
                  {hasCopied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
                </button>
              </div>

              {/* Links grid */}
              <div className="space-y-1">
                {contacts.map(({ icon, label, href, text }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 py-3 border-b border-white/[0.08] transition-all duration-300 group"
                    style={{
                      background: 'transparent',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#FF9812';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '';
                    }}
                    data-cursor="interactive"
                  >
                    <span>{icon}</span>
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                      <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/70 uppercase">{label}</p>
                      <p className="text-xs font-medium truncate text-[#FAFAF7]">{text}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity text-[#FF9812]" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollMaskReveal>
        </div>

        {/* ── Right: Message Form ── */}
        <div className="lg:col-span-7">
          <ScrollMaskReveal borderRadius="0px" delay={0.1}>
            <div
              className="py-3"
            >
              <p className="text-[10px] font-mono-code tracking-widest mb-1 text-[#FF9812] uppercase">
                START A CONVERSATION
              </p>
              <h3 className="text-xl font-bold mb-1 text-[#FAFAF7]">Send a Direct Transmission</h3>
              <p className="text-xs mb-6 text-[#FAFAF7]/50">
                Have an engineering opportunity, internship opening, or project in mind? Reach out directly.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/70">
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-0 py-3 border-b text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'transparent',
                        borderColor: 'rgba(255,255,255,0.18)',
                        color: '#FAFAF7',
                      }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                      onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/70">
                      YOUR EMAIL
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-0 py-3 border-b text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'transparent',
                        borderColor: 'rgba(255,255,255,0.18)',
                        color: '#FAFAF7',
                      }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                      onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/70">
                    MESSAGE / PROJECT BRIEF
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Let's discuss an engineering project, internship, or machine learning architecture..."
                    className="w-full px-0 py-3 border-b text-sm outline-none transition-all duration-200 resize-y"
                    style={{
                      background: 'transparent',
                      borderColor: 'rgba(255,255,255,0.18)',
                      color: '#FAFAF7',
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                    onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  data-magnetic="true"
                  className="btn-orange w-full justify-center py-4 text-sm font-semibold tracking-wider font-display cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>

                {sentSuccess && (
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <Check className="w-4 h-4 text-[#B8BEC0]" />
                    <p className="text-xs font-mono-code text-[#B8BEC0]">
                      Email client triggered. Ready to send!
                    </p>
                  </div>
                )}
              </form>
            </div>
          </ScrollMaskReveal>
        </div>
      </div>

      <Toast show={hasCopied} message={`Email copied: ${emailAddress}`} />
    </section>
  );
};
