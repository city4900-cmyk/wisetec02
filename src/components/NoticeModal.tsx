import React from 'react';
import { X, Calendar, User, Eye, FileText, Share2 } from 'lucide-react';
import { NoticeItem } from '../types';

interface NoticeModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-left rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="relative mb-3 flex min-h-9 items-center pr-9">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  notice.isImportant
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                {notice.category}
              </span>
              {notice.isImportant && (
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  중요 공지
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              type="button"
              aria-label="공지 닫기"
              className="absolute right-0 top-0 p-2 text-slate-700 hover:text-slate-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="break-keep text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {notice.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200/80">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>등록일: {notice.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>작성자: {notice.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>조회수: {notice.views}회</span>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 pb-9 sm:p-8 sm:pb-12 bg-white">
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed break-keep [overflow-wrap:anywhere] space-y-4 font-normal">
            {notice.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">{paragraph}</p>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
