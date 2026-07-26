'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { CheckCircle2, Printer, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { formatPrice } from '@/lib/utils';

interface OrderSuccessPageProps {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{
    name?: string;
    email?: string;
    total?: string;
  }>;
}

export default function OrderSuccessPage({ params, searchParams }: OrderSuccessPageProps) {
  const { orderId } = use(params);
  const { name, email, total } = use(searchParams);

  const grandTotal = total ? Number(total) : 280000;

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-[#0a0a0a] border border-white/10 p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Top Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent animate-pulse" />

          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-semibold block mb-2">
              Order Confirmed & Sealed
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-medium mb-3">
              Thank You For Your Order
            </h1>
            <p className="text-white/70 font-light text-sm max-w-md mx-auto">
              We have received your order. A formal confirmation email has been dispatched to{' '}
              <span className="text-[#C9A96E] font-medium">{email || 'your registered email'}</span>.
            </p>
          </div>

          {/* Receipt Details Box */}
          <div className="bg-black/60 border border-white/10 p-6 rounded-2xl space-y-4 text-left text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-white/50 text-xs uppercase tracking-wider">Order Reference</span>
              <span className="font-mono text-[#C9A96E] font-bold text-base">#{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-xs uppercase tracking-wider">Client Name</span>
              <span className="text-white font-medium">{name || 'VIP Client'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-xs uppercase tracking-wider">Estimated Delivery</span>
              <span className="text-emerald-400 font-medium">2-3 Business Days (Express)</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="font-serif text-base text-white">Amount Paid</span>
              <span className="font-serif text-2xl text-[#C9A96E] font-medium">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={`/invoice/${orderId}?name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}&total=${grandTotal}`}
              target="_blank"
              className="px-6 py-3.5 border border-white/20 hover:border-[#C9A96E] text-white hover:text-[#C9A96E] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice</span>
            </Link>

            <Link
              href="/account/orders"
              className="px-8 py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Order Status</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-white/40 font-light">
            <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
            <span>Piyella Atelier &bull; Authenticity & Quality Guaranteed</span>
          </div>

        </div>
      </Container>
    </main>
  );
}
