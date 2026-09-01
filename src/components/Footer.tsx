import React from 'react';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  FileCheck,
  Award,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { NavTab, AboutSubTab, ServicesSubTab, TechSubTab, ContactSubTab } from '../types';
import { WisetechLogo } from './WisetechLogo';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectAboutSubTab?: (sub: AboutSubTab) => void;
  onSelectServicesSubTab?: (sub: ServicesSubTab) => void;
  onSelectTechSubTab?: (sub: TechSubTab) => void;
  onSelectContactSubTab?: (sub: ContactSubTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectAboutSubTab,
  onSelectServicesSubTab,
  onSelectTechSubTab,
  onSelectContactSubTab,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Company Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <WisetechLogo variant="header" theme="dark" size="md" />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              산업안전보건법에 따른 자율안전검사 위탁 및 비파괴검사(NDT) 전문기술 엔지니어링 기업.
              첨단 기술력과 ISO 인증 경영시스템을 바탕으로 안전하고 정밀한 검사 서비스를 제공합니다.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 font-medium">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                ISO 9001:2015 인증
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                ISO 45001:2018 인증
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-amber-500/30 text-amber-300 font-medium">
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                특허 제 10-2613687 호
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links - 회사소개 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              회사소개 (About)
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    if (onSelectAboutSubTab) onSelectAboutSubTab('greeting');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  대표이사 인사말 (CEO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    if (onSelectAboutSubTab) onSelectAboutSubTab('overview');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  기업개요 및 연혁
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    if (onSelectAboutSubTab) onSelectAboutSubTab('certifications');
                  }}
                  className="hover:text-blue-400 transition-colors text-slate-300 font-medium"
                >
                  특허 및 인증현황 (ISO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    if (onSelectAboutSubTab) onSelectAboutSubTab('location');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  오시는 길 (광양 본사)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              사업분야 (Services)
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('services');
                    if (onSelectServicesSubTab) onSelectServicesSubTab('safety');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  자율안전검사 위탁 (산업안전보건법)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('services');
                    if (onSelectServicesSubTab) onSelectServicesSubTab('ndt');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  비파괴검사
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    if (onSelectAboutSubTab) onSelectAboutSubTab('certifications');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  공인 면허 및 인증서 확인
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('contact');
                    if (onSelectContactSubTab) onSelectContactSubTab('notice');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  공지사항 및 회사소식
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer Center & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              고객센터 (Customer)
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">검사 및 견적 상담 직통</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-lg font-black text-white hover:text-blue-400 transition-colors font-mono"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{COMPANY_INFO.email}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectTab('contact');
                  if (onSelectContactSubTab) onSelectContactSubTab('inquiry');
                }}
                className="w-full mt-2 py-2 px-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors text-center"
              >
                온라인 견적 요청 바로가기
              </button>
            </div>
          </div>
        </div>

        {/* Official Footer Text Section (Strictly matching prompt specification) */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="font-semibold text-slate-200">
              (주)와이즈텍 | 대표자: {COMPANY_INFO.ceo} | 사업자등록번호: {COMPANY_INFO.businessNumber}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>주소: {COMPANY_INFO.address}</span>
            </p>
            <p>
              주요사업: 자율안전검사 위탁, 비파괴검사, 기술시험 및 분석
            </p>
            <p className="text-slate-400 pt-1">
              Copyright © (주)와이즈텍. All Rights Reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="self-end md:self-auto p-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all shadow-md group"
            title="맨 위로 이동"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
