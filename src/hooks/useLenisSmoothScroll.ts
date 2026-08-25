import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export function useLenisSmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    // Disable Lenis smooth scroll on admin route so nested overflow containers scroll naturally
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.15, // Higher lerp means faster/snappier (default is 0.1)
      wheelMultiplier: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location.pathname]);
}
