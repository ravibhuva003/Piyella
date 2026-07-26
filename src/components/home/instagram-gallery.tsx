'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout/container';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
    title: 'Precision leather edge painting in our Milan atelier.',
    likes: '2.4k',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    title: 'Backstage autumn editorial campaign shoot.',
    likes: '4.1k',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    title: 'Assembly of the Heritage Skeleton Automatic movement.',
    likes: '5.8k',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    title: '100% Mulberry silk drape detailing.',
    likes: '3.2k',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop',
    title: 'Hand-stitching full-grain pebbled calfskin totes.',
    likes: '1.9k',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    title: 'Bespoke tailoring fitting session in Paris.',
    likes: '3.7k',
  },
];

export function InstagramGallery() {
  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <InstagramIcon className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                @PIYELLA.OFFICIAL
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight">
              Inside The Atelier
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-[#C9A96E] text-xs uppercase tracking-widest text-white/80 hover:text-[#C9A96E] transition-all bg-white/5 rounded-full"
          >
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <InstagramIcon className="w-5 h-5 text-[#C9A96E]" />
                <div>
                  <p className="text-[10px] text-white/80 font-light line-clamp-2 mb-1">
                    {post.title}
                  </p>
                  <span className="text-[10px] font-semibold text-[#C9A96E]">
                    ❤️ {post.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
