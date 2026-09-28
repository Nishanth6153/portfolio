import React, { useState } from 'react';
import { Mail, FileText, ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ScrollHeading } from '../animations/ScrollTypography';
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
    { icon: <Mail className="w-4 h-4" />, label: 'EMAIL', href: `mailto:${emailAddress}`, text: emailAddress },
    { icon: <GithubIcon className="w-4 h-4" />, label: 'GITHUB', href: 'https://github.com/Nishanth6153', text: 'Nishanth6153' },
    { icon: <LinkedinIcon className="w-4 h-4" />, label: 'LINKEDIN', href: 'https://linkedin.com/in/nishanth-gopalsamy', text: 'nishanth-gopalsamy' },
    { icon: <FileText className="w-4 h-4" />, label: 'RÉSUMÉ', href: '/assets/Nishanth-G-Resume.pdf', text: 'Download PDF' },
  ];

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="contact-heading"
    >
      {/* Warm floor pool glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,152,18,0.12) 0%, transparent 70%)',
        }}
      />

      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          08 — DIRECT CONTACT
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ REACH OUT ]
        </span>
      </div>

      {/* ── Headline with Masked Reveal ── */}
      <div className="mb-16">
        <ScrollHeading
          as="h2"
          id="contact-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          LET&apos;S BUILD
          <span className="text-[#FF9812] block">SOMETHING.</span>
        </ScrollHeading>
        <p className="text-base text-white/50 max-w-xl mt-4 font-sans">
          Open to applied AI engineering roles, technical internships, and collaborative software projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ── Left Column: Direct Channels Card ── */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="p-7 sm:p-8 rounded-3xl space-y-5"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.85) 0%, rgba(16,18,14,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.18)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80">
              DIRECT COMMUNICATION
            </p>

            {/* Email Copy Row */}
            <div
              className="flex items-center justify-between gap-3 p-4 rounded-2xl"
              style={{
                background: 'rgba(255,152,18,0.06)',
                border: '1px solid rgba(255,152,18,0.15)',
              }}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-4 h-4 shrink-0 text-[#FF9812]" />
                <span className="text-xs font-mono-code truncate select-all text-white">
                  {emailAddress}
                </span>
              </div>
              <button
                onClick={() => copy(emailAddress)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono-code shrink-0 transition-all font-bold"
                style={{
                  background: hasCopied ? 'rgba(74,222,128,0.20)' : 'rgba(255,152,18,0.15)',
                  border: hasCopied ? '1px solid rgba(74,222,128,0.40)' : '1px solid rgba(255,152,18,0.30)',
                  color: hasCopied ? '#4ade80' : '#FF9812',
                }}
              >
                {hasCopied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {contacts.map(({ icon, label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 p-4 rounded-2xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,152,18,0.10)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.35)';
                    (e.currentTarget as HTMLElement).style.background  = 'rgba(255,152,18,0.10)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.10)';
                    (e.currentTarget as HTMLElement).style.background  = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF9812]">{icon}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF9812]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/70">{label}</p>
                    <p className="text-xs font-medium truncate text-white mt-0.5">{text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Message Transmission Form ── */}
        <div className="lg:col-span-7">
          <div
            className="p-7 sm:p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.85) 0%, rgba(16,18,14,0.92) 100%)',
              border: '1px solid rgba(255,152,18,0.18)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80 mb-1">
              START A CONVERSATION
            </p>
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs text-white/50 mb-6 font-sans">
              Have an engineering opportunity, internship opening, or ML research project? Let's connect.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/80">
                    YOUR NAME
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,152,18,0.20)',
                      color: '#FAFAF7',
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                    onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.20)'; }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/80">
                    YOUR EMAIL
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,152,18,0.20)',
                      color: '#FAFAF7',
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                    onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.20)'; }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-mono-code tracking-widest mb-2 text-[#FF9812]/80">
                  PROJECT BRIEF / MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Let's discuss an engineering project, internship, or machine learning architecture..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,152,18,0.20)',
                    color: '#FAFAF7',
                  }}
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#FF9812'; }}
                  onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.20)'; }}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full font-display text-sm tracking-widest transition-all duration-300 font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FFB347 0%, #FF9812 50%, #E8820A 100%)',
                  color: '#0D0E0C',
                  boxShadow: '0 8px 30px rgba(255,152,18,0.35)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 35px rgba(255,152,18,0.50)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(255,152,18,0.35)';
                }}
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT MESSAGE</span>
              </button>

              {sentSuccess && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Check className="w-4 h-4 text-[#4ade80]" />
                  <p className="text-xs font-mono-code text-[#4ade80]">
                    Email client triggered with message payload. Ready to send!
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Toast show={hasCopied} message={`Email copied: ${emailAddress}`} />
    </section>
  );
};
