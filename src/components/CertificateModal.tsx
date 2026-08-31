import React, { useState } from 'react';
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
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<'image' | 'digital'>('image');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!certificate) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex-shrink-0 flex items-center justify-center text-blue-700">
              {certificate.category === 'patent' ? (
                <Sparkles className="w-5 h-5 text-amber-600" />
              ) : certificate.category === 'iso' ? (
                <Award className="w-5 h-5 text-blue-600" />
              ) : (
                <Shield className="w-5 h-5 text-slate-700" />
              )}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {certificate.title}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {certificate.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono truncate">
                {certificate.code} · 발급/인증기관: {certificate.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => {
                  setViewMode('image');
                  handleReset();
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                  viewMode === 'image'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>원본 사진</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('digital');
                  handleReset();
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                  viewMode === 'digital'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>상세 내역</span>
              </button>
            </div>

            {/* Viewer Controls */}
            <div className="hidden md:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                title="축소"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-1.5 text-slate-600 min-w-[42px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                title="확대"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleRotate}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600 ml-1 border-l border-slate-200 pl-2"
                title="회전"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                title="인쇄"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200/70 hover:bg-slate-300 text-slate-700 transition-colors ml-1"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-900/90 flex items-center justify-center relative">
          {viewMode === 'image' && certificate.imageUrl ? (
            <div className="w-full h-full flex items-center justify-center p-2 overflow-auto">
              <div
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-out',
                  transformOrigin: 'center center',
                }}
                className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl rounded-lg overflow-hidden bg-white"
              >
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[72vh] w-auto object-contain rounded shadow-inner"
                  onError={(e) => {
                    // Fallback to altImageUrl if primary fails
                    if (certificate.altImageUrl && e.currentTarget.src !== certificate.altImageUrl) {
                      e.currentTarget.src = certificate.altImageUrl;
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
              className="w-full max-w-2xl bg-[#fbfbfa] rounded-lg shadow-xl border-4 border-double border-slate-400 p-6 sm:p-10 relative overflow-hidden my-auto"
            >
              {/* Watermark Pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none select-none">
                <span className="text-8xl font-black text-slate-900 -rotate-45 tracking-widest uppercase">
                  WISETEC
                </span>
              </div>

              {/* Top Certificate Header */}
              <div className="text-center relative z-10 space-y-2 border-b-2 border-slate-800/20 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-serif font-bold text-slate-800">
                  <span>{certificate.issuer}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-wider">
                  {certificate.title}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-slate-700 font-bold tracking-tight">
                  {certificate.code}
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
                  <span className="col-span-2 text-slate-800">전라남도 광양시 중마청룡길 30-6, 2층(중동)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                  <span className="font-bold text-slate-600 font-serif">인증/특허 범위</span>
                  <span className="col-span-2 font-bold text-blue-900">{certificate.scope}</span>
                </div>

                {certificate.standard && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/80 rounded border border-slate-200">
                    <span className="font-bold text-slate-600 font-serif">적용 규격</span>
                    <span className="col-span-2 font-mono font-bold text-emerald-800">{certificate.standard}</span>
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-serif">
                  {certificate.description}
                </div>
              </div>

              {/* Official Stamps and Seals */}
              <div className="mt-6 pt-4 border-t-2 border-slate-800/20 flex justify-between items-end relative z-10">
                <div className="text-left">
                  <span className="text-xs text-slate-500 block font-serif">발행 및 유효기간</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono">{certificate.issueDate}</span>
                </div>

                <div className="relative flex flex-col items-center">
                  <span className="text-xs font-serif font-bold text-slate-800 tracking-wider mb-1">
                    {certificate.issuer}
                  </span>
                  <div className="w-14 h-14 rounded-full border-2 border-red-700/80 bg-red-500/10 flex items-center justify-center text-red-700 text-[10px] font-black text-center rotate-6 p-1 select-none">
                    {certificate.category === 'patent' ? '특허청장인' : '한국가스안전공사'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 bg-white border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">
              첨부 파일: <strong className="text-slate-900 font-mono">{certificate.downloadName || certificate.imageUrl}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={certificate.imageUrl}
              download={certificate.downloadName || 'certificate.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors border border-blue-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>사진 원본 다운로드</span>
            </a>

            <a
              href={certificate.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>새 창에서 보기</span>
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
