import React, { useState } from 'react';
import {
  Wrench,
  Shield,
  CheckCircle,
  FileCheck,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Layers,
  Send,
} from 'lucide-react';
import { ServicesSubTab, NavTab, ContactSubTab } from '../types';
import { NDT_SERVICES, SAFETY_INSPECTION_ITEMS } from '../data/companyData';

interface ServicesViewProps {
  initialSubTab?: ServicesSubTab;
  onSelectTab: (tab: NavTab) => void;
  onSelectContactSubTab: (sub: ContactSubTab) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialSubTab = 'safety',
  onSelectTab,
  onSelectContactSubTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ServicesSubTab>(initialSubTab);
  const [selectedNdtDetail, setSelectedNdtDetail] = useState<string>('ut');

  const selectedNdt = NDT_SERVICES.find((s) => s.id === selectedNdtDetail) || NDT_SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Services Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
            Services & Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            산업 현장의 안전과 품질을 검증하는 전문 검사 솔루션
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            산업안전보건법에 따른 자율안전검사 기관으로서 법정 자율안전검사 위탁과 구조물의 결함을 정밀 판독하는 비파괴검사를 통해 무재해 안전 현장을 완성합니다.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveSubTab('safety')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'safety'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>자율안전검사 (Safety Inspection)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ndt')}
          className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'ndt'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>비파괴검사 (NDT Services)</span>
        </button>
      </div>

      {/* 1. Safety Inspection Tab (자율안전검사) */}
      {activeSubTab === 'safety' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Safety Overview Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    산업안전보건법에 따른 자율안전검사 기관
                  </span>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                    법정 위탁 검사
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  자율안전검사 위탁 (Safety Inspection)
                </h2>
              </div>

              <button
                onClick={() => {
                  onSelectTab('contact');
                  onSelectContactSubTab('inquiry');
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>자율안전검사 상담 및 위탁 신청</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed max-w-4xl">
              <p>
                <strong>산업안전보건법(자율안전검사 프로그램 등)</strong>에 따라 유해하거나 위험한 기계·기구 및 설비를 사용하는 사업주는 안전인증 기준을 충족하는지 정기적으로 검사해야 합니다.
              </p>
              <p>
                (주)와이즈텍은 법적 자격을 갖춘 전문 검사원을 통해 크레인, 리프트, 곤돌라, 압력용기, 프레스 등 사업장 내 주요 위험 설비에 대한 안전 성능 검사를 대행하여 작업장 무재해 달성과 법적 리스크를 사전에 완벽히 차단합니다.
              </p>
            </div>
          </div>

          {/* Legal Target Equipment & Cycles Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                자율안전검사 주요 대상 설비 및 법정 검사 주기
              </h3>
              <p className="text-xs text-slate-500">
                정기 검사 주기를 확인하여 법적 과태료 처분을 사전에 방지하시기 바랍니다.
              </p>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                    <th className="p-3.5 font-bold w-1/4">대상 기계·기구</th>
                    <th className="p-3.5 font-bold w-1/3">법정 검사 주기</th>
                    <th className="p-3.5 font-bold">주요 검사 항목 및 범위</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {SAFETY_INSPECTION_ITEMS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{item.targetEquipment}</td>
                      <td className="p-3.5 text-emerald-800 font-semibold">{item.legalCycle}</td>
                      <td className="p-3.5 text-slate-600">{item.inspectionScope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Entrust with WISETEC? */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base">NDT 정밀 기술 결합</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                단순 육안 점검을 넘어 초음파 두께 측정 및 비파괴 용접부 검사를 함께 결합하여 기계 내부 잔여 수명과 피로 균열까지 정밀 진단합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base">신속한 일정 및 전국 출장</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                공정 가동 중단(Shut-down) 시간을 최소화하기 위해 주말 및 야간 맞춤형 검사 스케줄 조율과 신속한 성적서 발송을 지원합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base">중대재해처벌법 대비 컨설팅</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                기계적 결함 발견 시 개선 조치 보고서와 함께 사업장의 안전보건 관리체계 구축을 위한 실질적인 안전 가이드를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. NDT Tab */}
      {activeSubTab === 'ndt' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* NDT Overview Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    교육과학기술부 등록업체
                  </span>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                    ISO 9001/45001 인증
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  비파괴검사 (Non-Destructive Testing)
                </h2>
              </div>

              <button
                onClick={() => {
                  onSelectTab('contact');
                  onSelectContactSubTab('inquiry');
                }}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>비파괴검사 견적 문의</span>
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
              비파괴검사란 구조물이나 부품, 소재를 손상시키거나 파괴하지 않고 물리적 현상(초음파, 자기, 침투, 기밀 누설 등)을 응용하여 내부 및 표면의 결함 여부와 상태를 판정하는 공인 정밀 기술 서비스입니다.
              (주)와이즈텍은 최고의 숙련 기술자와 첨단 검사장비를 통해 신뢰할 수 있는 성적서를 제공합니다.
            </p>
          </div>

          {/* 4 Major NDT Methods Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900">NDT 4대 공인 검사 영역 및 기술 소개</h3>

            {/* Methods Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {NDT_SERVICES.map((method) => {
                const isSelected = selectedNdtDetail === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedNdtDetail(method.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-mono font-black text-blue-600 block">{method.code}</span>
                    <span className="text-sm font-bold text-slate-900 block mt-1">{method.nameKo}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{method.nameEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Selected NDT Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-blue-700 font-mono">{selectedNdt.code}</span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900">{selectedNdt.nameKo}</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {selectedNdt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">{selectedNdt.nameEn}</p>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {selectedNdt.id === 'lt' && (
                    <span className="bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>와이즈텍 특허 곤돌라 시스템 연계</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Principle & Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">개요 및 특징</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{selectedNdt.summary}</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 block mb-1">검사 원리 (Scientific Principle):</strong>
                    {selectedNdt.principle}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">핵심 기술 강점</span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedNdt.advantages.map((adv, i) => (
                      <li key={i} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Target Applications & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>주요 적용 설비 및 검사 대상</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedNdt.targetApplications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    <span>보유 정밀 검사 장비</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedNdt.equipment.map((eq, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Step Inspection Process */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 sm:p-12 text-white space-y-8">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Workflow</span>
              <h3 className="text-2xl font-black">비파괴검사 표준 수행 절차 (6단계)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { step: '01', title: '의뢰 및 도면 검토', desc: '검사 부위 및 재질, 규격 확인' },
                { step: '02', title: '검사 계획 수립', desc: 'NDT 기법 선정 및 인력 편성' },
                { step: '03', title: '현장 방문 & 전처리', desc: '검사면 세척 및 안전 점검' },
                { step: '04', title: '정밀 비파괴 탐상', desc: 'UT/MT/PT/LT 표준 검사 수행' },
                { step: '05', title: '결함 분석 & 판정', desc: '기술책임자 정밀 데이터 판독' },
                { step: '06', title: '공식 성적서 발행', desc: '시험성적서 및 보고서 납품' },
              ].map((p) => (
                <div key={p.step} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
                  <span className="text-xs font-mono font-black text-blue-400 block">{p.step}</span>
                  <h5 className="font-bold text-sm text-white">{p.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
