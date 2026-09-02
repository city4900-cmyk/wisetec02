import React, { useState, useRef } from 'react';
import {
  X,
  Shield,
  Award,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  Sparkles,
  Download,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
} from 'lucide-react';
import { CertificateItem } from '../types';
import { CERTIFICATES } from '../data/companyData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onSelectCertificate?: (cert: CertificateItem) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onSelectCertificate,
}) => {
  const [viewMode, setViewMode] = useState<'image' | 'digital'>('image');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(certificate);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if prop changes
  React.useEffect(() => {
    setActiveCert(certificate);
    setZoomLevel(1);
    setRotation(0);
    setViewMode('image');
  }, [certificate]);

  if (!activeCert) return null;

  const currentIdx = CERTIFICATES.findIndex((c) => c.id === activeCert.id);
  const prevCert = currentIdx > 0 ? CERTIFICATES[currentIdx - 1] : CERTIFICATES[CERTIFICATES.length - 1];
  const nextCert = currentIdx < CERTIFICATES.length - 1 ? CERTIFICATES[currentIdx + 1] : CERTIFICATES[0];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleActualSize = () => setZoomLevel(1.5);
  const handleFitScreen = () => {
    setZoomLevel(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrint = () => {
    window.print();
  };

  const handleSelectCert = (cert: CertificateItem) => {
    setActiveCert(cert);
    setZoomLevel(1);
    setRotation(0);
    if (onSelectCertificate) {
      onSelectCertificate(cert);
    }
  };

  const imageSrc = encodeURI(activeCert.imageUrl);

  return (
    <div
      id="certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col h-[94vh] max-h-[950px]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex-shrink-0 flex items-center justify-center text-blue-300 shadow-inner">
              {activeCert.category === 'patent' ? (
                <Sparkles className="w-5 h-5 text-amber-400" />
              ) : activeCert.category === 'iso' ? (
                <Award className="w-5 h-5 text-blue-400" />
              ) : (
                <Shield className="w-5 h-5 text-slate-300" />
              )}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  {activeCert.title}
                </h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {activeCert.badge}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold hidden sm:inline-block">
                  원본 등록 완료
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                {activeCert.code} · 발급/인증기관: {activeCert.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs font-semibold border border-slate-700">
              <button
                id="modal-view-image-tab"
                onClick={() => {
                  setViewMode('image');
                  handleFitScreen();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'image'
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>원본 스캔 문서</span>
              </button>
              <button
                id="modal-view-digital-tab"
                onClick={() => {
                  setViewMode('digital');
                  handleFitScreen();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'digital'
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>상세 내역</span>
              </button>
            </div>

            {/* Viewer Controls */}
            {viewMode === 'image' && (
              <div className="hidden lg:flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 text-slate-300">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded hover:bg-slate-700 hover:text-white"
                  title="축소"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFitScreen}
                  className="text-xs font-mono px-2 py-0.5 rounded hover:bg-slate-700 text-slate-200 min-w-[50px] text-center"
                  title="화면 맞춤"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded hover:bg-slate-700 hover:text-white"
                  title="확대"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleActualSize}
                  className="text-[11px] px-2 py-1 rounded hover:bg-slate-700 text-amber-300 font-bold border-l border-slate-700 ml-1"
                  title="150% 원본 크기"
                >
                  고해상도 보기
                </button>
                <button
                  onClick={handleRotate}
                  className="p-1.5 rounded hover:bg-slate-700 hover:text-white"
                  title="90도 회전"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1 border border-slate-700"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Pan/Zoom for Original Scan */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-950 flex items-center justify-center relative select-none"
        >
          {/* Quick Prev/Next Overlay Buttons */}
          <button
            onClick={() => handleSelectCert(prevCert)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 shadow-xl transition-all hidden sm:flex items-center justify-center"
            title="이전 인증서"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSelectCert(nextCert)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 shadow-xl transition-all hidden sm:flex items-center justify-center"
            title="다음 인증서"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {viewMode === 'image' && activeCert.imageUrl ? (
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              <div
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  transformOrigin: 'center center',
                }}
                className="relative max-w-full flex items-center justify-center shadow-2xl rounded-lg overflow-hidden bg-white border border-slate-700 ring-1 ring-white/20"
              >
                <img
                  src={imageSrc}
                  alt={activeCert.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto object-contain rounded shadow-lg"
                  onError={(e) => {
                    if (activeCert.altImageUrl && e.currentTarget.src !== activeCert.altImageUrl) {
                      e.currentTarget.src = encodeURI(activeCert.altImageUrl);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
              className="w-full max-w-2xl bg-[#fbfbfa] rounded-lg shadow-2xl border-4 border-double border-slate-400 p-6 sm:p-10 relative overflow-hidden my-auto text-slate-900"
            >
              {/* Watermark Pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span className="text-8xl font-black text-slate-900 -rotate-45 tracking-widest uppercase">
                  WISETEC
                </span>
              </div>

              {/* Top Certificate Header */}
              <div className="text-center relative z-10 space-y-2 border-b-2 border-slate-800/20 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-serif font-bold text-slate-800">
                  <span>{activeCert.issuer}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-wider">
                  {activeCert.title}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-slate-700 font-bold tracking-tight">
                  {activeCert.code}
                </div>
              </div>

              {/* Certificate Content Table */}
              <div className="my-6 relative z-10 space-y-3 text-xs sm:text-sm">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                  <span className="font-bold text-slate-600 font-serif">상 호 (법인명)</span>
                  <span className="col-span-2 font-bold text-slate-900">(주)와이즈텍 (WISETEC Co., Ltd.)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                  <span className="font-bold text-slate-600 font-serif">대 표 자</span>
                  <span className="col-span-2 font-bold text-slate-900">한 명 옥</span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                  <span className="font-bold text-slate-600 font-serif">소 재 지</span>
                  <span className="col-span-2 text-slate-800">전라남도 광양시 동광길 33 2층</span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                  <span className="font-bold text-slate-600 font-serif">인증/특허 범위</span>
                  <span className="col-span-2 font-bold text-blue-900">{activeCert.scope}</span>
                </div>

                {activeCert.standard && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                    <span className="font-bold text-slate-600 font-serif">적용 규격</span>
                    <span className="col-span-2 font-mono font-bold text-emerald-800">{activeCert.standard}</span>
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-serif">
                  {activeCert.description}
                </div>
              </div>

              {/* Official Stamps and Seals */}
              <div className="mt-6 pt-4 border-t-2 border-slate-800/20 flex justify-between items-end relative z-10">
                <div className="text-left">
                  <span className="text-xs text-slate-500 block font-serif">발행 및 유효기간</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono">{activeCert.issueDate}</span>
                </div>

                <div className="relative flex flex-col items-center">
                  <span className="text-xs font-serif font-bold text-slate-800 tracking-wider mb-1">
                    {activeCert.issuer}
                  </span>
                  <div className="w-14 h-14 rounded-full border-2 border-red-700/80 bg-red-500/10 flex items-center justify-center text-red-700 text-[10px] font-black text-center rotate-6 p-1 select-none">
                    {activeCert.category === 'patent' ? '특허청장인' : '한국가스안전공사'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation Strip (Switch between all 6 certificates) */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 hidden sm:inline">
            인증서 목록 ({CERTIFICATES.length}건):
          </span>
          {CERTIFICATES.map((cert) => {
            const isSelected = cert.id === activeCert.id;
            return (
              <button
                key={cert.id}
                onClick={() => handleSelectCert(cert)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-400 text-white ring-1 ring-blue-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="w-6 h-8 bg-slate-950 rounded border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={encodeURI(cert.imageUrl)}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[11px] max-w-[130px] truncate">
                  <span className={`block truncate font-medium ${isSelected ? 'text-white font-bold' : ''}`}>
                    {cert.badge}
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate font-mono">
                    {cert.issuer}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium text-slate-700">
              원본 등록 파일: <strong className="text-slate-900 font-mono text-[11px] sm:text-xs">{activeCert.downloadName || activeCert.imageUrl.replace(/^\//, '')}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              id="modal-download-original-btn"
              href={imageSrc}
              download={activeCert.downloadName || 'certificate.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>원본 스캔본 다운로드</span>
            </a>

            <a
              id="modal-open-newtab-btn"
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>새 탭에서 원본 보기</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
