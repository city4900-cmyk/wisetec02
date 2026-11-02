import React from 'react';
import { routeFor } from '../seo';
import { SectionSwitcher, SiteSection } from './SectionSwitcher';

interface SectionNavigationProps<T extends string> {
  section: SiteSection;
  items: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  onSelectSection?: (section: SiteSection) => void;
}

export function SectionNavigation<T extends string>({ section, items, active, onChange, onSelectSection }: SectionNavigationProps<T>) {
  const label = { about: '회사소개', services: '사업분야', contact: '고객지원' }[section];
  return (
    <nav className="section-subnav" aria-label={`${label} 메뉴`}>
      <div className="section-subnav-inner">
        <div className="section-subnav-switch">
          <SectionSwitcher section={section} onSelect={onSelectSection ?? (() => {})} />
        </div>
        {items.map((item) => (
          <a
            href={routeFor(section, item.id).path}
            key={item.id}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onChange(item.id); }}
            className={`section-subnav-tab${active === item.id ? ' is-active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
