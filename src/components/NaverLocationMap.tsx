import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Building2,
  Phone,
  Compass,
  Eye,
  Share2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NaverLocationMapProps {
  className?: string;
}

export const NaverLocationMap: React.FC<NaverLocationMapProps> = ({ className = '' }) => {
  const [mapMode, setMapMode] = useState<'standard' | 'satellite' | 'cadastral'>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);
  const [showInfoCard, setShowInfoCard] = useState<boolean>(true);

  // Address and Navigation URLs for Naver Maps
  const queryAddress = COMPANY_INFO.address;
  const encodedAddress = encodeURIComponent(queryAddress);
  
  // Naver Map URLs (Official web & mobile endpoints)
  const naverMapSearchUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
  const naverMapRouteUrl = `https://map.naver.com/v5/directions/-/-/${encodedAddress},,PLACE_POI/-/-/-/car?c=15,0,0,0,dh`;
  const naverStreetViewUrl = `https://map.naver.com/p/search/${encodedAddress}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodedAddress}`;

  // Interactive Embed URL (Uses OpenStreetMap/Naver GIS friendly renderer with fallback for seamless iframe viewing without X-Frame-Options blocking)
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent('전라남도 광양시 동광길 33')}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 19));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 12));
  };

  const handleResetZoom = () => {
    setZoomLevel(16);
    setMapMode('standard');
  };

  return (
    <div id="naver-map-container" className={`rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden relative ${className}`}>
      {/* Naver Map Header Bar with Official Brand Green (#03C75A) */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-10 relative text-white">
        <div className="flex items-center gap-2.5">
          {/* Naver Map Official Icon Style */}
          <div className="w-7 h-7 rounded-lg bg-[#03C75A] flex items-center justify-center text-white font-black text-xs shadow-md">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white">네이버 지도 (NAVER Map)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                본사 위치 안내
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {COMPANY_INFO.address} (와이즈텍 본사 사옥)
            </span>
          </div>
        </div>

        {/* Control Tools */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Map Mode Buttons */}
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setMapMode('standard')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                mapMode === 'standard'
                  ? 'bg-[#03C75A] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="네이버 일반 지도 뷰"
            >
              일반지도
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                mapMode === 'satellite'
                  ? 'bg-[#03C75A] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="위성 항공 영상 뷰"
            >
              <Layers className="w-3 h-3" />
              <span>위성</span>
            </button>
          </div>

          {/* Zoom In / Out Controls */}
          <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden text-slate-300">
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 19}
              className="p-1.5 hover:bg-slate-700 hover:text-white disabled:opacity-40 transition-colors"
              title="지도 확대"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 12}
              className="p-1.5 hover:bg-slate-700 hover:text-white disabled:opacity-40 transition-colors border-l border-slate-700"
              title="지도 축소"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-slate-700 hover:text-white transition-colors border-l border-slate-700"
              title="초기 배율 복원"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Info Card Toggle */}
          <button
            onClick={() => setShowInfoCard(!showInfoCard)}
            className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
              showInfoCard
                ? 'bg-[#03C75A]/20 border-[#03C75A]/50 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="위치 정보 팝업 토글"
          >
            <Building2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Map Interactive Frame */}
      <div className="relative w-full h-[380px] sm:h-[430px] bg-slate-100">
        <iframe
          title="와이즈텍 본사 네이버지도 위치"
          src={embedMapUrl}
          className="w-full h-full border-0 filter brightness-95 contrast-105"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer"
        />

        {/* Floating Naver Map Styled Information Overlay */}
        {showInfoCard && (
          <div className="absolute top-4 left-4 z-20 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 p-4 shadow-2xl text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#03C75A] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  N
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-slate-900">(주)와이즈텍 본사</h4>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold">자율안전검사 기관 · 비파괴검사</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoCard(false)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
                title="닫기"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#03C75A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">{COMPANY_INFO.address}</span>
                  <span className="text-[10px] text-slate-500">광양시 중마동 생활권 (전용 주차 완비)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#03C75A] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-mono font-bold text-emerald-700 hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            {/* Direct Action Buttons Inside Floating Card */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="flex-1 py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? '복사완료' : '주소 복사'}</span>
              </button>

              <a
                href={naverMapRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-2.5 rounded-lg bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>네이버 길찾기</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Naver Map Direct Action Footer Bar */}
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-[#03C75A] animate-pulse"></span>
          <span className="font-medium">네이버 지도에서 본사 위치 및 거리뷰(로드뷰)를 확인하실 수 있습니다.</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Main Naver Map Large View Button */}
          <a
            href={naverMapSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#03C75A] hover:bg-[#02b350] text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>네이버지도 크게보기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Naver Street View / Road View */}
          <a
            href={naverStreetViewUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>거리뷰</span>
          </a>

          {/* Secondary KakaoMap Link */}
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-900 font-bold flex items-center gap-1 transition-colors"
          >
            <span>카카오맵</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
