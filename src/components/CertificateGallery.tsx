import React from 'react';
import { ArrowUpRight, Download, ShieldCheck } from 'lucide-react';
import { CERTIFICATES } from '../data/companyData';
import type { CertificateItem } from '../types';

export function CertificateGallery({ onOpen }: { onOpen: (cert: CertificateItem) => void }) {
  const documents = CERTIFICATES.filter(cert => cert.publicCopy);
  return (
    <section id="certificates" className="certificate-gallery scroll-mt-28 bg-[#f5f8fb] px-5 py-16 sm:px-8 lg:px-[5%] lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div data-scroll-reveal className="flex flex-wrap items-end justify-between gap-5">
          <div><h2 className="text-[27px] font-bold tracking-tight text-[#152b40] sm:text-[34px]">기술의 신뢰를 증명합니다</h2><p className="mt-3 text-[14px] leading-relaxed text-[#687787]">와이즈텍의 경영시스템 인증과 전문분야 등록 현황을 확인하세요.</p></div>
          <span className="inline-flex items-center gap-2 text-[12px] text-[#687787]"><ShieldCheck size={16} />개인정보를 보호한 공개용 사본</span>
        </div>
        <div data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map(cert => <article key={cert.id} className="grid grid-cols-[clamp(88px,30%,132px)_minmax(0,1fr)] overflow-hidden rounded-[16px] border border-[#e0e6ed] bg-white">
            <button type="button" onClick={() => onOpen(cert)} className="group grid w-full place-items-center bg-[#edf1f5] p-2 text-left sm:p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#306395]" aria-label={`${cert.title} 확대 보기`}>
              <div className="relative aspect-[210/297] w-full bg-white shadow-[0_4px_15px_rgba(30,50,70,0.10)]"><img src={cert.imageUrl} alt={`${cert.title} 공개용 사본 미리보기`} loading="lazy" className="h-full w-full object-contain" /><span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#306395] shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight size={14} /></span></div>
            </button>
            <div className="flex min-w-0 flex-col justify-center p-3 sm:px-4"><h3 className="mb-1 mt-1 text-[16px] font-bold text-[#152b40]">{cert.title}</h3><p className="text-[12px] text-[#687787]">{cert.issuer}</p><p className="mt-1 text-[12px] leading-relaxed text-[#687787]">{cert.issueDate}</p><p className="mt-1 text-[12px] leading-relaxed text-[#687787]">{cert.description}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[#edf1f5] pt-2 text-[13px] font-semibold"><button type="button" onClick={() => onOpen(cert)} className="text-[#306395] hover:underline">확대 보기{(cert.pages?.length ?? 1) > 1 ? ` · ${cert.pages!.length}쪽` : ''}</button><a href={cert.pdfUrl} download={cert.downloadName} className="inline-flex items-center gap-1.5 text-[#526174] hover:text-[#306395]" aria-label={`${cert.title} 공개용 PDF 다운로드`}><Download size={15} />PDF</a></div></div>
          </article>)}
        </div>
        <p className="mt-6 text-[12px] leading-relaxed text-[#687787]">확대 보기와 PDF 다운로드는 모두 공개용 사본입니다. 개인정보와 내부 관리정보는 가림 처리했습니다.</p>
      </div>
    </section>
  );
}
