import React, { useState } from 'react';
import { Mail, FileText, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { RevealOnScroll } from '../animations/RevealOnScroll';
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
      {/* Orange glow from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,152,18,0.10) 0%, transparent 70%)' }}
      />

      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">08 — CONTACT</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="contact-heading"
          className="font-display mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          LET&apos;S BUILD<br />
          <span style={{ color: '#FF9812' }}>SOMETHING.</span>
        </h2>
        <p className="text-base mb-16" style={{ color: 'rgba(250,250,247,0.45)' }}>
          Open to applied AI engineering roles, technical internships, and collaborative software projects.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ── Left: Contact links ── */}
        <div className="lg:col-span-5 space-y-5">
          <RevealOnScroll delay={0.1}>
            <div
              className="p-6 rounded-3xl space-y-4"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,152,18,0.15)',
              }}
            >
              <p className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.60)' }}>
                DIRECT CHANNELS
              </p>

              {/* Email copy row */}
              <div
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl"
                style={{ background: 'rgba(255,152,18,0.06)', border: '1px solid rgba(255,152,18,0.12)' }}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 shrink-0" style={{ color: '#FF9812' }} />
                  <span className="text-xs font-mono-code truncate select-all" style={{ color: '#FAFAF7' }}>
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={() => copy(emailAddress)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono-code shrink-0 transition-all"
                  style={{
                    background: hasCopied ? 'rgba(74,222,128,0.15)' : 'rgba(255,152,18,0.12)',
                    border: hasCopied ? '1px solid rgba(74,222,128,0.30)' : '1px solid rgba(255,152,18,0.25)',
                    color: hasCopied ? '#4ade80' : '#FF9812',
                  }}
                >
                  {hasCopied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
                </button>
              </div>

              {/* Links grid */}
              <div className="grid grid-cols-2 gap-3">
                {contacts.map(({ icon, label, href, text }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-4 rounded-2xl transition-all duration-300 group"
                    style={{ background: 'rgba(255,152,18,0.05)', border: '1px solid rgba(255,152,18,0.10)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.30)';
                      (e.currentTarget as HTMLElement).style.background  = 'rgba(255,152,18,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.10)';
                      (e.currentTarget as HTMLElement).style.background  = 'rgba(255,152,18,0.05)';
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#FF9812' }}>{icon}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: '#FF9812' }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono-code tracking-widest" style={{ color: 'rgba(255,152,18,0.55)' }}>{label}</p>
                      <p className="text-xs font-medium truncate" style={{ color: '#FAFAF7' }}>{text}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Right: Message form ── */}
        <div className="lg:col-span-7">
          <RevealOnScroll delay={0.15}>
            <div
              className="p-7 rounded-3xl"
              style={{ background: '#111111', border: '1px solid rgba(255,152,18,0.15)' }}
            >
              <p className="text-[10px] font-mono-code tracking-widest mb-1" style={{ color: 'rgba(255,152,18,0.60)' }}>
                START A CONVERSATION
              </p>
              <h3 className="text-xl font-bold mb-1" style={{ color: '#FAFAF7' }}>Send a Message</h3>
              <p className="text-xs mb-6" style={{ color: 'rgba(250,250,247,0.40)' }}>
                Have an opportunity or project in mind? Reach out directly.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono-code tracking-widest mb-2" style={{ color: 'rgba(255,152,18,0.60)' }}>
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name" type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,152,18,0.05)',
                        border: '1px solid rgba(255,152,18,0.15)',
                        color: '#FAFAF7',
                      }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.45)'; }}
                      onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.15)'; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono-code tracking-widest mb-2" style={{ color: 'rgba(255,152,18,0.60)' }}>
                      YOUR EMAIL
                    </label>
                    <input
                      id="contact-email" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,152,18,0.05)',
                        border: '1px solid rgba(255,152,18,0.15)',
                        color: '#FAFAF7',
                      }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.45)'; }}
                      onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.15)'; }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono-code tracking-widest mb-2" style={{ color: 'rgba(255,152,18,0.60)' }}>
                    MESSAGE / PROJECT BRIEF
                  </label>
                  <textarea
                    id="contact-message" required rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Let's discuss an engineering project, internship, or machine learning architecture..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(255,152,18,0.05)',
                      border: '1px solid rgba(255,152,18,0.15)',
                      color: '#FAFAF7',
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.45)'; }}
                    onBlur={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,152,18,0.15)'; }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-orange w-full justify-center py-3.5 text-sm font-semibold"
                >
                  <Send className="w-4 h-4" />
                  TRANSMIT MESSAGE
                </button>

                {sentSuccess && (
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <Check className="w-4 h-4" style={{ color: '#4ade80' }} />
                    <p className="text-xs font-mono-code" style={{ color: '#4ade80' }}>
                      Email client triggered. Ready to send!
                    </p>
                  </div>
                )}
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <Toast show={hasCopied} message={`Email copied: ${emailAddress}`} />
    </section>
  );
};
