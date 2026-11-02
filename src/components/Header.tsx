import React, { useState } from 'react';
import {
  Phone,
  Menu,
  X,
  Send,
} from 'lucide-react';
import { NavTab, AboutSubTab, ServicesSubTab, TechSubTab, ContactSubTab } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onSelectAboutSubTab?: (sub: AboutSubTab) => void;
  onSelectServicesSubTab?: (sub: ServicesSubTab) => void;
  onSelectTechSubTab?: (sub: TechSubTab) => void;
  onSelectContactSubTab?: (sub: ContactSubTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onSelectAboutSubTab,
  onSelectServicesSubTab,
  onSelectTechSubTab,
  onSelectContactSubTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleNavClick = (tab: NavTab, subTabHandler?: () => void) => {
    if (subTabHandler) subTabHandler();
    else onSelectTab(tab);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const menuContent = openDropdown === 'about'
    ? {
        eyebrow: 'COMPANY',
        headline: <>기술로 쌓은 신뢰,<br />와이즈텍을 소개합니다.</>,
        description: '와이즈텍의 시작과 걸어온 길을 만나보세요.',
        items: [
          { label: 'CEO 인사말', caption: '안전과 품질을 향한 우리의 약속', icon: null, onClick: () => handleNavClick('about', () => onSelectAboutSubTab?.('greeting')) },
          { label: '기업 개요·인증·연혁', caption: '와이즈텍이 걸어온 길', icon: null, onClick: () => handleNavClick('about', () => onSelectAboutSubTab?.('overview')) },
          { label: '오시는 길', caption: '본사 위치 및 방문 안내', icon: null, onClick: () => handleNavClick('about', () => onSelectAboutSubTab?.('location')) },
        ],
      }
    : openDropdown === 'services'
      ? {
          eyebrow: 'BUSINESS',
          headline: <>현장의 안전을 지키는<br />전문 검사 솔루션.</>,
          description: '현장에 맞는 검사 서비스를 확인해보세요.',
          items: [
            { label: '자율안전검사', caption: '산업안전보건법에 따른 검사', icon: '/figma-assets/kcs-logo-transparent.png', onClick: () => handleNavClick('services', () => onSelectServicesSubTab?.('safety')) },
            { label: '건설기계 안전성 검사', caption: '건설장비 안전점검 및 정밀 진단', icon: null, onClick: () => handleNavClick('services', () => onSelectServicesSubTab?.('construction')) },
            { label: '비파괴검사', caption: '전문 비파괴 정밀용역', icon: '/figma-assets/kgs-quality-assurance.png', onClick: () => handleNavClick('services', () => onSelectServicesSubTab?.('ndt')) },
          ],
        }
      : openDropdown === 'contact'
        ? {
            eyebrow: 'SUPPORT',
            headline: <>궁금한 점이 있다면,<br />와이즈텍과 함께.</>,
            description: '상담부터 검사 안내까지 도와드립니다.',
            items: [
              { label: '견적 및 상담 문의', caption: '검사 일정과 비용 상담', icon: null, onClick: () => handleNavClick('contact', () => onSelectContactSubTab?.('inquiry')) },
              { label: '공지사항 / 소식', caption: '와이즈텍의 새로운 소식', icon: null, onClick: () => handleNavClick('contact', () => onSelectContactSubTab?.('notice')) },
              { label: '자주 묻는 질문', caption: '궁금한 내용을 빠르게 확인', icon: null, onClick: () => handleNavClick('contact', () => onSelectContactSubTab?.('faq')) },
            ],
          }
        : null;

  return (
    <header className="wisetec-header sticky top-0 z-40 border-b border-[#e6ebf2] bg-white">
      <div className="relative mx-auto w-full max-w-[1440px]" onMouseLeave={() => setOpenDropdown(null)}>
        <div className="h-[4px] w-full bg-[#ffb400]" />
        <div className="relative flex h-[104px] items-center justify-between px-[clamp(24px,4.45vw,64px)]">
          {/* Logo & Brand */}
          <a
            id="header-logo-btn"
            href="/"
            onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); handleNavClick('home'); }}
            className="group flex h-[68px] w-auto shrink-0 items-center gap-2 text-left sm:gap-[16px]"
          >
            <span className="relative h-[38px] w-[68px] shrink-0 overflow-hidden sm:h-[45px] sm:w-[84px]" aria-hidden="true">
              <img src="/figma-assets/header-logo.png" alt="" className="absolute left-[-4.88%] top-[-21.47%] h-[165.03%] w-[108.78%] max-w-none" />
            </span>
            <span className="flex w-[120px] flex-col items-start font-bold leading-[1.5] sm:w-[145px]">
              <span className="-mb-[6px] whitespace-nowrap text-[21px] text-[#152238] sm:-mb-[8px] sm:text-[25px]">와이즈텍</span>
              <span className="whitespace-nowrap text-[11px] text-[#68758a] sm:text-[13px]">WISETEC</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden h-full w-[510px] shrink-0 items-center gap-[18px] xl:flex">
            {/* 회사소개 (About) with Dropdown */}
            <div
              className="relative h-full"
              onMouseEnter={() => setOpenDropdown('about')}
            >
              <a
                id="nav-about-btn"
            href="/about/greeting/"
                onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('greeting')); }}
                className={`flex h-full w-[152px] flex-col items-center justify-center whitespace-nowrap text-center transition-colors ${currentTab === 'about' || openDropdown === 'about' ? 'text-[#ffb400]' : 'text-[#152238] hover:text-[#ffb400]'}`}
              >
                <span className="text-[18px] font-semibold leading-[1.5]">회사소개</span>
              </a>

            </div>

            {/* 3. 사업분야 (Services) with Dropdown */}
            <div
              className="relative h-full"
              onMouseEnter={() => setOpenDropdown('services')}
            >
              <a
                id="nav-services-btn"
            href="/services/safety/"
                onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('safety')); }}
                className={`flex h-full w-[152px] flex-col items-center justify-center whitespace-nowrap text-center transition-colors ${currentTab === 'services' || openDropdown === 'services' ? 'text-[#ffb400]' : 'text-[#152238] hover:text-[#ffb400]'}`}
              >
                <span className="text-[18px] font-semibold leading-[1.5]">사업분야</span>
              </a>

            </div>

            {/* 4. 고객지원 (Contact & Notice) */}
            <div
              className="relative h-full"
              onMouseEnter={() => setOpenDropdown('contact')}
            >
              <a
                id="nav-contact-btn"
            href="/contact/inquiry/"
                onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry')); }}
                className={`flex h-full w-[152px] flex-col items-center justify-center whitespace-nowrap text-center transition-colors ${currentTab === 'contact' || openDropdown === 'contact' ? 'text-[#ffb400]' : 'text-[#152238] hover:text-[#ffb400]'}`}
              >
                <span className="text-[18px] font-semibold leading-[1.5]">고객지원</span>
              </a>

            </div>
          </nav>

          {/* Quick Inquiry CTA Button */}
          <div className="hidden shrink-0 xl:flex">
            <a
              id="header-quote-btn"
            href="/contact/inquiry/"
              onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry')); }}
              className="relative inline-flex h-[52px] w-[174px] items-center justify-center gap-[12px] rounded-[8px] bg-[#0649ed] px-[18px] text-[15px] font-bold text-white transition-colors hover:bg-[#003fd5] active:scale-[0.98]"
            >
              <img src="/figma-assets/header-inquiry.svg" alt="" className="h-[22px] w-[22px] shrink-0" />
              <span>견적 및 상담 문의</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {menuContent && (
          <div className="absolute left-1/2 top-full z-50 hidden w-screen -translate-x-1/2 border-t border-[#e6ebf2] bg-white xl:block">
            <div className="mx-auto flex h-[214px] max-w-[1440px] items-center gap-[24px] px-[64px]">
              <div className="flex w-[300px] shrink-0 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="text-[11px] font-bold leading-[1.5] text-[#ffb400]">{menuContent.eyebrow}</p>
                <div className="text-[24px] font-bold leading-[1.5] text-[#152238]">{menuContent.headline}</div>
                <p className="text-[12px] leading-[1.5] text-[#68758a]">{menuContent.description}</p>
              </div>
              <div className="h-[142px] w-px shrink-0 bg-[#e6ebf2]" />
              <div className="flex h-[148px] min-w-0 flex-1 items-center gap-[16px]">
                {menuContent.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="group flex h-[128px] min-w-0 flex-1 items-center gap-4 rounded-[8px] bg-[#F5F8FA] px-6 py-[22px] text-left transition-colors duration-300 hover:bg-[#e7f1ff]"
                  >
                    {item.icon && <img src={item.icon} alt="" className={`h-[40px] w-[40px] shrink-0 object-contain ${item.label === '비파괴검사' ? 'mix-blend-multiply' : ''}`} />}
                    <span className="flex min-w-0 flex-1 flex-col gap-[6px]">
                      <span className={`truncate text-[17px] font-bold ${item.label === '자율안전검사' ? 'text-[#007c53]' : item.label === '비파괴검사' ? 'text-[#0048ef]' : item.label === '건설기계 안전성 검사' ? 'text-[#306395]' : 'text-black'}`}>{item.label}</span>
                      <span className="truncate text-[12px] text-[#1d1919]">{item.caption}</span>
                    </span>
                    <span className="shrink-0 text-[21px] font-normal text-black transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-navigation xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-base font-semibold ${
                currentTab === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              홈 (메인)
            </button>

            {/* 회사소개 */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 px-3.5 uppercase tracking-wider">회사소개 (About Us)</div>
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('greeting'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  인사말 (CEO)
                </button>
                <button
                  onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('overview'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  기업개요 및 연혁
                </button>
                <button
                  onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('location'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  오시는 길 (전남 광양 본사)
                </button>
              </div>
            </div>

            {/* 사업분야 */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 px-3.5 uppercase tracking-wider">사업분야 (Services)</div>
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('safety'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  자율안전검사
                </button>
                <button
                  onClick={() => handleNavClick('services', () => onSelectServicesSubTab?.('construction'))}
                  className="w-full text-left px-4 py-2 text-sm font-bold text-[#306395] hover:bg-blue-50 hover:text-[#306395] rounded-md"
                >
                  건설기계 안전성 검사
                </button>
                <button
                  onClick={() => handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('ndt'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  비파괴검사
                </button>
              </div>
            </div>

            {/* 고객지원 */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 px-3.5 uppercase tracking-wider">고객지원 (Support)</div>
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md font-semibold text-blue-700"
                >
                  견적 및 상담 문의 (온라인 접수)
                </button>
                <button
                  onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('notice'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  공지사항 / 게시판
                </button>
                <button
                  onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('faq'))}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  자주 묻는 질문 (FAQ)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry'))}
              className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>온라인 견적 및 상담 문의하기</span>
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full py-2.5 border border-slate-300 text-slate-800 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm bg-slate-50"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>전화 상담: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
