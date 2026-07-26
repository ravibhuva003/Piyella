'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, Printer, RefreshCw, ChevronRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { useCatalogStore, AdminOrder } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { ReturnRequestModal } from '@/components/logistics/return-request-modal';

export default function CustomerOrdersPage() {
  const { orders, isLoaded } = useCatalogStore();
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
              Client Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-medium">
              Order History & Deliveries
            </h1>
          </div>

          <Link
            href="/account"
            className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            &larr; Back to Account Dashboard
          </Link>
        </div>

        {/* Orders Table / Cards */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o.id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="font-mono text-base font-bold text-[#C9A96E] block mb-1">Order #{o.id}</span>
                    <span className="text-xs text-white/40 font-light">Placed on {new Date(o.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                      o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20'
                    }`}>
                      {o.status}
                    </span>

                    <span className="font-serif text-xl text-white font-medium">
                      {formatPrice(o.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Details & Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-white/60 font-light space-y-1">
                    <p>Client: <span className="text-white font-medium">{o.customerName}</span> ({o.customerEmail})</p>
                    <p>Shiprocket AWB: <span className="font-mono text-[#C9A96E]">{o.trackingNumber || 'SHIP-881204'}</span></p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/tracking/${o.trackingNumber || 'SHIP-881204'}`}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>Track Shipment</span>
                    </Link>

                    <Link
                      href={`/invoice/${o.id}?name=${encodeURIComponent(o.customerName)}&email=${encodeURIComponent(o.customerEmail)}&total=${o.totalAmount}`}
                      target="_blank"
                      className="px-4 py-2 border border-white/20 hover:border-[#C9A96E] text-white/80 hover:text-[#C9A96E] text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </Link>

                    <button
                      onClick={() => setSelectedReturnOrder(o.id)}
                      className="px-4 py-2 border border-white/10 hover:border-amber-500/50 text-white/60 hover:text-amber-400 text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Return / Exchange</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 text-white/40">
            <p className="text-lg">No orders placed yet.</p>
          </div>
        )}

        {/* Return Request Modal */}
        {selectedReturnOrder && (
          <ReturnRequestModal
            orderId={selectedReturnOrder}
            isOpen={!!selectedReturnOrder}
            onClose={() => setSelectedReturnOrder(null)}
          />
        )}
      </Container>
    </main>
  );
}
