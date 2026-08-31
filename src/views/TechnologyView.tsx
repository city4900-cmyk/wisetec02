import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Award,
  CheckCircle,
  FileCheck,
  Zap,
  Layers,
  ArrowRight,
  Maximize2,
  Gauge,
  Send,
  Eye,
} from 'lucide-react';
import { TechSubTab, NavTab, ContactSubTab, CertificateItem } from '../types';
import { CERTIFICATES } from '../data/companyData';
import { PatentVisualizer } from '../components/PatentVisualizer';

interface TechnologyViewProps {
  initialSubTab?: TechSubTab;
  onSelectTab: (tab: NavTab) => void;
  onSelectContactSubTab: (sub: ContactSubTab) => void;
  onOpenCertificateModal: (cert: CertificateItem) => void;
}

export const TechnologyView: React.FC<TechnologyViewProps> = ({
  initialSubTab = 'patent-system',
  onSelectTab,
  onSelectContactSubTab,
  onOpenCertificateModal,
}) => {
  const patentCert = CERTIFICATES.find((c) => c.category === 'patent');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Technology Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>특허 등록 제 10-2613687 호</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            곤돌라 고정식 진공상자 누설검사시스템
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            기존 고소작업의 추락 위험과 진공 누설 오차를 근본적으로 해결한 (주)와이즈텍의 독자적 특허 기술입니다.
            작업자의 안전성을 극대화하고 검사 신뢰성을 획기적으로 향상시켰습니다.
          </p>
        </div>
      </div>

      {/* Patent Summary Card & Certificate Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Patent Details</span>
              <h3 className="text-xl font-bold text-slate-900">특허기술 기본 정보</h3>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
              등록일자: 2023년 12월 11일
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 block mb-1">특허 명칭</span>
              <span className="font-bold text-slate-900 text-sm">곤돌라 고정식 진공상자 누설검사시스템</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 block mb-1">등록 번호</span>
              <span className="font-bold text-blue-700 font-mono text-sm">제 10-2613687 호</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 block mb-1">특허권자</span>
              <span className="font-bold text-slate-900 text-sm">(주)와이즈텍 (한명옥)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 block mb-1">인증 기관</span>
              <span className="font-bold text-slate-900 text-sm">대한민국 특허청 (KIPO)</span>
            </div>
          </div>

          {/* 3 Core Highlights from User Prompt */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900">핵심 기술 특징 (Core Advantages)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                  <Shield className="w-4 h-4" />
                  <span>안정적인 고소 검사</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  곤돌라 고정 구조를 활용하여 높은 작업 위치에서도 흔들림 없이 안정적인 진공상자 누설 검사 수행 가능
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                  <Gauge className="w-4 h-4" />
                  <span>높은 정밀도 & 신뢰성</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  일정한 진공 압력(-0.8 bar) 유지와 고투명 아크릴 챔버로 미세 누설(Micro-leak)까지 100% 탐지
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <Zap className="w-4 h-4" />
                  <span>안전성 & 검사 효율 극대화</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  작업자의 추락 위험 원천 방지 및 원터치 링크 메커니즘으로 기존 대비 검사 속도 3배 향상
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Quick Preview Card */}
        {patentCert && (
          <div
            onClick={() => onOpenCertificateModal(patentCert)}
            className="lg:col-span-4 bg-gradient-to-b from-amber-500/10 to-amber-600/5 rounded-2xl border-2 border-amber-400/40 p-6 flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all shadow-md group"
          >
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  특허증 제 10-2613687 호
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  대한민국 특허청 등록증 원본
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  클릭하시면 고해상도 특허증 원본 및 상세 명세서를 확인하실 수 있습니다.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200/60 flex items-center justify-center gap-2 text-xs font-bold text-amber-900 group-hover:text-amber-800">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>특허증 원본 확대보기</span>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Patent Interactive Visualizer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              특허 시스템 구조 및 시뮬레이션
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              실제 플랜트 현장에서 가동되는 곤돌라 고정식 진공상자 시스템의 상세 구동 원리입니다.
            </p>
          </div>
        </div>

        <PatentVisualizer />
      </div>

      {/* Applicable Industrial Sites */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Application</span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            특허 기술 주요 적용 산업 분야
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 block">대형 저장탱크</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              정유 및 석유화학 원유 저장탱크(Storage Tank), LNG/LPG 저온 탱크의 고소 벽체 및 Annular Plate 용접부 기밀 검사
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 block">플랜트 고압 배관</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              파이프랙(Pipe Rack) 상부 고소 배관 및 타워(Column), 반응기(Reactor) 연결 플랜지 용접부 기밀성 검증
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 block">조선 및 해양 구조물</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              선박 화물창(Cargo Tank) 격벽, FPSO 및 해양 플랜트 모듈의 고위험 고소 부위 누설 탐상
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 block">발전 및 가스 플랜트</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              복합화력발전소 HRSG 닥트, 가스 홀더 및 대형 압력용기 본체 용접선 비파괴 누설 검사
            </p>
          </div>
        </div>

        {/* CTA Quote */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            특허 기술 적용 시공 및 현장 검사 용역 의뢰를 환영합니다.
          </div>
          <button
            onClick={() => {
              onSelectTab('contact');
              onSelectContactSubTab('inquiry');
            }}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>특허기술 검사 견적 문의하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
