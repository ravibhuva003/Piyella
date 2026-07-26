'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { GIFT_CARD_TEMPLATES } from '@/lib/data/gift-options';

interface LiveCardPreviewProps {
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
}

export function LiveCardPreview({ templateId, recipientName, senderName, message }: LiveCardPreviewProps) {
  const template = GIFT_CARD_TEMPLATES.find((t) => t.id === templateId) || GIFT_CARD_TEMPLATES[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Live Greeting Card Preview
        </span>
        <span className="text-[10px] text-white/40 font-mono">24K Gold Foil Embossed</span>
      </div>

      <div
        className={`relative aspect-[16/10] w-full rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br ${template.bgGradient}`}
      >
        {/* Ambient Gold Foil Corner Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9A96E]/20 to-transparent blur-xl pointer-events-none" />
        <div className="absolute inset-2 border border-[#C9A96E]/30 rounded-xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex justify-between items-center z-10">
          <span className="font-serif tracking-[0.3em] text-xs font-bold text-[#C9A96E] uppercase">
            PIYELLA ATELIER
          </span>
          <Heart className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]/20" />
        </div>

        {/* Card Body */}
        <div className="my-auto z-10 space-y-3 py-2">
          {recipientName && (
            <p className="font-serif text-lg sm:text-xl text-[#D4B87C] italic">
              Dearest {recipientName},
            </p>
          )}

          <p className="font-light text-xs sm:text-sm text-white/90 leading-relaxed italic line-clamp-3">
            &ldquo;{message || 'May this bespoke gift bring you endless joy, elegance, and timeless beauty.'}&rdquo;
          </p>
        </div>

        {/* Footer Signature */}
        <div className="z-10 flex justify-between items-end pt-2 border-t border-[#C9A96E]/20">
          <span className="text-[9px] uppercase tracking-widest text-white/40">
            {template.name}
          </span>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-widest text-white/50 block">With Gratitude,</span>
            <span className="font-serif text-sm font-semibold text-[#C9A96E] italic">
              {senderName || 'Anonymous Connoisseur'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
