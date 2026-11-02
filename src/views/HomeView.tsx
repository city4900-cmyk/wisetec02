import { useScrollReveal } from '../components/useScrollReveal';
import { useHomeSectionScroll } from '../components/useHomeSectionScroll';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Phone,
  Send,
  Wrench,
  Search,
  ExternalLink,
  ChevronDown,
  Eye,
} from 'lucide-react';
import {
  NavTab,
  AboutSubTab,
  ServicesSubTab,
  TechSubTab,
  ContactSubTab,
  CertificateItem,
  NoticeItem,
} from '../types';
import { COMPANY_INFO, NDT_SERVICES, NOTICES, FAQS } from '../data/companyData';
import { PatentVisualizer } from '../components/PatentVisualizer';
import { NaverMapPreview } from '../components/NaverMapPreview';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectAboutSubTab: (sub: AboutSubTab) => void;
  onSelectServicesSubTab: (sub: ServicesSubTab) => void;
  onSelectNdtMethod: (method: string) => void;
  onSelectTechSubTab: (sub: TechSubTab) => void;
  onSelectContactSubTab: (sub: ContactSubTab) => void;
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onOpenNoticeModal: (notice: NoticeItem) => void;
}

const inspectionMethods = [
  {
    id: 'ut',
    title: 'UT 초음파 (Ultrasonic Testing)',
    description: '고주파 초음파 펄스를 시험체 내부에 전파시켜 내부 불연속부로부터 반사되는 에코 신호를 분석하여 결함 및 잔여 두께를 정밀 검출합니다.',
    photo: '/figma-assets/frame190-photo-ut.png',
    card: '/figma-assets/frame190-card-ut.png',
  },
  {
    id: 'paut',
    title: 'PAUT 위상배열 초음파 (Phased Array Ultrasonic Testing)',
    description: '다채널 미세 진동자를 전자적으로 제어하여 빔 각도와 초점을 가변 스캔하며, 결함의 단면 및 입체 형상을 실시간 2D/3D 컬러 영상으로 시각화합니다.',
    photo: '/figma-assets/frame190-photo-paut.png',
    card: '/figma-assets/frame190-card-paut.png',
  },
  {
    id: 'mt',
    title: 'MT 자분 (Magnetic Particle Testing)',
    description: '강자성체 재질을 자화시켰을 때 결함부에 형성되는 누설 자속에 자분을 도포하여 표면 및 표면 직하의 미세 균열을 육안으로 검출합니다.',
    photo: '/figma-assets/frame190-photo-mt.png',
    card: '/figma-assets/frame190-card-mt.png',
  },
  {
    id: 'pt',
    title: 'PT 침투 (Liquid Penetrant Testing)',
    description: '모세관 현상을 이용하여 검사 대상물 표면에 열려있는 미세 결함에 침투액을 침투시킨 후 현상제를 뿌려 결함을 확대 지시합니다.',
    photo: '/figma-assets/frame190-photo-pt.png',
    card: '/figma-assets/frame190-card-pt.png',
  },
] as const;

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onSelectAboutSubTab,
  onSelectServicesSubTab,
  onSelectNdtMethod,
  onSelectTechSubTab,
  onSelectContactSubTab,
  onOpenCertificateModal,
  onOpenNoticeModal,
}) => {
  useHomeSectionScroll();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [homeFitScale, setHomeFitScale] = useState<number | null>(null);
  const [trustStripHeight, setTrustStripHeight] = useState(0);
  const trustStripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const strip = trustStripRef.current;
    if (!strip) return;
    const measure = () => setTrustStripHeight(strip.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);
  const [activeInspectionId, setActiveInspectionId] = useState<(typeof inspectionMethods)[number]['id']>('ut');
  const [hoveredInspectionId, setHoveredInspectionId] = useState<string | null>(null);

  useEffect(() => {
    const fitHeroToViewport = () => {
      if (window.innerWidth < 1024) {
        setHomeFitScale(null);
        return;
      }

      const headerHeight = document.querySelector('.wisetec-header')?.getBoundingClientRect().height ?? 84;
      const availableHeight = Math.max(320, window.innerHeight - headerHeight);
      setHomeFitScale(Math.min(1, window.innerWidth / 1440, availableHeight / 904));
    };

    fitHeroToViewport();
    window.addEventListener('resize', fitHeroToViewport);
    return () => window.removeEventListener('resize', fitHeroToViewport);
  }, []);



  const homeMotionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(homeMotionRef, 'home', '[data-scroll-reveal]:not(.home-hero-reveal)');

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.figma-home-hero');
    const targets = hero?.querySelectorAll<HTMLElement>('.home-hero-reveal');
    if (!hero || !targets?.length) return;

    if (!('IntersectionObserver' in window)) {
      hero.classList.add('home-hero-active');
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      hero.classList.toggle('home-hero-active', entry.isIntersecting);
      targets.forEach((target) => target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.18 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);


  return (
    <div ref={homeMotionRef} className="home-motion">
      {/* 1. Figma Home hero — frame 103:582 */}
      <section
        className="figma-home-hero snap-start relative min-h-[calc(100svh-60px)] overflow-hidden bg-white backdrop-blur-[5px] lg:h-[904px] lg:min-h-0"
        style={{
          '--trust-strip-height': `${trustStripHeight}px`,
          ...(homeFitScale === null ? {} : { height: `${904 * homeFitScale - trustStripHeight}px` }),
        } as React.CSSProperties}
      >
        <img
          className="home-hero-backdrop pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          src="/figma-assets/home-hero-source.png"
          alt=""
        />
        <div aria-hidden="true" className="home-hero-shade pointer-events-none absolute inset-0 bg-black/10" />
        <div
          className="home-desktop-hero relative mx-auto h-full min-h-[calc(100svh-60px)] max-w-[1440px] px-6 pb-6 pt-6 lg:absolute lg:left-1/2 lg:top-0 lg:ml-[-720px] lg:mx-0 lg:w-[1440px] lg:max-w-none lg:min-h-0 lg:px-0 lg:pb-0 lg:pt-0"
          style={homeFitScale === null ? undefined : { transform: `scale(${homeFitScale})`, transformOrigin: 'top center' }}
        >
          <div data-scroll-reveal className="home-hero-badges home-hero-reveal relative z-10 flex flex-wrap items-center gap-3 lg:absolute lg:left-[96px] lg:top-[178px]" style={{ '--hero-delay': '80ms' } as React.CSSProperties}>
            <span className="flex h-[30px] w-[40px] shrink-0 items-center justify-center lg:h-[64px] lg:w-[60px]" aria-label="KCs 인증">
              <img src="/figma-assets/kcs-logo-transparent.png" alt="KCs 인증" className="h-full w-full object-contain" />
            </span>
            <span className="flex h-[30px] items-center rounded-[6px] bg-[#0048ef] px-3 text-[13px] font-bold text-white sm:px-4 sm:text-[15px] lg:h-[36px] lg:px-5 lg:text-[21px]">
              기술신뢰보증
            </span>
            <span className="flex min-h-[30px] max-w-full items-center rounded-[6px] border border-[rgba(0,0,0,0.25)] px-3 py-1 text-[12px] font-semibold leading-tight text-black sm:px-4 sm:text-[14px] lg:h-[36px] lg:min-h-0 lg:w-max lg:whitespace-nowrap lg:px-5 lg:py-0 lg:text-[21px]">
              ISO 9001/45001 인증 &amp; 특허보유
            </span>
          </div>

          <h1 data-scroll-reveal className="home-hero-heading home-hero-reveal relative z-10 mt-5 break-keep text-[clamp(25px,7vw,34px)] font-bold leading-[1.2] text-black lg:absolute lg:left-[96px] lg:top-[248px] lg:mt-0 lg:break-normal lg:text-[50px] lg:leading-[normal]" style={{ '--hero-delay': '220ms' } as React.CSSProperties}>
            자율안전검사 및 비파괴검사 분야의<br />
            <span className="text-[#0048ef]">신뢰할 수 있는 파트너</span>,<br />
            <span className="lg:text-[52px]">(주)와이즈텍</span>
          </h1>

          <p data-scroll-reveal className="home-hero-copy home-hero-reveal relative z-10 mt-5 max-w-[878px] text-[14px] font-normal leading-[1.7] text-[#34495e] sm:text-[18px] lg:absolute lg:left-[96px] lg:top-[488px] lg:mt-0 lg:w-[1248px] lg:max-w-none lg:text-[22px] lg:leading-[1.45]" style={{ '--hero-delay': '360ms' } as React.CSSProperties}>
            <span className="block lg:whitespace-nowrap">(주)와이즈텍은 산업안전보건법에 따른 자율안전검사기관이자, 과학기술정보통신부 등록 비파괴검사기관입니다.</span>
            <span className="block lg:whitespace-nowrap">기중기, 이동식 크레인, 고소작업차, 카고크레인 등 건설기계의 법정 안전성 검사와 정밀 비파괴검사(NDT)를 통해 현장의 안전을 완벽히 지켜드립니다.</span>
          </p>


        </div>
      </section>

      <div ref={trustStripRef} data-reveal-group className="home-trust-strip" aria-label="인증 및 검사 기술">
        <p className="home-trust-intro">현장의 신뢰를 만드는 기술</p>
        <div className="home-trust-item"><p>ISO <strong>9001</strong></p><span>품질경영시스템</span></div>
        <div className="home-trust-item"><p>ISO <strong>45001</strong></p><span>안전보건경영시스템</span></div>
        <div className="home-trust-item home-trust-patent"><p>특허 <strong>제10-2613687호</strong></p><span>곤돌라 고정식 진공상자 누설검사시스템</span></div>
      </div>

      <section className="home-refresh-panel home-business-panel" style={{ height: homeFitScale === null ? undefined : `${904 * homeFitScale}px` }}>
        <div className="home-refresh-panel-inner home-business-refresh" >
        <div className="home-refresh-heading" data-scroll-reveal><div><h2>현장을 이해하고,<br /><em>안전의 답을 찾습니다.</em></h2></div><p>자율안전검사부터 정밀 비파괴검사까지.<br />현장의 조건에 맞는 검사 솔루션을 제공합니다.</p></div>
        <div className="home-business-grid">
          {[
            { id: 'safety' as const, tone: '#007c53', hover: '자율안전검사 주요 대상 설비 및 법정 검사 주기', title: '자율안전검사', label: 'SAFETY INSPECTION', image: 'frame189-safety.png', copy: '주요 위험 설비의 안전 성능과 건전성을 확인합니다.' },
            { id: 'construction' as const, tone: '#306395', hover: '건설기계 주요 검사 대상 및 주기 안내', title: '건설기계 안전성 검사', label: 'CONSTRUCTION EQUIPMENT', image: 'construction-crane-reference.png', copy: '구조부부터 작동 성능까지, 현장의 안전을 살핍니다.' },
            { id: 'ndt' as const, tone: '#0048ef', hover: '비파괴검사 4대 분야 상세 보기', title: '비파괴검사', label: 'NON-DESTRUCTIVE TESTING', image: 'frame189-ndt.jpeg', copy: '손상 없이 내부와 표면의 결함을 정밀하게 진단합니다.' },
          ].map((service, index) => <button key={service.id} data-scroll-reveal style={{ transitionDelay: `${index * 90}ms`, '--service-tone': service.tone } as React.CSSProperties} onClick={() => onSelectServicesSubTab(service.id)} className="home-business-tile"><div className="home-business-image"><img src={'/figma-assets/' + service.image} alt={service.title + ' 현장'} loading="lazy" /><span>0{index + 1}</span><i><ArrowRight size={23} /></i><span className="home-service-overlay"><strong>{service.hover}</strong><ArrowRight size={40} strokeWidth={1} /></span></div><span className="home-kicker">{service.label}</span><h3>{service.title}</h3><p>{service.copy}</p></button>)}
        </div>
      </div>
      </section>

      {/* Component 28 / Frame 190: NDT technique details */}
      {(() => {
        const activeInspection = inspectionMethods.find((method) => method.id === (hoveredInspectionId ?? activeInspectionId)) ?? inspectionMethods[0];
        return (
          <section className="snap-start relative overflow-hidden bg-white lg:h-[903px]" style={homeFitScale === null ? undefined : { height: `${903 * homeFitScale}px` }}>
            <div
              className="relative mx-auto hidden h-[903px] w-[1440px] max-w-none lg:block lg:absolute lg:left-1/2 lg:top-0 lg:ml-[-720px]"
              style={homeFitScale === null ? undefined : { transform: `scale(${homeFitScale})`, transformOrigin: 'top center' }}
            >
              <img key={`photo-${activeInspection.id}`} className="inspection-photo-enter pointer-events-none absolute left-[600px] top-0 h-[683px] w-[840px] object-fill" src={activeInspection.photo} alt="" />
              <h2 data-scroll-reveal className="absolute left-0 top-[68px] w-[500px] whitespace-nowrap text-[35px] font-bold leading-[normal] text-black">비파괴검사 4대 분야 기법별 특성</h2>
              <h3 key={`title-${activeInspection.id}`} className="inspection-copy-enter absolute left-0 top-[168px] w-[500px] text-[35px] font-bold leading-[normal] text-black">{activeInspection.title}</h3>
              <p key={`description-${activeInspection.id}`} className="inspection-copy-enter inspection-description-enter absolute left-0 top-[405px] w-[504px] text-[23px] font-medium leading-[normal] text-[rgba(44,44,44,0.8)]">{activeInspection.description}</p>
              {inspectionMethods.map((method, index) => (
                <button
                  key={method.id}
                  type="button"
                  aria-label={`${method.title} 상세 보기`}
                  aria-pressed={activeInspectionId === method.id}
                  onMouseEnter={() => {
                    setHoveredInspectionId(method.id);
                    setActiveInspectionId(method.id);
                  }}
                  onMouseLeave={() => setHoveredInspectionId(null)}
                  onFocus={() => setHoveredInspectionId(method.id)}
                  onBlur={() => setHoveredInspectionId(null)}
                  onClick={() => onSelectNdtMethod(method.id)}
                  data-scroll-reveal
                  style={{ left: `${index * 370}px`, transitionDelay: `${index * 70}ms` }}
                  className="absolute top-[628px] h-[240px] w-[330px] cursor-pointer text-white"
                >
                  <img className="pointer-events-none absolute inset-0 h-full w-full object-cover" src={method.card} alt="" />
                  <span className={`absolute inset-0 bg-[rgba(0,72,239,0.9)] transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${hoveredInspectionId === method.id ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
                  <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center whitespace-nowrap transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${hoveredInspectionId === method.id ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                    <span className="text-[40px] font-bold leading-[48px]">read more</span>
                    <svg className="mt-3 h-[10px] w-[122px]" viewBox="0 0 122 10" fill="none" aria-hidden="true">
                      <path d="M1 5H119M119 5L114 1M119 5L114 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>

            <div className="px-5 py-10 lg:hidden">
              <h2 data-scroll-reveal className="text-[24px] font-bold leading-tight text-black">비파괴검사 4대 분야 기법별 특성</h2>
              <div data-scroll-reveal className="mt-6 overflow-hidden rounded-xl">
                <div className="relative h-[230px] bg-white">
                  <img key={`mobile-photo-${activeInspection.id}`} className="inspection-photo-enter absolute inset-0 h-full w-full object-cover" src={activeInspection.photo} alt="" />
                </div>
              </div>
              <h3 key={`mobile-title-${activeInspection.id}`} className="inspection-copy-enter mt-5 text-[23px] font-bold leading-tight text-black">{activeInspection.title}</h3>
              <p key={`mobile-description-${activeInspection.id}`} className="inspection-copy-enter inspection-description-enter mt-3 text-[14px] font-medium leading-relaxed text-[rgba(44,44,44,0.8)]">{activeInspection.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {inspectionMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    aria-label={`${method.title} 상세 보기`}
                    aria-pressed={activeInspectionId === method.id}
                    onClick={() => onSelectNdtMethod(method.id)}
                    onMouseEnter={() => {
                      setHoveredInspectionId(method.id);
                      setActiveInspectionId(method.id);
                    }}
                    onMouseLeave={() => setHoveredInspectionId(null)}
                    onFocus={() => setHoveredInspectionId(method.id)}
                    onBlur={() => setHoveredInspectionId(null)}
                    data-scroll-reveal
                    style={{ transitionDelay: `${method.id === 'ut' ? 0 : method.id === 'paut' ? 70 : method.id === 'mt' ? 140 : 210}ms` }}
                    className="relative aspect-[330/240] overflow-hidden rounded-sm"
                  >
                    <img className="absolute inset-0 h-full w-full object-cover" src={method.card} alt="" />
                    <span className={`absolute inset-0 flex items-center justify-center bg-[rgba(0,72,239,0.9)] text-[20px] font-bold text-white transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${hoveredInspectionId === method.id ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>read more</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <section className="home-refresh-panel home-support-panel" style={{ height: homeFitScale === null ? undefined : `${904 * homeFitScale}px` }}>
        <div className="home-refresh-panel-inner home-support-refresh" >
        <div className="home-refresh-heading" data-scroll-reveal><div><h2>와이즈텍의 새로운 소식과<br /><em>궁금한 이야기를 만나보세요.</em></h2></div></div>
        <div className="home-support-columns">
          <div data-scroll-reveal><div className="home-support-title"><h3>와이즈텍 소식</h3><button onClick={() => onSelectContactSubTab('notice')}>전체보기 <ArrowRight size={16} /></button></div><div data-reveal-group className="home-news-rows">{NOTICES.slice(0, 4).map(notice => <button key={notice.id} onClick={() => onOpenNoticeModal(notice)}><time>{notice.date}</time><span>{notice.title}</span><ArrowRight size={18} /></button>)}</div></div>
          <div data-scroll-reveal><div className="home-support-title"><h3>자주 묻는 질문</h3><button onClick={() => onSelectContactSubTab('faq')}>전체보기 <ArrowRight size={16} /></button></div><div data-reveal-group className="home-faq-rows">{[FAQS[1], FAQS[2], FAQS[0]].map(faq => <div key={faq.id}><button aria-expanded={activeFaq === faq.id} aria-controls={`home-faq-${faq.id}`} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}><span className="home-faq-q">Q.</span><span>{faq.question}</span><ChevronDown size={18} className={activeFaq === faq.id ? 'rotate-180' : ''} /></button>{activeFaq === faq.id && <p id={`home-faq-${faq.id}`}>{faq.answer}</p>}</div>)}</div></div>
        </div>
      </div>
      </section>
      <section className="home-refresh-panel home-contact-panel" style={{ height: homeFitScale === null ? undefined : `${904 * homeFitScale}px` }}>
        <div className="home-refresh-panel-inner home-contact-refresh" >
        <div className="home-contact-copy" data-scroll-reveal><p>검사 대상과 현장 조건을 알려주시면<br />필요한 검사부터 함께 확인하겠습니다.</p><div className="home-contact-details"><a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a><span>평일 08:30–18:00 · 주말/공휴일 긴급 검사 대응 가능</span></div></div>
        <div className="home-contact-map" data-scroll-reveal><div className="home-map-frame"><NaverMapPreview /></div><div className="home-map-caption"><span>OUR OFFICE</span><p>전라남도 광양시 동광길 33, 2층</p></div></div>
      </div>
      </section>

    </div>
  );
};
