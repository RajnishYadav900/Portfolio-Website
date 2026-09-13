import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Layout,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

const serviceIcons: Record<string, React.ReactNode> = {
  'web-dev': <Code2 className="w-5 h-5 text-[#FF4B1F]" />,
  'fullstack-dev': <Layers className="w-5 h-5 text-[#FF4B1F]" />,
  'ui-dev': <Layout className="w-5 h-5 text-[#FF4B1F]" />,
  'ai-data': <Cpu className="w-5 h-5 text-[#FF4B1F]" />,
  'secure-scalable': <ShieldCheck className="w-5 h-5 text-[#FF4B1F]" />,
};

export const Services: React.FC = () => {
  // Default first card expanded as in high-end accordion references
  const [expandedId, setExpandedId] = useState<string>('web-dev');

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Services & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            What I <span className="text-[#FF4B1F]">Do.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl">
            Delivering clean, responsive, and resilient digital solutions tailored to solve actual business and user challenges.
          </p>
        </div>

        {/* Accordion / Card Section */}
        <div className="space-y-4">
          {SERVICES_DATA.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-zinc-300 shadow-xl shadow-black/5 ring-1 ring-zinc-300/80'
                    : 'bg-white/70 hover:bg-white border-zinc-200/80 shadow-2xs hover:border-zinc-300'
                }`}
              >
                {/* Accordion Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4B1F] rounded-3xl"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    {/* Number Badge */}
                    <span
                      className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-200 ${
                        isExpanded ? 'text-[#FF4B1F]' : 'text-zinc-300 group-hover:text-zinc-500'
                      }`}
                    >
                      {service.number}
                    </span>

                    {/* Service Icon */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isExpanded
                          ? 'bg-orange-50 border-orange-200 text-[#FF4B1F]'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {serviceIcons[service.id] || <Sparkles className="w-5 h-5" />}
                    </div>

                    {/* Title & Short Description */}
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                        {service.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs sm:text-sm text-zinc-500 truncate mt-0.5 hidden sm:block">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Expand Chevron / Icon */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-zinc-950 text-white border-zinc-950 rotate-180'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Expanded Content Drawer */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Detailed Paragraph */}
                      <div className="lg:col-span-7">
                        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
                          {service.detailedDescription}
                        </p>

                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                          What I Deliver
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                              <CheckCircle2 className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Tech Tags & Call to Action */}
                      <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-5 sm:p-6 border border-zinc-200/80">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                          Core Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-medium shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm group"
                        >
                          <span>Inquire About This Service</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
