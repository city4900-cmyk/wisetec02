import React, { useState } from 'react';
import {
  Award,
  Building2,
  FileCheck,
  MapPin,
  Shield,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Copy,
  ExternalLink,
  Navigation,
  Bus,
  Car,
  Clock,
  Eye,
  Check,
} from 'lucide-react';
import { AboutSubTab, CertificateItem } from '../types';
import { COMPANY_INFO, CERTIFICATES } from '../data/companyData';
import { WisetechLogo } from '../components/WisetechLogo';

interface AboutViewProps {
  initialSubTab?: AboutSubTab;
  onOpenCertificateModal: (cert: CertificateItem) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  initialSubTab = 'greeting',
  onOpenCertificateModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AboutSubTab>(initialSubTab);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [certFilter, setCertFilter] = useState<'all' | 'patent' | 'iso' | 'license'>('all');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const filteredCerts =
    certFilter === 'all'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === certFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Subpage Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
            About (주)와이즈텍
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            신뢰와 기술로 미래 산업 안전을 선도합니다
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            (주)와이즈텍은 산업안전보건법에 따른 자율안전검사 기관이자 비파괴검사 전문기업으로서,
            ISO 9001/45001 인증 품질·안전 관리체계와 독자 특허 기술을 기반으로 고객사의 소중한 설비와 안전을 지킵니다.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveSubTab('greeting')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'greeting'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>대표이사 인사말 (CEO)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>기업개요 및 연혁 (Overview)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('certifications')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'certifications'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>특허 및 인증현황 (Certifications)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('location')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'location'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>오시는 길 (Location)</span>
        </button>
      </div>

      {/* Sub-tab 1: 인사말 (CEO) */}
      {activeSubTab === 'greeting' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* CEO Profile Left Card */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-8 text-white text-center space-y-6 shadow-xl border border-slate-800">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 mx-auto flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-blue-600/30">
                한
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">한 명 옥</h3>
                <span className="text-xs text-blue-400 font-semibold">(주)와이즈텍 대표이사</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
                <div className="flex items-center gap-2 text-slate-200 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>경영 철학</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  "정직한 기술과 한치의 오차도 없는 정밀 검사로 고객사의 안전을 지키는 든든한 파트너가 되겠습니다."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1 text-left">
                <p>• ISO 9001 품질경영체계 확립</p>
                <p>• ISO 45001 안전보건경영 실천</p>
                <p>• 곤돌라 고정식 누설검사시스템 특허 보유</p>
              </div>
            </div>

            {/* Greeting Letter Right Content */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">CEO Message</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  "고객의 안전과 신뢰를 최우선의 가치로 삼고, 끊임없는 기술 혁신을 이루어 나가겠습니다."
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  안녕하십니까. <strong>(주)와이즈텍 공식 홈페이지를 찾아주신 고객 여러분을 진심으로 환영합니다.</strong>
                </p>
                <p>
                  현대 산업 현장은 고도화된 기술과 함께 대형화·복잡화되고 있으며, 이에 따라 구조물의 결함 조기 발견과 작업장 내 위험 기계에 대한 체계적인 안전 검사의 중요성은 그 어느 때보다 강조되고 있습니다.
                </p>
                <p>
                  (주)와이즈텍은 <strong>산업안전보건법에 따른 자율안전검사 기관</strong>으로서 <strong>자율안전검사 위탁</strong> 및 <strong>비파괴검사</strong>를 주력으로 수행하는 전문 기술 엔지니어링 기업입니다.
                </p>
                <p>
                  당사는 공인인증기관인 한국가스안전공사(KGS)로부터 <strong>ISO 9001(품질경영)</strong> 및 <strong>ISO 45001(안전보건경영)</strong> 인증을 획득하여 글로벌 스탠다드에 부합하는 철저한 프로세스를 운영하고 있으며, 자체 개발한 <strong>'곤돌라 고정식 진공상자 누설검사시스템(특허 제 10-2613687 호)'</strong>을 통해 고소 작업 환경에서도 안전성과 정밀도를 비약적으로 혁신하였습니다.
                </p>
                <p>
                  앞으로도 (주)와이즈텍의 전 임직원은 고객 여러분의 소중한 자산과 근로자의 안전을 완벽히 지키기 위해, 현장 중심의 신속·정확한 검사 서비스와 끊임없는 기술 개발로 보답할 것을 약속드립니다.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">
                  (주)와이즈텍 임직원 일동
                </span>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">(주)와이즈텍 대표이사</span>
                  <span className="text-lg font-bold text-slate-900 font-serif">한 명 옥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: 기업개요 및 연혁 (Overview & History) */}
      {activeSubTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Company Overview Table (Strict user prompt matching) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 px-6 sm:px-8 py-5 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">기업개요 (Company Overview)</h3>
                <p className="text-xs text-slate-300">공식 법인 등록 정보</p>
              </div>
              <span className="text-xs font-bold bg-blue-600 text-white px-3 py-1 rounded-full">
                설립 2021년
              </span>
            </div>

            <div className="divide-y divide-slate-200 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">회사명</span>
                <span className="font-bold text-slate-900 sm:col-span-3">
                  {COMPANY_INFO.name} ({COMPANY_INFO.nameEn})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">대표자</span>
                <span className="font-bold text-slate-900 sm:col-span-3">{COMPANY_INFO.ceo}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">설립일 / 개업일</span>
                <span className="text-slate-800 sm:col-span-3 font-mono">{COMPANY_INFO.establishedDate}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">사업자등록번호</span>
                <span className="text-slate-900 sm:col-span-3 font-mono font-bold">
                  {COMPANY_INFO.businessNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">본사 주소</span>
                <span className="text-slate-800 sm:col-span-3">
                  {COMPANY_INFO.address} ({COMPANY_INFO.addressDetail})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">업태 / 종목</span>
                <span className="text-slate-800 sm:col-span-3">
                  {COMPANY_INFO.businessType} / {COMPANY_INFO.businessItem}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-slate-50">
                <span className="font-bold text-slate-600 sm:col-span-1">주요 사업</span>
                <div className="sm:col-span-3 space-y-1.5 text-slate-800">
                  <p className="flex items-center gap-2 font-medium">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>산업안전보건법에 따른 자율안전검사 기관 (자율안전검사 위탁)</span>
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>비파괴검사 등록기업 (비파괴검사 기술용역)</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>곤돌라 고정식 진공상자 누설검사시스템 특허 시공 및 기술용역</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Identity (CI) / WT Monogram Logo Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 sm:p-10 shadow-lg text-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-6">
              <div>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block">Corporate Identity</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">기업 CI 및 WT 심볼마크 소개</h3>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full self-start">
                WT (WiseTec) Monogram
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-950/80 p-6 rounded-2xl border border-slate-700/80">
                <WisetechLogo variant="vertical" theme="dark" size="lg" />
              </div>

              <div className="lg:col-span-8 space-y-4 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-slate-700 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      W
                    </div>
                    <div>
                      <strong className="text-white font-bold">W (Wise / World-class Safety)</strong>:
                      <span className="text-slate-300 text-xs sm:text-sm block mt-0.5">
                        지혜롭고 철저한 안전 검사 체계와 전문 엔지니어링 역량을 상징하는 견고한 블랙/차콜 베이스.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      T
                    </div>
                    <div>
                      <strong className="text-amber-400 font-bold">T (Technology / Trust)</strong>:
                      <span className="text-slate-300 text-xs sm:text-sm block mt-0.5">
                        독보적 검사 기술력과 고객 신뢰를 상징하는 활력 넘치는 황금빛(골드-앰버) 모노그램.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ○
                    </div>
                    <div>
                      <strong className="text-amber-300 font-bold">Orbital Ring (오비탈 궤도 링)</strong>:
                      <span className="text-slate-300 text-xs sm:text-sm block mt-0.5">
                        비파괴검사와 자율안전검사를 통한 360도 전방위 무결점 안전관리망과 미래지향적 가치를 표현합니다.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">History</span>
              <h3 className="text-2xl font-black text-slate-900">기업 주요 연혁</h3>
            </div>

            <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-8">
              {/* Timeline Item 2024 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">2024년</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">온라인 견적 시스템 고도화 및 전국 플랜트 검사 확대</h4>
                <p className="text-xs text-slate-600 mt-1">
                  여수·광양·울산·포항 등 주요 화학 플랜트 및 제철소 정기 비파괴 및 자율안전검사 수주 확대
                </p>
              </div>

              {/* Timeline Item 2023 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">2023년 12월 11일</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">대한민국 특허청 특허 등록 완료</h4>
                <p className="text-xs text-slate-600 mt-1">
                  '곤돌라 고정식 진공상자 누설검사시스템' 특허 등록 (제 10-2613687 호)
                </p>
              </div>

              {/* Timeline Item 2023 ISO */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">2023년</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">한국가스안전공사(KGS) ISO 9001 & ISO 45001 동시 인증 획득</h4>
                <p className="text-xs text-slate-600 mt-1">
                  비파괴검사 부문 품질경영시스템 및 안전보건경영시스템 국제 규격 적격 인증
                </p>
              </div>

              {/* Timeline Item 2021 */}
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-800 ring-4 ring-slate-200"></div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">2021년 09월 01일</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">(주)와이즈텍 법인 설립 및 사업 개시</h4>
                <p className="text-xs text-slate-600 mt-1">
                  전라남도 광양시 중동에 본사 설립, 교육과학기술부 등록 비파괴검사 및 자율안전검사 위탁 개시
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: 특허 및 인증현황 (Certifications & Patents Gallery) */}
      {activeSubTab === 'certifications' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">특허 및 공인 인증현황</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                (주)와이즈텍이 보유한 특허증, ISO 9001/45001 인증서 및 정식 면허 증빙
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setCertFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  certFilter === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체보기
              </button>
              <button
                onClick={() => setCertFilter('patent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  certFilter === 'patent' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                특허증 (Patent)
              </button>
              <button
                onClick={() => setCertFilter('iso')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  certFilter === 'iso' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ISO 인증서
              </button>
              <button
                onClick={() => setCertFilter('license')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  certFilter === 'license' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                등록증/인가서
              </button>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificateModal(cert)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between hover:border-blue-300"
              >
                {/* Certificate Visual Banner / Document Image Preview */}
                <div className="relative bg-slate-100 border-b border-slate-200 overflow-hidden aspect-[4/3] flex items-center justify-center p-3">
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 rounded"
                      onError={(e) => {
                        if (cert.altImageUrl && e.currentTarget.src !== cert.altImageUrl) {
                          e.currentTarget.src = cert.altImageUrl;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-blue-700">
                      {cert.category === 'patent' ? (
                        <Sparkles className="w-7 h-7 text-amber-500" />
                      ) : cert.category === 'iso' ? (
                        <Award className="w-7 h-7 text-blue-600" />
                      ) : (
                        <Shield className="w-7 h-7 text-slate-700" />
                      )}
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 right-3 text-[11px] bg-slate-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full font-bold shadow">
                    {cert.badge}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <Eye className="w-3.5 h-3.5" />
                      <span>원본 사진 및 상세 보기</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 font-bold">
                      {cert.code}
                    </div>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{cert.issueDate}</span>
                    <span className="font-bold text-blue-600 flex items-center gap-1">
                      <span>사진 원본</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: 오시는 길 (Location) */}
      {activeSubTab === 'location' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Location Info */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Headquarters</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">(주)와이즈텍 본사 안내</h3>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">도로명 주소</span>
                  <p className="font-bold text-slate-900 text-base">{COMPANY_INFO.address}</p>
                  <p className="text-xs text-slate-500">지번: 전남 광양시 중동 (중마청룡길 인근)</p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mt-1 pt-1 border-t border-slate-200 w-full"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAddress ? '주소가 클립보드에 복사되었습니다!' : '주소 텍스트 복사하기'}</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">대표 전화</span>
                      <span className="font-bold text-slate-900 font-mono text-sm">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">이메일 문의</span>
                      <span className="font-mono text-slate-900">{COMPANY_INFO.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">업무 시간</span>
                      <span>{COMPANY_INFO.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Links */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">내비게이션 및 지도 앱 바로가기</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://map.kakao.com/?q=전라남도 광양시 중마청룡길 30-6"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/40 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-400/20 transition-colors"
                  >
                    <span>카카오맵 길찾기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href="https://map.naver.com/v5/search/전라남도 광양시 중마청룡길 30-6"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                  >
                    <span>네이버지도 길찾기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive SVG Map / Transport Guide */}
            <div className="lg:col-span-7 space-y-6">
              {/* Map Preview Canvas */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white overflow-hidden shadow-lg relative min-h-[300px] flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-md">
                    (주)와이즈텍 본사 사옥
                  </span>
                  <span className="text-slate-400">광양시청 · 중마터미널 생활권</span>
                </div>

                {/* Styled Schematic Map Visualizer */}
                <div className="my-6 p-6 bg-slate-950/80 rounded-xl border border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 text-blue-300 flex items-center justify-center mx-auto">
                    <MapPin className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">(주)와이즈텍 본사</h4>
                    <p className="text-xs text-slate-400 mt-1">{COMPANY_INFO.address}</p>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    전남 광양 국가산단 및 여수 화학단지 신속 검사 대응 거점
                  </div>
                </div>

                <div className="text-xs text-slate-400 text-center">
                  주차 공간 완비 / 방문 전 전화 주시면 상세 안내 및 주차 지원해 드립니다.
                </div>
              </div>

              {/* Transportation Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span>자가용 이용 시</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>동광양 IC</strong> 또는 <strong>옥곡 IC</strong> 진출 후 광양시청 및 중마동 방면으로 약 10분 소요 (네비게이션 '중마청룡길 30-6' 검색)
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Bus className="w-4 h-4 text-emerald-600" />
                    <span>대중교통 / KTX 이용 시</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>중마버스터미널</strong>에서 택시 5분 / KTX 순천역 또는 광양역 연계 버스 탑승 후 중마동 하차
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
