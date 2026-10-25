import React from 'react';
import { Sparkles, Code, Cpu, Layout, Lightbulb, Layers } from 'lucide-react';
import { HIGHLIGHT_STRIP } from '../data/portfolioData';

const highlightIcons: Record<string, React.ElementType> = {
  'Web Development': Code,
  'AI & Data': Cpu,
  'Modern UI': Layout,
  'Problem Solving': Lightbulb,
  'Full-Stack Development': Layers,
};

const STYLES = `
@keyframes ts-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes ts-glow {
  0%, 100% { opacity: .5; transform: scale(1); }
  50%      { opacity: .9; transform: scale(1.15); }
}
@keyframes ts-sheen {
  0%   { transform: translateX(-120%) skewX(-20deg); }
  100% { transform: translateX(260%) skewX(-20deg); }
}
.ts-track { animation: ts-scroll 30s linear infinite; }
.ts-wrap:hover .ts-track { animation-play-state: paused; }
.ts-glow { animation: ts-glow 5s ease-in-out infinite; }
.ts-sheen::after {
  content: '';
  position: absolute; inset: 0;
  width: 35%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
  animation: ts-sheen 6s ease-in-out infinite;
  pointer-events: none;
}
@media (max-width: 640px) { .ts-track { animation-duration: 20s; } }
@media (prefers-reduced-motion: reduce) {
  .ts-track, .ts-glow, .ts-sheen::after { animation: none; }
}
`;

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6 sm:my-10">
      <style>{STYLES}</style>

      <div className="ts-wrap ts-sheen relative rounded-2xl sm:rounded-full bg-zinc-950 text-white overflow-hidden py-3.5 sm:py-5 border border-zinc-800 shadow-xl">
        {/* Glow */}
        <div className="ts-glow absolute -top-10 left-1/4 w-56 h-20 bg-[#FF4B1F]/25 rounded-full blur-2xl pointer-events-none" />
        <div className="ts-glow absolute -bottom-10 right-1/4 w-56 h-20 bg-[#FF4B1F]/20 rounded-full blur-2xl pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Marquee with faded edges */}
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div className="ts-track flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-4 sm:gap-8 pr-4 sm:pr-8"
              >
                {HIGHLIGHT_STRIP.map((item) => {
                  const Icon = highlightIcons[item] || Sparkles;
                  return (
                    <li key={`${copy}-${item}`} className="flex items-center gap-4 sm:gap-8">
                      <div className="group flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-default">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 flex items-center justify-center transition-all duration-200 group-hover:bg-[#FF4B1F] group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="w-4 h-4 text-[#FF4B1F] group-hover:text-white transition-colors" />
                        </div>
                        <span className="whitespace-nowrap text-sm sm:text-base font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B1F]/70 shrink-0" />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};