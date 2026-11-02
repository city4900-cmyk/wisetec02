import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type SiteSection = 'about' | 'services' | 'contact';

const sections: { id: SiteSection; label: string }[] = [
  { id: 'about', label: '회사소개' },
  { id: 'services', label: '사업분야' },
  { id: 'contact', label: '고객지원' },
];

interface SectionSwitcherProps {
  section: SiteSection;
  onSelect: (section: SiteSection) => void;
}

export const SectionSwitcher: React.FC<SectionSwitcherProps> = ({ section, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-[48px] items-stretch border-r border-[#D9D9D9] bg-white sm:min-h-[56px]">
      <button
        type="button"
        aria-label="사이트 메뉴 선택"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        className={`flex w-full items-center justify-between gap-2 bg-white pl-3 pr-2 text-left text-[9px] font-semibold tracking-wide transition-colors hover:text-[#b77b00] sm:pl-[50px] sm:pr-6 sm:text-[16px] ${open ? 'text-[#b77b00]' : 'text-[#1D1919]'}`}
      >
        <span>{sections.find((item) => item.id === section)?.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 w-full border border-[#D9D9D9] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] animate-in fade-in slide-in-from-top-1 duration-150">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.id === section ? 'page' : undefined}
              onClick={() => {
                setOpen(false);
                onSelect(item.id);
              }}
              className={`flex w-full items-center justify-between border-b border-[#D9D9D9] py-3 pl-3 pr-4 text-left text-[10px] font-semibold transition-colors last:border-b-0 sm:px-6 sm:py-3 sm:pl-[50px] sm:text-[16px] ${
                item.id === section ? 'text-[#b77b00]' : 'text-[#1D1919]'
              } hover:bg-white hover:text-[#b77b00]`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
