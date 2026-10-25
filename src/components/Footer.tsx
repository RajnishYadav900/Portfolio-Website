import React from 'react';
import {
  ArrowUp,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Send,
  Mail,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const TWITTER_URL = 'https://x.com/RajnishKumxn';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, label: 'GitHub', hoverBg: 'hover:bg-white hover:text-black' },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: 'LinkedIn', hoverBg: 'hover:bg-[#0077b5]' },
    { icon: Twitter, href: TWITTER_URL, label: 'Twitter', hoverBg: 'hover:bg-[#1DA1F2]' },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: 'Facebook', hoverBg: 'hover:bg-[#1877F2]' },
    { icon: Send, href: PERSONAL_INFO.telegramUrl, label: 'Telegram', hoverBg: 'hover:bg-[#0088cc]' },
  ];

  return (
    <footer className="w-full bg-zinc-950 text-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[3px] rounded-full bg-[#FF4B1F] shadow-[0_0_16px_#FF4B1F]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-7 flex flex-col items-center gap-4">
        {/* Connect */}
        <div className="flex flex-col items-center gap-3">
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
            Connect
          </h4>
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800 hover:scale-110 ${s.hoverBg}`}
                aria-label={s.label}
                title={s.label}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#FF4B1F] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-zinc-800 hover:scale-110"
              aria-label="Email"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full pt-4 border-t border-zinc-800/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-zinc-500">
          <p>© 2026 Rajnish Kumar Yadav. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};