'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_wishlist');
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveWishlist = (items: Product[]) => {
    setWishlistItems(items);
    try {
      localStorage.setItem('piyella_wishlist', JSON.stringify(items));
    } catch {
      // Ignore localStorage errors
    }
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    let updated: Product[];
    if (exists) {
      updated = wishlistItems.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlistItems, product];
    }
    saveWishlist(updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  };
}
