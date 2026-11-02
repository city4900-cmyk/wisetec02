import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

const NAVER_MAP_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID?.trim();
const OFFICE_LAT = 34.9419998;
const OFFICE_LNG = 127.6998869;

declare global {
  interface Window {
    naver?: {
      maps: {
        LatLng: new (latitude: number, longitude: number) => unknown;
        Map: new (element: HTMLElement, options: { center: unknown; zoom: number }) => unknown;
        Marker: new (options: { position: unknown; map: unknown; title: string }) => unknown;
      };
    };
  }
}

export const NaverMapPreview: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [isNaverMapReady, setIsNaverMapReady] = useState(false);
  const address = '전라남도 광양시 동광길 33';
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(address)}`;

  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID || !mapElement.current) return;

    let script = document.querySelector<HTMLScriptElement>('script[data-naver-map-sdk]');
    const initializeMap = () => {
      const naver = window.naver;
      const element = mapElement.current;
      if (!naver || !element) return;
      const position = new naver.maps.LatLng(OFFICE_LAT, OFFICE_LNG);
      const map = new naver.maps.Map(element, { center: position, zoom: 16 });
      new naver.maps.Marker({ position, map, title: '(주)와이즈텍' });
      setIsNaverMapReady(true);
    };

    if (!script) {
      script = document.createElement('script');
      script.dataset.naverMapSdk = 'true';
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(NAVER_MAP_CLIENT_ID)}`;
      script.async = true;
      document.head.appendChild(script);
    }

    if (window.naver) initializeMap();
    else {
      script.addEventListener('load', initializeMap);
      return () => script?.removeEventListener('load', initializeMap);
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e5e7eb]">
      {NAVER_MAP_CLIENT_ID ? (
        <div ref={mapElement} className="absolute inset-0" aria-label="와이즈텍 본사 네이버 지도" />
      ) : (
        <iframe
          title="와이즈텍 본사 위치 지도 미리보기"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=127.687%2C34.936%2C127.713%2C34.949&layer=mapnik&marker=${OFFICE_LAT}%2C${OFFICE_LNG}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      <div className="absolute left-3 top-3 flex max-w-[calc(100%-24px)] items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-[13px] font-medium text-slate-800 shadow-md">
        <MapPin className="h-4 w-4 shrink-0 text-[#03C75A]" />
        <span className="truncate">{address}</span>
      </div>
      <a
        href={naverMapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-[13px] font-semibold text-slate-700 shadow-md transition-colors hover:text-[#03C75A]"
      >
        네이버 지도에서 보기 <ExternalLink className="h-3.5 w-3.5" />
      </a>
      {NAVER_MAP_CLIENT_ID && !isNaverMapReady && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center text-sm text-slate-500">네이버 지도를 불러오는 중입니다.</div>
      )}
    </div>
  );
};
