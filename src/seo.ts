import type { NavTab, AboutSubTab, ServicesSubTab, TechSubTab, ContactSubTab } from './types';
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://wisetec.kr').replace(/\/+$/, '');
export interface PageRoute { path: string; tab: NavTab; sub?: AboutSubTab | ServicesSubTab | TechSubTab | ContactSubTab; title: string; description: string }
export const routes: PageRoute[] = [
 { path:'/', tab:'home', title:'(주)와이즈텍 | 건설기계·자율안전검사·비파괴검사', description:'전남 광양 (주)와이즈텍. 산업안전을 위한 자율안전검사, 건설기계 안전성 검사와 UT·PAUT·MT·PT 비파괴검사를 제공합니다. 검사 대상·절차·준비사항 확인 및 견적 상담.' },
 { path:'/about/greeting/', tab:'about', sub:'greeting', title:'CEO 인사말 | 와이즈텍', description:'현장 중심의 안전 검사와 정밀 진단을 제공하는 와이즈텍의 인사말 및 기술 역량을 소개합니다.' },
 { path:'/about/overview/', tab:'about', sub:'overview', title:'기업개요·인증·연혁 | 와이즈텍', description:'와이즈텍 기업정보, 주요 연혁, ISO 인증 및 곤돌라 고정식 진공상자 누설검사시스템 특허 등록 이력을 확인하세요.' },
 { path:'/about/location/', tab:'about', sub:'location', title:'오시는 길·연락처 | 와이즈텍', description:'전라남도 광양시 동광길 33, 2층 와이즈텍 본사 위치 및 연락처 안내. 전화 061-791-0992.' },
 { path:'/services/safety/', tab:'services', sub:'safety', title:'자율안전검사 대상·점검 항목 | 와이즈텍', description:'산업안전을 위한 크레인·리프트·곤돌라·압력용기 등 기계·설비의 자율안전검사. 검사 대상과 점검 항목을 안내합니다.' },
 { path:'/services/construction/', tab:'services', sub:'construction', title:'건설기계 안전성 검사·크레인 점검 | 와이즈텍', description:'건설기계 점검 및 안전성 검사 안내. 크롤러·이동식·카고크레인, 고소작업차의 검사 대상, 점검 항목, 준비서류와 상담 절차를 확인하세요.' },
 { path:'/services/ndt/', tab:'services', sub:'ndt', title:'비파괴검사 UT·PAUT·MT·PT | 와이즈텍', description:'전남 광양 와이즈텍의 비파괴검사 서비스. 초음파(UT)·위상배열 초음파(PAUT)·자분(MT)·침투(PT) 검사의 적용 분야, 보유 장비, 검사 절차와 견적 상담 안내.' },
 { path:'/technology/patent-system/', tab:'technology', sub:'patent-system', title:'진공상자 누설검사시스템 특허 기술 | 와이즈텍', description:'특허 제10-2613687호 곤돌라 고정식 진공상자 누설검사시스템의 기술과 특징을 소개합니다.' },
 { path:'/contact/inquiry/', tab:'contact', sub:'inquiry', title:'검사 견적·상담 문의 | 와이즈텍', description:'건설기계 검사, 자율안전검사, 비파괴검사 상담 및 견적 요청. 설비 종류·현장 위치·희망 일정을 알려주세요.' },
 { path:'/contact/notice/', tab:'contact', sub:'notice', title:'공지사항·소식 | 와이즈텍', description:'와이즈텍의 검사 서비스 공지, 인증·특허 소식 및 안전정보를 확인하세요.' },
 { path:'/contact/faq/', tab:'contact', sub:'faq', title:'검사·견적 자주 묻는 질문 | 와이즈텍', description:'비파괴검사 견적 준비사항, 자율안전검사, 출장 검사 일정과 특허 기술에 관한 자주 묻는 질문.' },
];
export function routeFor(tab: NavTab, sub?: string) { return routes.find(r => r.tab === tab && (!sub || r.sub === sub)) ?? routes.find(r => r.tab === tab) ?? routes[0]; }
export function resolveRoute(path: string) { const normalized = path === '/' ? '/' : path.replace(/\/+$/, '') + '/'; return routes.find(r => r.path === normalized); }
export function pageSchema(route: PageRoute) {
 const organization = { '@type':'Organization', '@id':SITE_URL+'/#organization', name:'(주)와이즈텍', alternateName:['와이즈텍','WISETEC'], url:SITE_URL+'/', logo:SITE_URL+'/figma-assets/header-logo.png', telephone:'061-791-0992', email:'wisetec@wisetec.kr', address:{ '@type':'PostalAddress', streetAddress:'동광길 33 2층', addressLocality:'광양시', addressRegion:'전라남도', addressCountry:'KR' } };
 const page = { '@type':'WebPage', '@id':SITE_URL+route.path+'#webpage', url:SITE_URL+route.path, name:route.title, description:route.description, inLanguage:'ko-KR', publisher:{'@id':organization['@id']} };
 const graph: object[] = [organization,page];
 if(route.tab === 'home') graph.push({'@type':'WebSite','@id':SITE_URL+'/#website',url:SITE_URL+'/',name:'와이즈텍',alternateName:['(주)와이즈텍','WISETEC'],inLanguage:'ko-KR',publisher:{'@id':organization['@id']}});
 if(route.tab !== 'home') graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:route.title.split(' | ')[0],item:SITE_URL+route.path}]});
 if(route.tab === 'services') graph.push({'@type':'Service', name:route.title.split(' | ')[0],description:route.description,url:SITE_URL+route.path,provider:{'@id':organization['@id']}});
 return {'@context':'https://schema.org','@graph':graph};
}
export function applyMetadata(route: PageRoute) {
 document.title=route.title;
 const set=(selector:string,value:string)=>document.querySelector(selector)?.setAttribute('content',value);
 set('meta[name="description"]',route.description);set('meta[property="og:title"]',route.title);set('meta[property="og:description"]',route.description);set('meta[property="og:url"]',SITE_URL+route.path);set('meta[name="twitter:title"]',route.title);set('meta[name="twitter:description"]',route.description);
 document.querySelector('link[rel="canonical"]')?.setAttribute('href',SITE_URL+route.path);
 const schema=document.querySelector('#page-schema');if(schema) schema.textContent=JSON.stringify(pageSchema(route));
}
