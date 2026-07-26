'use client';

import React from 'react';
import { Film } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useReelsStore } from '@/lib/store/reels-store';
import { ReelsGrid } from '@/components/reels/reels-grid';

export default function PublicReelsPage() {
  const { reels, isLoaded } = useReelsStore();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
            <Film className="w-4 h-4" />
            <span>Atelier Cinema & Reels</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            Instagram Reels Gallery
          </h1>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Step behind the scenes at our Milan ateliers. Watch rare 24K gold leaf gilding, pure silk weaving, leather crafting, and unboxing moments.
          </p>
        </div>

        {/* Reels Grid with Tabs */}
        <ReelsGrid reels={reels} />
      </Container>
    </main>
  );
}
