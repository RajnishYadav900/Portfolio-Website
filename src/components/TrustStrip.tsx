import React from 'react';
import { Sparkles, Code, Cpu, Layout, Lightbulb, Layers } from 'lucide-react';
import { HIGHLIGHT_STRIP } from '../data/portfolioData';

const highlightIcons: Record<string, React.ReactNode> = {
  'Web Development': <Code className="w-4 h-4 text-[#FF4B1F]" />,
  'AI & Data': <Cpu className="w-4 h-4 text-[#FF4B1F]" />,
  'Modern UI': <Layout className="w-4 h-4 text-[#FF4B1F]" />,
  'Problem Solving': <Lightbulb className="w-4 h-4 text-[#FF4B1F]" />,
  'Full-Stack Development': <Layers className="w-4 h-4 text-[#FF4B1F]" />,
};

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6 sm:my-10">
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950 text-white overflow-hidden py-5 sm:py-6 px-4 sm:px-8 border border-zinc-800 shadow-xl">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 left-1/4 w-60 h-20 bg-[#FF4B1F]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 right-1/4 w-60 h-20 bg-[#FF4B1F]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Scrollable Container on Mobile, Flex on Desktop */}
        <div className="flex items-center justify-start lg:justify-between overflow-x-auto no-scrollbar gap-6 sm:gap-8 pb-1 sm:pb-0 scroll-smooth">
          {HIGHLIGHT_STRIP.map((item, index) => (
            <React.Fragment key={item}>
              <div className="flex items-center gap-3 shrink-0 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF4B1F]/50 group-hover:bg-[#FF4B1F]/10 transition-colors duration-200">
                  {highlightIcons[item] || <Sparkles className="w-3.5 h-3.5 text-[#FF4B1F]" />}
                </div>
                <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                  {item}
                </span>
              </div>

              {/* Separator Star / Dot between items */}
              {index < HIGHLIGHT_STRIP.length - 1 && (
                <div className="shrink-0 text-[#FF4B1F] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B1F]/70" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
