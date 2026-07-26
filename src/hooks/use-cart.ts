'use client';

import { useState, useEffect } from 'react';
import { CartItem } from '@/types/cart';
import { Product, ProductVariant } from '@/types/product';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('piyella_cart', JSON.stringify(newItems));
    } catch {
      // Ignore localStorage errors
    }
  };

  const addItem = (product: Product, quantity = 1, selectedVariant?: ProductVariant) => {
    const itemId = `${product.id}-${selectedVariant?.id || 'default'}`;
    const existingIndex = items.findIndex((i) => i.id === itemId);

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = items.map((item, idx) => {
        if (idx === existingIndex) {
          const newQty = item.quantity + quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.price * newQty,
          };
        }
        return item;
      });
    } else {
      const price = selectedVariant?.price ?? product.price;
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        product,
        quantity,
        selectedVariant,
        price,
        totalPrice: price * quantity,
      };
      updated = [...items, newItem];
    }

    saveCart(updated);
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    const updated = items.filter((item) => item.id !== itemId);
    saveCart(updated);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity,
          totalPrice: item.price * quantity,
        };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);

  return {
    items,
    itemCount,
    subtotal,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
