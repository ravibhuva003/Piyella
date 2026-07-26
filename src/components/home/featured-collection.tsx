'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Collection } from '@/types/collection';

interface FeaturedCollectionProps {
  collections: Collection[];
}

export function FeaturedCollection({ collections }: FeaturedCollectionProps) {
  const primaryCollection = collections[0];
  const secondaryCollections = collections.slice(1, 4);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
              Curated Editions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-[#C9A96E] transition-colors pb-1 border-b border-white/10 hover:border-[#C9A96E]"
          >
            <span>Explore All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Hero Card (Large Feature) */}
          {primaryCollection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 group relative h-[500px] sm:h-[650px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <Link href={`/collections/${primaryCollection.slug}`} className="block w-full h-full">
                <Image
                  src={primaryCollection.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'}
                  alt={primaryCollection.title || primaryCollection.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                  <span className="inline-block text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4 border border-[#C9A96E]/20">
                    Editor's Highlight
                  </span>
                  <h3 className="font-serif text-3xl sm:text-5xl text-white mb-4 leading-tight">
                    {primaryCollection.title || primaryCollection.name}
                  </h3>
                  <p className="text-white/70 font-light text-sm sm:text-base max-w-lg mb-6 line-clamp-2">
                    {primaryCollection.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-white font-medium text-xs sm:text-sm uppercase tracking-widest group-hover:text-[#C9A96E] transition-colors">
                    <span>Discover Edition</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Secondary Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryCollections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[240px] sm:h-[300px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <Link href={`/collections/${collection.slug}`} className="block w-full h-full">
                  <Image
                    src={collection.image || 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop'}
                    alt={collection.title || collection.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium mb-1">
                      {collection.productCount} Handcrafted Items
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                      {collection.title || collection.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
