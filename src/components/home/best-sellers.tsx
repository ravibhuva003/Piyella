'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface BestSellersProps {
  products: Product[];
}

const TABS = ['All', 'Women', 'Men', 'Accessories'];

export function BestSellers({ products }: BestSellersProps) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  }).slice(0, 8);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
      <Container>
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
              Most Coveted
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight">
              Best Sellers
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-white/10 pb-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider rounded-full transition-all duration-300',
                  activeTab === tab
                    ? 'bg-[#C9A96E] text-black shadow-lg shadow-[#C9A96E]/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-[#C9A96E] text-white hover:text-[#C9A96E] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 bg-white/5 backdrop-blur-sm"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
