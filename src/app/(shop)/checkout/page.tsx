'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, Truck, Check, ChevronRight, ArrowLeft, Gift } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { openRazorpayCheckout } from '@/lib/razorpay/client';
import { calculateShipping, checkPincodeServiceability } from '@/lib/shiprocket/shipping-calculator';
import { useCatalogStore } from '@/lib/store/catalog-store';

interface CheckoutPageProps {
  searchParams?: Promise<{
    gift?: string;
    boxPrice?: string;
    boxName?: string;
    rec?: string;
    snd?: string;
    msg?: string;
  }>;
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const router = useRouter();
  const params = searchParams ? use(searchParams) : {};
  const { items, clearCart, subtotal } = useCart();
  const { saveOrders, orders } = useCatalogStore();

  const isGiftEnabled = params.gift === 'true';
  const giftBoxPrice = params.boxPrice ? Number(params.boxPrice) : 0;
  const giftBoxName = params.boxName ? decodeURIComponent(params.boxName) : 'Royal Gold Velvet Box';
  const recipientName = params.rec ? decodeURIComponent(params.rec) : '';
  const senderName = params.snd ? decodeURIComponent(params.snd) : '';
  const giftMessage = params.msg ? decodeURIComponent(params.msg) : '';

  // Checkout Steps State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Address State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Shipping & Payment Options
  const [selectedShipping, setSelectedShipping] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  const shippingOptions = calculateShipping(subtotal, pincode || '110001');
  const selectedShippingOption = shippingOptions[selectedShipping] || shippingOptions[0];

  const giftFee = isGiftEnabled ? giftBoxPrice : 0;
  const tax = (subtotal + giftFee) * 0.18;
  const shippingFee = selectedShippingOption ? selectedShippingOption.rate : 0;
  const grandTotal = subtotal + giftFee + tax + shippingFee;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !email || !phone || !street || !city || !pincode) {
        alert('Please complete all shipping address fields.');
        return;
      }
      if (!checkPincodeServiceability(pincode)) {
        alert('Please enter a valid 6-digit pincode.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    if (paymentMethod === 'razorpay') {
      try {
        await openRazorpayCheckout({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockkey12345',
          amount: grandTotal * 100,
          currency: 'INR',
          name: 'Piyella Luxury',
          description: `Order #${orderId}`,
          handler: () => {
            finalizeOrder(orderId);
          },
          prefill: {
            name: fullName,
            email,
            contact: phone,
          },
          theme: {
            color: '#C9A96E',
          },
        });
      } catch (err) {
        console.error('Razorpay Error:', err);
        finalizeOrder(orderId);
      }
    } else {
      setTimeout(() => {
        finalizeOrder(orderId);
      }, 800);
    }
  };

  const finalizeOrder = (orderId: string) => {
    const newOrder = {
      id: orderId,
      customerName: fullName,
      customerEmail: email,
      itemsCount: items.length,
      totalAmount: grandTotal,
      status: 'Processing' as const,
      trackingNumber: `SHIP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      giftPackaging: isGiftEnabled
        ? {
            enabled: true,
            boxStyleName: giftBoxName,
            recipientName,
            senderName,
            message: giftMessage,
            boxPrice: giftBoxPrice,
          }
        : undefined,
    };

    saveOrders([newOrder, ...orders]);
    clearCart();
    setLoading(false);
    router.push(`/checkout/success/${orderId}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&total=${grandTotal}`);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-serif text-2xl">Your shopping bag is empty.</p>
          <Link href="/collections" className="inline-block px-6 py-3 bg-[#C9A96E] text-black font-semibold text-xs uppercase tracking-widest rounded-xl">
            Return to Storefront
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-12">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#C9A96E] font-medium">
            <Lock className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Checkout Steps (Left) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between bg-[#0a0a0a] border border-white/10 p-4 rounded-xl text-xs uppercase tracking-widest">
              <span className={step >= 1 ? 'text-[#C9A96E] font-bold' : 'text-white/40'}>1. Shipping</span>
              <ChevronRight className="w-4 h-4 text-white/20" />
              <span className={step >= 2 ? 'text-[#C9A96E] font-bold' : 'text-white/40'}>2. Delivery</span>
              <ChevronRight className="w-4 h-4 text-white/20" />
              <span className={step >= 3 ? 'text-[#C9A96E] font-bold' : 'text-white/40'}>3. Payment</span>
            </div>

            {/* STEP 1: Address Form */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
                <h2 className="font-serif text-2xl text-white">Shipping Address</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lord Henry Cavendish"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@piyella.com"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Postal Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="110001"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Suite / Apartment / Street Name"
                    className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai / Delhi"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
                >
                  Continue to Delivery Method
                </button>
              </form>
            )}

            {/* STEP 2: Shipping Options */}
            {step === 2 && (
              <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
                <h2 className="font-serif text-2xl text-white">Select Shipping Courier</h2>

                <div className="space-y-4">
                  {shippingOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedShipping(idx)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        selectedShipping === idx ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Truck className="w-6 h-6 text-[#C9A96E]" />
                        <div>
                          <h4 className="font-serif text-lg text-white font-medium">{opt.courierName}</h4>
                          <p className="text-xs text-white/60 font-light">Estimated Delivery: {opt.estimatedDays}</p>
                        </div>
                      </div>
                      <span className="font-serif text-lg text-[#C9A96E] font-medium">
                        {opt.rate === 0 ? 'FREE' : formatPrice(opt.rate)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
                  >
                    Continue to Payment Options
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Options */}
            {step === 3 && (
              <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
                <h2 className="font-serif text-2xl text-white">Payment Method</h2>

                <div className="space-y-4">
                  <div
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'razorpay' ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-[#C9A96E]" />
                      <div>
                        <h4 className="font-serif text-lg text-white font-medium">Razorpay Online Payment</h4>
                        <p className="text-xs text-white/60 font-light">Cards, UPI, NetBanking, CRED, & Wallets</p>
                      </div>
                    </div>
                    {paymentMethod === 'razorpay' && <Check className="w-5 h-5 text-[#C9A96E]" />}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'cod' ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Truck className="w-6 h-6 text-[#C9A96E]" />
                      <div>
                        <h4 className="font-serif text-lg text-white font-medium">Cash on Delivery (COD)</h4>
                        <p className="text-xs text-white/60 font-light">Pay via cash or UPI upon delivery</p>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <Check className="w-5 h-5 text-[#C9A96E]" />}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-4 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <span>Complete Order ({formatPrice(grandTotal)})</span>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Items & Gift Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-white pb-4 border-b border-white/10">
                Summary ({items.length} Items)
              </h3>

              {isGiftEnabled && (
                <div className="p-4 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C9A96E]">
                    <Gift className="w-4 h-4" />
                    <span>Gift Packaging: {giftBoxName}</span>
                  </div>
                  {recipientName && <p className="text-[11px] text-white/70">Recipient: {recipientName}</p>}
                </div>
              )}

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => {
                  const img = item.product.images.find(i => i.isPrimary)?.url || item.product.images[0]?.url || '/images/placeholder.jpg';
                  return (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                        <Image src={img} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm text-white truncate">{item.product.name}</h4>
                        <span className="text-xs text-white/50 block font-light">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-sm font-serif font-medium text-white">{formatPrice(item.totalPrice)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 text-xs text-white/70 font-light pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                {isGiftEnabled && (
                  <div className="flex justify-between text-[#C9A96E]">
                    <span>🎁 Gift Packaging</span>
                    <span>+{formatPrice(giftBoxPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-serif text-lg text-white">Grand Total</span>
                <span className="font-serif text-2xl text-[#C9A96E] font-medium">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}
