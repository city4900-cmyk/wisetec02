import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { InspectionProcess, ServiceStrengths } from '../components/ServiceContent';
import { ServicesSubTab, NavTab, ContactSubTab } from '../types';
import { NDT_SERVICES, SAFETY_INSPECTION_ITEMS } from '../data/companyData';
import { SiteSection } from '../components/SectionSwitcher';
import { SectionNavigation } from '../components/SectionNavigation';
import { ConstructionInspection } from '../components/ConstructionInspection';
import { SectionHero } from '../components/SectionHero';
import { useScrollReveal } from '../components/useScrollReveal';

interface ServicesViewProps {
  onSubTabChange?: (sub: ServicesSubTab) => void;
  initialSubTab?: ServicesSubTab;
  initialNdtMethod?: string;
  scrollToNdtDetails?: boolean;
  onSelectTab: (tab: NavTab) => void;
  onSelectContactSubTab: (sub: ContactSubTab) => void;
  onSelectSection?: (section: SiteSection) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialSubTab = 'safety',
  onSubTabChange,
  initialNdtMethod = 'ut',
  scrollToNdtDetails = false,
  onSelectTab,
  onSelectContactSubTab,
  onSelectSection,
}) => {
  const reduceMotion = useReducedMotion();
  const servicesRef = useRef<HTMLDivElement>(null);
  const [activeSubTab, setActiveSubTab] = useState<ServicesSubTab>(initialSubTab);
  const [selectedNdtDetail, setSelectedNdtDetail] = useState<string>(initialNdtMethod);

  useScrollReveal(servicesRef, activeSubTab);

  useEffect(() => setActiveSubTab(initialSubTab), [initialSubTab]);
  useEffect(() => setSelectedNdtDetail(initialNdtMethod), [initialNdtMethod]);
  useEffect(() => {
    if (!scrollToNdtDetails) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('ndt-technique-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollToNdtDetails]);

  const selectedNdt = NDT_SERVICES.find((s) => s.id === selectedNdtDetail) || NDT_SERVICES[0];
  const ndtCardCopy: Record<string, { principle: string; applications: string[]; strengths: string[] }> = {
    ut: {
      principle: '압전소자로 0.5~15MHz 고주파 음파를 재료에 주입한 뒤, 내부 결함이나 밑면에서 반사되는 에코 신호의 전파 시간과 진폭을 분석해 결함의 위치·크기 및 잔여 두께를 정밀 측정합니다.',
      applications: ['후판·단조재 및 배관 잔여 두께 측정 (Corrosion Mapping)', '압력용기 및 배관 용접부 내부 균열·용융 불량 검사', '샤프트·롤러·회전기계 축의 피로 균열 검사'],
      strengths: ['방사선 피폭 위험 없이 현장에서 즉시 검사', '두꺼운 부재 내부의 깊은 결함까지 검출', 'A-Scan으로 결함 깊이와 위치를 바로 확인'],
    },
    paut: {
      principle: '다채널 탐촉자의 시간차를 제어해 초음파 빔의 각도와 초점을 조절하고, 용접부 단면을 영상으로 분석해 결함의 위치와 크기를 확인합니다.',
      applications: ['고온·고압 배관 및 플랜트 용접부 검사', '방사선 위험 없이 수행하는 RT 대체 검사', '플랜지·노즐·엘보 등 복잡한 형상 검사'],
      strengths: ['한 번의 스캔으로 넓은 범위를 검사', '결함을 2D·3D 영상으로 확인', '데이터를 디지털로 저장해 판독·비교 가능'],
    },
    mt: {
      principle: '강자성체를 자화한 뒤 자분을 도포합니다. 표면이나 표면 가까이의 균열에서 새어 나오는 자속에 자분이 모여 결함을 보여줍니다.',
      applications: ['탄소강·저합금강 용접부 표면 균열 검사', '크레인 및 리프팅 구조물 피로 균열 검사', '단조품·주강품의 표면 결함 검사'],
      strengths: ['미세한 표면 균열도 쉽게 확인', '검사 속도가 빠르고 현장 적용이 간편', '형광 자분으로 높은 검출 감도 확보'],
    },
    pt: {
      principle: '표면에 침투액을 도포해 열린 결함에 스며들게 한 뒤, 현상제를 사용해 침투액을 드러내고 미세 균열을 확인합니다.',
      applications: ['스테인리스강·알루미늄 등 비철금속 용접부', '세라믹·플라스틱 등 비다공성 재료 표면', '터빈 블레이드·밸브·펌프의 미세 균열 검사'],
      strengths: ['비자성체와 다양한 재료에 적용 가능', '복잡한 형상도 넓은 면적을 한 번에 검사', '별도 전원 없이 현장에서 바로 수행'],
    },
  };
  const selectedNdtCopy = ndtCardCopy[selectedNdt.id];

  return (
    <div ref={servicesRef} className="inner-refresh services-content w-full bg-white font-sans">
      <SectionHero
        title={activeSubTab === 'safety' ? '자율안전검사' : activeSubTab === 'construction' ? '건설기계 안전성 검사' : '비파괴검사'}
        subtitle="산업 현장의 안전과 품질을 검증하는 전문 검사 솔루션"
        backgroundImage="/figma-assets/business-hero-frame21.png"
        backgroundSize="cover"
        backgroundPosition="center 39%"
      />

      {/* Sub-tab Navigation */}
      <SectionNavigation
        section="services"
        items={[{ id: 'safety', label: '자율안전검사' }, { id: 'construction', label: '건설기계 안전성 검사' }, { id: 'ndt', label: '비파괴검사' }]}
        active={activeSubTab}
        onChange={(sub) => onSubTabChange ? onSubTabChange(sub) : setActiveSubTab(sub)}
        onSelectSection={onSelectSection}
      />

      {activeSubTab === 'construction' && <ConstructionInspection />}

      {/* 1. Safety Inspection Tab (자율안전검사) */}
      {activeSubTab === 'safety' && (
        <div >
          <section data-reveal-group className="service-introduction border-b border-[#d9d9d9] px-[5.6%]">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <img src="/figma-assets/kcs-logo-transparent.png" alt="KCs 인증" className="h-[39px] w-[37px] shrink-0 object-contain" />
              <span className="rounded-full bg-[#007c53] px-5 py-1 text-[12px] font-bold text-white sm:text-[14px]">
                산업안전보건법에 따른 자율안전검사 기관
              </span>
              <span className="rounded-full border border-[#cbcbcb] px-5 py-1 text-[12px] font-semibold text-black sm:text-[14px]">
                법정 검사
              </span>
            </div>
            <h2 className="mb-6 text-[24px] font-bold text-black sm:text-[28px]">
              자율안전검사 (Safety Inspection)
            </h2>
            <div className="w-full space-y-4 text-[15px] leading-[1.55] text-[rgba(44,44,44,0.8)]">
              <p>
                산업안전보건법(자율안전검사 프로그램 등)에 따라 유해하거나 위험한 기계·기구 및 설비를 사용하는 사업주는 안전인증 기준을 충족하는지 정기적으로 검사해야 합니다.
              </p>
              <p>
                (주)와이즈텍은 법적 자격을 갖춘 전문 검사원을 통해 크레인, 리프트, 곤돌라, 압력용기, 프레스 등 사업장 내 주요 위험 설비에 대한 안전 성능 검사를 대행하여 작업장 무재해 달성과 법적 리스크를 사전에 완벽히 차단합니다.
              </p>
            </div>
          </section>

          <section data-reveal-group className="px-[5.6%] pb-12 pt-14 sm:pb-16">
            <h3 className="content-section-heading mb-10 font-bold">
              자율안전검사 주요 대상 설비 및 법정 검사 주기
            </h3>
            <p className="mobile-table-hint">표를 좌우로 밀어 전체 내용을 확인하세요.</p>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="자율안전검사 대상 및 검사 주기 표">
              <table className="mx-auto w-full min-w-[710px] table-fixed border-collapse text-left sm:w-[calc(100%-50px)]">
                <colgroup><col className="w-[29.7%]" /><col className="w-[35.15%]" /><col className="w-[35.15%]" /></colgroup>
                <thead>
                  <tr className="border-b border-[#d9d9d9] text-[15px] font-semibold text-black sm:text-[17px]">
                    <th className="h-[53px] px-3">대상 기계·기구</th>
                    <th className="h-[53px] px-3">법정 검사 주기</th>
                    <th className="h-[53px] px-3">주요 검사 항목 및 범위</th>
                  </tr>
                </thead>
                <tbody>
                  {SAFETY_INSPECTION_ITEMS.map((item) => (
                    <tr key={item.id} className="border-b border-[#d9d9d9] text-[13px] leading-[1.45] text-black sm:text-[15px]">
                      <td className="min-h-[60px] px-3 py-3 align-middle">{item.targetEquipment}</td>
                      <td className="px-3 py-3 align-middle">{item.legalCycle}</td>
                      <td className="px-3 py-3 align-middle">{item.inspectionScope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>
          <ServiceStrengths items={[
            { title: '정밀한 검사', text: <><strong>초음파 두께 측정과 비파괴 용접부 검사</strong>를 결합해, 육안으로 확인하기 어려운 내부 상태와 피로 균열까지 진단합니다.</> },
            { title: '유연한 검사 일정', text: <>공정 중단 부담을 줄이도록 <strong>주말·야간 일정을 조율</strong>합니다. 전국 출장 검사와 신속한 성적서 발송을 지원합니다.</> },
            { title: '검사 후 안전관리', text: <>결함 발견 시 <strong>개선 조치 보고서와 안전 가이드</strong>를 제공합니다. 검사 결과가 현장의 안전관리로 이어지도록 돕습니다.</> },
          ]} />
        </div>
      )}

      {/* 2. NDT Tab */}
      {activeSubTab === 'ndt' && (
        <div >
          <section data-reveal-group className="service-introduction border-b border-[#d9d9d9] px-[5.6%]">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <img src="/figma-assets/kgs-quality-assurance.png" alt="한국가스안전공사 품질보증" className="h-10 w-12 shrink-0 object-contain" />
              <span className="rounded-full bg-[#eef2f6] px-5 py-1 text-[12px] font-bold text-[#29445f] sm:text-[14px]">
                과학기술정보통신부 등록 업체
              </span>
              <span className="rounded-full border border-[#cbcbcb] px-5 py-1 text-[12px] font-medium text-black sm:text-[14px]">
                KGS 인증 ISO 9001 / 45001
              </span>
            </div>
            <h2 className="mb-5 text-[24px] font-bold text-black sm:text-[28px]">
              비파괴검사 (Non-Destructive Testing)
            </h2>
            <div className="max-w-[1278px] space-y-[15px] text-[15px] leading-[1.65] text-[#333]">
              <p>
                비파괴검사란 구조물이나 부품, 소재를 손상시키거나 파괴하지 않고 물리적 현상(초음파 음향 전파, 위상배열 전자 빔 집속, 자속 누설, 모세관 침투 등)을 응용하여 내부 및 표면의 결함 여부와 건전성을 판정하는 공인 정밀 기술 서비스입니다.
              </p>
              <p>
                (주)와이즈텍은 최고의 숙련 기술자와 첨단 검사장비를 통해 신뢰할 수 있는 성적서를 제공합니다.
              </p>
            </div>
          </section>

          <section data-reveal-group id="ndt-technique-details" className="scroll-mt-[84px] px-[5.6%] pb-16 pt-12 sm:pt-[64px]">
            <h3 className="content-section-heading mb-8 font-bold">
              NDT 4대 공인 검사 영역 및 기술 소개
            </h3>

            <div className="ndt-detail-panel relative mx-auto max-w-[1310px] bg-[#f0f7ff] px-4 pb-5 pt-4 sm:px-6 sm:pb-6 lg:min-h-[540px] lg:px-[35px] lg:pb-8 lg:pt-0">
              <div className="relative z-10 ml-auto flex w-fit overflow-hidden lg:absolute lg:right-[76px] lg:top-0">
                {NDT_SERVICES.map((method) => {
                  const isSelected = selectedNdtDetail === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedNdtDetail(method.id)}
                      className={`relative inline-flex w-[58px] items-center justify-center border-0 font-medium transition-colors sm:w-[75px] ${
                        isSelected
                          ? 'h-[46px] bg-[#0048ef] text-[16px] font-bold text-white sm:h-[60px] sm:text-[21px]'
                          : '-top-[10px] h-[51px] bg-white text-[13px] text-black hover:bg-blue-50 sm:-top-[14px] sm:h-[65px] sm:text-[18px]'
                      }`}
                    >
                      {method.code}
                    </button>
                  );
                })}
              </div>

              <div className="isolate grid">
              <AnimatePresence initial={false}>
                <motion.div
                  key={selectedNdt.id}
                  className="relative lg:pt-[195px]"
                  style={{ gridArea: '1 / 1', mixBlendMode: 'plus-lighter' }}
                  initial={{ opacity: reduceMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
                >
              <div className="relative mt-5 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 lg:absolute lg:left-[23px] lg:top-[55px] lg:mt-0 lg:flex-nowrap">
                <span className="text-[24px] font-bold leading-none text-[#0048ef] sm:text-[28px]">{selectedNdt.code}</span>
                <h4 className="min-w-0 text-[18px] font-bold leading-tight text-black sm:text-[23px]">
                  {selectedNdt.nameKo} ({selectedNdt.nameEn})
                </h4>
              </div>
              <p className="mt-3 text-[13px] font-medium leading-[1.55] text-[rgba(44,44,44,0.8)] sm:text-[15px] lg:absolute lg:left-[23px] lg:right-[23px] lg:top-[110px] lg:mt-0 lg:text-[17px]">
                {selectedNdt.summary}
              </p>

              <div className="mx-auto mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-0 lg:w-[calc(100%-140px)] lg:grid-cols-4 lg:gap-5">
                <article className="min-h-[190px] rounded-[16px] bg-white px-4 py-5 text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[260px] sm:rounded-[20px] sm:py-[30px] lg:h-[300px] lg:overflow-hidden">
                  <h5 className="mb-5 translate-y-[2px] text-[14px] font-bold text-black sm:mb-[40px] sm:translate-y-[5px] sm:text-[17px] lg:mb-[54px]">검사원리</h5>
                  <p className="-translate-y-[10px] break-keep text-[12px] leading-[1.65] text-black sm:text-[14px]">{selectedNdtCopy.principle}</p>
                </article>

                <article className="min-h-[190px] rounded-[16px] bg-white px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[260px] sm:rounded-[20px] sm:py-[30px] lg:h-[300px] lg:overflow-hidden">
                  <h5 className="mb-5 translate-y-[2px] text-center text-[14px] font-bold text-black sm:mb-[40px] sm:translate-y-[5px] sm:text-[17px] lg:mb-[54px]">주요 적용 분야</h5>
                  <ul className="-translate-y-[10px] list-disc space-y-1 break-keep pl-5 text-[12px] leading-[1.55] text-black sm:text-[14px]">
                    {selectedNdtCopy.applications.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>

                <article className="min-h-[190px] rounded-[16px] bg-white px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[260px] sm:rounded-[20px] sm:py-[30px] lg:h-[300px] lg:overflow-hidden">
                  <h5 className="mb-5 translate-y-[2px] text-center text-[14px] font-bold text-black sm:mb-[40px] sm:translate-y-[5px] sm:text-[17px] lg:mb-[54px]">기술적 강점</h5>
                  <ul className="-translate-y-[10px] list-disc space-y-1 break-keep pl-5 text-[12px] leading-[1.55] text-black sm:text-[14px]">
                    {selectedNdtCopy.strengths.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>

                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[18px]">
                  <article className="min-h-[150px] rounded-[16px] bg-white px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[170px] sm:rounded-[20px] sm:py-[20px] lg:h-[197px] lg:min-h-0 lg:overflow-hidden">
                    <h5 className="mb-7 text-center text-[13px] font-bold text-black sm:mb-5 sm:text-[17px]">주요 보유 검사장비</h5>
                    <ul className="list-disc space-y-2 break-keep pl-5 text-[12px] leading-[1.5] text-black sm:text-[14px]">
                      {selectedNdt.equipment.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </article>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectContactSubTab('inquiry');
                    }}
                    className="flex h-[64px] flex-col items-center justify-center rounded-[16px] bg-white text-[14px] font-bold text-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-[#0048ef] hover:text-white hover:shadow-[0_6px_10px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0048ef] sm:h-[76px] sm:rounded-[20px] sm:text-[16px] lg:h-[85px] lg:text-[17px]"
                  >
                    {selectedNdt.code} 검사 견적 문의
                    <span className="mt-2 text-[20px] font-normal leading-none">⟶</span>
                  </button>
                </div>
              </div>
                </motion.div>
              </AnimatePresence>
              </div>
            </div>
          </section>

          <InspectionProcess />
        </div>
      )}
    </div>
  );
};
