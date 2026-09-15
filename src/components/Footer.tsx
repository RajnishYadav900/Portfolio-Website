import React from 'react';
import {
  Code,
  ArrowUp,
  Github,
  Linkedin,
  Facebook,
  MessageSquare,
  Send,
  Mail,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, label: 'GitHub', hoverBg: 'hover:bg-white hover:text-black' },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: 'LinkedIn', hoverBg: 'hover:bg-[#0077b5]' },
    { icon: MessageSquare, href: PERSONAL_INFO.whatsappUrl, label: 'WhatsApp', hoverBg: 'hover:bg-[#25D366]' },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: 'Facebook', hoverBg: 'hover:bg-[#1877F2]' },
    { icon: Send, href: PERSONAL_INFO.telegramUrl, label: 'Telegram', hoverBg: 'hover:bg-[#0088cc]' },
  ];

  return (
    <footer className="w-full bg-zinc-950 text-white relative overflow-hidden">
      {/* Top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[3px] rounded-full bg-[#FF4B1F] shadow-[0_0_20px_#FF4B1F]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* CTA Strip */}
        <div className="py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-5 border-b border-zinc-800/70">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Got a project in mind?
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Let's turn your idea into something real.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4B1F] text-white text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-500/20 shrink-0"
          >
            Let's Talk
          </a>
        </div>

        {/* Main Grid */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 border-b border-zinc-800/70">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <a href="#home" className="group flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-[#FF4B1F] text-white flex items-center justify-center transition-colors">
                <Code className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Rajnish<span className="text-[#FF4B1F]">.</span>
              </span>
            </a>
            <p className="text-zinc-400 text-sm max-w-xs">
              {PERSONAL_INFO.title}
            </p>
            <p className="text-zinc-500 text-xs mt-1">{PERSONAL_INFO.location}</p>
            <p className="text-zinc-600 font-mono text-xs mt-3 italic">
              "{PERSONAL_INFO.tagline}"
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-400">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#FF4B1F] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center sm:items-end">
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800 ${s.hoverBg}`}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#FF4B1F] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© 2026 Rajnish Kumar Yadav. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};