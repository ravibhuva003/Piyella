'use client';

import React from 'react';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Skip to Main Content Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-6 py-3 bg-[#C9A96E] text-black font-bold text-xs uppercase tracking-widest rounded-xl shadow-2xl transition-all"
      >
        Skip to main content
      </a>

      {/* ARIA Live Region for screen readers */}
      <div id="aria-announcer" aria-live="polite" aria-atomic="true" className="sr-only" />

      {children}
    </>
  );
}
