'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { GiftPackagingSelector } from '@/components/gift/gift-packaging-selector';
import { GiftPackagingData, GIFT_BOX_STYLES } from '@/lib/data/gift-options';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [giftData, setGiftData] = useState<GiftPackagingData>({
    enabled: false,
    boxStyleId: GIFT_BOX_STYLES[0].id,
    boxStyleName: GIFT_BOX_STYLES[0].name,
    boxPrice: GIFT_BOX_STYLES[0].price,
    templateId: 'card_celebration',
    recipientName: '',
    senderName: '',
    message: '',
  });

  const FREE_SHIPPING_THRESHOLD = 2999;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const giftFee = giftData.enabled ? giftData.boxPrice : 0;
  const tax = (subtotal + giftFee) * 0.18;
  const shippingFee = subtotal > FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 250;
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal + giftFee + tax + shippingFee - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.toUpperCase().trim();
    if (code === 'LUXE10') {
      setDiscount(0.1);
      alert('10% Luxury Discount Applied!');
    } else if (code === 'PIYELLA20') {
      setDiscount(0.2);
      alert('20% VIP Discount Applied!');
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium">
                Shopping Curation
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-medium">
              Shopping Bag ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-red-400 transition-colors"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Cart Items & Gift Module (Left) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Free Shipping Progress */}
              <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 font-light">
                    {amountToFreeShipping > 0
                      ? `Add ${formatPrice(amountToFreeShipping)} more for Free Express Shipping`
                      : "🎉 You've unlocked Free Worldwide Express Shipping!"}
                  </span>
                  <span className="text-[#C9A96E] font-medium">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A96E] to-[#FFDF99] transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => {
                  const primaryImage = item.product.images.find((i) => i.isPrimary)?.url || item.product.images[0]?.url || '/images/placeholder.jpg';
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center"
                    >
                      <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                        <Image src={primaryImage} alt={item.product.name} fill className="object-cover" />
                      </div>

                      <div className="flex flex-col flex-1 w-full space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#C9A96E]">{item.product.category}</span>
                            <Link href={`/product/${item.product.slug}`}>
                              <h3 className="font-serif text-xl text-white font-medium hover:text-[#C9A96E] transition-colors">{item.product.name}</h3>
                            </Link>
                            {item.selectedVariant && (
                              <span className="text-xs text-white/50 block font-light">
                                Variant: {item.selectedVariant.name || item.selectedVariant.value}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-white/30 hover:text-red-400 transition-colors p-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-white/20 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-white/70 hover:text-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-white/70 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-serif text-lg font-medium text-white">
                            {formatPrice(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Gift Packaging & Card Module */}
              <GiftPackagingSelector value={giftData} onChange={setGiftData} />

            </div>

            {/* Order Summary & Checkout CTA (Right) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
                <h2 className="font-serif text-2xl text-white font-medium pb-4 border-b border-white/10">
                  Order Summary
                </h2>

                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (e.g. LUXE10)"
                    className="flex-1 bg-black/60 border border-white/20 px-4 py-3 text-xs text-white uppercase placeholder:text-white/40 focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Calculations */}
                <div className="space-y-3 text-sm text-white/70 font-light pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {giftData.enabled && (
                    <div className="flex justify-between text-[#C9A96E]">
                      <span>🎁 {giftData.boxStyleName}</span>
                      <span>+{formatPrice(giftData.boxPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (18% GST)</span>
                    <span className="text-white font-medium">{formatPrice(tax)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C9A96E]">
                      <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="text-white font-medium">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="font-serif text-xl text-white">Grand Total</span>
                  <span className="font-serif text-3xl font-medium text-[#C9A96E]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <Link
                  href={`/checkout?gift=${giftData.enabled ? 'true' : 'false'}&boxPrice=${giftData.enabled ? giftData.boxPrice : 0}&boxName=${encodeURIComponent(giftData.boxStyleName)}&rec=${encodeURIComponent(giftData.recipientName)}&snd=${encodeURIComponent(giftData.senderName)}&msg=${encodeURIComponent(giftData.message)}`}
                  className="w-full py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-[11px] text-white/40 font-light">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-white/5 text-[#C9A96E]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-white">Your shopping bag is empty</h2>
              <p className="text-white/50 text-sm font-light">
                Discover our fine curation of silks, leather goods, and timepieces to add your first piece.
              </p>
            </div>
            <Link
              href="/collections"
              className="inline-block px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
            >
              Explore Collections
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
