'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { InstagramReel, ReelCategory } from '@/lib/data/reels-data';
import { ReelCard } from '@/components/reels/reel-card';
import { ReelModalPlayer } from '@/components/reels/reel-modal-player';

interface ReelsGridProps {
  reels: InstagramReel[];
}

const CATEGORIES: Array<'All' | ReelCategory> = [
  'All',
  'Featured',
  'Making Process',
  'Behind the Scenes',
  'Customer Unboxing',
];

export function ReelsGrid({ reels }: ReelsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ReelCategory>('All');
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(null);

  const filteredReels = reels.filter((r) =>
    selectedCategory === 'All' ? true : r.category === selectedCategory
  );

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                isActive
                  ? 'bg-[#C9A96E] text-black shadow-lg shadow-[#C9A96E]/20'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredReels.map((reel, idx) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <ReelCard reel={reel} onSelect={setActiveReel} />
          </motion.div>
        ))}
      </div>

      {/* Video Popup Modal */}
      <ReelModalPlayer reel={activeReel} onClose={() => setActiveReel(null)} />
    </div>
  );
}
