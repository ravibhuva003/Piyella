'use client';

import { useState, useEffect } from 'react';

export type ScrollDirection = 'up' | 'down' | null;

interface ScrollState {
  direction: ScrollDirection;
  scrollY: number;
}

export function useScrollDirection(threshold: number = 5): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    direction: null,
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      setScrollState({
        direction: scrollY > lastScrollY ? 'down' : 'up',
        scrollY,
      });

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [threshold]);

  return scrollState;
}
