import React, { useState } from 'react';
import {
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Hash,
  Download,
  ZoomIn,
  ZoomOut,
  Upload,
  GraduationCap,
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

  if (!certificate) return null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onPhotoUpdate) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full border border-zinc-200 shadow-2xl p-5 sm:p-8 animate-in zoom-in-95 duration-200 relative my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 flex items-center justify-center text-[#FF4B1F] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                  {certificate.category}
                </span>
                {certificate.scholarshipBadge && (
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {certificate.scholarshipBadge}
                  </span>
                )}
              </div>
              <h3 id="certificate-modal-title" className="text-base sm:text-xl font-black tracking-tight text-zinc-950 mt-0.5">
                {certificate.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Photo Display with Zoom Controls */}
        {certificate.imageUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl overflow-hidden bg-zinc-950 border transition-all mb-6 group ${
              isDragging ? 'border-[#FF4B1F] ring-4 ring-[#FF4B1F]/40' : 'border-zinc-300 shadow-lg'
            }`}
          >
            {/* Action Bar overlay */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-lg"
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isZoomed ? 'Reset View' : 'Zoom Photo'}</span>
              </button>

              <a
                href={certificate.imageUrl}
                download={`${certificate.id}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/75 hover:bg-[#FF4B1F] text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-lg"
                title="Download full resolution certificate"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>

            {/* Official Credential Watermark Tag */}
            <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{certificate.organization} Official Certificate</span>
              </div>
            </div>

            {/* Image viewport */}
            <div
              className={`w-full overflow-auto transition-all duration-300 flex items-center justify-center ${
                isZoomed ? 'max-h-[70vh] cursor-zoom-out' : 'max-h-[50vh] cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={certificate.imageUrl}
                alt={certificate.imageAlt || certificate.title}
                className={`w-full h-auto object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-125 origin-center' : 'scale-100 hover:scale-[1.01]'
                }`}
                referrerPolicy="no-referrer"
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
                <Upload className="w-12 h-12 mb-3 animate-bounce text-white" />
                <p className="font-black text-base">Drop Your Certificate Photo Here</p>
                <p className="text-xs text-white/90 mt-1">100% original quality • Instant update</p>
              </div>
            )}
          </div>
        ) : (
          /* Fallback Decorative Frame if image is absent */
          <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-6 sm:p-8 text-white border-4 border-zinc-800/90 shadow-inner mb-6 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#FF4B1F]/20 border-2 border-[#FF4B1F] flex items-center justify-center text-[#FF4B1F] mb-4 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-1">
              Certificate of Recognition & Completion
            </p>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
              {certificate.title}
            </h3>
            <p className="text-xs text-zinc-300">
              Conferred by <span className="font-bold text-[#FF4B1F]">{certificate.organization}</span>
            </p>
          </div>
        )}

        {/* Verification & Metadata Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 mb-6 text-xs">
          <div>
            <span className="block text-[10px] font-mono uppercase text-zinc-500">Institution</span>
            <span className="font-bold text-zinc-900 truncate block">{certificate.organization}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-zinc-500">Intake / Date</span>
            <span className="font-bold text-zinc-900 truncate block">{certificate.date}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-zinc-500">
              {certificate.scholarshipBadge ? 'Scholarship' : 'Domain / Type'}
            </span>
            <span className="font-bold text-emerald-600 truncate block">
              {certificate.scholarshipBadge || certificate.category}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-zinc-500">Credential ID</span>
            <span className="font-mono font-bold text-zinc-900 truncate block">{certificate.credentialId || 'VERIFIED'}</span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
            Official Citation & Summary
          </h4>
          <p className="text-sm text-zinc-700 leading-relaxed">
            {certificate.summary}
          </p>
        </div>

        {/* Competencies Validated */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Academic & Technical Focus
          </h4>
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B1F]" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified Academic Certificate
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};