import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Paperclip,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { InquiryFormData } from '../types';

interface InquiryFormProps {
  initialServiceCategory?: InquiryFormData['serviceCategory'];
  onSubmittedSuccess?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialServiceCategory = 'safety',
  onSubmittedSuccess,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    companyName: '',
    contactPerson: '',
    position: '',
    phoneNumber: '',
    email: '',
    serviceCategory: initialServiceCategory,
    ndtSubCategories: ['UT', 'PAUT'],
    targetEquipment: '',
    location: '',
    preferredDate: '',
    message: '',
    privacyAgreed: true,
  });

  const [submittedReceipt, setSubmittedReceipt] = useState<{
    receiptNumber: string;
    submittedAt: string;
    data: InquiryFormData;
  } | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const ndtOptions = [
    { code: 'UT', label: '초음파 (UT)' },
    { code: 'PAUT', label: '위상배열 초음파 (PAUT)' },
    { code: 'MT', label: '자분 (MT)' },
    { code: 'PT', label: '침투 (PT)' },
  ];

  const handleNdtCheckbox = (code: string) => {
    setFormData((prev) => {
      const exists = prev.ndtSubCategories.includes(code);
      const next = exists
        ? prev.ndtSubCategories.filter((c) => c !== code)
        : [...prev.ndtSubCategories, code];
      return { ...prev, ndtSubCategories: next };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.companyName.trim()) {
      setErrorMsg('업체명을 입력해주세요.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setErrorMsg('담당자 성함을 입력해주세요.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('연락처(전화번호)를 입력해주세요.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('문의내용(검사 대상 및 수량 등)을 입력해주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setErrorMsg('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setErrorMsg('온라인 접수 연결 준비 중입니다. 061-791-0992 또는 wisetec@wisetec.kr로 문의해 주세요.');

  };

  return (
    <div className="w-full bg-white">

      {submittedReceipt ? (
        /* Submission Success Receipt */
        <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              접수 완료
            </span>
            <h4 className="text-2xl font-black text-slate-900">
              견적 및 상담 신청이 정상 접수되었습니다.
            </h4>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              기재해주신 연락처(<strong>{submittedReceipt.data.phoneNumber}</strong>)로 담당 엔지니어가 접수 내용을 검토 후 신속히 연락드리겠습니다.
            </p>
          </div>

          {/* Receipt Summary Box */}
          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">접수 번호</span>
              <span className="font-mono font-bold text-blue-700">{submittedReceipt.receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">신청 업체명</span>
              <span className="font-bold text-slate-800">{submittedReceipt.data.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">신청자 성함</span>
              <span className="text-slate-800">{submittedReceipt.data.contactPerson} {submittedReceipt.data.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">검사 종목</span>
              <span className="font-semibold text-blue-600">
                {submittedReceipt.data.serviceCategory === 'ndt'
                  ? `비파괴검사 (${submittedReceipt.data.ndtSubCategories.join(', ')})`
                  : submittedReceipt.data.serviceCategory === 'safety'
                  ? '자율안전검사'
                  : submittedReceipt.data.serviceCategory === 'construction'
                  ? '건설기계 안전성검사'
                  : '기타 업무 문의'}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-500 font-medium">접수 일시</span>
              <span className="text-slate-600 font-mono">{submittedReceipt.submittedAt}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmittedReceipt(null);
                setFormData({
                  companyName: '',
                  contactPerson: '',
                  position: '',
                  phoneNumber: '',
                  email: '',
                  serviceCategory: 'ndt',
                  ndtSubCategories: ['UT', 'PAUT'],
                  targetEquipment: '',
                  location: '',
                  preferredDate: '',
                  message: '',
                  privacyAgreed: true,
                });
                setSelectedFile(null);
              }}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-md transition-all"
            >
              새로운 문의 작성하기
            </button>
          </div>
        </div>
      ) : (
        /* Form Inputs */
        <form onSubmit={handleSubmit} className="space-y-[27px]">
          <div role="status" className="border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
            온라인 접수는 연결 준비 중입니다. 검사 상담은 <a href="tel:061-791-0992" className="font-semibold underline">061-791-0992</a> 또는 <a href="mailto:wisetec@wisetec.kr" className="font-semibold underline break-all">wisetec@wisetec.kr</a>로 문의해 주세요.
          </div>
          <div className="mb-10">
            <h3 className="text-[18px] font-bold tracking-tight text-[#111827]">온라인 견적 및 기술상담 문의</h3>
            <p className="mt-[2px] text-[12px] leading-7 text-[#667085] sm:text-[15px]">
              검사 대상 도면 및 물량을 전달해주시면 기술 책임자가 최적의 검사 플랜과 견적을 산출해 드립니다.
            </p>
          </div>
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3 sm:text-[14px]">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>1. 신청 기업 및 담당자 정보</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  <span>업체명 (회사명) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: (주)대한플랜트"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="h-[35px] w-full px-3.5 py-1.5 bg-slate-50 border border-[#cfd4dc] rounded-[10px] text-[10px] focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-[12px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 sm:text-[14px]">
                  <span>담당자 성함 *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 팀장"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="h-[35px] w-full px-3.5 py-1.5 bg-slate-50 border border-[#cfd4dc] rounded-[10px] text-[10px] focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-[12px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 sm:text-[14px]">
                  <span>연락처 (전화번호) *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="h-[35px] w-full px-3.5 py-1.5 bg-slate-50 border border-[#cfd4dc] rounded-[10px] text-[10px] focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-[12px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 sm:text-[14px]">
                  <span>이메일 (견적서 수신)</span>
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-[35px] w-full px-3.5 py-1.5 bg-slate-50 border border-[#cfd4dc] rounded-[10px] text-[10px] focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-[12px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Service Selection */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3 sm:text-[14px]">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>2. 희망 검사 종목 선택</span>
            </h4>

            {/* Main Category Tabs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceCategory: 'safety' })}
                aria-pressed={formData.serviceCategory === 'safety'}
                className={`min-h-[72px] rounded-[10px] border px-3 py-2.5 text-left transition-all ${
                  formData.serviceCategory === 'safety'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-1 ring-emerald-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="mb-1 text-[13px] font-semibold text-emerald-600">산업안전보건법</div>
                <div className="text-[13px] font-bold sm:text-[15px]">자율안전검사</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceCategory: 'construction' })}
                aria-pressed={formData.serviceCategory === 'construction'}
                className={`min-h-[72px] rounded-[10px] border px-3 py-2.5 text-left transition-all ${
                  formData.serviceCategory === 'construction'
                    ? 'bg-[#edf3f9] border-[#306395] text-[#17365b] font-bold ring-1 ring-[#306395]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="mb-1 text-[13px] font-semibold text-[#306395]">건설현장 장비 검사</div>
                <div className="text-[13px] font-bold sm:text-[15px]">건설기계 안전성검사</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceCategory: 'ndt' })}
                aria-pressed={formData.serviceCategory === 'ndt'}
                className={`min-h-[72px] rounded-[10px] border px-3 py-2.5 text-left transition-all ${
                  formData.serviceCategory === 'ndt'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="mb-1 text-[13px] font-semibold text-blue-600">공인 정밀검사</div>
                <div className="text-[13px] font-bold sm:text-[15px]">비파괴검사 (NDT)</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceCategory: 'other' })}
                aria-pressed={formData.serviceCategory === 'other'}
                className={`min-h-[72px] rounded-[10px] border px-3 py-2.5 text-left transition-all ${
                  formData.serviceCategory === 'other'
                    ? 'bg-slate-200 border-[#1D1919] text-[#1D1919] font-bold ring-1 ring-[#1D1919]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="mb-1 text-[13px] font-semibold text-slate-500">기타 문의</div>
                <div className="text-[13px] font-bold sm:text-[15px]">업무 제휴 및 일반</div>
              </button>
            </div>

            {/* Sub-category selection if NDT */}
            {formData.serviceCategory === 'ndt' && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  상세 NDT 검사 기법 (복수 선택 가능):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ndtOptions.map((opt) => {
                    const checked = formData.ndtSubCategories.includes(opt.code);
                    return (
                      <label
                        key={opt.code}
                        className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          checked
                            ? 'bg-blue-600 text-white font-bold border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleNdtCheckbox(opt.code)}
                          className="sr-only"
                        />
                        <span className="w-3.5 h-3.5 rounded flex items-center justify-center border text-[10px]">
                          {checked && '✓'}
                        </span>
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Project Specifics */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3 sm:text-[14px]">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>3. 현장 정보 및 문의 내용</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  <span>검사 대상 설비 및 수량</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 배관 용접부 50포인트 / 크레인 2대"
                  value={formData.targetEquipment}
                  onChange={(e) => setFormData({ ...formData, targetEquipment: e.target.value })}
                  className="h-[32px] w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-[10px] focus:bg-white focus:border-blue-600 sm:text-[12px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  <span>검사 현장 위치</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 전남 광양 / 여수 국가산단"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-[32px] w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-[10px] focus:bg-white focus:border-blue-600 sm:text-[12px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  <span>희망 검사 일정</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 2026년 9월 중순 / 즉시"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="h-[32px] w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-[10px] focus:bg-white focus:border-blue-600 sm:text-[12px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                상세 문의 내용 (설비 규격, 요구사항 등) *
              </label>
              <textarea
                required
                rows={4}
                placeholder="검사 대상의 재질, 두께, 검사 목적, 발주처 요구 사양 등을 자유롭게 기재해주세요."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[120px] p-3.5 bg-white border border-[#cfd4dc] rounded-[10px] text-[10px] focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y sm:text-[12px]"
              ></textarea>
            </div>

            {/* File Attachment Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                <span>도면 및 관련 서류 첨부 (선택)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>파일 선택</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip,.hwp,.xlsx,.docx"
                  />
                </label>
                <span className="text-xs text-slate-500 font-mono truncate max-w-xs">
                  {selectedFile ? selectedFile.name : '선택된 파일 없음 (PDF, 도면 DWG, 이미지 등 최대 50MB)'}
                </span>
              </div>
            </div>
          </div>

          {/* Privacy Agreement & Submit */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
              <input
                type="checkbox"
                checked={formData.privacyAgreed}
                onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>개인정보 수집 및 이용(견적 회신 및 기술 상담 목적)에 동의합니다.</span>
            </label>

            <button
              type="submit"
              disabled={true}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-700/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>접수 처리중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>온라인 접수 준비 중</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
