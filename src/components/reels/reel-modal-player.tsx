'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, Eye, ExternalLink, ShoppingBag, ArrowRight } from 'lucide-react';
import { InstagramReel } from '@/lib/data/reels-data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

interface ReelModalPlayerProps {
  reel: InstagramReel | null;
  onClose: () => void;
}

export function ReelModalPlayer({ reel, onClose }: ReelModalPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cart = useCart();

  if (!reel) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          aria-label="Close reel player"
        >
          <X size={24} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
        >
          {/* Video Player Column (9:16 Portrait) */}
          <div className="relative w-full md:w-[420px] aspect-[9/16] bg-black shrink-0">
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.posterUrl}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between pointer-events-auto">
                <span className="text-[10px] uppercase tracking-widest bg-black/60 text-[#C9A96E] px-2.5 py-1 rounded-full font-bold border border-[#C9A96E]/30 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{reel.viewsCount} Views</span>
                </span>

                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-medium">{reel.category}</span>
                <h3 className="font-serif text-lg text-white font-medium">{reel.title}</h3>
              </div>
            </div>
          </div>

          {/* Reel Details & "Shop This Product" Column */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block">
                Atelier Cinema Experience
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-tight">
                {reel.title}
              </h2>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Experience craftsmanship brought to life. Hand-carved in our Milan ateliers, featuring Italian Mulberry silk, Florentine gold leaf, and Swiss automatic horology.
              </p>
            </div>

            {/* Linked Product Card */}
            {reel.linkedProduct && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold block">Featured Artwork / Product</span>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                    <Image src={reel.linkedProduct.image} alt={reel.linkedProduct.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base text-white truncate font-medium">{reel.linkedProduct.name}</h4>
                    <span className="font-serif text-lg font-bold text-[#C9A96E]">{formatPrice(reel.linkedProduct.price)}</span>
                  </div>
                </div>

                <Link
                  href={`/product/${reel.linkedProduct.slug}`}
                  className="w-full py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Shop This Artwork</span>
                </Link>
              </div>
            )}

            {/* Watch on Instagram CTA */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-white/40 font-light">@piyella.official</span>
              <a
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C9A96E] hover:underline uppercase tracking-wider font-semibold"
              >
                <span>Watch on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
