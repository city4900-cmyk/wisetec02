import React from 'react';
import { ServiceStrengths } from './ServiceContent';

const equipment = [
  { id: 'crawler', name: '크롤러 크레인', subtitle: '무한궤도식 기중기', checks: ['무한궤도 주행부 · 붐 용접부 균열(NDT)', '권상·선회장치 · 무게추 결합 상태'] },
  { id: 'mobile', name: '이동식 크레인', subtitle: '차륜식/트럭 기중기', checks: ['아웃트리거(지지대) · 붐 용접부 균열(NDT)', '권상·선회장치 · 주행 및 제동 시스템'] },
  { id: 'cargo', name: '카고크레인', subtitle: '트럭 탑재형 기중기', checks: ['차량-크레인 연결부 · 붐 용접부 균열(NDT)', '권상장치 와이어로프 · 유압 제어'] },
  { id: 'platform', name: '고소작업차', subtitle: '차량 탑재형', checks: ['작업대(버킷) 방호장치 · 붐 용접부 균열(NDT)', '기복·신축 장치 · 비상하강시스템 작동 여부'] },
  { id: 'tower', name: '타워크레인 비파괴검사', subtitle: '건설현장 고정식 양중장비', checks: ['마스트(Mast) & 지브(Jib) 용접부 균열 (NDT)', '초음파 탐상(UT) 및 자분탐상(MT) 결함 검사', '볼트·핀 연결부 및 주요 구조부 결합 상태'] },
  { id: 'other', name: '기타 건설장비', subtitle: '굴착기 · 항타기 · 천공기 등', checks: ['차대·상부회전체 구조부 및 연결부', '주행·작업장치 · 유압 계통 상태'] },
];

export const ConstructionInspection = () => (
  <div>
    <section data-reveal-group className="service-introduction border-b border-[#d9d9d9] px-[5.6%]">
      <div className="mb-5 flex flex-wrap gap-3 text-[12px] sm:text-[14px]">
        <span className="rounded-full bg-[#306395] px-5 py-1 font-bold text-white">건설기계관리법에 따른 검사기관</span>
        <span className="rounded-full border border-[#cbcbcb] px-5 py-1 font-semibold">법정 검사</span>
      </div>
      <h2 className="mb-6 text-[24px] font-bold sm:text-[28px]">건설기계 안전성 검사 (Construction Equipment Safety Inspection)</h2>
      <div className="space-y-4 text-[15px] leading-[1.65] text-[rgba(44,44,44,0.8)]">
        <p>건설기계관리법 및 관련 안전기준에 따라 건설 현장에서 운행되는 중장비 및 건설기계는 기계적 결함과 정비 상태를 정기적으로 검사해야 합니다.</p>
        <p>(주)와이즈텍은 법적 자격을 갖춘 전문 검사원과 NDT 정밀 진단을 통해 기중기, 이동식 크레인, 고소작업차, 카고크레인 등 주요 건설장비의 구조적 안전성을 종합 점검하여 현장의 대형 사고를 예방하고 작업 안전을 완벽히 확보합니다.</p>
      </div>
    </section>
    <section data-reveal-group className="px-[5.6%] py-16">
      <h3 className="content-section-heading mb-4 font-bold">건설기계 주요 검사 대상</h3>
      <div data-reveal-group className="grid gap-5 lg:grid-cols-2">
        {equipment.map((item) => (
          <article key={item.id} className="construction-equipment-card relative flex h-[283px] min-h-0 flex-col overflow-hidden rounded-[10px] bg-[#f3f6fa] p-[26px]">
            <div className="equipment-card-heading relative z-10 w-[58%]">
              <h4 className="text-[20px] font-bold leading-[1.6] text-[#17365b]">{item.name}</h4>
              <p className="text-[13px] text-[#66778b]">{item.subtitle}</p>
            </div>
            <div className={`construction-equipment-image construction-equipment-image-${item.id}`}>
              <img src={['crawler', 'cargo', 'tower', 'other'].includes(item.id) ? `/figma-assets/construction-${item.id}-cutout.png` : `/figma-assets/construction-${item.id}.png`} alt={item.name} />
            </div>
            <div className="equipment-card-checks absolute bottom-[18px] left-[26px] z-10 w-[58%]">
              <p className="text-[11px] font-bold text-[#50749a]">주요 점검</p>
              <p className="mt-1 text-[13px] leading-[1.6] text-[#536174]">{item.checks.map(line => <span className="block" key={line}>{line}</span>)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
    <section className="construction-search-guide">
      <h2>건설기계 점검, 무엇을 준비하면 되나요?</h2>
      <p>건설기계 안전성 검사는 장비의 구조와 작동 상태를 확인해 현장 작업 전 위험요인을 파악하는 과정입니다. 장비 종류와 등록 구분에 따라 적용되는 검사와 범위가 달라질 수 있으므로, 장비 정보를 먼저 확인한 뒤 상담을 진행합니다.</p>
      <div className="construction-guide-grid">
        <div><h3>검사 상담 준비사항</h3><ul><li>장비 종류, 모델명 및 제작 연도</li><li>등록증·검사증 등 장비 확인 자료</li><li>검사 현장 위치와 희망 일정</li><li>주요 작업 조건 및 점검이 필요한 부위</li></ul></div>
        <div><h3>검사는 어떻게 진행되나요?</h3><ol><li>장비 자료 확인 및 검사 범위 협의</li><li>일정 조율과 현장 안전 조건 확인</li><li>구조부·작동장치 점검 및 필요 시 비파괴검사</li><li>검사 결과 안내와 성적서·보고서 전달</li></ol></div>
      </div>
      <h3>건설기계 검사와 비파괴검사는 어떻게 다른가요?</h3>
      <p>건설기계 점검은 장비와 작업장치의 상태를 종합적으로 살피며, 비파괴검사는 소재를 손상시키지 않고 용접부 등의 내부·표면 결함을 확인하는 검사 기법입니다. 실제 적용 기법과 검사 범위는 장비 상태와 의뢰 목적에 따라 협의합니다.</p>
      <div className="construction-guide-links"><a href="/services/ndt/">비파괴검사 기법 알아보기 →</a><a href="/contact/inquiry/">건설기계 검사 상담 요청 →</a></div>
    </section>
    <ServiceStrengths tone="navy" items={[
      { title: '현장 출장 검사', text: <>대형 장비의 이동 부담을 줄이도록 <strong>전문 검사원이 현장을 방문</strong>해, 협의한 범위에 따라 검사를 수행합니다.</> },
      { title: 'NDT 결합 정밀 진단', text: <>육안 점검에 비파괴검사를 연계해, <strong>붐과 주요 용접부의 미세 균열</strong> 등 결함 유무를 정밀하게 확인합니다.</> },
      { title: '정밀 성적서·개선 가이드', text: <>검사 결과를 성적서와 보고서로 정리하고, 결함 발견 시 <strong>보수·정비를 위한 개선 의견</strong>을 제공합니다.</> },
    ]} />
  </div>
);
