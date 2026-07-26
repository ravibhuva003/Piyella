'use client';

import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Tag, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon, isLoaded } = useCatalogStore();
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minSpend, setMinSpend] = useState(15000);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    addCoupon({
      code: code.toUpperCase().trim(),
      discountPercent,
      minSpend,
      expiryDate,
      isActive: true,
    });

    setCode('');
    alert(`Coupon ${code.toUpperCase()} created! Active on checkout drawer.`);
  };

  return (
    <div className="space-y-10 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Promotional Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Coupon & Discount Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Coupon Form */}
        <form onSubmit={handleCreateCoupon} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-6 h-fit">
          <h2 className="font-serif text-xl text-white">Create Promo Code</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Coupon Code *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. AUTUMN25"
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono uppercase focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Discount %</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Min Spend (₹)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Coupon</span>
          </button>
        </form>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden p-6 space-y-4">
          <h2 className="font-serif text-xl text-white mb-4">Active Promotions ({coupons.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Min Spend</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {coupons.map((cp) => (
                  <tr key={cp.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm font-bold text-[#C9A96E]">{cp.code}</td>
                    <td className="px-4 py-3 font-medium text-white">{cp.discountPercent}% OFF</td>
                    <td className="px-4 py-3 text-xs font-mono">{formatPrice(cp.minSpend)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleCoupon(cp.id)}
                        className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border transition-colors ${
                          cp.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                      >
                        {cp.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteCoupon(cp.id)}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
