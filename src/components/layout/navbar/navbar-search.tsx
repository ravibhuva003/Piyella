'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';

interface NavbarSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavbarSearch({ isOpen, onClose }: NavbarSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const { products, isLoaded } = useCatalogStore();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  // Filter live matching products
  const matchingProducts: Product[] = query.trim()
    ? products.filter((p) => {
        const q = query.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-0 z-[110] bg-background border-b border-border shadow-2xl text-foreground"
        >
          <Container>
            <div className="py-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center h-16 md:h-20 border-b border-border pb-2">
                <Search className="w-6 h-6 text-[#C9A96E] mr-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search our catalog by product name, category, or keyword..."
                  className="flex-1 bg-transparent border-none outline-none text-lg md:text-2xl font-heading placeholder:text-foreground-muted/40 text-foreground"
                />
                
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1.5 text-foreground-muted hover:text-foreground mr-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md ml-2 shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 ml-3 text-foreground-muted hover:text-foreground transition-colors rounded-full hover:bg-muted"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </form>

              {/* Live Preview Dropdown Results */}
              {query.trim() !== '' && (
                <div className="pt-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-foreground-muted">
                    <span>Matches Found ({matchingProducts.length})</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-[#C9A96E] hover:underline font-semibold"
                    >
                      View All Results &rarr;
                    </button>
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      {matchingProducts.map((prod) => {
                        const img = prod.images.find((i) => i.isPrimary)?.url || prod.images[0]?.url || '/images/placeholder.jpg';
                        return (
                          <Link
                            key={prod.id}
                            href={`/product/${prod.slug}`}
                            onClick={onClose}
                            className="group bg-surface border border-border hover:border-[#C9A96E]/50 rounded-xl p-3 flex gap-3 items-center transition-all shadow-sm"
                          >
                            <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-border">
                              <Image src={img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-[9px] uppercase tracking-widest text-[#C9A96E] truncate font-medium">
                                {prod.category}
                              </span>
                              <h4 className="font-serif text-xs text-foreground truncate group-hover:text-[#C9A96E] transition-colors font-medium">
                                {prod.name}
                              </h4>
                              <span className="text-xs font-semibold text-foreground mt-1">
                                {formatPrice(prod.price)}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-foreground-muted font-light">
                      No live matches found for &ldquo;{query}&rdquo;. Press Enter to view full catalog search results.
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
