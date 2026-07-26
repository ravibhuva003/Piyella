'use client';

import React, { use } from 'react';
import { Printer, Heart, Sparkles } from 'lucide-react';

interface GiftCardPrintPageProps {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{
    rec?: string;
    snd?: string;
    msg?: string;
  }>;
}

export default function GiftCardPrintPage({ params, searchParams }: GiftCardPrintPageProps) {
  const { orderId } = use(params);
  const { rec, snd, msg } = use(searchParams);

  const recipientName = rec ? decodeURIComponent(rec) : 'Lady Evelyn Vance';
  const senderName = snd ? decodeURIComponent(snd) : 'Lord Henry Cavendish';
  const message = msg ? decodeURIComponent(msg) : 'May this bespoke luxury piece bring you endless joy, elegance, and timeless beauty.';

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-900 p-6 sm:p-12 flex flex-col items-center justify-center selection:bg-[#C9A96E]">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8 print:hidden text-white">
        <div>
          <h1 className="font-serif text-2xl text-white">Printable Luxury Greeting Card</h1>
          <p className="text-xs text-white/50">For Atelier Packing Staff &bull; Order #{orderId}</p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Card</span>
        </button>
      </div>

      {/* Luxury Greeting Card Document */}
      <div className="relative w-full max-w-2xl aspect-[16/10] bg-[#0A0A0A] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#C9A96E] shadow-2xl flex flex-col justify-between overflow-hidden print:shadow-none print:border-2 print:border-[#C9A96E]">
        
        {/* Double Gold Foil Border */}
        <div className="absolute inset-3 border border-[#C9A96E]/40 rounded-2xl pointer-events-none" />

        {/* Top Branding */}
        <div className="flex justify-between items-center z-10">
          <span className="font-serif tracking-[0.4em] uppercase text-sm font-bold text-[#C9A96E]">
            PIYELLA ATELIER
          </span>
          <Heart className="w-5 h-5 text-[#C9A96E] fill-[#C9A96E]/20" />
        </div>

        {/* Main Personal Message */}
        <div className="my-auto z-10 space-y-4 py-4 px-4 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-[#D4B87C] italic">
            Dearest {recipientName},
          </p>

          <p className="font-light text-sm sm:text-base text-white/90 leading-relaxed italic max-w-md mx-auto">
            &ldquo;{message}&rdquo;
          </p>
        </div>

        {/* Bottom Signature */}
        <div className="z-10 flex justify-between items-end pt-4 border-t border-[#C9A96E]/30">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">
            MILAN &bull; PARIS &bull; MUMBAI
          </span>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-white/50 block">With Deepest Affection,</span>
            <span className="font-serif text-lg font-semibold text-[#C9A96E] italic">
              {senderName}
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}
