'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, PackagePlus } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { useCatalogStore } from '@/lib/store/catalog-store';

interface BestSellersProps {
  products?: Product[];
}

export function BestSellers({ products: initialProducts }: BestSellersProps) {
  const { products: storeProducts } = useCatalogStore();
  const products = storeProducts.length > 0 ? storeProducts : (initialProducts || []);

  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  }).slice(0, 8);

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border text-foreground transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
              Most Coveted
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground font-medium tracking-tight">
              Best Sellers
            </h2>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="py-16 bg-surface border border-dashed border-border rounded-3xl text-center space-y-4 max-w-xl mx-auto p-8 shadow-inner">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-[#C9A96E] flex items-center justify-center mx-auto border border-accent/20">
              <PackagePlus className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-foreground">No Products Published Yet</h3>
              <p className="text-xs text-foreground-muted font-light">
                Administrators can create products, upload high-res images, set prices, and configure variants in the Admin Dashboard.
              </p>
            </div>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
            >
              <span>+ Create First Product in Admin</span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
