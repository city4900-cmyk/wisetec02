import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { NavTab, AboutSubTab, ServicesSubTab, TechSubTab, ContactSubTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectAboutSubTab?: (sub: AboutSubTab) => void;
  onSelectServicesSubTab?: (sub: ServicesSubTab) => void;
  onSelectTechSubTab?: (sub: TechSubTab) => void;
  onSelectContactSubTab?: (sub: ContactSubTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectAboutSubTab,
  onSelectServicesSubTab,
  onSelectContactSubTab,
}) => {
  const goAbout = (sub: AboutSubTab) => {
    onSelectTab('about');
    onSelectAboutSubTab?.(sub);
  };

  const goService = (sub: ServicesSubTab) => {
    onSelectTab('services');
    onSelectServicesSubTab?.(sub);
  };

  const goContact = () => {
    onSelectTab('contact');
    onSelectContactSubTab?.('inquiry');
  };

  return (
    <footer className="border-t border-[#dfe5eb] bg-[#F5F8FA] text-[#152238]">
      <div className="mx-auto max-w-[1440px] px-6 pb-[22px] pt-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 lg:h-[140px] lg:flex-row lg:justify-between lg:gap-0">
          <div className="max-w-[620px] lg:flex lg:h-[140px] lg:flex-col">
            <div className="flex h-12 items-center gap-[14px]">
              <span className="relative h-[42px] w-[78px] shrink-0 overflow-hidden" aria-hidden="true">
                <img
                  src="/figma-assets/header-logo.png"
                  alt=""
                  className="absolute left-[-4.88%] top-[-21.47%] h-[165.03%] w-[108.78%] max-w-none"
                />
              </span>
              <span className="flex flex-col whitespace-nowrap font-bold leading-[1.35]">
                <span className="text-[21px]">(주)와이즈텍</span>
                <span className="text-[10px] text-[#68758a]">WISETEC</span>
              </span>
            </div>

            <p className="mt-3 max-w-[610px] text-[13px] leading-[1.7] text-[#68758a]">
              자율안전검사와 비파괴검사(NDT) 전문 기업.
              <br />
              기술력과 체계적인 품질 관리로 현장의 안전과 신뢰를 함께 지킵니다.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-bold leading-[1.6] text-[#152238]">
              <span className="inline-flex items-center gap-2">
                <i className="h-[5px] w-[5px] rounded-full bg-[#0649ed]" />
                ISO 9001:2015&nbsp; · &nbsp;ISO 45001:2018
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="h-[5px] w-[5px] rounded-full bg-[#f5a400]" />
                특허 제10-2613687호
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between lg:h-[140px] lg:w-[315px] lg:shrink-0">
            <div className="min-w-0 lg:absolute lg:left-[30px] lg:top-1/2 lg:w-[190px] lg:-translate-y-1/2">
              <p className="text-[14px] font-bold leading-[1.7]">고객지원</p>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="mt-1 block whitespace-nowrap text-[22px] font-bold leading-[1.5] tracking-[-0.02em] hover:text-[#0649ed]"
              >
                {COMPANY_INFO.phone}
              </a>
              <div className="mt-2 text-[12px] leading-[1.7] text-[#68758a]">
                <p>평일 08:30–18:00</p>
                <p>주말·공휴일 긴급 검사 대응 가능</p>
              </div>
              <a href={`mailto:${COMPANY_INFO.email}`} className="mt-0 inline-flex items-center text-[12px] leading-[1.7] text-[#68758a] hover:text-[#0649ed]">
                {COMPANY_INFO.email}
              </a>
            </div>

            <button
              type="button"
              onClick={goContact}
              className="flex min-h-[88px] w-full shrink-0 items-center justify-between gap-3 rounded-md bg-[#0649ed] px-5 py-4 text-left text-[13px] font-bold leading-[1.7] text-white transition-colors hover:bg-[#003bd1] sm:w-[180px] lg:absolute lg:left-[219px] lg:top-1/2 lg:h-[131px] lg:w-[96px] lg:-translate-y-1/2 lg:flex-col lg:justify-center lg:gap-3 lg:px-3 lg:py-3 lg:text-center"
            >
              <span>온라인 견적 및<br />상담 문의</span>
              <ArrowRight className="h-[22px] w-[22px] shrink-0" strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="mt-[20px] border-t border-[#e6ebf2] pt-[20px]">
          <div className="flex flex-col gap-5 md:h-[54px] md:flex-row md:items-start md:justify-between">
            <div className="space-y-1 text-[11px] leading-[1.7] text-[#68758a] md:w-[880px]">
              <p>(주)와이즈텍&nbsp; · &nbsp;대표자 {COMPANY_INFO.ceo}&nbsp; · &nbsp;사업자등록번호 {COMPANY_INFO.businessNumber}</p>
              <p>주소&nbsp; {COMPANY_INFO.addressDetail}&nbsp; · &nbsp;주요사업&nbsp; 자율안전검사 / 비파괴검사 / 기술시험 및 분석</p>
            </div>

            <nav aria-label="푸터 주요 메뉴" className="flex items-center justify-start gap-7 text-[13px] font-medium leading-7 md:h-7 md:w-[315px] md:justify-end">
              <a href="/about/greeting/" className="hover:text-[#0649ed]">회사소개</a>
              <a href="/services/safety/" className="hover:text-[#0649ed]">사업분야</a>
              <a href="/contact/inquiry/" className="hover:text-[#0649ed]">고객지원</a>
            </nav>
          </div>

          <p className="mt-[20px] text-[11px] leading-[1.7] text-[#68758a]">
            Copyright © (주)와이즈텍. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
