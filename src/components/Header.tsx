import React, { useState } from 'react';
import {
  Shield,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ChevronDown,
  FileCheck,
  Compass,
  Award,
  Wrench,
  Sparkles,
  Send,
} from 'lucide-react';
import { NavTab, AboutSubTab, ServicesSubTab, TechSubTab, ContactSubTab } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { WisetechLogo } from './WisetechLogo';

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
    onSelectTab(tab);
    if (subTabHandler) subTabHandler();
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>(주)와이즈텍</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">비파괴검사 & 산업안전검사 전문</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <span>사업자등록번호:</span>
              <span className="text-slate-300 font-mono">{COMPANY_INFO.businessNumber}</span>
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{COMPANY_INFO.workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-blue-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span className="font-mono">{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="flex items-center gap-1 pl-2 border-l border-slate-700">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                KGS ISO 9001/45001
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <button
            id="header-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group transition-all"
          >
            <WisetechLogo variant="header" size="md" className="group-hover:opacity-95" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. 홈 */}
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentTab === 'home'
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              홈
            </button>

            {/* 2. 회사소개 (About) with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('about')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-about-btn"
                onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('greeting'))}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                  currentTab === 'about'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>회사소개</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'about' && (
                <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <button
                    onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('greeting'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>인사말 (CEO)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('overview'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-blue-500" />
                    <span>기업개요 및 연혁</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('about', () => onSelectAboutSubTab && onSelectAboutSubTab('location'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-blue-500" />
                    <span>오시는 길 (Location)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. 사업분야 (Services) with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-services-btn"
                onClick={() => handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('ndt'))}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                  currentTab === 'services'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>사업분야</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'services' && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <button
                    onClick={() => handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('safety'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="font-semibold block">자율안전검사</span>
                        <span className="text-xs text-slate-500 font-normal">산업안전보건법 위탁업</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">법정검사</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('services', () => onSelectServicesSubTab && onSelectServicesSubTab('ndt'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="font-semibold block">비파괴검사</span>
                        <span className="text-xs text-slate-500 font-normal">전문 비파괴 정밀 기술용역</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">정밀검사</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. 고객지원 (Contact & Notice) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('contact')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-contact-btn"
                onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry'))}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                  currentTab === 'contact'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>고객지원</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'contact' && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <button
                    onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4 text-blue-600" />
                    <span>견적 및 상담 문의</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('notice'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-slate-500" />
                    <span>공지사항 / 소식</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('faq'))}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-slate-500" />
                    <span>자주 묻는 질문 (FAQ)</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Inquiry CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-quote-btn"
              onClick={() => handleNavClick('contact', () => onSelectContactSubTab && onSelectContactSubTab('inquiry'))}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-700/20 hover:shadow-lg hover:shadow-blue-700/30 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>견적 및 상담 문의</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
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
                  자율안전검사 (산업안전보건법 위탁)
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
