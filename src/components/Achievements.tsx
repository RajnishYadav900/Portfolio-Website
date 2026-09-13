import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Eye,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { CertificateModal } from './CertificateModal';

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

  const handlePhotoUpdate = (certId: string, newUrl: string) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === certId ? { ...c, imageUrl: newUrl } : c))
    );
    if (selectedCert && selectedCert.id === certId) {
      setSelectedCert((prev) => (prev ? { ...prev, imageUrl: newUrl } : null));
    }
  };

  return (
    <section id="achievements" className="py-16 sm:py-24 relative overflow-hidden bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs sm:text-sm font-semibold text-orange-950 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B1F]" />
              <span>Verified Academic Honors & Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
              Achievements & <span className="text-[#FF4B1F]">Certificates.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl">
              Official certificates of achievement, competitive academic scholarships, and engineering milestones earned at Lincoln Int'l College and beyond.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 shadow-sm text-xs font-semibold text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Lincoln University College Accredited</span>
            </div>
          </div>
        </div>

        {/* Featured Scholarship Spotlight Banner */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#FF4B1F]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Consecutive 100% Tuition Scholarship Recipient</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Academic Excellence at Lincoln Int'l College
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                Awarded official 100% tuition scholarships across both 1st and 2nd Semesters in Bachelor of Information Technology (BIT) Hons (November 2024 Intake) in honor of top-rank examination scores and dedication to computer science coursework.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const s1 = certificates.find((c) => c.id === 'cert-scholarship-sem1');
                  if (s1) setSelectedCert(s1);
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-zinc-900 hover:bg-[#FF4B1F] hover:text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>1st Sem Scholarship</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const s2 = certificates.find((c) => c.id === 'cert-scholarship-sem2');
                  if (s2) setSelectedCert(s2);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-all flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>2nd Sem Scholarship</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const mern = certificates.find((c) => c.id === 'cert-web');
                  if (mern) setSelectedCert(mern);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full-Stack MERN</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const robo = certificates.find((c) => c.id === 'cert-robotics');
                  if (robo) setSelectedCert(robo);
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Robotics Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const py = certificates.find((c) => c.id === 'cert-python');
                  if (py) setSelectedCert(py);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Python Training</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`group rounded-3xl bg-white border p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                cert.scholarshipBadge
                  ? 'border-amber-200/90 ring-1 ring-amber-400/20 hover:border-amber-300'
                  : 'border-zinc-200/90 hover:border-zinc-300'
              }`}
            >
              <div>
                {/* Visual Certificate Graphic Preview */}
                {cert.imageUrl ? (
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 mb-5 border border-zinc-200 shadow-sm cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.imageAlt || cert.title}
                      className="w-full h-full object-cover object-center group-hover:brightness-105 transition-all"
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

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      {cert.scholarshipBadge ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          <GraduationCap className="w-3 h-3" />
                          100% Scholarship
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded">
                          {cert.category}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[10px] font-mono uppercase font-bold text-white bg-black/75 backdrop-blur-md px-2 py-0.5 rounded shadow">
                        {cert.date}
                      </span>
                    </div>

                    {/* Hover expand overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                      <p className="text-xs font-bold flex items-center gap-1.5 text-white">
                        <Eye className="w-3.5 h-3.5 text-[#FF4B1F]" />
                        Click to view full certificate
                      </p>
                      <p className="text-[10px] text-zinc-300 truncate mt-0.5">
                        {cert.organization}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 text-white mb-5 border border-zinc-800 relative cursor-pointer group-hover:scale-[1.02] transition-transform duration-300 aspect-[4/3] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 flex items-center justify-center text-[#FF4B1F]">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                        {cert.date}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                        {cert.category}
                      </p>
                      <h4 className="text-sm font-bold text-white leading-snug mt-1 line-clamp-2">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="truncate max-w-[110px]">{cert.organization}</span>
                      <span className="text-[#FF4B1F] flex items-center gap-1 font-semibold">
                        <Eye className="w-3 h-3" /> View
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Title & Org */}
                <h3 className="text-base font-extrabold text-zinc-950 tracking-tight mb-1 group-hover:text-[#FF4B1F] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-600 mb-3 line-clamp-1">
                  {cert.organization}
                </p>

                {/* Key Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                  {cert.skills.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-50 text-zinc-400 text-[10px] font-medium">
                      +{cert.skills.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 hover:bg-[#FF4B1F] text-white text-xs font-bold transition-all duration-200 shadow-sm group/btn"
                >
                  <span>View Certificate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </section>
  );
};