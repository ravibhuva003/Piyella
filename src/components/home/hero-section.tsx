'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCatalogStore } from '@/lib/store/catalog-store';

export function HeroSection() {
  const { banners } = useCatalogStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const bgImage = banners?.heroBackgroundImage || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop';
  const headline = banners?.heroHeadline || 'Mastery of Bespoke Luxury';
  const subtitle = banners?.heroSubtitle || 'Handcrafted in Italian workshops with rare calfskin, 100% pure Mulberry silk, and Swiss automatic movements.';

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Piyella Main Hero Background"
            fill
            priority
            quality={90}
            className="object-cover object-center opacity-40 scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <Container className="relative z-10 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/90">
                Autumn/Winter 2026 Collection
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            </motion.div>

            {/* Dynamic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-[1.08] mb-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C9A96E] to-[#FFDF99]">
                {headline}
              </span>
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-12"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20 hover:shadow-[#C9A96E]/40"
              >
                <span>Explore Curation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white text-white font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#C9A96E] group-hover:text-black flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>The Brand Film</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-white/50 font-light"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                <span>100% Certified Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                <span>Handmade in Milan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                <span>Complimentary Worldwide Delivery</span>
              </div>
            </motion.div>

          </div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-4 h-8 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 bg-[#C9A96E] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                title="Piyella Craftsmanship Film"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
