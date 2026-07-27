'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, FolderPlus } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCatalogStore } from '@/lib/store/catalog-store';

export function CategoryShowcase() {
  const { collections } = useCatalogStore();

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border relative overflow-hidden text-foreground">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
            Bespoke Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground font-medium tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-foreground-muted font-light text-sm sm:text-base">
            Explore carefully curated departments crafted for uncompromising taste.
          </p>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative h-[450px] sm:h-[500px] rounded-3xl overflow-hidden border border-border shadow-xl"
              >
                {/* Background Image */}
                <Image
                  src={cat.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* Card Content */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-black bg-[#C9A96E] px-3 py-1 rounded-full shadow-md">
                      {cat.productCount || 0} Items
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white group-hover:text-[#C9A96E] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 font-light text-xs sm:text-sm max-w-md line-clamp-2">
                      {cat.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/collections/${cat.slug}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A96E] hover:underline"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State when 0 Categories exist */
          <div className="py-16 bg-surface border border-dashed border-border rounded-3xl text-center space-y-4 max-w-xl mx-auto p-8 shadow-inner">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-[#C9A96E] flex items-center justify-center mx-auto border border-accent/20">
              <FolderPlus className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-foreground">No Categories Created Yet</h3>
              <p className="text-xs text-foreground-muted font-light">
                Administrators can create bespoke categories, image covers, and collection titles in the Admin Dashboard.
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
            >
              <span>Manage Categories in Admin</span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
