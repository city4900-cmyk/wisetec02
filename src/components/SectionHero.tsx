import React from 'react';

interface SectionHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  plainBackground?: boolean;
  contentClassName?: string;
  subtitleClassName?: string;
}

export const SectionHero: React.FC<SectionHeroProps> = ({ title, subtitle, backgroundImage, backgroundSize, backgroundPosition, plainBackground: _plainBackground = false, contentClassName = '', subtitleClassName = '' }) => (
  <header
    className="section-entry-hero section-photo-hero"
  >
    <div aria-hidden="true" className="section-entry-backdrop absolute inset-0 bg-cover bg-center"
    style={backgroundImage ? {
      backgroundImage: `url("${backgroundImage}")`,
      backgroundSize,
      backgroundPosition,
    } : undefined}
    />
    <div aria-hidden="true" className="section-photo-shade" />
    <div className={`section-photo-copy ${contentClassName}`}>
      <h1 className="section-entry-title section-photo-title">
        {title}
      </h1>
      <p className={`section-entry-subtitle section-photo-subtitle ${subtitleClassName}`}>
        {subtitle}
      </p>
    </div>
  </header>
);
