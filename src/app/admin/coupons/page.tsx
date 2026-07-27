'use client';

import React, { useState } from 'react';
import { useCatalogStore, Coupon } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, Edit3, X, Check } from 'lucide-react';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon, saveCoupons, isLoaded } = useCatalogStore();
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minSpend, setMinSpend] = useState(15000);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

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

  const handleSaveCouponEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;

    const updated = coupons.map((c) => (c.id === editingCoupon.id ? editingCoupon : c));
    saveCoupons(updated);
    setEditingCoupon(null);
    alert(`Coupon ${editingCoupon.code} updated successfully!`);
  };

  return (
    <div className="space-y-10 text-foreground">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Promotional Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Coupon & Discount Manager ({coupons.length} Active)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Coupon Form */}
        <form onSubmit={handleCreateCoupon} className="bg-surface border border-border p-6 rounded-2xl space-y-6 h-fit shadow-xl">
          <h2 className="font-serif text-xl text-foreground font-medium">Create Promo Code</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Coupon Code *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. AUTUMN25"
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground font-mono uppercase focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Discount %</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Min Spend (₹)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </form>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4 font-medium">Active Coupons</h2>

          {coupons.length > 0 ? (
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background text-[10px] uppercase tracking-widest text-foreground-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Discount</th>
                      <th className="px-6 py-4">Min Spend</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-[#C9A96E] text-base">{c.code}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{c.discountPercent}% OFF</td>
                        <td className="px-6 py-4 text-xs font-mono text-foreground-muted">{formatPrice(c.minSpend)}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleCoupon(c.id)}
                            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full inline-flex items-center gap-1 transition-colors ${
                              c.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {c.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{c.isActive ? 'Active' : 'Disabled'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingCoupon(c)}
                              className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => deleteCoupon(c.id)}
                              className="p-2 text-foreground-muted hover:text-red-500 transition-colors"
                              title="Delete Coupon"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 border border-dashed border-border rounded-2xl text-center space-y-3 bg-surface">
              <Tag className="w-10 h-10 text-foreground-muted/40 mx-auto" />
              <p className="text-sm font-medium text-foreground">No Active Coupons</p>
              <p className="text-xs text-foreground-muted font-light">Create promotional codes using the form on the left to offer checkout discounts.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Coupon Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setEditingCoupon(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Promo Code</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Discount Terms</h2>
            </div>

            <form onSubmit={handleSaveCouponEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase().trim() })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground font-mono uppercase focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Discount Percent (%)</label>
                  <input
                    type="number"
                    required
                    value={editingCoupon.discountPercent}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discountPercent: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Min Spend (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingCoupon.minSpend}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, minSpend: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Expiry Date</label>
                <input
                  type="date"
                  required
                  value={editingCoupon.expiryDate}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCoupon(null)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Coupon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
