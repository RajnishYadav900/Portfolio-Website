import React, { useEffect, useState } from 'react';
import {
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Fingerprint,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Upload,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import { CertificateItem } from '../types';
import { CERTIFICATES_DATA } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onPhotoUpdate?: (certId: string, newUrl: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onPhotoUpdate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const certId = certificate?.id;

  // Reset on certificate change
  useEffect(() => {
    setIsZoomed(false);
    setLoaded(false);
  }, [certId]);

  // Esc to close/unzoom + lock page scroll
  useEffect(() => {
    if (!certId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isZoomed) setIsZoomed(false);
      else onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [certId, isZoomed, onClose]);

  if (!certificate) return null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/') && onPhotoUpdate) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setLoaded(false);
          onPhotoUpdate(certificate.id, dataUrl);
          try {
            localStorage.setItem(`rajnish_cert_${certificate.id}`, dataUrl);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-5xl max-h-[94dvh] sm:max-h-[92dvh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-zinc-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-white bg-zinc-900 px-2.5 py-1 rounded-full shrink-0">
              {certificate.category}
            </span>
            {certificate.scholarshipBadge && (
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 inline-flex items-center gap-1 truncate">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{certificate.scholarshipBadge}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {certificate.imageUrl && (
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors"
                title={isZoomed ? 'Fit to screen' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span className="hidden sm:inline">{isZoomed ? 'Fit to screen' : 'Zoom'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-[#FF4B1F] hover:text-white text-zinc-800 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* ===== FULL CERTIFICATE IMAGE (never cropped) ===== */}
          {certificate.imageUrl ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative bg-zinc-100 bg-[radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] transition-all ${
                isDragging ? 'ring-4 ring-inset ring-[#FF4B1F]/60' : ''
              }`}
            >
              <div
                className={`flex p-3 sm:p-8 ${
                  isZoomed
                    ? 'overflow-auto max-h-[75dvh] justify-start'
                    : 'items-center justify-center'
                }`}
              >
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-[#FF4B1F] animate-spin" />
                  </div>
                )}
                <img
                  src={certificate.imageUrl}
                  alt={certificate.imageAlt || certificate.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onLoad={() => setLoaded(true)}
                  onClick={() => setIsZoomed((z) => !z)}
                  className={`rounded-lg sm:rounded-xl bg-white ring-1 ring-black/5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.4)] select-none transition-all duration-300 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  } ${
                    isZoomed
                      ? 'max-w-none w-[1500px] h-auto cursor-zoom-out'
                      : 'w-auto h-auto max-w-full max-h-[55dvh] sm:max-h-[62dvh] object-contain cursor-zoom-in'
                  }`}
                  onError={(e) => {
                    const original = CERTIFICATES_DATA.find((c) => c.id === certificate.id)?.imageUrl;
                    if (original && e.currentTarget.src !== original) {
                      e.currentTarget.src = original;
                      try {
                        localStorage.removeItem(`rajnish_cert_${certificate.id}`);
                      } catch {
                        // ignore
                      }
                    }
                  }}
                />
              </div>

              {isDragging && (
                <div className="absolute inset-0 z-40 bg-[#FF4B1F]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
                  <Upload className="w-12 h-12 mb-3 animate-bounce" />
                  <p className="font-black text-base">Drop Your Certificate Photo Here</p>
                  <p className="text-xs text-white/90 mt-1">100% original quality • Instant update</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-zinc-100 p-4 sm:p-8">
              <div className="mx-auto max-w-xl rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-6 sm:p-8 text-white border-4 border-zinc-800/90 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#FF4B1F]/20 border-2 border-[#FF4B1F] flex items-center justify-center text-[#FF4B1F] mb-4">
                  <Award className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-1">
                  Certificate of Recognition & Completion
                </p>
                <p className="text-xl sm:text-2xl font-black tracking-tight mb-2">{certificate.title}</p>
                <p className="text-xs text-zinc-300">
                  Conferred by <span className="font-bold text-[#FF4B1F]">{certificate.organization}</span>
                </p>
              </div>
            </div>
          )}

          {/* ===== INFORMATION (below the image) ===== */}
          <div className="px-4 sm:px-8 py-5 sm:py-8">
            {/* Title + actions */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <h3
                  id="certificate-modal-title"
                  className="text-xl sm:text-3xl font-black tracking-tight text-zinc-950 leading-tight"
                >
                  {certificate.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Academic Certificate
                </p>
              </div>

              {certificate.imageUrl && (
                <div className="flex flex-wrap gap-2 shrink-0">
                  <a
                    href={certificate.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open full size
                  </a>
                  <a
                    href={certificate.imageUrl}
                    download={`${certificate.id}.jpg`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 text-xs sm:text-sm font-bold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              )}
            </div>

            {/* Metadata cards */}
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { icon: Building2, label: 'Institution', value: certificate.organization },
                { icon: Calendar, label: 'Intake / Date', value: certificate.date },
                {
                  icon: GraduationCap,
                  label: certificate.scholarshipBadge ? 'Scholarship' : 'Domain / Type',
                  value: certificate.scholarshipBadge || certificate.category,
                  accent: true,
                },
                {
                  icon: Fingerprint,
                  label: 'Credential ID',
                  value: certificate.credentialId || 'VERIFIED',
                  mono: true,
                },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-3 sm:p-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    <m.icon className="w-3.5 h-3.5 text-[#FF4B1F]" />
                    {m.label}
                  </span>
                  <span
                    className={`mt-1.5 block text-xs sm:text-sm font-bold leading-snug break-words ${
                      m.accent ? 'text-emerald-600' : 'text-zinc-900'
                    } ${m.mono ? 'font-mono' : ''}`}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            {certificate.summary && (
              <div className="mt-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  Official Citation & Summary
                </h4>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-3xl">
                  {certificate.summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {certificate.skills?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2.5">
                  Academic & Technical Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs sm:text-sm font-medium inline-flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B1F]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div className="mt-7 pt-5 border-t border-zinc-100 flex items-center justify-between gap-3">
              <p className="hidden sm:block text-xs text-zinc-400">
                Tip: photo badalne ke liye nayi image yahan drag & drop karein.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};