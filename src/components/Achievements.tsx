import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Eye,
  GraduationCap,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { CertificateModal } from './CertificateModal';

const MOBILE_VISIBLE = 4;

const QUICK_VIEW = [
  { id: 'cert-scholarship-sem1', label: '1st Sem Scholarship', cls: 'bg-white text-zinc-900 hover:bg-[#FF4B1F] hover:text-white' },
  { id: 'cert-scholarship-sem2', label: '2nd Sem Scholarship', cls: 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700' },
  { id: 'cert-web', label: 'Full-Stack MERN', cls: 'bg-emerald-600 text-white hover:bg-emerald-500' },
  { id: 'cert-robotics', label: 'Robotics Showcase', cls: 'bg-cyan-700 text-white hover:bg-cyan-600' },
  { id: 'cert-python', label: 'Python Training', cls: 'bg-blue-700 text-white hover:bg-blue-600' },
];

export const Achievements: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    return CERTIFICATES_DATA.map((cert) => {
      try {
        const stored = localStorage.getItem(`rajnish_cert_${cert.id}`);
        if (stored && (stored.startsWith('data:image/') || stored.startsWith('http') || stored.startsWith('/'))) {
          return { ...cert, imageUrl: stored };
        }
      } catch {
        // ignore
      }
      return cert;
    });
  });

  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handlePhotoUpdate = (certId: string, newUrl: string) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === certId ? { ...c, imageUrl: newUrl } : c))
    );
    if (selectedCert && selectedCert.id === certId) {
      setSelectedCert((prev) => (prev ? { ...prev, imageUrl: newUrl } : null));
    }
  };

  const openById = (id: string) => {
    const found = certificates.find((c) => c.id === id);
    if (found) setSelectedCert(found);
  };

  return (
    <section id="achievements" className="py-10 sm:py-20 relative overflow-hidden bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs sm:text-sm font-semibold text-orange-950 mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B1F]" />
              <span>Honors & Credentials</span>
            </div>
            <h2 className="text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
              Achievements & <span className="text-[#FF4B1F]">Certificates.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl">
              Certificates, scholarships and milestones earned at Lincoln Int'l College and beyond.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 shadow-sm text-xs font-semibold text-zinc-700">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Lincoln University College Accredited</span>
          </div>
        </div>

        {/* Scholarship spotlight */}
        <div className="mb-6 sm:mb-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-4 sm:p-8 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 bg-[#FF4B1F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold mb-2.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>100% Tuition Scholarship Recipient</span>
              </div>
              <h3 className="text-base sm:text-2xl font-black text-white tracking-tight leading-snug">
                Academic Excellence at Lincoln Int'l College
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Awarded 100% tuition scholarships in both 1st and 2nd Semesters of BIT (Hons), November 2024 intake, for top examination scores and dedication to computer science coursework.
              </p>
            </div>

            {/* Quick view chips: mobile pe swipe */}
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_VIEW.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => openById(q.id)}
                    className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 ${q.cls}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{q.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {certificates.map((cert, index) => {
            const hiddenOnMobile = !showAll && index >= MOBILE_VISIBLE;

            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => setSelectedCert(cert)}
                aria-label={`View certificate: ${cert.title}`}
                className={`group text-left rounded-2xl sm:rounded-3xl bg-white border flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98] ${
                  hiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } ${
                  cert.scholarshipBadge
                    ? 'border-amber-200/90 ring-1 ring-amber-400/20 hover:border-amber-300'
                    : 'border-zinc-200/90 hover:border-zinc-300'
                }`}
              >
                {/* Thumbnail */}
                {cert.imageUrl ? (
                  <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden w-full">
                    <img
                      src={cert.imageUrl}
                      alt={cert.imageAlt || cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const original = CERTIFICATES_DATA.find((c) => c.id === cert.id)?.imageUrl;
                        if (original && e.currentTarget.src !== original) {
                          e.currentTarget.src = original;
                          try {
                            localStorage.removeItem(`rajnish_cert_${cert.id}`);
                          } catch {
                            // ignore
                          }
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute top-2 left-2">
                      {cert.scholarshipBadge ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow">
                          <GraduationCap className="w-3 h-3" />
                          100%
                        </span>
                      ) : (
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded">
                          {cert.category}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-zinc-900 to-zinc-950 p-3 text-white flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 flex items-center justify-center text-[#FF4B1F]">
                      <Award className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold leading-snug line-clamp-2">{cert.title}</p>
                  </div>
                )}

                {/* Body */}
                <div className="p-2.5 sm:p-4 flex flex-col flex-1 w-full">
                  <h3 className="text-[13px] sm:text-base font-extrabold text-zinc-950 tracking-tight leading-snug line-clamp-2 group-hover:text-[#FF4B1F] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 mt-1 line-clamp-1">
                    {cert.organization}
                  </p>

                  {/* Skills: sirf tablet/desktop */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-medium">
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-zinc-50 text-zinc-400 text-[10px] font-medium">
                        +{cert.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-2.5 flex items-center justify-between text-[10px] sm:text-xs">
                    <span className="font-mono text-zinc-400 truncate">{cert.date}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#FF4B1F] shrink-0">
                      <Eye className="w-3 h-3" />
                      View
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Show all (mobile only) */}
        {certificates.length > MOBILE_VISIBLE && (
          <div className="sm:hidden mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-950 text-white text-xs font-bold shadow-md"
            >
              <span>{showAll ? 'Show less' : `Show all (${certificates.length})`}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </section>
  );
};