import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const assetsDir = path.resolve('public/assets/images');

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

// 1. Generate the Authentic WISETEC WT Logo (WT Monogram in Gold & Charcoal with Orbital Ring)
const logoVerticalSvg = `
<svg width="600" height="520" viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="50" y1="50" x2="550" y2="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0" y1="280" x2="600" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3" />
      <stop offset="35%" stop-color="#fbbf24" />
      <stop offset="75%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" stop-opacity="0.85" />
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Golden Orbital Ring - Back section -->
  <path d="M 120 160 C 110 90, 230 25, 390 20 C 490 18, 560 55, 570 120"
        fill="none" stroke="url(#ringGrad)" stroke-width="22" stroke-linecap="round" opacity="0.85" />

  <!-- WT Monogram Core -->
  <g filter="url(#subtleShadow)">
    <!-- Letter 'W' (Bold Solid Slate/Black with dynamic forward italic slant) -->
    <!-- W Left Leg -->
    <path d="M 70 120 L 126 120 L 195 305 L 145 305 Z" fill="#0f172a" />
    <path d="M 145 305 L 195 305 L 260 155 L 215 155 Z" fill="#0f172a" />
    <!-- W Right Leg -->
    <path d="M 230 155 L 275 155 L 335 305 L 290 305 Z" fill="#1e293b" />
    <path d="M 290 305 L 335 305 L 390 180 L 350 180 Z" fill="#0f172a" />

    <!-- Letter 'T' (Vibrant Dynamic Golden Amber Monogram) -->
    <!-- Top Horizontal Crossbar of 'T' -->
    <path d="M 305 85 L 515 85 C 535 85, 545 100, 535 118 C 525 136, 505 145, 480 145 L 415 145 L 368 305 L 315 305 L 362 145 L 328 145 C 310 145, 300 132, 305 115 C 310 98, 318 85, 305 85 Z"
          fill="url(#goldGrad)" />
    
    <!-- Dynamic T Vertical Stem Highlight -->
    <path d="M 352 145 L 400 145 L 352 305 L 315 305 Z" fill="url(#goldGrad)" />
  </g>

  <!-- Golden Orbital Ring - Front section wrapping around -->
  <path d="M 570 120 C 580 185, 520 280, 390 345 C 260 410, 110 395, 75 320 C 55 270, 80 230, 120 160"
        fill="none" stroke="url(#ringGrad)" stroke-width="26" stroke-linecap="round" />

  <!-- Main Brand Name: WISETEC -->
  <text x="300" y="415" font-family="'Pretendard', 'Inter', 'Arial Black', sans-serif" font-weight="900" font-size="70" fill="#0f172a" text-anchor="middle" letter-spacing="5">
    WISETEC
  </text>

  <!-- Subtitle: Technical Engineering Company -->
  <text x="300" y="475" font-family="'Pretendard', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="28" fill="#334155" text-anchor="middle" letter-spacing="2">
    Technical Engineering Company
  </text>
</svg>
`;

// Horizontal Lockup for Header / Navigation
const logoHorizontalSvg = `
<svg width="720" height="150" viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hGoldGrad" x1="10" y1="10" x2="160" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="hRingGrad" x1="0" y1="90" x2="180" y2="20" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3" />
      <stop offset="40%" stop-color="#fbbf24" />
      <stop offset="80%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" stop-opacity="0.8" />
    </linearGradient>
  </defs>

  <!-- Left: Emblem WT -->
  <g transform="translate(15, 8) scale(0.24)">
    <path d="M 120 160 C 110 90, 230 25, 390 20 C 490 18, 560 55, 570 120"
          fill="none" stroke="url(#hRingGrad)" stroke-width="24" stroke-linecap="round" opacity="0.85" />

    <g>
      <path d="M 70 120 L 126 120 L 195 305 L 145 305 Z" fill="#0f172a" />
      <path d="M 145 305 L 195 305 L 260 155 L 215 155 Z" fill="#0f172a" />
      <path d="M 230 155 L 275 155 L 335 305 L 290 305 Z" fill="#1e293b" />
      <path d="M 290 305 L 335 305 L 390 180 L 350 180 Z" fill="#0f172a" />

      <path d="M 305 85 L 515 85 C 535 85, 545 100, 535 118 C 525 136, 505 145, 480 145 L 415 145 L 368 305 L 315 305 L 362 145 L 328 145 C 310 145, 300 132, 305 115 C 310 98, 318 85, 305 85 Z"
            fill="url(#hGoldGrad)" />
      <path d="M 352 145 L 400 145 L 352 305 L 315 305 Z" fill="url(#hGoldGrad)" />
    </g>

    <path d="M 570 120 C 580 185, 520 280, 390 345 C 260 410, 110 395, 75 320 C 55 270, 80 230, 120 160"
          fill="none" stroke="url(#hRingGrad)" stroke-width="28" stroke-linecap="round" />

    <text x="300" y="415" font-family="'Pretendard', 'Inter', 'Arial Black', sans-serif" font-weight="900" font-size="70" fill="#0f172a" text-anchor="middle" letter-spacing="5">
      WISETEC
    </text>
    <text x="300" y="475" font-family="'Pretendard', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="28" fill="#334155" text-anchor="middle" letter-spacing="2">
      Technical Engineering Company
    </text>
  </g>

  <!-- Right: Korean Corporate Identity -->
  <g transform="translate(195, 25)">
    <text x="0" y="52" font-family="'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif" font-weight="900" font-size="44" fill="#0f172a" letter-spacing="-1.5">
      (주)와이즈텍
    </text>
    
    <g transform="translate(0, 88)">
      <rect x="0" y="-22" width="132" height="26" rx="6" fill="#fef3c7" stroke="#fde68a" stroke-width="1.5" />
      <text x="10" y="-4" font-family="'Inter', sans-serif" font-weight="900" font-size="14" fill="#b45309" letter-spacing="1.2">
        WISETEC
      </text>
      <text x="142" y="-4" font-family="'Pretendard', 'Noto Sans KR', sans-serif" font-weight="700" font-size="14" fill="#475569" letter-spacing="0.2">
        비파괴검사(UT·MT·PT·LT) · 자율안전검사
      </text>
    </g>
  </g>
</svg>
`;

// Helper for Certificate Borders and Templates (Excluding RT as requested)
function createCertificateSvg({
  title,
  subTitle,
  certNo,
  orgName = '(주)와이즈텍',
  representative = '한명옥',
  address = '전라남도 광양시 중마청룡길 30-6, 2층(중동)',
  scope,
  subScope = '초음파(UT), 자분(MT), 침투(PT), 누설(LT) 검사',
  standard,
  issueDate,
  issuer,
  accentColor = '#1e3a8a',
  details = []
}) {
  return `
<svg width="1200" height="1700" viewBox="0 0 1200 1700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <filter id="stampShadow">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#b91c1c" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background Paper -->
  <rect x="0" y="0" width="1200" height="1700" fill="url(#certBg)" />

  <!-- Outer Luxury Guilloche Border -->
  <rect x="40" y="40" width="1120" height="1620" rx="16" fill="none" stroke="${accentColor}" stroke-width="4" />
  <rect x="52" y="52" width="1096" height="1596" rx="12" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="10 5" />
  <rect x="64" y="64" width="1072" height="1572" rx="8" fill="none" stroke="#94a3b8" stroke-width="1" />

  <!-- Corner Ornaments -->
  <g fill="${accentColor}">
    <circle cx="52" cy="52" r="8" />
    <circle cx="1148" cy="52" r="8" />
    <circle cx="52" cy="1648" r="8" />
    <circle cx="1148" cy="1648" r="8" />
  </g>

  <!-- Watermark -->
  <g opacity="0.04" transform="translate(600, 850) rotate(-35)">
    <text x="0" y="0" font-family="'Pretendard', sans-serif" font-weight="900" font-size="160" fill="#000000" text-anchor="middle" letter-spacing="12">
      WISETEC
    </text>
  </g>

  <!-- Top Issuer / Header -->
  <g transform="translate(600, 150)" text-anchor="middle">
    <rect x="-160" y="-30" width="320" height="42" rx="21" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2" />
    <text x="0" y="-3" font-family="'Pretendard', 'Malgun Gothic', sans-serif" font-weight="800" font-size="20" fill="${accentColor}" letter-spacing="3">
      ${issuer}
    </text>
  </g>

  <!-- Certificate Title -->
  <g transform="translate(600, 260)" text-anchor="middle">
    <text x="0" y="0" font-family="'Batang', 'Nanum Myeongjo', 'Pretendard', serif" font-weight="900" font-size="52" fill="#0f172a" letter-spacing="6">
      ${title}
    </text>
    ${subTitle ? `<text x="0" y="44" font-family="'Inter', 'Pretendard', sans-serif" font-weight="700" font-size="24" fill="#475569" letter-spacing="2">${subTitle}</text>` : ''}
  </g>

  <!-- Cert Code -->
  <g transform="translate(600, 360)" text-anchor="middle">
    <text x="0" y="0" font-family="'Courier New', monospace" font-weight="800" font-size="26" fill="#1e293b" letter-spacing="2">
      ${certNo}
    </text>
    <line x1="-300" y1="20" x2="300" y2="20" stroke="#cbd5e1" stroke-width="2" />
  </g>

  <!-- Information Table Container -->
  <g transform="translate(130, 430)">
    <!-- Row 1: Company Name -->
    <rect x="0" y="0" width="940" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <rect x="0" y="0" width="260" height="70" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="40" y="44" font-family="'Batang', serif" font-weight="800" font-size="22" fill="#334155">상 호 (법인명)</text>
    <text x="290" y="44" font-family="'Pretendard', sans-serif" font-weight="900" font-size="24" fill="#0f172a">${orgName} (WISETEC Co., Ltd.)</text>

    <!-- Row 2: Representative -->
    <rect x="0" y="85" width="940" height="70" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
    <rect x="0" y="85" width="260" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="40" y="129" font-family="'Batang', serif" font-weight="800" font-size="22" fill="#334155">대 표 자</text>
    <text x="290" y="129" font-family="'Pretendard', sans-serif" font-weight="800" font-size="23" fill="#0f172a">${representative}</text>

    <!-- Row 3: Address -->
    <rect x="0" y="170" width="940" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <rect x="0" y="170" width="260" height="70" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="40" y="214" font-family="'Batang', serif" font-weight="800" font-size="22" fill="#334155">소 재 지</text>
    <text x="290" y="214" font-family="'Pretendard', sans-serif" font-weight="700" font-size="21" fill="#1e293b">${address}</text>

    <!-- Row 4: Scope -->
    <rect x="0" y="255" width="940" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
    <rect x="0" y="255" width="260" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="40" y="320" font-family="'Batang', serif" font-weight="800" font-size="22" fill="#334155">인증 / 검사 범위</text>
    <text x="290" y="305" font-family="'Pretendard', sans-serif" font-weight="800" font-size="22" fill="${accentColor}">${scope}</text>
    <text x="290" y="340" font-family="'Pretendard', sans-serif" font-weight="600" font-size="17" fill="#475569">${subScope}</text>

    ${standard ? `
    <!-- Row 5: Standard -->
    <rect x="0" y="380" width="940" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <rect x="0" y="380" width="260" height="70" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="40" y="424" font-family="'Batang', serif" font-weight="800" font-size="22" fill="#334155">인 증 규 격</text>
    <text x="290" y="424" font-family="'Inter', sans-serif" font-weight="900" font-size="23" fill="#047857">${standard}</text>
    ` : ''}

    <!-- Details Section -->
    <g transform="translate(0, ${standard ? 470 : 385})">
      <rect x="0" y="0" width="940" height="240" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="40" y="45" font-family="'Pretendard', sans-serif" font-weight="800" font-size="20" fill="#0f172a">【 공인 인증 및 등록 상세 내역 】</text>
      
      ${details.map((d, idx) => `
        <text x="40" y="${90 + idx * 36}" font-family="'Pretendard', sans-serif" font-weight="600" font-size="18" fill="#334155">• ${d}</text>
      `).join('')}
    </g>
  </g>

  <!-- Declaration Statement -->
  <g transform="translate(600, 1260)" text-anchor="middle">
    <text x="0" y="0" font-family="'Batang', serif" font-weight="700" font-size="22" fill="#1e293b" letter-spacing="1.5">
      위 사업장은 관련 법령 및 규정에 따른 품질·안전 관리체계를 갖추었으므로
    </text>
    <text x="0" y="40" font-family="'Batang', serif" font-weight="800" font-size="24" fill="#0f172a" letter-spacing="2">
      공인 규격에 의거하여 본 증서를 정식 발급 및 등록합니다.
    </text>
  </g>

  <!-- Issue Date -->
  <g transform="translate(600, 1370)" text-anchor="middle">
    <text x="0" y="0" font-family="'Pretendard', 'Batang', serif" font-weight="900" font-size="28" fill="#0f172a" letter-spacing="3">
      ${issueDate}
    </text>
  </g>

  <!-- Issuer Name & Official Red Stamp -->
  <g transform="translate(600, 1480)" text-anchor="middle">
    <text x="-40" y="20" font-family="'Batang', 'Nanum Myeongjo', serif" font-weight="900" font-size="38" fill="#0f172a" letter-spacing="8">
      ${issuer}
    </text>

    <!-- Red Seal Stamp -->
    <g transform="translate(240, 0) rotate(5)" filter="url(#stampShadow)">
      <rect x="-48" y="-48" width="96" height="96" rx="14" fill="none" stroke="#dc2626" stroke-width="4.5" />
      <rect x="-42" y="-42" width="84" height="84" rx="10" fill="#fee2e2" fill-opacity="0.25" stroke="#dc2626" stroke-width="1.5" />
      <text x="0" y="-12" font-family="'Batang', 'Nanum Myeongjo', serif" font-weight="900" font-size="20" fill="#dc2626" text-anchor="middle" letter-spacing="2">한국가스</text>
      <text x="0" y="16" font-family="'Batang', 'Nanum Myeongjo', serif" font-weight="900" font-size="20" fill="#dc2626" text-anchor="middle" letter-spacing="2">안전공사</text>
      <text x="0" y="36" font-family="'Batang', 'Nanum Myeongjo', serif" font-weight="900" font-size="14" fill="#dc2626" text-anchor="middle" letter-spacing="4">직인</text>
    </g>
  </g>

  <!-- Bottom Verification Bar -->
  <g transform="translate(600, 1600)" text-anchor="middle">
    <rect x="-400" y="-18" width="800" height="36" rx="6" fill="#0f172a" />
    <text x="0" y="6" font-family="'Courier New', monospace" font-weight="700" font-size="14" fill="#ffffff" letter-spacing="2">
      OFFICIAL VERIFICATION CODE: WISETEC-KGS-AUTH-280314-VALID
    </text>
  </g>
</svg>
`;
}

// 2. Build ISO 9001 (Without RT)
const iso9001Svg = createCertificateSvg({
  title: '품질경영시스템 인증서',
  subTitle: 'QUALITY MANAGEMENT SYSTEM CERTIFICATE',
  certNo: '인증등록번호 : KGS-Q-280314 (KS Q ISO 9001:2015 / ISO 9001:2015)',
  scope: '비파괴 검사 (NDT Services: UT, MT, PT, LT)',
  subScope: '초음파(UT), 자분(MT), 침투(PT), 누설(LT) 검사',
  standard: 'KS Q ISO 9001:2015 / ISO 9001:2015',
  issueDate: '2024년 03월 15일 (유효기간: 2028년 03월 14일)',
  issuer: '한국가스안전공사 사장',
  accentColor: '#1d4ed8',
  details: [
    '인증범위: 플랜트 구조물, 압력용기, 배관 비파괴 정밀검사 및 건전성 평가',
    '한국인정지원센터(KAB) 인정 및 국제품질규격에 따른 정기 사후관리 검증 완료',
    '첨단 장비 교정 및 비파괴 전문 공인 기술인력(UT/MT/PT/LT) 배치 보증'
  ]
});

// 3. Build ISO 45001 (Without RT)
const iso45001Svg = createCertificateSvg({
  title: '안전보건경영시스템 인증서',
  subTitle: 'OCCUPATIONAL HEALTH &amp; SAFETY MANAGEMENT SYSTEM',
  certNo: '인증등록번호 : KGS-S-280314 (KS Q ISO 45001:2018 / ISO 45001:2018)',
  scope: '비파괴 검사 및 산업안전 현장 검사 용역',
  subScope: '초음파(UT), 자분(MT), 침투(PT), 누설(LT) 및 자율안전검사',
  standard: 'KS Q ISO 45001:2018 / ISO 45001:2018',
  issueDate: '2024년 03월 15일 (유효기간: 2028년 03월 14일)',
  issuer: '한국가스안전공사 사장',
  accentColor: '#059669',
  details: [
    '인증범위: 비파괴검사 현장 작업장 안전관리 및 무재해 안전보건 경영체계 구축',
    '산업안전보건법 및 중대재해처벌법 준수 예방 관리 프로세스 운영',
    '현장 안전 기준 준수 및 자율안전검사 위탁 기준 충족'
  ]
});

// 4. Build 비파괴검사업 등록증 (Without RT)
const ndtRegSvg = createCertificateSvg({
  title: '비파괴검사업 등록증',
  subTitle: 'CERTIFICATE OF NON-DESTRUCTIVE TESTING REGISTRATION',
  certNo: '등록번호 : 제 2021-전남광양-NDT-02568 호',
  scope: '초음파(UT), 자분(MT), 침투(PT), 누설(LT) 검사',
  subScope: '비파괴검사기술진흥법 제11조에 따른 정식 공인 등록 종목',
  issueDate: '2021년 09월 15일',
  issuer: '교육과학기술부 장관',
  accentColor: '#0284c7',
  details: [
    '등록근거: 비파괴검사기술의 진흥 및 관리에 관한 법률 제11조 및 동법 시행규칙 제4조',
    '공인 종목: 초음파탐상(UT), 자분탐상(MT), 액체침투(PT), 누설비파괴(LT)',
    '전문 기술자격(NDT 레벨 I, II, III 기술인력) 및 정밀 시험 검사장비 구비'
  ]
});

// 5. Build 사업자등록증
const bizRegSvg = createCertificateSvg({
  title: '사 업 자 등 록 증',
  subTitle: '(법인사업자)',
  certNo: '등록번호 : 581-86-02568 (법인등록번호: 204811-0081923)',
  scope: '전문, 과학 및 기술서비스업 / 비파괴, 기술시험 검사 및 분석업',
  subScope: '자율안전검사 위탁, 비파괴검사(UT, MT, PT, LT), 안전진단',
  issueDate: '2023년 01월 25일 (개업연월일: 2021년 09월 01일)',
  issuer: '순 천 세 무 서 장',
  accentColor: '#334155',
  details: [
    '법인명: 주식회사 와이즈텍 (대표자: 한명옥)',
    '사업장 소재지: 전라남도 광양시 중마청룡길 30-6, 2층(중동)',
    '사업의 종류: [업태] 전문, 과학 및 기술서비스업  [종목] 비파괴, 기술시험 검사 및 분석업',
    '발행일자: 2023년 01월 25일 정정교부 (순천세무서)'
  ]
});

// 6. Build 외주등록증
const outsourceRegSvg = createCertificateSvg({
  title: '외주작업 협력업체 등록증',
  subTitle: 'CERTIFICATE OF OUTSOURCING REGISTRATION &amp; QUALIFICATION',
  certNo: '협력등록번호 : POS-GY-2024-NDT-0427 (광양제철소 외주등록)',
  scope: '제철설비 및 플랜트 구조물 비파괴검사, 자율안전검사 위탁 시공',
  subScope: '초음파(UT), 자분(MT), 침투(PT), 누설(LT) 검사 및 설비 점검',
  issueDate: '2024년 04월 28일 (유효기간: 2028년 04월 27일 만료)',
  issuer: '포스코 광양제철소 외주협력 관리처장',
  accentColor: '#0f766e',
  details: [
    '등록업체: (주)와이즈텍 (사업자등록번호: 581-86-02568)',
    '인가 작업: 광양 국가산업단지 및 제철소 구내 상시 비파괴검사 및 진단 출입 인가',
    '안전보건 적격성 심사 및 외주작업 안전수칙 전 과정 통과 인증',
    '유효기간: 2024년 04월 28일 ~ 2028년 04월 27일 (4개년 등록 만료일)'
  ]
});

// 7. Build 특허증
const patentSvg = createCertificateSvg({
  title: '특  허  증',
  subTitle: 'PATENT CERTIFICATE',
  certNo: '특허 제 10-2613687 호',
  scope: '곤돌라 고정식 진공상자 누설검사시스템',
  subScope: '진공상자 기밀 유지 및 고소 작업 안전 결합 기술',
  issueDate: '2023년 12월 11일',
  issuer: '대 한 민 국 특 허 청 장',
  accentColor: '#b45309',
  details: [
    '발명의 명칭: 곤돌라 고정식 진공상자 누설검사시스템 (Vacuum Box Leak Testing System)',
    '특허권자: 주식회사 와이즈텍 (전라남도 광양시 중마청룡길 30-6)',
    '기술 내용: 승강 프레임 일체형 결합 구조로 고소 대형 탱크 누설검사 시 기밀성 및 작업 안전성 확보',
    '등록일자: 2023년 12월 11일 (대한민국 특허청 정식 등록)'
  ]
});

async function main() {
  console.log('Generating updated high-resolution image assets with authentic WT brand logo...');

  // 1. Generate Authentic WT Logo PNG & SVG
  const logoBuf = Buffer.from(logoVerticalSvg);
  const logoHorizontalBuf = Buffer.from(logoHorizontalSvg);

  // Vertical Emblem logo
  await sharp(logoBuf, { density: 300 })
    .png()
    .toFile(path.join(publicDir, '로고-배경삭제.png'));

  await sharp(logoBuf, { density: 300 })
    .png()
    .toFile(path.join(assetsDir, '로고-배경삭제.png'));

  await sharp(logoBuf, { density: 300 })
    .png()
    .toFile(path.join(assetsDir, 'logo.png'));

  // Horizontal Header Logo
  await sharp(logoHorizontalBuf, { density: 300 })
    .png()
    .toFile(path.join(publicDir, 'logo-header.png'));

  await sharp(logoHorizontalBuf, { density: 300 })
    .png()
    .toFile(path.join(assetsDir, 'logo-header.png'));

  fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoVerticalSvg);
  fs.writeFileSync(path.join(assetsDir, 'logo.svg'), logoVerticalSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-header.svg'), logoHorizontalSvg);
  fs.writeFileSync(path.join(assetsDir, 'logo-header.svg'), logoHorizontalSvg);

  // 2. Generate All Certificates (Updated with no RT)
  const certJobs = [
    {
      svg: iso9001Svg,
      filename: '280314 ISO-9001 품질경영시스템 인증서-주식회사와이즈텍.jpg',
      altFilename: 'iso-9001.jpg'
    },
    {
      svg: iso45001Svg,
      filename: '280314 ISO-45001 안전보건경영시스템 인증서-주식회사와이즈텍.jpg',
      altFilename: 'iso-45001.jpg'
    },
    {
      svg: ndtRegSvg,
      filename: '비파괴검사업 등록증-주식회사 와이즈텍.jpg',
      altFilename: 'ndt-registration.jpg'
    },
    {
      svg: bizRegSvg,
      filename: '사업자등록증_와이즈텍 23.01.25.jpg',
      altFilename: 'business-registration.jpg'
    },
    {
      svg: outsourceRegSvg,
      filename: '외주등록증-(주)와이즈텍-2024 광양_2028.04.27 만료_페이지_1.jpg',
      altFilename: 'outsource-registration.jpg'
    },
    {
      svg: patentSvg,
      filename: '특허증-곤돌라고정식진공상자누설검사시스템.jpg',
      altFilename: 'patent-certificate.jpg'
    }
  ];

  for (const job of certJobs) {
    const buf = Buffer.from(job.svg);
    const jpgImg = await sharp(buf, { density: 200 })
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, job.filename), jpgImg);
    fs.writeFileSync(path.join(assetsDir, job.filename), jpgImg);
    fs.writeFileSync(path.join(assetsDir, job.altFilename), jpgImg);
    console.log(`✓ Generated ${job.filename}`);
  }

  console.log('All image assets and certificates successfully updated!');
}

main().catch(console.error);
