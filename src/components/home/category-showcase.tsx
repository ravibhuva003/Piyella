'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';

const CATEGORIES = [
  {
    id: 'women',
    title: "Women's Couture",
    subtitle: 'Silks, Evening Gowns & Tailored Outerwear',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    href: '/collections/women',
    count: '42 Items',
  },
  {
    id: 'men',
    title: "Men's Tailoring",
    subtitle: 'Italian Cashmere Overcoats & Velvet Tuxedos',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    href: '/collections/men',
    count: '38 Items',
  },
  {
    id: 'watches',
    title: 'Swiss Horology',
    subtitle: 'Skeleton Automatics & Rose Gold Chronographs',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop',
    href: '/collections/heritage-timepieces',
    count: '15 Timepieces',
  },
  {
    id: 'leather',
    title: 'Leather Atelier',
    subtitle: 'Pebbled Calfskin Totes & Monogram Travel Duffles',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    href: '/collections/leather-atelier',
    count: '24 Leather Goods',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
            Bespoke Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base">
            Explore carefully curated departments crafted for uncompromising taste.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[420px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <Link href={cat.href} className="block w-full h-full">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 opacity-70 group-hover:opacity-85 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C9A96E]/20 font-medium">
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#C9A96E] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light mb-4 line-clamp-2">
                      {cat.subtitle}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/90 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
