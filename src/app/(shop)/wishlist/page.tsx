'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/hooks/use-wishlist';

export default function WishlistPage() {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-[#C9A96E] fill-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                Personal Curation
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-medium">
              Saved Wishlist ({wishlistCount})
            </h1>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-muted hover:text-[#C9A96E] transition-colors"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Wishlist Grid */}
        {wishlistCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product, idx) => (
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
        ) : (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center mx-auto bg-surface text-[#C9A96E]">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-foreground">Your wishlist is currently empty</h2>
              <p className="text-foreground-muted text-sm font-light">
                Explore our fine curation of silks, leather goods, and timepieces to save your favorite pieces.
              </p>
            </div>
            <Link
              href="/collections"
              className="inline-block px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
            >
              Explore Collections
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
