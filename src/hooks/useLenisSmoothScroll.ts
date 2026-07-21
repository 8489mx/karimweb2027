import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenisSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15, // Higher lerp means faster/snappier (default is 0.1)
      wheelMultiplier: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
