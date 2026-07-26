'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { Cart, CartItem } from '@/types/cart';

interface CartContextType extends Cart {
  isOpen: boolean;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const TAX_RATE = 0.18; // 18% GST
const STANDARD_SHIPPING = 250;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('piyella_cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to parse cart from local storage', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('piyella_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + shipping - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const addItem = useCallback((product: Product, variant?: ProductVariant, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.selectedVariant?.id === variant?.id
      );

      const price = variant?.price || product.price;

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        const item = newItems[existingItemIndex];
        const newQuantity = item.quantity + quantity;
        newItems[existingItemIndex] = {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * price
        };
        return newItems;
      }

      return [...prevItems, {
        id: `${product.id}-${variant?.id || 'default'}`,
        productId: product.id,
        product,
        selectedVariant: variant,
        quantity,
        price,
        totalPrice: price * quantity
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((prevItems) => prevItems.filter(
      (item) => !(item.productId === productId && item.selectedVariant?.id === variantId)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setItems((prevItems) => prevItems.map((item) => {
      if (item.productId === productId && item.selectedVariant?.id === variantId) {
        return {
          ...item,
          quantity,
          totalPrice: item.price * quantity
        };
      }
      return item;
    }));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
    setDiscount(0);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const applyCoupon = useCallback((code: string) => {
    setCouponCode(code);
    // Simple mock discount logic
    if (code.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  }, [subtotal]);

  // Update discount if subtotal changes
  useEffect(() => {
    if (couponCode) {
      applyCoupon(couponCode);
    }
  }, [subtotal, couponCode, applyCoupon]);

  const value = {
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    couponCode: couponCode || undefined,
    itemCount,
    isOpen,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingProgress,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    applyCoupon
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
