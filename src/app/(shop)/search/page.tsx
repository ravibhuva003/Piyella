'use client';

import React, { use, useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/product/ProductCard';
import { searchProducts } from '@/lib/data';
import { Product } from '@/types/product';
import { FilterDrawer } from '@/components/shop/FilterDrawer';
import { SortDropdown } from '@/components/shop/SortDropdown';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = use(searchParams);
  const [query, setQuery] = useState(q || '');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    setResults(searchProducts(query));
  }, [query]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground font-medium">
            Search Catalog
          </h1>

          <div className="relative">
            <SearchIcon className="w-5 h-5 text-[#C9A96E] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, category (timepieces, silk, leather), or tags..."
              className="w-full bg-surface border border-border pl-14 pr-6 py-4 text-base text-foreground placeholder:text-foreground-muted/50 focus:border-[#C9A96E] focus:outline-none rounded-2xl shadow-xl font-light"
            />
          </div>

          <p className="text-xs text-foreground-muted font-light">
            Showing <span className="text-[#C9A96E] font-medium">{results.length}</span> results for &ldquo;{query || 'All'}&rdquo;
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-y border-border mb-10 gap-4">
          <div className="flex items-center gap-6">
            <FilterDrawer />
            <span className="text-xs text-foreground-muted font-light">{results.length} Matches</span>
          </div>
          <SortDropdown />
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-foreground-muted font-light space-y-3">
            <p className="text-lg">No products found matching &ldquo;{query}&rdquo;.</p>
            <p className="text-xs">Try searching for &quot;gowns&quot;, &quot;watches&quot;, &quot;cashmere&quot;, or &quot;bags&quot;.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
