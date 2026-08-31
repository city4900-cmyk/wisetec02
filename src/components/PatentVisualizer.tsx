import React, { useState } from 'react';
import {
  Shield,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  Gauge,
  Maximize2,
  Lock,
  Activity,
} from 'lucide-react';

export const PatentVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('vacuum-box');
  const [activeViewMode, setActiveViewMode] = useState<'diagram' | 'comparison'>('diagram');

  const hotspots = [
    {
      id: 'gondola-frame',
      title: '1. 고강도 곤돌라 승강 프레임',
      desc: '고소 작업 시 작업자와 검사 장비 일체를 지탱하며 수직/수평 이동을 안전하게 제어하는 플랫폼 구조체',
      tag: '안전성 확보',
      x: '25%',
      y: '30%',
    },
    {
      id: 'fixed-arm',
      title: '2. 곤돌라 일체형 고정 링크 암 (특허 핵심)',
      desc: '곤돌라 난간과 진공상자 본체를 견고히 체결하여 작업자의 수동 압착 없이도 검사면에 수직 밀착력을 균일하게 전달',
      tag: '진동 및 흔들림 제어',
      x: '50%',
      y: '45%',
    },
    {
      id: 'vacuum-box',
      title: '3. 고투명 아크릴 진공 챔버 & 실링 패드',
      desc: '용접선 결함 및 미세 기포를 360도 왜곡 없이 관찰 가능한 고강도 챔버와 초밀착 실리콘 가스켓',
      tag: '정밀 기밀 유지',
      x: '68%',
      y: '58%',
    },
    {
      id: 'sensor-gauge',
      title: '4. 디지털 차압 감지 센서 & 급속 감압 밸브',
      desc: '검사 규격에 명시된 -0.5 bar ~ -0.8 bar 음압을 신속하게 형성하고 압력 강하율을 디지털로 정밀 기록',
      tag: '데이터 신뢰성',
      x: '82%',
      y: '38%',
    },
  ];

  const steps = [
    {
      step: 1,
      title: '곤돌라 승강 & 위치 정렬',
      desc: '검사 대상 배관 및 탱크의 고소 용접부 위치로 곤돌라를 정밀 이동 및 앵커 고정',
    },
    {
      step: 2,
      title: '특허 링크 암 고정 & 발포액 도포',
      desc: '작업자 안전 발판 내에서 검사 부위에 발포 누설 탐지액을 도포하고 고정 링크 암 체결',
    },
    {
      step: 3,
      title: '원터치 진공 흡착 (음압 형성)',
      desc: '진공 펌프 가동으로 챔버 내 규정 진공도 형성, 고정 암이 반발력을 지탱하여 무인 밀착 유지',
    },
    {
      step: 4,
      title: '미세 누설 기포 판독 & 디지털 기록',
      desc: '투명 창을 통한 미세 누설 지시 육안 판독 및 디지털 압력 센서 변화율 검사 성적서 데이터화',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>대한민국 특허청 등록 제 10-2613687 호</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              곤돌라 고정식 진공상자 누설검사시스템
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              고소 대형 저장탱크 및 고위험 배관의 누설검사를 위해 독자 개발된 와이즈텍 고유의 특허 시스템.
              작업자 추락 위험을 원천 차단하고 검사 정밀도를 획기적으로 향상시켰습니다.
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <div className="px-4 py-2 bg-blue-900/60 border border-blue-400/30 rounded-xl text-center">
              <span className="text-xs text-blue-200 block">검사 정밀도</span>
              <span className="text-lg font-black text-amber-400">99.8%</span>
            </div>
            <div className="px-4 py-2 bg-emerald-900/60 border border-emerald-400/30 rounded-xl text-center">
              <span className="text-xs text-emerald-200 block">고소작업 안전성</span>
              <span className="text-lg font-black text-emerald-400">무사고 100%</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveViewMode('diagram')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeViewMode === 'diagram'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>시스템 구조 및 작동 메커니즘</span>
          </button>
          <button
            onClick={() => setActiveViewMode('comparison')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeViewMode === 'comparison'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>기존 수동방식 vs 와이즈텍 특허방식 비교</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      {activeViewMode === 'diagram' ? (
        <div className="p-6 sm:p-8 space-y-8">
          {/* Interactive SVG Diagram Canvas */}
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-inner min-h-[380px] flex flex-col justify-between">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

            {/* Top Stats on Canvas */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-mono">실시간 진공도: -0.75 bar (안정 흡착중)</span>
              </div>

              <div className="text-slate-400">
                <span>각 부위의 핫스팟 번호를 클릭하여 상세 기능을 확인하세요.</span>
              </div>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative z-10 my-8 flex items-center justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-blue-900/50 p-6 relative">
                {/* Visual Tank Wall Representation */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded-l-xl flex items-center justify-center">
                  <span className="text-[9px] font-bold text-slate-300 -rotate-90 whitespace-nowrap">
                    검사대상 탱크/배관 외벽
                  </span>
                </div>

                {/* System Schematic Representation */}
                <div className="pl-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  {/* Part 1: Gondola Basket */}
                  <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-center relative group">
                    <div className="text-[10px] text-blue-400 font-bold mb-1">01. 곤돌라 플랫폼</div>
                    <div className="h-16 bg-slate-900/80 rounded-lg flex items-center justify-center border border-slate-700/80">
                      <Lock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-[11px] text-slate-300 font-semibold mt-2">고소 승강 안전기반</div>
                  </div>

                  {/* Part 2: Fixed Arm Linkage */}
                  <div className="bg-slate-800/90 border-2 border-amber-500/50 rounded-xl p-3 text-center relative group">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap">
                      특허 핵심부
                    </span>
                    <div className="text-[10px] text-amber-300 font-bold mb-1">02. 고정 링크 암</div>
                    <div className="h-16 bg-amber-950/40 rounded-lg flex items-center justify-center border border-amber-500/40">
                      <Gauge className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-[11px] text-amber-200 font-semibold mt-2">수직 밀착 하중 전달</div>
                  </div>

                  {/* Part 3: Vacuum Chamber */}
                  <div className="bg-slate-800/90 border border-blue-500/40 rounded-xl p-3 text-center relative group">
                    <div className="text-[10px] text-blue-300 font-bold mb-1">03. 진공 챔버</div>
                    <div className="h-16 bg-blue-950/40 rounded-lg flex items-center justify-center border border-blue-500/40">
                      <Maximize2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-[11px] text-slate-300 font-semibold mt-2">투명 아크릴 뷰어</div>
                  </div>

                  {/* Part 4: Digital Sensor */}
                  <div className="bg-slate-800/90 border border-emerald-500/40 rounded-xl p-3 text-center relative group">
                    <div className="text-[10px] text-emerald-300 font-bold mb-1">04. 디지털 센서</div>
                    <div className="h-16 bg-emerald-950/40 rounded-lg flex items-center justify-center border border-emerald-500/40">
                      <Activity className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-slate-300 font-semibold mt-2">차압 실시간 계측</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotspot Selector Pills */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {hotspots.map((spot) => {
                const isSelected = selectedHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold">{spot.title}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-blue-400'
                        }`}
                      >
                        {spot.tag}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {spot.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-Step Operational Flow */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>특허 시스템 4단계 정밀 검사 프로세스</span>
              </h4>
              <span className="text-xs text-slate-500">원터치 안전 검사 루틴</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeStep === item.step
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        activeStep === item.step
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">STAGE 0{item.step}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Comparison View Mode */
        <div className="p-6 sm:p-8 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                  <th className="p-4 font-bold w-1/4">비교 항목</th>
                  <th className="p-4 font-bold text-slate-600 w-3/8">기존 수동 진공상자 검사 방식</th>
                  <th className="p-4 font-bold text-blue-700 bg-blue-50/80 w-3/8 border-l-2 border-blue-500">
                    와이즈텍 특허 곤돌라 고정식 시스템
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>작업자 안전성</span>
                  </td>
                  <td className="p-4 text-slate-600">
                    불안정한 비계 위에서 작업자가 무거운 챔버를 수동 압착하여 <strong>추락 및 근골격계 재해 위험 높음</strong>
                  </td>
                  <td className="p-4 font-bold text-emerald-800 bg-blue-50/50 border-l-2 border-blue-500">
                    곤돌라 프레임에 일체형 고정되어 <strong>작업자 안전난간 내부 작업으로 추락 위험 원천 제거</strong>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span>진공 밀착도 & 정밀성</span>
                  </td>
                  <td className="p-4 text-slate-600">
                    작업자 완력에 의존하여 검사면 압착력이 불균일하고 진공 누설로 인한 오판정 가능성 존재
                  </td>
                  <td className="p-4 font-bold text-blue-900 bg-blue-50/50 border-l-2 border-blue-500">
                    기계식 링크 암이 수직 압착력을 일정하게 유지하여 <strong>-0.8 bar 고진공도 완벽 유지</strong>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                    <span>검사 속도 및 생산성</span>
                  </td>
                  <td className="p-4 text-slate-600">
                    매 포인트마다 수동 탈부착 및 위치 수정으로 1일 검사 가능 포인트 제한적 (피로도 가중)
                  </td>
                  <td className="p-4 font-bold text-blue-900 bg-blue-50/50 border-l-2 border-blue-500">
                    원터치 레버 조작 및 연속 승강 검사로 <strong>검사 소요시간 60% 단축 (효율 3배 향상)</strong>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>데이터 신뢰도</span>
                  </td>
                  <td className="p-4 text-slate-600">
                    아날로그 눈금 게이지 육안 확인에 국한되어 정량적 이력 관리 한계
                  </td>
                  <td className="p-4 font-bold text-blue-900 bg-blue-50/50 border-l-2 border-blue-500">
                    디지털 차압 센서 연동으로 <strong>압력 강하율 자동 로깅 및 공인 시험성적서 첨부 가능</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
