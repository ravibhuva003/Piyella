'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Feather, Scissors, Film } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/product/ProductCard';
import { products, collections, formatPrice } from '@/lib/data';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCollection } from '@/components/home/featured-collection';
import { CategoryShowcase } from '@/components/home/category-showcase';
import { BestSellers } from '@/components/home/best-sellers';
import { TestimonialsSection } from '@/components/home/testimonials';
import { InstagramGallery } from '@/components/home/instagram-gallery';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#C9A96E] selection:text-black">
      
      {/* 1. Animated Luxury Hero */}
      <HeroSection />

      {/* 2. Handcrafted Categories Showcase */}
      <CategoryShowcase />

      {/* 3. Handcrafted Best Sellers Grid */}
      <BestSellers products={products} />

      {/* 4. Behind the Stitch Story Banner */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
                <Scissors className="w-4 h-4" />
                <span>Single-Needle Craftsmanship</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium leading-tight">
                Behind the Stitch: 120+ Hours of Single-Needle Devotion
              </h2>

              <p className="text-white/70 font-light text-base leading-relaxed">
                Every purse, wool thread embroidery tapestry, and baby alpaca crochet throw is hand-drawn on unbleached Belgian linen and embellished with 24K gold leaf threads.
              </p>

              <div className="flex gap-4 pt-2">
                <Link
                  href="/story"
                  className="px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center gap-2"
                >
                  <span>Explore Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/custom-artwork"
                  className="px-8 py-4 border border-white/20 hover:border-[#C9A96E] text-white hover:text-[#C9A96E] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <span>Commission Custom Piece</span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
                alt="Behind the Stitch Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Featured Parallax Collection */}
      <FeaturedCollection collections={collections} />

      {/* 6. Instagram Reels & Atelier Cinema Banner */}
      <section className="py-20 border-b border-white/10">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-5 h-5 text-[#C9A96E]" />
                <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                  Atelier Cinema
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                Instagram Reels & Artisanal Moments
              </h2>
            </div>

            <Link
              href="/reels"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A96E] hover:underline font-semibold"
            >
              <span>Watch All Reels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
        <InstagramGallery />
      </section>

      {/* 7. VIP Reviews & Testimonials */}
      <TestimonialsSection />

      {/* 8. Newsletter Inner Circle */}
      <NewsletterSection />

    </main>
  );
}
