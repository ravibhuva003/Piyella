'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';

interface RecentlyViewedProps {
  excludeId?: string;
}

export function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const { recentlyViewed } = useRecentlyViewed();

  const itemsToDisplay = recentlyViewed.filter((item) => item.id !== excludeId).slice(0, 4);

  if (itemsToDisplay.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="flex items-center gap-2 mb-8">
        <Clock className="w-5 h-5 text-[#C9A96E]" />
        <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {itemsToDisplay.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
