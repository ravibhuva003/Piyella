'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Eye, Pin, ShoppingBag } from 'lucide-react';
import { InstagramReel } from '@/lib/data/reels-data';

interface ReelCardProps {
  reel: InstagramReel;
  onSelect: (reel: InstagramReel) => void;
}

export function ReelCard({ reel, onSelect }: ReelCardProps) {
  return (
    <div
      onClick={() => onSelect(reel)}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border-[#C9A96E]/50"
    >
      <Image src={reel.posterUrl} alt={reel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 group-hover:from-black/95 transition-all" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="text-[9px] uppercase tracking-widest bg-black/60 backdrop-blur-md text-white/80 px-2 py-0.5 rounded-full border border-white/10">
          {reel.category}
        </span>

        {reel.isPinned && (
          <span className="p-1.5 rounded-full bg-[#C9A96E] text-black font-bold shadow-lg" title="Pinned Reel">
            <Pin className="w-3 h-3 fill-current" />
          </span>
        )}
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full bg-[#C9A96E]/90 text-black flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 transition-transform">
          <Play className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] text-[#C9A96E] font-mono">
          <Eye className="w-3.5 h-3.5" />
          <span>{reel.viewsCount} Views</span>
        </div>

        <h3 className="font-serif text-base text-white font-medium line-clamp-2 leading-snug">
          {reel.title}
        </h3>

        {reel.linkedProduct && (
          <div className="pt-2 flex items-center gap-2 text-xs text-white/70 font-light border-t border-white/10">
            <ShoppingBag className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="truncate">{reel.linkedProduct.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
