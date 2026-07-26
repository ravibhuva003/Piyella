'use client';

import React, { useState } from 'react';
import { useCatalogStore, AdminOrder } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Gift, X, Heart } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, isLoaded } = useCatalogStore();
  const [activeGiftModal, setActiveGiftModal] = useState<AdminOrder['giftPackaging'] | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Fulfillment & Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Order Management Processor
        </h1>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Order Reference</th>
                <th className="px-6 py-4">Client Name & Email</th>
                <th className="px-6 py-4">Gift Options</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#C9A96E] font-medium">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{o.customerName}</div>
                    <div className="text-[11px] text-white/40 font-light">{o.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    {o.giftPackaging?.enabled ? (
                      <button
                        onClick={() => setActiveGiftModal(o.giftPackaging || null)}
                        className="px-3 py-1 bg-[#C9A96E]/20 hover:bg-[#C9A96E]/30 text-[#C9A96E] border border-[#C9A96E]/40 text-[10px] uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Gift Wrapped</span>
                      </button>
                    ) : (
                      <span className="text-xs text-white/30 font-light">Standard Box</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                      o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      o.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{formatPrice(o.totalAmount)}</td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as AdminOrder['status'])}
                      className="bg-black border border-white/20 text-xs text-white px-3 py-1.5 rounded-lg uppercase focus:border-[#C9A96E] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gift Details Modal */}
      {activeGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveGiftModal(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-[#C9A96E]">
              <Gift size={20} />
              <h3 className="font-serif text-2xl text-white font-medium">Gift Packaging Ticket</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] uppercase text-white/40 font-bold block">Selected Box Style</span>
                <span className="text-sm font-serif text-[#C9A96E] font-bold">{activeGiftModal.boxStyleName}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 font-bold block">Recipient Name</span>
                  <span className="text-white font-medium">{activeGiftModal.recipientName || 'N/A'}</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 font-bold block">Sender Signature</span>
                  <span className="text-white font-medium">{activeGiftModal.senderName || 'N/A'}</span>
                </div>
              </div>

              <div className="p-4 bg-black border border-white/10 rounded-xl space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold block">Card Message Payload</span>
                <p className="text-white/80 font-light italic text-xs leading-relaxed">
                  &ldquo;{activeGiftModal.message || 'No custom message specified.'}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
