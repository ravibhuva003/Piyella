'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Film, Video } from 'lucide-react';
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

      {/* Grid or Empty State */}
      {filteredReels.length > 0 ? (
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
      ) : (
        <div className="py-16 bg-surface border border-dashed border-border rounded-3xl text-center space-y-4 max-w-xl mx-auto p-8 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-accent/10 text-[#C9A96E] flex items-center justify-center mx-auto border border-accent/20">
            <Film className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-foreground">No Reels Published Yet</h3>
            <p className="text-xs text-foreground-muted font-light">
              Administrators can add Instagram Reels, video links, posters, and link products in the Admin Portal.
            </p>
          </div>
          <Link
            href="/admin/reels"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
          >
            <span>+ Add Video Reel in Admin</span>
          </Link>
        </div>
      )}

      {/* Video Popup Modal */}
      <ReelModalPlayer reel={activeReel} onClose={() => setActiveReel(null)} />
    </div>
  );
}
