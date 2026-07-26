'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const FREE_SHIPPING_THRESHOLD = 2999;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  
  const tax = subtotal * 0.18;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const total = subtotal + tax + (subtotal > 0 ? shipping : 0) - (subtotal * discount);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'LUXE10') setDiscount(0.1);
    else if (promoCode.toUpperCase() === 'PIYELLA20') setDiscount(0.2);
    else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[90vw] max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]/95">
              <h2 className="font-serif text-2xl text-white">
                Shopping Bag <span className="text-white/40 text-lg">({items.length})</span>
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Banner */}
            {items.length > 0 && (
              <div className="p-4 bg-white/5 border-b border-white/10">
                <p className="text-sm text-center mb-2 text-white/90">
                  {amountToFreeShipping > 0 
                    ? `Add ${formatPrice(amountToFreeShipping)} more for Free Express Shipping`
                    : "You've unlocked Free Express Shipping!"}
                </p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    className="h-full bg-[#C9A96E]"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-70">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                    <ShoppingBag className="w-10 h-10 text-[#C9A96E]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-white">Your bag is empty</h3>
                    <p className="text-white/50 text-sm max-w-[250px]">
                      Discover our exquisite collection and find something beautiful.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 bg-white text-black font-medium text-sm tracking-wider uppercase hover:bg-[#C9A96E] transition-colors rounded-full mt-4"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const primaryImage = item.product.images.find(i => i.isPrimary)?.url || item.product.images[0]?.url || '/images/placeholder.jpg';
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      className="flex gap-4 py-2"
                    >
                      <div className="relative w-24 h-32 bg-white/5 overflow-hidden flex-shrink-0">
                        <Image 
                          src={primaryImage} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-serif text-lg text-white leading-tight mb-1 line-clamp-2">
                              {item.product.name}
                            </h4>
                            {item.selectedVariant && (
                              <p className="text-xs text-white/50 mb-2">Variant: {item.selectedVariant.name || item.selectedVariant.value}</p>
                            )}
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border border-white/20 rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-white/70 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-white/70 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-medium text-white">
                            {formatPrice(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-white/10 bg-[#0a0a0a]/95 p-6 space-y-4">
                {/* Promo Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="flex-1 bg-transparent border border-white/20 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#C9A96E] focus:outline-none uppercase"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-4 py-2 border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm text-white/70 pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C9A96E]">
                      <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span>-{formatPrice(subtotal * discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white font-serif text-xl">Total</span>
                  <span className="text-[#C9A96E] font-medium text-2xl">{formatPrice(total)}</span>
                </div>

                <Link 
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#C9A96E] text-black font-medium text-sm tracking-widest uppercase hover:bg-[#D4B87C] transition-colors mt-4 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
