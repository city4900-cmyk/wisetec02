import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onSelectCertificate?: (cert: CertificateItem) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!certificate) return;
    setZoom(1); setPage(0);
    const focused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const focusable: HTMLElement[] = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); focused?.focus(); };
  }, [certificate, onClose]);
  if (!certificate) return null;
  const pages = certificate.pages ?? [certificate.imageUrl];
  const currentPage = Math.min(page, pages.length - 1);
  const file = certificate.pdfUrl ?? encodeURI(certificate.imageUrl);
  return (
    <div id="certificate-modal-overlay" className="fixed inset-0 z-[70] flex items-center justify-center bg-[#102235]/80 p-2 backdrop-blur-sm sm:p-5" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="certificate-viewer-title" className="site-dialog-motion flex h-[94dvh] w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#e0e6ed] px-4 py-4 sm:px-6">
          <div className="min-w-0"><p className="mb-1 text-[11px] font-bold text-[#306395]">{certificate.badge}{certificate.publicCopy ? ' · 공개용 사본' : ''}</p><h2 id="certificate-viewer-title" className="text-[17px] font-bold leading-snug text-[#152b40] sm:text-[21px]">{certificate.title}</h2><p className="mt-1 text-[11px] text-[#687787]">{certificate.issuer}</p></div>
          <button ref={closeRef} id="modal-close-btn" type="button" onClick={onClose} aria-label="인증서 닫기" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#152b40] hover:bg-[#e1e9f1]"><X size={20} /></button>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#e0e6ed] px-4 py-2 text-[12px] sm:px-6">
          <div className="flex items-center gap-2"><button type="button" aria-label="축소" disabled={zoom <= 0.75} onClick={() => setZoom(z => Math.max(.75, z - .25))} className="rounded p-2 hover:bg-slate-100 disabled:opacity-30"><ZoomOut size={18} /></button><button type="button" onClick={() => setZoom(1)} className="min-w-12 rounded p-2 hover:bg-slate-100" aria-label="화면에 맞추기">{Math.round(zoom * 100)}%</button><button type="button" aria-label="확대" disabled={zoom >= 3} onClick={() => setZoom(z => Math.min(3, z + .25))} className="rounded p-2 hover:bg-slate-100 disabled:opacity-30"><ZoomIn size={18} /></button></div>
          {pages.length > 1 && <div className="flex items-center gap-2"><button type="button" aria-label="이전 페이지" disabled={currentPage === 0} onClick={() => { setPage(p => p - 1); setZoom(1); }} className="p-2 disabled:opacity-30"><ChevronLeft size={18} /></button><span aria-live="polite">{currentPage + 1} / {pages.length}쪽</span><button type="button" aria-label="다음 페이지" disabled={currentPage >= pages.length - 1} onClick={() => { setPage(p => p + 1); setZoom(1); }} className="p-2 disabled:opacity-30"><ChevronRight size={18} /></button></div>}
          <span className="text-[#687787]">{certificate.code}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-[#e9eef3] p-3 sm:p-6"><div className="mx-auto" style={{ width: `${zoom * 100}%`, maxWidth: zoom === 1 ? '650px' : undefined }}><img src={encodeURI(pages[currentPage])} alt={`${certificate.title}${certificate.publicCopy ? ' 공개용 사본' : ''} ${currentPage + 1}페이지`} className="block h-auto w-full bg-white shadow-md" /></div></div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#e0e6ed] px-4 py-3 sm:px-6"><p className="text-[11px] leading-relaxed text-[#687787]">{certificate.publicCopy ? '개인정보·내부 관리정보를 가림 처리한 공개용 사본입니다.' : certificate.scope}</p><div className="flex flex-wrap gap-2"><a id="modal-download-original-btn" href={file} download={certificate.downloadName} className="inline-flex items-center gap-2 rounded-lg bg-[#306395] px-4 py-2.5 text-[12px] font-semibold text-white"><Download size={15} />{certificate.pdfUrl ? '공개용 PDF 다운로드' : '문서 다운로드'}</a><a href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#f1f5f9] px-3 py-2 text-[12px] font-semibold text-[#526174]"><ExternalLink size={14} />새 탭에서 보기</a></div></div>
      </div>
    </div>
  );
};
