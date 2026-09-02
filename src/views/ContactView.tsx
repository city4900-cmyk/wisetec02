import React, { useState } from 'react';
import {
  Send,
  FileText,
  HelpCircle,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { ContactSubTab, NoticeItem, FaqItem } from '../types';
import { COMPANY_INFO, NOTICES, FAQS } from '../data/companyData';
import { InquiryForm } from '../components/InquiryForm';

interface ContactViewProps {
  initialSubTab?: ContactSubTab;
  onOpenNoticeModal: (notice: NoticeItem) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialSubTab = 'inquiry',
  onOpenNoticeModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ContactSubTab>(initialSubTab);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
            Customer Center & Inquiry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            고객지원 및 온라인 견적·상담 문의
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            비파괴검사(NDT: UT, PAUT, MT, PT), 자율안전검사 위탁 등 궁금하신 사항을 남겨주시면
            전문 엔지니어가 신속하고 정확하게 맞춤 상담을 진행해 드립니다.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveSubTab('inquiry')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'inquiry'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>견적 및 상담 문의 (Online Inquiry)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notice')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'notice'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>공지사항 / 소식 (Notice)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('faq')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'faq'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>자주 묻는 질문 (FAQ)</span>
        </button>
      </div>

      {/* 1. Inquiry Tab */}
      {activeSubTab === 'inquiry' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Contact Overview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Hotline</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">상담 및 접수 안내</h3>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/60 space-y-1">
                    <span className="font-bold text-blue-950 block">검사 견적 유선 직통</span>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xl font-black text-blue-700 font-mono block hover:underline"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-blue-600 font-medium">FAX: {COMPANY_INFO.fax}</span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">운영 시간</strong>
                        <span className="text-slate-500">{COMPANY_INFO.workingHours}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">이메일 접수</strong>
                        <span className="font-mono text-slate-500">{COMPANY_INFO.email}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">본사 주소</strong>
                        <span className="text-slate-500">{COMPANY_INFO.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-blue-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>(주)와이즈텍의 3대 약속</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>영업일 기준 24시간 이내 신속 견적서 회신</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>숙련된 자격 기술자의 책임 검사 및 성적서 발급</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>고객사 기술 보안 및 설계 도면 철저 보호</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Inquiry Form Component */}
            <div className="lg:col-span-8">
              <InquiryForm initialServiceCategory="ndt" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Notice Tab */}
      {activeSubTab === 'notice' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {['all', '공지', '인증/특허', '안전정보'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNoticeCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    noticeCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? '전체 소식' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="제목 또는 내용 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* Notice Table / List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-200">
              {filteredNotices.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  검색 조건에 해당하는 공지사항이 없습니다.
                </div>
              ) : (
                filteredNotices.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenNoticeModal(item)}
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
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* FAQ Category Pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'NDT', '자율안전', '견적/일정', '특허기술'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  faqCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
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
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
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
    </div>
  );
};
