import React, { useEffect, useRef, useState } from 'react';
import { BusFront, Clock3, ExternalLink, Mail, MapPin, Phone, CarFront } from 'lucide-react';
import { AboutSubTab, CertificateItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { NaverMapPreview } from '../components/NaverMapPreview';
import { SiteSection } from '../components/SectionSwitcher';
import { SectionNavigation } from '../components/SectionNavigation';
import { SectionHero } from '../components/SectionHero';
import { useScrollReveal } from '../components/useScrollReveal';

interface AboutViewProps {
  onSubTabChange?: (sub: AboutSubTab) => void;
  initialSubTab?: AboutSubTab;
  onOpenCertificateModal?: (cert: CertificateItem) => void;
  onSelectSection?: (section: SiteSection) => void;
}

const tabs: { id: AboutSubTab; label: string }[] = [
  { id: 'greeting', label: 'CEO 인사말' },
  { id: 'overview', label: '기업 개요 및 연혁' },
  { id: 'location', label: '오시는 길(Location)' },
];

const history = [
  { year: '2026.09', title: '자율안전검사기관등록', detail: '' },
  { year: '2024', title: '온라인 견적 시스템 고도화 및 전국 플랜트 검사 확대', detail: '' },
  { year: '2023', title: "'곤돌라 고정식 진공상자 누설검사시스템' 특허 등록 (제 10-2613687 호)", detail: '한국가스안전공사(KGS) ISO 9001 & ISO 45001 동시 인증 획득' },
  { year: '2021.09.01', title: '(주)와이즈텍 법인 설립 및 사업 개시', detail: '' },
];

export const AboutView: React.FC<AboutViewProps> = ({ initialSubTab = 'greeting', onSubTabChange, onSelectSection }) => {
  const [activeSubTab, setActiveSubTab] = useState<AboutSubTab>(initialSubTab);

  const contentRef = useRef<HTMLElement>(null);
  useScrollReveal(contentRef, activeSubTab);

  useEffect(() => setActiveSubTab(initialSubTab), [initialSubTab]);

  return (
    <main ref={contentRef} className={`inner-refresh about-refresh mx-auto w-full max-w-none bg-white px-0 ${activeSubTab === 'location' || activeSubTab === 'overview' ? 'pb-0' : 'pb-16'}`}>
      <SectionHero title="회사소개" subtitle="신뢰와 기술로 미래 산업 안전을 선도합니다" backgroundImage="/figma-assets/company-hero-image26.png" backgroundSize="cover" backgroundPosition="center 30%" plainBackground />

      <SectionNavigation
        section="about"
        items={tabs}
        active={activeSubTab}
        onChange={(sub) => onSubTabChange ? onSubTabChange(sub) : setActiveSubTab(sub)}
        onSelectSection={onSelectSection}
      />

      <section key={activeSubTab} className={`about-panel about-panel--${activeSubTab}`} >
        {activeSubTab === 'greeting' && (
          <div className="bg-white">
            <div className="px-5 pb-10 pt-[60px] sm:px-10 sm:pb-12 sm:pt-[60px] lg:px-[4%]">
              <h2 data-scroll-reveal className="mb-[60px] text-center text-[28px] font-bold leading-relaxed text-[#151515]">
                고객의 안전을 지키는 기술,<br /><span>신뢰로 이어지는 와이즈텍의 약속.</span>
              </h2>
              <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                <div data-scroll-reveal data-reveal-after-scroll className="about-greeting-logo">
                  <img
                    src="/figma-assets/header-logo.png"
                    alt="WISETEC Technical Engineering Company 로고"
                    className="h-auto w-full max-w-[410px] object-contain"
                  />
                </div>
                <article data-reveal-group className="text-[13px] leading-[1.65] text-[#222] sm:text-[14px]">
                <div data-reveal-group className="space-y-3.5">
                  <p>안녕하십니까. (주)와이즈텍 공식 홈페이지를 찾아주신 고객 여러분을 진심으로 환영합니다.</p>
                  <p>현대 산업 현장은 고도화된 기술과 함께 대형화·복잡화되고 있으며, 구조물의 결함을 조기에 발견하고 작업장 내 위험 기계를 체계적으로 검사하는 일의 중요성은 그 어느 때보다 강조되고 있습니다.</p>
                  <p>(주)와이즈텍은 산업안전보건법에 따른 자율안전검사 기관으로서 자율안전검사 및 비파괴검사를 주력으로 수행하는 전문 기술 엔지니어링 기업입니다.</p>
                  <p>한국가스안전공사(KGS)로부터 ISO 9001 품질경영 및 ISO 45001 안전보건경영 인증을 획득했으며, 자체 개발한 곤돌라 고정식 진공상자 누설검사시스템(특허 제10-2613687호)으로 고소 작업 환경의 안전성과 검사 정밀도를 높였습니다.</p>
                  <p>앞으로도 현장 중심의 신속하고 정확한 검사 서비스와 끊임없는 기술 개발로 고객 여러분의 소중한 자산과 근로자 안전을 지키겠습니다.</p>
                </div>
                <div className="mt-6 flex items-end justify-between text-[12px] text-[#777]">
                  <span>(주)와이즈텍 임직원 일동</span>
                  <span className="text-right"><span className="block text-[11px] text-[#777]">(주)와이즈텍 대표이사</span><strong className="text-[16px] text-[#222]">한 명 옥</strong></span>
                </div>
              </article>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'overview' && (
          <div className="bg-[#F5F8FA]">
            <div data-reveal-group className="bg-[#F5F8FA] px-5 pb-8 pt-16 sm:px-8 sm:pb-10 lg:px-[5%]">
              <div data-reveal-group className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h2 className="mb-0 text-[18px] font-bold text-[#171717]">기업개요 (COMPANY OVERVIEW)</h2>
                  <dl className="px-6 py-5 text-[15px] leading-[1.6] sm:px-7 sm:py-6">
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">회사명</dt><dd className="text-[#171717]">{COMPANY_INFO.name} ({COMPANY_INFO.nameEn})</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">대표자</dt><dd className="text-[#171717]">{COMPANY_INFO.ceo}</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">소재지</dt><dd className="text-[#171717]">전남광주 광양시 동광길33 2층</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">설립일</dt><dd className="text-[#171717]">2021년 09월 01일</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">사업자등록번호</dt><dd className="text-[#171717]">581-86-02568</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">업태/종목</dt><dd className="text-[#171717]">전문, 과학 및 기술서비스업 / 자율안전검사, 비파괴 기술시험 및 분석업</dd>
                  </div>
                  <div className="grid grid-cols-[118px_1fr] gap-3 py-3 sm:grid-cols-[148px_1fr] sm:gap-4 sm:py-4">
                    <dt className="font-bold text-[#171717]">주요사업</dt>
                    <dd className="text-[#171717]">
                      <ol className="list-decimal space-y-1 pl-6">
                        <li>건설기계 안전점검 및 비파괴검사</li>
                        <li>위험기계기구 자율안전검사</li>
                        <li>비파괴검사전문기관</li>
                      </ol>
                    </dd>
                  </div>
                  </dl>
                </div>

                <div>
                  <h2 className="mb-2 text-[18px] font-bold text-[#171717]">기업 CI (CORPORATE IDENTITY)</h2>
                  <div className="flex flex-col items-center gap-6 px-5 py-4 sm:px-8">
                    <img
                      src="/figma-assets/header-logo.png"
                      alt="WISETEC Technical Engineering Company 로고"
                      className="h-auto w-full max-w-[300px] object-contain lg:max-w-[320px]"
                    />
                    <div className="w-full space-y-4 text-[14px] leading-[1.7] text-[#444]">
                      <p><strong className="text-[16px] font-bold text-[#e59b00]">W (Wise / World-class Safety):</strong><br />지혜롭고 철저한 안전 검사 체계와 전문 엔지니어링 역량을 상징하는 견고한 블랙/차콜 베이스</p>
                      <p><strong className="text-[16px] font-bold text-[#e59b00]">T (Technology / Trust):</strong><br />독보적 검사 기술력과 고객 신뢰를 상징하는 활력 넘치는 황금빛(골드-앰버) 모노그램</p>
                      <p><strong className="text-[16px] font-bold text-[#e59b00]">Orbital Ring (오비탈 궤도 링):</strong><br />비파괴검사와 자율안전검사를 통한 360도 전방위 무결점 안전관리망과 미래지향적 가치 표현</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section data-reveal-group className="company-history-section bg-white px-5 sm:px-8 lg:px-[5%]">
              <div className="editorial-section-heading"><h3>신뢰를 쌓아온 발자취</h3><span>기업 주요 연혁</span></div>
              <ol data-reveal-group className="company-history-timeline">
                {history.map((item) => (
                  <li key={item.year}>
                    <time>{item.year}</time>
                    <div className="company-history-event"><h4>{item.title}</h4>{item.detail && <p>{item.detail}</p>}</div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}

        {activeSubTab === 'location' && (
          <div data-reveal-group className="bg-white px-5 py-[100px] sm:px-8 lg:px-[5%]">
            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
              <div className="mx-auto aspect-square w-full max-w-[440px] overflow-hidden border border-[#888]">
                <NaverMapPreview />
              </div>
              <div className="lg:px-2">
                <h2 className="mb-4 text-[18px] font-bold text-[#222]">와이즈텍 본사 안내</h2>
                <div className="rounded-xl bg-[#F5F8FA] px-4 py-3">
                  <p className="text-[12px] text-[#667085]">도로명주소</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-[#252525]">{COMPANY_INFO.address}</p>
                  <p className="mt-1 text-[11px] text-[#667085]">지번 : 전남 광양시 중동 (중마동행정복지센터 인근)</p>
                </div>

                <div className="mt-4 space-y-3 text-[13px] text-[#252525]">
                  <p className="flex items-center gap-3"><Phone className="h-5 w-5 shrink-0" /><span><small className="block text-[13px] text-[#777]">대표전화</small>{COMPANY_INFO.phone}</span></p>
                  <p className="flex items-center gap-3"><Mail className="h-5 w-5 shrink-0" /><span><small className="block text-[13px] text-[#777]">이메일 문의</small><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a></span></p>
                  <p className="flex items-center gap-3"><Clock3 className="h-5 w-5 shrink-0" /><span><small className="block text-[13px] text-[#777]">업무시간</small>{COMPANY_INFO.workingHours}</span></p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://map.kakao.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#ffe500] px-4 py-2 text-[13px] font-semibold text-[#222] hover:bg-[#f2d900]"
                  ><MapPin className="h-3.5 w-3.5" />카카오맵 길찾기 바로가기 <ExternalLink className="h-3 w-3" /></a>
                  <a
                    href={`https://map.naver.com/p/search/${encodeURIComponent(COMPANY_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#03c75a] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#02b350]"
                  ><MapPin className="h-3.5 w-3.5" />네이버맵 길찾기 바로가기 <ExternalLink className="h-3 w-3" /></a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#c7c7c7] px-3 py-3 shadow-sm">
                    <h3 className="flex items-center gap-2 text-[12px] font-semibold text-[#222]"><CarFront className="h-4 w-4" />자가용 이용 시</h3>
                    <p className="mt-1 text-[10px] leading-[1.5] text-[#555]">동광양IC 또는 광양IC 진출 후 광양시청 및 중마동 방면으로 약 10분 소요 (네비게이션 ‘광양시 동광길 33’ 검색)</p>
                  </div>
                  <div className="rounded-lg border border-[#c7c7c7] px-3 py-3 shadow-sm">
                    <h3 className="flex items-center gap-2 text-[12px] font-semibold text-[#222]"><BusFront className="h-4 w-4" />대중교통 / KTX 이용 시</h3>
                    <p className="mt-1 text-[10px] leading-[1.5] text-[#555]">중마터미널에서 하차 후 택시 / KTX 순천역 또는 광양역 연계 버스 이용 후 중마동 하차</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
