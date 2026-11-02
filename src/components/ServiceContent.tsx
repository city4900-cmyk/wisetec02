import React from 'react';

interface Strength {
  title: string;
  text: React.ReactNode;
}

export function ServiceStrengths({ items, tone = 'safety' }: { items: Strength[]; tone?: 'safety' | 'navy' }) {
  return (
    <section className={`service-strengths service-strengths--${tone}`} aria-label="검사 서비스의 강점">
      <div className="service-strengths-heading" data-scroll-reveal>
        <h3>{tone === 'safety' ? '정밀한 검사에서, 안전한 현장까지.' : '현장에서 확인하고, 결과로 설명합니다.'}</h3>
      </div>
      <ol className="service-strengths-list" data-reveal-group>
        {items.map((item, index) => (
          <li key={item.title} data-scroll-reveal style={{ '--reveal-delay': `${index * 150}ms` } as React.CSSProperties}>
            <span className="service-strength-number">0{index + 1}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const process = [
  { title: '의뢰 및 도면 검토', description: '검사 부위와 재질, 규격을 확인합니다.' },
  { title: '검사 계획 수립', description: '검사 기법을 선정하고 인력을 편성합니다.' },
  { title: '현장 방문·전처리', description: '검사면을 세척하고 현장 안전을 점검합니다.' },
  { title: '정밀 비파괴 탐상', description: 'UT·PAUT·MT·PT 등 적용 기법에 따라 검사합니다.' },
  { title: '결함 분석·판정', description: '기술책임자가 검사 데이터를 판독합니다.' },
  { title: '성적서 발행', description: '시험성적서와 결과 보고서를 전달합니다.' },
];

export function InspectionProcess() {
  return (
    <section className="inspection-process-section" aria-label="비파괴검사 표준 수행 절차">
      <div className="inspection-process-heading" data-scroll-reveal>
        <h3>비파괴검사 표준 수행 절차 6단계</h3>
      </div>
      <ol className="inspection-process" data-reveal-group>
        {process.map((item, index) => (
          <li key={item.title} data-scroll-reveal style={{ '--reveal-delay': `${index * 130}ms` } as React.CSSProperties}>
            <span className="inspection-process-number">0{index + 1}</span>
            <div><h4>{item.title}</h4><p>{item.description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
