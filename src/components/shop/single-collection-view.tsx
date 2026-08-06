'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/shop/product-card';
import { Container } from '@/components/layout/container';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';

interface SingleCollectionViewProps {
  slug: string;
  initialCollection: Collection;
  initialProducts: Product[];
}

export function SingleCollectionView({ slug, initialCollection, initialProducts }: SingleCollectionViewProps) {
  const { products: storeProducts, collections: storeCollections, isLoaded } = useCatalogStore();

  // Find collection in store or fallback to initial
  const collection = isLoaded
    ? (storeCollections.find((c) => c.slug === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase()) || initialCollection)
    : initialCollection;

  // Filter products live from store if loaded, otherwise initial
  const activeProductsList = isLoaded ? storeProducts : initialProducts;

  const targetId = collection.id;
  const colSlug = collection.slug || slug;
  const colName = collection.name || slug;

  let displayProducts: Product[] = [];

  if (isLoaded) {
    if (colSlug === 'new-arrivals') {
      displayProducts = activeProductsList.filter((p) => p.isNew || (p as any).isNewArrival || p.tags?.includes('new-arrivals'));
    } else if (colSlug === 'best-sellers') {
      displayProducts = activeProductsList.filter((p) => (p as any).isBestSeller || (p.ratings && p.ratings >= 4.8) || p.tags?.includes('best-sellers'));
    } else if (colSlug === 'sale') {
      displayProducts = activeProductsList.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price) || p.tags?.includes('sale'));
    } else {
      displayProducts = activeProductsList.filter((p) => {
        const matchId = p.collectionId === targetId || p.collectionId === colSlug || p.collectionId === colName;
        const matchCat = p.category && (
          p.category.toLowerCase() === colSlug.toLowerCase() ||
          p.category.toLowerCase() === colName.toLowerCase() ||
          p.category.toLowerCase().includes(colSlug.toLowerCase()) ||
          colSlug.toLowerCase().includes(p.category.toLowerCase())
        );
        const matchTags = p.tags?.some((t) => 
          t.toLowerCase() === colSlug.toLowerCase() || 
          t.toLowerCase() === colName.toLowerCase()
        );
        return matchId || matchCat || matchTags;
      });
    }
  } else {
    displayProducts = initialProducts;
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-[#C9A96E] selection:text-black">
      {/* 1. Collection Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden mb-12 border-b border-white/10">
        <Image
          src={collection.image || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1000&auto=format&fit=crop'}
          alt={collection.title || collection.name}
          fill
          priority
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A96E] hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C9A96E]/30 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>

          <h1 className="font-heading text-4xl sm:text-6xl font-light text-white leading-tight">
            {collection.title || collection.name}
          </h1>

          <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {collection.description || 'Discover our curated selection of luxury handcrafted pieces designed for the modern connoisseur.'}
          </p>
        </div>
      </section>

      <Container>
        {/* 2. Collection Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-5 border-y border-white/10 mb-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A96E]" />
            <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
              Showing {displayProducts.length} {displayProducts.length === 1 ? 'Creation' : 'Handcrafted Creations'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-white/60 font-mono">
            <span className="flex items-center gap-1.5 text-[#C9A96E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Atelier Curation</span>
            </span>
          </div>
        </div>

        {/* 3. Product Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#0a0a0a] border border-white/10 rounded-3xl space-y-4">
            <p className="text-white/60 text-sm font-light">No items found in this specific collection yet.</p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              <span>Explore Other Collections</span>
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
