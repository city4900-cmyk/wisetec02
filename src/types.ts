export type NavTab = 'home' | 'about' | 'services' | 'technology' | 'contact';

export type AboutSubTab = 'greeting' | 'overview' | 'location';
export type ServicesSubTab = 'ndt' | 'safety';
export type TechSubTab = 'patent-system' | 'comparison' | 'process';
export type ContactSubTab = 'inquiry' | 'notice' | 'faq';

export interface CompanyInfo {
  name: string;
  nameEn: string;
  ceo: string;
  establishedDate: string;
  businessNumber: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessItem: string;
  phone: string;
  fax: string;
  email: string;
  workingHours: string;
  logoUrl?: string;
  mainServices: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  category: 'patent' | 'iso' | 'license';
  code: string;
  issueDate: string;
  issuer: string;
  scope: string;
  standard?: string;
  description: string;
  imagePlaceholderColor: string;
  badge: string;
  imageUrl: string;
  altImageUrl?: string;
  downloadName?: string;
}

export interface NdtServiceItem {
  id: string;
  nameKo: string;
  nameEn: string;
  code: string;
  summary: string;
  principle: string;
  targetApplications: string[];
  advantages: string[];
  equipment: string[];
  color: string;
  badge: string;
}

export interface SafetyInspectionItem {
  id: string;
  targetEquipment: string;
  legalCycle: string;
  inspectionScope: string;
  riskFactor: string;
  importance: string;
}

export interface InquiryFormData {
  companyName: string;
  contactPerson: string;
  position: string;
  phoneNumber: string;
  email: string;
  serviceCategory: 'ndt' | 'safety' | 'other';
  ndtSubCategories: string[];
  targetEquipment: string;
  location: string;
  preferredDate: string;
  message: string;
  fileName?: string;
  privacyAgreed: boolean;
}

export interface NoticeItem {
  id: number;
  title: string;
  category: '공지' | '인증/특허' | '안전정보' | '보도자료';
  date: string;
  author: string;
  views: number;
  content: string;
  isImportant?: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'NDT' | '자율안전' | '견적/일정' | '특허기술';
}
