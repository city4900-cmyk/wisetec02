import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [aboutSubTab, setAboutSubTab] = useState<AboutSubTab>('greeting');
  const [servicesSubTab, setServicesSubTab] = useState<ServicesSubTab>('ndt');
  const [techSubTab, setTechSubTab] = useState<TechSubTab>('patent-system');
  const [contactSubTab, setContactSubTab] = useState<ContactSubTab>('inquiry');

  // Modals
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  // Scroll to top on tab change
  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSubTab = (sub: AboutSubTab) => {
    setAboutSubTab(sub);
    setCurrentTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServicesSubTab = (sub: ServicesSubTab) => {
    setServicesSubTab(sub);
    setCurrentTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTechSubTab = (sub: TechSubTab) => {
    setTechSubTab(sub);
    setCurrentTab('technology');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubTab = (sub: ContactSubTab) => {
    setContactSubTab(sub);
    setCurrentTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
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
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleTabChange}
            onSelectAboutSubTab={handleAboutSubTab}
            onSelectServicesSubTab={handleServicesSubTab}
            onSelectTechSubTab={handleTechSubTab}
            onSelectContactSubTab={handleContactSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
            onOpenNoticeModal={(notice) => setSelectedNotice(notice)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            initialSubTab={aboutSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            initialSubTab={servicesSubTab}
            onSelectTab={handleTabChange}
            onSelectContactSubTab={handleContactSubTab}
          />
        )}

        {currentTab === 'technology' && (
          <TechnologyView
            initialSubTab={techSubTab}
            onSelectTab={handleTabChange}
            onSelectContactSubTab={handleContactSubTab}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            initialSubTab={contactSubTab}
            onOpenNoticeModal={(notice) => setSelectedNotice(notice)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleTabChange}
        onSelectAboutSubTab={handleAboutSubTab}
        onSelectServicesSubTab={handleServicesSubTab}
        onSelectTechSubTab={handleTechSubTab}
        onSelectContactSubTab={handleContactSubTab}
      />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
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
