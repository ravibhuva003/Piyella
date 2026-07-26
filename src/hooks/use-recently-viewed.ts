'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_recently_viewed');
      if (saved) {
        setRecentlyViewed(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const addRecentlyViewed = (product: Product) => {
    try {
      const filtered = recentlyViewed.filter((item) => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8); // Keep last 8 items
      setRecentlyViewed(updated);
      localStorage.setItem('piyella_recently_viewed', JSON.stringify(updated));
    } catch {}
  };

  return {
    recentlyViewed,
    addRecentlyViewed,
  };
}
