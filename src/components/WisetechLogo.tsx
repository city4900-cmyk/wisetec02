import React from 'react';

interface WisetechLogoProps {
  className?: string;
  variant?: 'emblem' | 'horizontal' | 'vertical' | 'header';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

/**
 * (주)와이즈텍 (WISETEC) 공식 WT 모노그램 심볼 및 로고 컴포넌트
 * - W (Black/Slate-900) + T (Vibrant Gold-Amber #F59E0B) 약자 결합 모노그램
 * - 첨단 기술과 비파괴 정밀안전을 상징하는 골드 오비탈 타원 링
 * - 고해상도 SVG 벡터 렌더링으로 모든 화면 크기에서 선명도 유지
 */
export const WisetechLogo: React.FC<WisetechLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';
  const wColor = isDark ? '#ffffff' : '#0f172a';
  const wAccent = isDark ? '#e2e8f0' : '#1e293b';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subTextColor = isDark ? '#cbd5e1' : '#475569';

  // Sizing parameters
  const sizeConfig = {
    sm: { emblemSize: 36, titleSize: 'text-base', subSize: 'text-[10px]' },
    md: { emblemSize: 46, titleSize: 'text-xl sm:text-2xl', subSize: 'text-xs' },
    lg: { emblemSize: 64, titleSize: 'text-3xl', subSize: 'text-sm' },
    xl: { emblemSize: 96, titleSize: 'text-4xl sm:text-5xl', subSize: 'text-base' },
  }[size];

  // The standalone WT Emblem SVG
  const renderEmblem = (dimensions = sizeConfig.emblemSize) => (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      aria-label="WISETEC WT Emblem"
    >
      <defs>
        {/* Dynamic Gold Gradient for 'T' and Orbital Ring */}
        <linearGradient id="wtGoldGrad" x1="20" y1="20" x2="220" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="wtRingGrad" x1="0" y1="180" x2="240" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
        </linearGradient>

        {/* Shading filter for realistic depth */}
        <filter id="wtShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity={isDark ? "0.3" : "0.15"} />
        </filter>
      </defs>

      {/* 1. Background Segment of Orbital Ring (passes behind the letters) */}
      <path
        d="M 50 110 C 45 65, 100 25, 160 22 C 195 20, 222 35, 226 65"
        stroke="url(#wtRingGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* 2. WT Monogram Core */}
      <g filter="url(#wtShadow)">
        {/* Letter 'W' - Bold, sharp, slanted dynamic construction */}
        {/* Left V of W */}
        <path
          d="M 32 68 L 56 68 L 84 156 L 62 156 Z"
          fill={wColor}
        />
        <path
          d="M 62 156 L 84 156 L 112 84 L 92 84 Z"
          fill={wColor}
        />
        {/* Right V of W */}
        <path
          d="M 98 84 L 118 84 L 144 156 L 124 156 Z"
          fill={wAccent}
        />
        <path
          d="M 124 156 L 144 156 L 168 96 L 150 96 Z"
          fill={wColor}
        />

        {/* Letter 'T' - Bold Vibrant Gold Monogram Intertwined with W */}
        {/* Horizontal Crossbar of 'T' extending with dynamic italic angle */}
        <path
          d="M 130 52 L 216 52 C 224 52, 228 58, 224 66 C 220 74, 212 78, 202 78 L 174 78 L 154 156 L 132 156 L 152 78 L 138 78 C 130 78, 126 72, 128 64 C 130 56, 134 52, 130 52 Z"
          fill="url(#wtGoldGrad)"
        />
        
        {/* Intersecting highlight notch for 3D monogram unity */}
        <path
          d="M 148 78 L 168 78 L 148 156 L 132 156 Z"
          fill="url(#wtGoldGrad)"
        />
      </g>

      {/* 3. Foreground Segment of Orbital Ring (sweeps forward across bottom and right) */}
      <path
        d="M 226 65 C 230 95, 205 145, 150 178 C 95 210, 35 200, 20 160 C 12 135, 24 118, 50 110"
        stroke="url(#wtRingGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  // 1. Just the WT emblem
  if (variant === 'emblem') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderEmblem()}</div>;
  }

  // 2. Vertical Full Lockup (Emblem on top + WISETEC + Subtitle)
  if (variant === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <div className="mb-2">
          {renderEmblem(size === 'xl' ? 140 : size === 'lg' ? 100 : 70)}
        </div>
        <div className="flex flex-col items-center">
          <span
            className="font-black tracking-wider text-slate-900 font-sans leading-none"
            style={{ color: textColor, fontSize: size === 'xl' ? '2.5rem' : size === 'lg' ? '1.85rem' : '1.35rem' }}
          >
            WISETEC
          </span>
          {showSubtitle && (
            <span
              className="font-bold tracking-tight mt-1.5 uppercase"
              style={{ color: subTextColor, fontSize: size === 'xl' ? '0.95rem' : size === 'lg' ? '0.8rem' : '0.7rem' }}
            >
              Technical Engineering Company
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Header Lockup (WT Emblem + (주)와이즈텍 / WISETEC Badge + Service descriptor)
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative flex items-center justify-center">
          {renderEmblem(sizeConfig.emblemSize)}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${sizeConfig.titleSize}`} style={{ color: textColor }}>
              (주)와이즈텍
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-amber-800 bg-gradient-to-r from-amber-100 to-amber-50 px-1.5 py-0.5 rounded border border-amber-300/80 shadow-2xs">
              WISETEC
            </span>
          </div>
          {showSubtitle && (
            <span className={`font-semibold tracking-tight ${sizeConfig.subSize}`} style={{ color: subTextColor }}>
              비파괴검사(UT·MT·PT·LT) · 자율안전검사
            </span>
          )}
        </div>
      </div>
    );
  }

  // 4. Standard Horizontal Lockup
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {renderEmblem(sizeConfig.emblemSize)}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: textColor }}>
            WISETEC
          </span>
          <span className="text-sm font-bold text-slate-500" style={{ color: subTextColor }}>
            (주)와이즈텍
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs font-semibold tracking-normal" style={{ color: subTextColor }}>
            Technical Engineering Company
          </span>
        )}
      </div>
    </div>
  );
};
