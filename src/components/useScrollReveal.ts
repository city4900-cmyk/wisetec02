import { useEffect, type RefObject } from 'react';

/** Staged content entrances for interior pages; the home keeps its own motion. */
export function useScrollReveal(
  root: RefObject<HTMLElement | null>,
  contentKey: string,
  selector = '[data-scroll-reveal]',
) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    container.classList.add('reference-motion');
    container.querySelectorAll<HTMLElement>('.home-business-grid, .home-support-columns').forEach(group => {
      Array.from(group.children).forEach((child, index) => {
        if (child instanceof HTMLElement) child.style.setProperty('--reveal-delay', `${index * 130}ms`);
      });
    });
    container.querySelectorAll<HTMLElement>('.home-contact-map').forEach(el => el.style.setProperty('--reveal-delay', '180ms'));

    container.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
      group.removeAttribute('data-scroll-reveal');
      Array.from(group.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        // Keep nested groups static so their individual children can animate.
        if (child.matches('[data-reveal-group]') || child.querySelector('[data-scroll-reveal], [data-reveal-group]')) return;
        child.dataset.scrollReveal = '';
        if (!child.style.getPropertyValue('--reveal-delay')) {
          child.style.setProperty('--reveal-delay', `${Math.min(index * 90, 360)}ms`);
        }
      });
    });
    const targets = container.querySelectorAll<HTMLElement>(selector);
    targets.forEach((target) => { target.dataset.scrollReveal = ''; });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const showAll = () => targets.forEach((target) => target.classList.add('is-visible'));
    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      showAll();
      return;
    }
    let hasScrolled = false;
    const waitingForScroll = new Set<HTMLElement>();
    const reveal = (target: HTMLElement) => {
      target.classList.add('is-visible');
      observer.unobserve(target);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (!entry.isIntersecting) {
          waitingForScroll.delete(target);
          return;
        }
        if (target.hasAttribute('data-reveal-after-scroll') && !hasScrolled && target.getBoundingClientRect().top > window.innerHeight) {
          waitingForScroll.add(target);
          return;
        }
        reveal(target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -48px 0px' });
    targets.forEach((target) => observer.observe(target));
    const handleScroll = () => {
      if (window.scrollY <= 4) return;
      hasScrolled = true;
      waitingForScroll.forEach(reveal);
      waitingForScroll.clear();
    };
    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let el = event.target.closest<HTMLElement>('[data-scroll-reveal]');
      while (el && container.contains(el)) {
        reveal(el);
        el = el.parentElement?.closest<HTMLElement>('[data-scroll-reveal]') ?? null;
      }
    };
    container.addEventListener('focusin', handleFocus);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const handleMotionChange = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      showAll();
    };
    reducedMotion.addEventListener('change', handleMotionChange);
    return () => {
      observer.disconnect();
      container.removeEventListener('focusin', handleFocus);
      window.removeEventListener('scroll', handleScroll);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, [root, contentKey, selector]);
}
