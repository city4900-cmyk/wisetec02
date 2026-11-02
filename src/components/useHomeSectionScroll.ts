import { useEffect } from 'react';

/** Desktop panel transitions inspired by KO Holdings; touch remains native. */
export function useHomeSectionScroll() {
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let direction = 0;
    let lastWheelAt = -Infinity;
    let gestureDirection = 0;
    const cancel = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      direction = 0;
    };
    const wheel = (event: WheelEvent) => {
      if (!media.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      if (event.target instanceof Element) {
        if (event.target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;
        // Do not take over independently scrollable menus or embedded content.
        for (let el = event.target; el && el !== document.body; el = el.parentElement!) {
          const overflow = getComputedStyle(el).overflowY;
          if (/(auto|scroll)/.test(overflow) && el.scrollHeight > el.clientHeight + 2 &&
              (event.deltaY > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0)) return;
        }
      }
      const nextDirection = Math.sign(event.deltaY);
      event.preventDefault();
      const now = performance.now();
      // Momentum belongs to the same gesture even after the animation ends.
      const startsGesture = now - lastWheelAt > 220 || nextDirection !== gestureDirection;
      lastWheelAt = now;
      gestureDirection = nextDirection;
      if (!startsGesture) return;
      if (frame && nextDirection === direction) return;
      cancel();
      const header = document.querySelector('.wisetec-header')?.getBoundingClientRect().height ?? 84;
      const available = window.innerHeight - header;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.figma-home-mode main section'));
      const stops = [0];
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY - header;
        stops.push(top);
        // Tall news/map panels must remain fully readable before the footer.
        for (let offset = available; offset < section.offsetHeight - 24; offset += available) {
          stops.push(Math.min(top + offset, top + section.offsetHeight - available));
        }
      }
      stops.push(max);
      const ordered = [...new Set(stops.map(y => Math.round(Math.max(0, Math.min(max, y)))))].sort((a, b) => a - b);
      const from = window.scrollY;
      const target = nextDirection > 0
        ? ordered.find(y => y > from + 12)
        : ordered.slice().reverse().find(y => y < from - 12);
      if (target === undefined) return;
      direction = nextDirection;
      const distance = target - from;
      const duration = Math.min(700, Math.max(320, Math.abs(distance) / available * 700));
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: from + distance * eased, behavior: 'instant' });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else { frame = 0; direction = 0; }
      };
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', cancel);
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('resize', cancel);
    media.addEventListener('change', cancel);
    return () => {
      cancel();
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('resize', cancel);
      media.removeEventListener('change', cancel);
    };
  }, []);
}
