import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { ContactSubTab, NoticeItem, FaqItem } from '../types';
import { COMPANY_INFO, NOTICES, FAQS } from '../data/companyData';
import { InquiryForm } from '../components/InquiryForm';
import { useScrollReveal } from '../components/useScrollReveal';
import { SiteSection } from '../components/SectionSwitcher';
import { SectionNavigation } from '../components/SectionNavigation';
import { SectionHero } from '../components/SectionHero';

interface ContactViewProps {
  onSubTabChange?: (sub: ContactSubTab) => void;
  initialSubTab?: ContactSubTab;
  onOpenNoticeModal: (notice: NoticeItem) => void;
  onSelectSection?: (section: SiteSection) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialSubTab = 'inquiry',
  onSubTabChange,
  onOpenNoticeModal,
  onSelectSection,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ContactSubTab>(initialSubTab);
  const contentRef = useRef<HTMLElement>(null);
  useScrollReveal(contentRef, activeSubTab);
  useEffect(() => setActiveSubTab(initialSubTab), [initialSubTab]);

  // Notice State
  const [noticeCategory, setNoticeCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // FAQ State
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Filtered Notices
  const filteredNotices = NOTICES.filter((item) => {
    const matchesCat = noticeCategory === 'all' || item.category === noticeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = FAQS.filter((faq) => {
    if (faqCategory === 'all') return true;
    return faq.category === faqCategory;
  });

  return (
    <main ref={contentRef} className="inner-refresh contact-refresh w-full bg-white">
      <SectionHero
        title="고객지원"
        subtitle="고객지원 및 온라인 견적·상담 문의"
        backgroundImage="/figma-assets/business-hero-user.png"
        backgroundPosition="center 45%"
      />

      <SectionNavigation
        section="contact"
        items={[{ id: 'inquiry', label: '견적 및 상담 문의' }, { id: 'notice', label: '공지사항/소식' }, { id: 'faq', label: '자주 묻는 질문(FAQ)' }]}
        active={activeSubTab}
        onChange={(sub) => onSubTabChange ? onSubTabChange(sub) : setActiveSubTab(sub)}
        onSelectSection={onSelectSection}
      />

      {/* 1. Inquiry Tab */}
      {activeSubTab === 'inquiry' && (
        <div className="">
          <section data-reveal-group className="contact-inquiry-layout mx-0 grid w-full grid-cols-1 px-0 pb-0 pt-0 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)]">
            <aside className="flex h-full min-w-0 flex-col bg-gradient-to-r from-[#f2f8ff] to-white">
              <div className="py-10 pl-6 pr-6 sm:py-[61px] sm:pl-8 sm:pr-8 md:pl-12 md:pr-10 lg:pl-[70px] lg:pr-[5.35%]">
                <h3 className="mb-5 text-[18px] font-bold text-black">상담 및 접수 안내</h3>
                <div className="mb-5 rounded-[20px] border border-slate-200 bg-white px-5 py-3 leading-[1.5]">
                  <p className="text-[13px] text-black/60">도로명주소</p>
                  <p className="block text-[15px] font-semibold text-black sm:text-[17px]">{COMPANY_INFO.address}</p>
                  <p className="mt-1 text-[11px] text-black/70 sm:text-[12px]">지번 : 전남 광양시 중동 (중마청룡길 인근)</p>
                </div>
                <div className="space-y-4 sm:space-y-3">
                  <div className="flex items-center gap-4"><Phone className="h-6 w-6 shrink-0 text-black" /><p><span className="block text-[12px] text-black/60">대표전화</span><a href={`tel:${COMPANY_INFO.phone}`} className="text-[12px] text-black sm:text-[14px]">{COMPANY_INFO.phone}</a></p></div>
                  <div className="flex items-center gap-4"><Mail className="h-6 w-6 shrink-0 text-black" /><p><span className="block text-[12px] text-black/60">이메일 접수</span><a href={`mailto:${COMPANY_INFO.email}`} className="text-[14px] text-black sm:text-[17px]">{COMPANY_INFO.email}</a></p></div>
                  <div className="flex items-center gap-4"><Clock className="h-6 w-6 shrink-0 text-black" /><p><span className="block text-[12px] text-black/60">운영 시간</span><span className="text-[11px] text-black sm:text-[13px]">{COMPANY_INFO.workingHours}</span></p></div>
                </div>
              </div>
              <div className="border-t border-[#D9D9D9] py-10 pl-6 pr-6 sm:py-12 sm:pl-8 sm:pr-8 md:pl-12 md:pr-10 lg:pl-[70px] lg:pr-[8%]">
                <h3 className="mb-8 text-[17px] font-bold text-black sm:text-[20px]">(주)와이즈텍의 3대 약속</h3>
                <ul className="space-y-5 text-[12px] font-medium text-black sm:text-[15px]">
                  <li className="flex items-center gap-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#009a69]" />영업일 기준 24시간 이내 신속 견적서 회신</li>
                  <li className="flex items-center gap-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#009a69]" />숙련된 자격 기술자의 책임 검사 및 성적서 발급</li>
                  <li className="flex items-center gap-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#009a69]" />고객사 기술 보안 및 설계 도면 철저 보호</li>
                </ul>
              </div>
            </aside>
            <div className="min-w-0 bg-white px-5 py-10 sm:px-8 sm:py-12 lg:py-[61px] lg:pl-[30px] lg:pr-[80px]">
              <InquiryForm initialServiceCategory="ndt" />
            </div>
          </section>
        </div>
      )}

      {/* 2. Notice Tab */}
      {activeSubTab === 'notice' && (
        <div data-reveal-group className="contact-list-panel mx-auto max-w-[1280px] space-y-9 px-5 pt-9 pb-12 ">
          {/* Filter and Search Bar */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#D9D9D9] bg-white pb-6 sm:flex-row sm:items-center">
            {/* Category Pills */}
            <div className="flex w-full flex-wrap gap-3 sm:w-auto sm:self-start sm:gap-4">
              {['all', '공지', '인증/특허', '안전정보'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNoticeCategory(cat)}
                  className={`min-h-[39px] rounded-[11px] border px-[19px] text-[11px] font-medium transition-colors sm:min-w-[99px] sm:text-[13px] ${
                    noticeCategory === cat
                      ? 'border-[#0646F5] bg-[#0646F5] text-white'
                      : 'border-[#D9D9D9] bg-white text-[#1D1919] hover:bg-[#f7f7f7]'
                  }`}
                >
                  {cat === 'all' ? '전체 소식' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-[270px]">
              <input
                type="text"
                placeholder="제목 또는 내용 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-[11px] border border-[#D9D9D9] bg-white py-2 pl-10 pr-3.5 text-[11px] text-[#1D1919] placeholder:text-[#888] focus:border-[#0646F5] focus:outline-none sm:text-[13px]"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#888]" />
            </div>
          </div>

          {/* Notice Table / List */}
          <div className="contact-notice-list bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-200">
              {filteredNotices.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  검색 조건에 해당하는 공지사항이 없습니다.
                </div>
              ) : (
                filteredNotices.map((item) => (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpenNoticeModal(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onOpenNoticeModal(item);
                      }
                    }}
                    className="p-5 hover:bg-blue-50/50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.isImportant
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {item.category}
                        </span>
                        {item.isImportant && (
                          <span className="text-[10px] font-bold text-rose-600">중요</span>
                        )}
                        <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {item.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                      <span>조회 {item.views}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. FAQ Tab */}
      {activeSubTab === 'faq' && (
        <div data-reveal-group className="contact-list-panel mx-auto max-w-[1280px] space-y-9 px-5 pt-9 pb-12 ">
          {/* FAQ Category Pills */}
          <div className="flex flex-wrap gap-3 border-b border-[#D9D9D9] pb-6 sm:gap-4">
            {['all', 'NDT', '자율안전', '견적/일정', '특허기술'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`min-h-[39px] rounded-[11px] border px-[19px] text-[11px] font-medium transition-colors sm:text-[13px] ${
                  faqCategory === cat
                    ? 'border-[#0646F5] bg-[#0646F5] text-white'
                    : 'border-[#D9D9D9] bg-white text-[#1D1919] hover:bg-[#f7f7f7]'
                }`}
              >
                {cat === 'all' ? '전체 카테고리' : cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="contact-faq-item bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 flex justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 font-mono">
                        Q
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-90 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0 font-mono">
                          A
                        </span>
                        <div className="pt-0.5 space-y-2">
                          <p>{faq.answer}</p>
                          <span className="inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                            분류: {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};
