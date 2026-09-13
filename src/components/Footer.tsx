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
  Heart,
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

  return (
    <footer className="w-full bg-zinc-950 text-white border-t border-zinc-800 relative overflow-hidden">
      
      {/* Subtle orange accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-[#FF4B1F] shadow-[0_0_25px_#FF4B1F]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Logo & Positioning */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" className="group flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-[#FF4B1F] text-white flex items-center justify-center transition-colors">
                <Code className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Rajnish<span className="text-[#FF4B1F]">.</span>
              </span>
            </a>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mt-1">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
            </p>
            <p className="text-zinc-500 font-mono text-xs mt-2 italic">
              "{PERSONAL_INFO.tagline}"
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Icons Strip */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#FF4B1F] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#0077b5] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#1877F2] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#0088cc] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-[#FF4B1F] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="flex items-center gap-1.5">
            <span>© 2026 Rajnish Kumar Yadav. All rights reserved.</span>
          </p>

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
