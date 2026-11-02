import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  NavTab,
  AboutSubTab,
  ServicesSubTab,
  TechSubTab,
  ContactSubTab,
  CertificateItem,
  NoticeItem,
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { NoticeModal } from './components/NoticeModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { TechnologyView } from './views/TechnologyView';
import { ContactView } from './views/ContactView';
import { Phone, Send, ChevronUp, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';
import { SiteSection } from './components/SectionSwitcher';

import { routes, routeFor, resolveRoute, applyMetadata } from './seo';

export default function App({ initialPath }: { initialPath?: string } = {}) {
  const initialRoute = resolveRoute(initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname)) ?? routes[0];
  const [currentTab, setCurrentTab] = useState<NavTab>(initialRoute.tab);
  const [aboutSubTab, setAboutSubTab] = useState<AboutSubTab>(initialRoute.tab === 'about' ? initialRoute.sub as AboutSubTab : 'greeting');
  const [servicesSubTab, setServicesSubTab] = useState<ServicesSubTab>(initialRoute.tab === 'services' ? initialRoute.sub as ServicesSubTab : 'safety');
  const [servicesNdtMethod, setServicesNdtMethod] = useState('ut');
  const [scrollServicesToNdtDetails, setScrollServicesToNdtDetails] = useState(false);
  const [techSubTab, setTechSubTab] = useState<TechSubTab>(initialRoute.tab === 'technology' ? initialRoute.sub as TechSubTab : 'patent-system');
  const [contactSubTab, setContactSubTab] = useState<ContactSubTab>(initialRoute.tab === 'contact' ? initialRoute.sub as ContactSubTab : 'inquiry');
  // Modals
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const go = (tab: NavTab, sub?: string) => {
    const route = routeFor(tab, sub);
    if (window.location.pathname !== route.path) window.history.pushState(null, '', route.path);
    navigateRoute(route.path);
  };
  const navigateRoute = (path: string) => {
    const route = resolveRoute(path) ?? routes[0];
    flushSync(() => {
      setCurrentTab(route.tab);
      if (route.tab === 'about') setAboutSubTab(route.sub as AboutSubTab);
      if (route.tab === 'services') setServicesSubTab(route.sub as ServicesSubTab);
      if (route.tab === 'technology') setTechSubTab(route.sub as TechSubTab);
      if (route.tab === 'contact') setContactSubTab(route.sub as ContactSubTab);
      setScrollServicesToNdtDetails(false);
      setSelectedCertificate(null); setSelectedNotice(null);
    });
    applyMetadata(route);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  useEffect(() => {
    applyMetadata(initialRoute);
    const pop = () => navigateRoute(window.location.pathname);
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, []);
  const handleTabChange = (tab: NavTab) => go(tab);
  const handleAboutSubTab = (sub: AboutSubTab) => go('about', sub);
  const handleServicesSubTab = (sub: ServicesSubTab) => go('services', sub);
  const handleHomeNdtMethod = (method: string) => {
    go('services', 'ndt');
    setServicesNdtMethod(method); setScrollServicesToNdtDetails(true);
  };
  const handleTechSubTab = (sub: TechSubTab) => go('technology', sub);
  const handleContactSubTab = (sub: ContactSubTab) => go('contact', sub);

  const handleSectionSelect = (section: SiteSection) => {
    if (section === 'about') handleAboutSubTab('greeting');
    if (section === 'services') handleServicesSubTab('safety');
    if (section === 'contact') handleContactSubTab('inquiry');
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white ${currentTab === 'home' ? 'figma-home-mode' : ''}`}
    >
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onSelectAboutSubTab={handleAboutSubTab}
        onSelectServicesSubTab={handleServicesSubTab}
        onSelectTechSubTab={handleTechSubTab}
        onSelectContactSubTab={handleContactSubTab}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 bg-white">
        <div
          key={currentTab}
          className="h-full"
        >
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleTabChange}
            onSelectAboutSubTab={handleAboutSubTab}
            onSelectServicesSubTab={handleServicesSubTab}
            onSelectNdtMethod={handleHomeNdtMethod}
            onSelectTechSubTab={handleTechSubTab}
            onSelectContactSubTab={handleContactSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
            onOpenNoticeModal={(notice) => setSelectedNotice(notice)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            initialSubTab={aboutSubTab}
            onSubTabChange={handleAboutSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
            onSelectSection={handleSectionSelect}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            initialSubTab={servicesSubTab}
            onSubTabChange={handleServicesSubTab}
            initialNdtMethod={servicesNdtMethod}
            scrollToNdtDetails={scrollServicesToNdtDetails}
            onSelectTab={handleTabChange}
            onSelectContactSubTab={handleContactSubTab}
            onSelectSection={handleSectionSelect}
          />
        )}

        {currentTab === 'technology' && (
          <TechnologyView
            initialSubTab={techSubTab}
            onSubTabChange={handleTechSubTab}
            onSelectTab={handleTabChange}
            onSelectContactSubTab={handleContactSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            initialSubTab={contactSubTab}
            onSubTabChange={handleContactSubTab}
            onOpenNoticeModal={(notice) => setSelectedNotice(notice)}
            onSelectSection={handleSectionSelect}
          />
        )}
        </div>
      </main>

      <nav className="service-page-links" aria-label="서비스 바로가기">
        <a href="/services/construction/">건설기계 안전성 검사</a><a href="/services/safety/">자율안전검사</a><a href="/services/ndt/">비파괴검사</a><a href="/contact/inquiry/">검사 견적 문의</a>
      </nav>
      {/* Footer */}
      <Footer
        onSelectTab={handleTabChange}
        onSelectAboutSubTab={handleAboutSubTab}
        onSelectServicesSubTab={handleServicesSubTab}
        onSelectTechSubTab={handleTechSubTab}
        onSelectContactSubTab={handleContactSubTab}
      />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="site-quick-actions fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl border border-slate-700 flex items-center justify-center group transition-transform hover:scale-105"
          title="직통 전화 상담"
        >
          <Phone className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
        </a>

        <button
          onClick={() => handleContactSubTab('inquiry')}
          className="p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-105"
          title="온라인 견적 문의"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Certificate High-Res Viewer Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Notice Article Modal */}
      <NoticeModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
}
