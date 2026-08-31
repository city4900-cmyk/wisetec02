import React, { useState } from 'react';
import {
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  FileText,
  Phone,
  Send,
  Wrench,
  Search,
  ExternalLink,
  ChevronRight,
  Eye,
  Zap,
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
import { COMPANY_INFO, CERTIFICATES, NDT_SERVICES, NOTICES, FAQS } from '../data/companyData';
import { PatentVisualizer } from '../components/PatentVisualizer';
import { InquiryForm } from '../components/InquiryForm';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectAboutSubTab: (sub: AboutSubTab) => void;
  onSelectServicesSubTab: (sub: ServicesSubTab) => void;
  onSelectTechSubTab: (sub: TechSubTab) => void;
  onSelectContactSubTab: (sub: ContactSubTab) => void;
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onOpenNoticeModal: (notice: NoticeItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onSelectAboutSubTab,
  onSelectServicesSubTab,
  onSelectTechSubTab,
  onSelectContactSubTab,
  onOpenCertificateModal,
  onOpenNoticeModal,
}) => {
  const [selectedNdtTab, setSelectedNdtTab] = useState<string>('rt');
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  const currentNdt = NDT_SERVICES.find((s) => s.id === selectedNdtTab) || NDT_SERVICES[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 sm:pt-20 pb-20 sm:pb-28">
        {/* Background Radial Glow & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Main Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge Top */}
              <div className="inline-flex flex-wrap items-center gap-2 p-1 pr-3 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-semibold text-blue-300 shadow-lg">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[11px]">
                  기술 신뢰 보증
                </span>
                <span>ISO 9001 · 45001 인증 & 특허보유</span>
              </div>

              {/* Main Slogan (User Prompt Specification) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-white">
                비파괴검사 및 산업안전 분야의{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  신뢰할 수 있는 파트너
                </span>
                ,<br />
                (주)와이즈텍
              </h1>

              {/* Sub Slogan (User Prompt Specification) */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                첨단 기술력과 ISO 인증 경영시스템을 바탕으로 안전하고 정밀한 검사 서비스를 제공합니다.
                비파괴검사(NDT)부터 산업안전보건법 제98조 자율안전검사 위탁까지 완벽한 솔루션을 제시합니다.
              </p>

              {/* 3 Core Highlight Badges (User Prompt Specification) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div
                  onClick={() => {
                    onSelectTab('about');
                    onSelectAboutSubTab('certifications');
                  }}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/30 hover:border-blue-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-bold text-slate-200">ISO 9001</span>
                  </div>
                  <div className="text-xs text-slate-400">품질경영시스템 인증 (KGS 비파괴검사)</div>
                </div>

                <div
                  onClick={() => {
                    onSelectTab('about');
                    onSelectAboutSubTab('certifications');
                  }}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-bold text-slate-200">ISO 45001</span>
                  </div>
                  <div className="text-xs text-slate-400">안전보건경영시스템 인증 (KGS 비파괴검사)</div>
                </div>

                <div
                  onClick={() => {
                    onSelectTab('technology');
                    onSelectTechSubTab('patent-system');
                  }}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-400/70 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold text-amber-300">특허 제10-2613687호</span>
                  </div>
                  <div className="text-xs text-slate-400">곤돌라 고정식 진공상자 누설검사시스템</div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-inquiry-btn"
                  onClick={() => {
                    onSelectTab('contact');
                    onSelectContactSubTab('inquiry');
                  }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>온라인 견적 및 기술상담</span>
                </button>

                <button
                  id="hero-services-btn"
                  onClick={() => {
                    onSelectTab('services');
                    onSelectServicesSubTab('ndt');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
                >
                  <span>사업분야 둘러보기</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Right Col: Interactive Visual Dashboard / Trust Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      (주)와이즈텍 엔지니어링 센터
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                    전국 출장 대응
                  </span>
                </div>

                {/* Key Overview Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-400 block">설립 및 업력</span>
                    <span className="text-xl font-black text-white font-mono">2021.09</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">정식 법인 등록기업</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-400 block">NDT 검사 영역</span>
                    <span className="text-xl font-black text-blue-400 font-mono">4대 분야</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">UT · MT · PT · LT</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-400 block">산업안전 검사</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">산안법 98조</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">자율안전검사 위탁</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-400 block">품질·안전 인증</span>
                    <span className="text-xl font-black text-amber-400 font-mono">KGS ISO</span>
                    <span className="text-[10px] text-amber-300 block mt-0.5">9001 / 45001</span>
                  </div>
                </div>

                {/* Direct Contact Hotline Bar */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">신속 유선 기술상담</span>
                      <span className="text-base font-bold text-white font-mono">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTab('contact');
                      onSelectContactSubTab('inquiry');
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    문의 접수
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Business Areas (비파괴검사 & 자율안전검사) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5" />
            <span>사업분야 (Services)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            전문성과 신뢰를 갖춘 핵심 검사 서비스
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            비파괴검사 공인 기법(UT, MT, PT, LT)과 산업안전보건법에 따른 자율안전검사 위탁을 통해 고객사의 시설물 건전성과 무재해 사업장 구축을 지원합니다.
          </p>
        </div>

        {/* 2 Major Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Service Pillar 1: 비파괴검사 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
                  NDT
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  교육과학기술부 등록
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  비파괴검사 (Non-Destructive Testing)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  구조물이나 제품을 파괴하지 않고 내부 및 표면의 결함을 정밀 탐지하는 핵심 기술 서비스
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {NDT_SERVICES.map((s) => (
                  <div key={s.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-extrabold text-blue-700 block">{s.code}</span>
                    <span className="text-[11px] text-slate-600 block truncate">{s.nameKo}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>배관, 압력용기, 저장탱크 용접부 결함 정밀 분석</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>석유화학 플랜트 및 제철설비 잔여 수명 평가</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectTab('services');
                  onSelectServicesSubTab('ndt');
                }}
                className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5"
              >
                <span>비파괴검사 4대 분야 상세 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service Pillar 2: 자율안전검사 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                  SAFE
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  산안법 제98조 위탁
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  자율안전검사 (Safety Inspection)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  근로자의 안전 확보 및 산업재해 예방을 위한 법적 근거에 따른 주기적 성능 검사 위탁
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {['크레인/호이스트', '리프트/승강설비', '곤돌라', '압력용기', '프레스/전단기', '롤러/사출기'].map(
                  (item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-center">
                      <span className="text-xs font-bold text-slate-800 block">{item}</span>
                      <span className="text-[10px] text-emerald-700 block">주기적 법정검사</span>
                    </div>
                  )
                )}
              </div>

              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>공인 자격 검사원의 정밀 안전진단 및 성적서 발급</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>미검사 시 법적 과태료 처분 사전 예방 및 리스크 관리</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectTab('services');
                  onSelectServicesSubTab('safety');
                }}
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <span>자율안전검사 대상 및 주기 안내</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive NDT Method Deep-Dive Tab */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">비파괴검사 4대 분야 기법별 특성</h4>
              <p className="text-xs text-slate-500">원하시는 검사 공법을 선택하여 원리와 적용분야를 확인하세요.</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {NDT_SERVICES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedNdtTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedNdtTab === item.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.code} ({item.nameKo.slice(0, 3)})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-blue-700 font-mono">{currentNdt.code}</span>
                <h5 className="text-lg font-bold text-slate-900">{currentNdt.nameKo} ({currentNdt.nameEn})</h5>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{currentNdt.summary}</p>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-900 block">검사 원리 (Principle):</span>
                <p className="leading-relaxed">{currentNdt.principle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block mb-1.5">주요 적용 분야</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {currentNdt.targetApplications.slice(0, 3).map((app, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block mb-1.5">기술적 강점</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {currentNdt.advantages.slice(0, 3).map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 shrink-0">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Equipment Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>주요 보유 검사장비</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {currentNdt.equipment.map((eq, i) => (
                  <li key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                    {eq}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  onSelectTab('contact');
                  onSelectContactSubTab('inquiry');
                }}
                className="w-full mt-3 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{currentNdt.code} 검사 견적 문의</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Certifications & Gallery Section (User Prompt Recommendation) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>공인 인증 및 등록현황</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                품질·안전보건 및 공인 등록현황
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                한국가스안전공사(KGS) ISO 인증서, 비파괴검사업 등록증 및 POSCO 외주작업 인증서 원본을 확인하실 수 있습니다.
              </p>
            </div>

            <button
              onClick={() => {
                onSelectTab('about');
                onSelectAboutSubTab('certifications');
              }}
              className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              <span>인증서 전체 갤러리 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificateModal(cert)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between hover:border-blue-300"
              >
                {/* Document Image Thumbnail */}
                <div className="relative bg-slate-100 border-b border-slate-200 overflow-hidden aspect-[4/3] flex items-center justify-center p-2.5">
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 rounded"
                      onError={(e) => {
                        if (cert.altImageUrl && e.currentTarget.src !== cert.altImageUrl) {
                          e.currentTarget.src = cert.altImageUrl;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600">
                      {cert.category === 'patent' ? (
                        <Sparkles className="w-5 h-5 text-amber-500" />
                      ) : cert.category === 'iso' ? (
                        <Award className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Shield className="w-5 h-5 text-slate-700" />
                      )}
                    </div>
                  )}

                  <div className="absolute top-2 right-2 text-[10px] bg-slate-900/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-full font-bold">
                    {cert.badge}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono truncate">{cert.code}</span>
                    <span className="font-bold text-blue-600 flex items-center gap-0.5 shrink-0">
                      <span>사진보기</span>
                      <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Notices & FAQ Quick Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Latest Notices */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>공지사항 및 소식</span>
              </h3>
              <button
                onClick={() => {
                  onSelectTab('contact');
                  onSelectContactSubTab('notice');
                }}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                <span>전체보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {NOTICES.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => onOpenNoticeModal(notice)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        notice.isImportant
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{notice.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>자주 묻는 질문 (FAQ)</span>
              </h3>
              <button
                onClick={() => {
                  onSelectTab('contact');
                  onSelectContactSubTab('faq');
                }}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                <span>더보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {FAQS.slice(0, 3).map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="w-full p-3.5 text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 flex justify-between items-center gap-2"
                    >
                      <span>Q. {faq.question}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-90 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Online Inquiry Form Section on Home (Prompt Recommendation) */}
      <section id="home-inquiry-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InquiryForm initialServiceCategory="ndt" />
      </section>
    </div>
  );
};
