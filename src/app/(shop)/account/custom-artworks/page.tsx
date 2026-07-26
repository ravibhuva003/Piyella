'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette, Clock, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useArtworkStore } from '@/lib/store/artwork-store';
import { formatPrice } from '@/lib/utils';

export default function CustomerArtworksPage() {
  const { requests, isLoaded } = useArtworkStore();

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                Client Commissions
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-medium">
              Bespoke Artwork Portfolio
            </h1>
          </div>

          <Link
            href="/custom-artwork"
            className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center gap-2"
          >
            <span>+ Commission New Piece</span>
          </Link>
        </div>

        {/* Requests List */}
        {requests.length > 0 ? (
          <div className="space-y-8">
            {requests.map((req) => (
              <div key={req.id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="font-mono text-base font-bold text-[#C9A96E] block mb-1">Commission #{req.id}</span>
                    <span className="text-xs text-white/40 font-light">Submitted on {new Date(req.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                      req.status === 'Artisan Crafting' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      req.status === 'Quotation Sent' ? 'bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Specifications */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold block">Artistic Specifications</span>
                    <p className="text-white font-medium">{req.material}</p>
                    <p className="text-white/70 font-light">{req.frame}</p>
                    <p className="text-white/70 font-light">{req.size}</p>
                    <p className="text-white/50 font-mono">Budget: {req.budget}</p>
                  </div>

                  {/* Reference Image Thumbnail */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Primary Reference</span>
                    {req.images[0] ? (
                      <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <Image src={req.images[0]} alt="Reference" fill className="object-cover" />
                      </div>
                    ) : (
                      <span className="text-xs text-white/30 italic">No reference image</span>
                    )}
                  </div>

                  {/* Quote Price & Contact */}
                  <div className="space-y-3 bg-black/60 p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold block">Atelier Quote & Timeline</span>
                    {req.quotePrice ? (
                      <div>
                        <div className="font-serif text-2xl font-bold text-white mb-1">{formatPrice(req.quotePrice)}</div>
                        <p className="text-xs text-emerald-400 font-light">Estimated Crafting: {req.estimatedDays} Days</p>
                      </div>
                    ) : (
                      <p className="text-xs text-white/50 italic">Quote under Master Curator evaluation...</p>
                    )}

                    {req.adminNotes && (
                      <p className="text-[11px] text-white/70 font-light italic border-t border-white/10 pt-2">
                        &ldquo;{req.adminNotes}&rdquo;
                      </p>
                    )}

                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Atelier, inquiring about Commission #${req.id} (${req.material})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Master Artist</span>
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-white/5 text-[#C9A96E]">
              <Palette className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-white">No active artwork commissions</h2>
              <p className="text-white/50 text-sm font-light">
                Commission a bespoke painting, silk tapestry, or gold leaf inlay sculpture tailored to your vision.
              </p>
            </div>
            <Link
              href="/custom-artwork"
              className="inline-block px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
            >
              Commission Custom Artwork
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
