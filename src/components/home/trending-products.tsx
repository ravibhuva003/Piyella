'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Flame, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

interface TrendingProductsProps {
  products: Product[];
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  const { addItem } = useCart();
  const spotlightProduct = products.find(p => p.slug === 'heritage-skeleton-automatic') || products[0];
  const sideProducts = products.filter(p => p.id !== spotlightProduct?.id).slice(0, 3);

  if (!spotlightProduct) return null;

  const primaryImage = spotlightProduct.images.find(img => img.isPrimary)?.url || spotlightProduct.images[0]?.url || '/images/placeholder.jpg';

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                Trending Spotlight
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight">
              Iconic Masterpieces
            </h2>
          </div>
        </div>

        {/* Spotlight Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Spotlight Hero Card (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-xl overflow-hidden bg-white/5 shrink-0">
              <Image
                src={primaryImage}
                alt={spotlightProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
              <div className="absolute top-4 left-4 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                Only 2 Left
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-2 font-medium">
                {spotlightProduct.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                {spotlightProduct.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#C9A96E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-white/60">({spotlightProduct.reviewCount} Reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6 line-clamp-3">
                {spotlightProduct.description}
              </p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl font-serif text-white font-medium">
                  {formatPrice(spotlightProduct.price, spotlightProduct.currency)}
                </span>
                {spotlightProduct.compareAtPrice && spotlightProduct.compareAtPrice > spotlightProduct.price && (
                  <span className="text-sm text-white/40 line-through">
                    {formatPrice(spotlightProduct.compareAtPrice, spotlightProduct.currency)}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addItem(spotlightProduct)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black text-xs font-semibold uppercase tracking-widest transition-colors shadow-lg shadow-[#C9A96E]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Piece</span>
                </button>
                
                <Link
                  href={`/product/${spotlightProduct.slug}`}
                  className="px-4 py-3.5 border border-white/20 hover:border-white text-white text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Side List Cards (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideProducts.map((prod, idx) => {
              const img = prod.images.find(i => i.isPrimary)?.url || prod.images[0]?.url || '/images/placeholder.jpg';
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="group bg-[#0a0a0a] border border-white/10 hover:border-[#C9A96E]/40 rounded-xl p-4 flex gap-4 items-center transition-all"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <Image src={img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] mb-1">
                      {prod.category}
                    </span>
                    <Link href={`/product/${prod.slug}`}>
                      <h4 className="font-serif text-base text-white truncate group-hover:text-[#C9A96E] transition-colors">
                        {prod.name}
                      </h4>
                    </Link>
                    <span className="text-sm font-medium text-white/90 mt-1">
                      {formatPrice(prod.price, prod.currency)}
                    </span>
                  </div>
                  <button
                    onClick={() => addItem(prod)}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-black hover:bg-[#C9A96E] hover:border-transparent transition-all shrink-0"
                    aria-label={`Add ${prod.name} to bag`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
