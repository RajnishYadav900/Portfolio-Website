import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Layout,
  Cpu,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

type Service = (typeof SERVICES_DATA)[number];

const serviceIcons: Record<string, React.ReactNode> = {
  'web-dev': <Code2 className="w-5 h-5 text-[#FF4B1F]" />,
  'data-analyst': <BarChart3 className="w-5 h-5 text-[#FF4B1F]" />,
  'ui-dev': <Layout className="w-5 h-5 text-[#FF4B1F]" />,
  'ai-data': <Cpu className="w-5 h-5 text-[#FF4B1F]" />,
  'secure-scalable': <ShieldCheck className="w-5 h-5 text-[#FF4B1F]" />,
};

const DATA_ANALYST_SERVICE = {
  id: 'data-analyst',
  number: '00',
  title: 'Data Analyst',
  shortDescription: 'Turning raw data into clear insights and decisions.',
  detailedDescription:
    'I collect, clean and analyze data to find patterns that help in better decisions. From messy spreadsheets to clear dashboards and reports, I make data easy to understand.',
  deliverables: [
    'Data cleaning & preparation',
    'Exploratory data analysis',
    'Interactive dashboards',
    'Clear reports & visual charts',
  ],
  technologies: ['Python', 'Pandas', 'NumPy', 'SQL', 'Excel', 'Matplotlib'],
} as unknown as Service;

const baseServices = SERVICES_DATA.filter((s) => s.id !== 'fullstack-dev');
const SERVICES: Service[] = [
  ...baseServices.slice(0, 1),
  DATA_ANALYST_SERVICE,
  ...baseServices.slice(1),
];

export const Services: React.FC = () => {

  const [expandedId, setExpandedId] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="py-10 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col items-start mb-6 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Services & Solutions</span>
          </div>
          <h2 className="text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            What I <span className="text-[#FF4B1F]">Do.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl">
            Clean, responsive and resilient digital solutions for real business and user challenges.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const number = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className={`group rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-zinc-300 shadow-xl shadow-black/5 ring-1 ring-zinc-300/80'
                    : 'bg-white/70 hover:bg-white border-zinc-200/80 hover:border-zinc-300'
                }`}
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full px-4 py-3.5 sm:p-8 flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4B1F] rounded-2xl sm:rounded-3xl"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <span
                      className={`text-base sm:text-3xl font-black font-mono transition-colors duration-200 ${
                        isExpanded ? 'text-[#FF4B1F]' : 'text-zinc-300 group-hover:text-zinc-500'
                      }`}
                    >
                      {number}
                    </span>

                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isExpanded
                          ? 'bg-orange-50 border-orange-200 text-[#FF4B1F]'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {serviceIcons[service.id] || <Sparkles className="w-5 h-5" />}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[15px] sm:text-2xl font-extrabold text-zinc-950 tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs sm:text-sm text-zinc-500 truncate mt-0.5 hidden sm:block">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-zinc-950 text-white border-zinc-950 rotate-180'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>

                {/* Expanded content: only click par */}
                {isExpanded && (
                  <div className="px-4 sm:px-8 pb-5 sm:pb-8 pt-3 sm:pt-2 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

                      <div className="lg:col-span-7">
                        <p className="text-[13px] sm:text-base text-zinc-600 leading-relaxed mb-4 sm:mb-6">
                          {service.detailedDescription}
                        </p>

                        <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                          What I Deliver
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables.map((item: string) => (
                            <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                              <CheckCircle2 className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-4 sm:p-6 border border-zinc-200/80">
                        <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                          Core Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                          {service.technologies.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-[11px] sm:text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          className="inline-flex items-center justify-between w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm group/btn"
                        >
                          <span>Inquire About This Service</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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