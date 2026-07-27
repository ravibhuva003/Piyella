'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Collection } from '@/types/collection';
import { useCatalogStore } from '@/lib/store/catalog-store';

interface FeaturedCollectionProps {
  collections?: Collection[];
}

export function FeaturedCollection({ collections: initialCollections }: FeaturedCollectionProps) {
  const { collections: storeCols } = useCatalogStore();
  const collections = storeCols.length > 0 ? storeCols : (initialCollections || []);

  if (collections.length === 0) return null;

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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10">
                  <span className="self-start text-[10px] uppercase tracking-[0.3em] font-semibold text-black bg-[#C9A96E] px-3.5 py-1.5 rounded-full shadow-lg">
                    Featured Spotlight
                  </span>

                  <div className="space-y-4 max-w-lg">
                    <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium group-hover:text-[#C9A96E] transition-colors leading-tight">
                      {primaryCollection.title || primaryCollection.name}
                    </h3>
                    <p className="text-white/70 font-light text-sm line-clamp-3 leading-relaxed">
                      {primaryCollection.description}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A96E] border-b border-[#C9A96E] pb-1">
                        Discover Collection
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Secondary Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryCollections.map((col, idx) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: (idx + 1) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[240px] sm:h-[300px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <Link href={`/collections/${col.slug}`} className="block w-full h-full">
                  <Image
                    src={col.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'}
                    alt={col.title || col.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10 space-y-2">
                    <h4 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-[#C9A96E] transition-colors">
                      {col.title || col.name}
                    </h4>
                    <p className="text-white/60 font-light text-xs line-clamp-1">
                      {col.description}
                    </p>
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
