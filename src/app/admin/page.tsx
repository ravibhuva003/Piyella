'use client';

import React from 'react';
import Link from 'next/link';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { DollarSign, ShoppingBag, Package, Users, ArrowUpRight, TrendingUp, Sparkles, Tag } from 'lucide-react';

export default function AdminOverviewPage() {
  const { products, orders, users, coupons, isLoaded } = useCatalogStore();

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Real-Time Intelligence
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
            Executive Analytics Overview
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Add New Product</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs uppercase tracking-widest">Gross Sales</span>
            <div className="p-2.5 rounded-xl bg-[#C9A96E]/10 text-[#C9A96E]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-white">{formatPrice(totalRevenue)}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8% growth this month</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs uppercase tracking-widest">Active Orders</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-white">{activeOrdersCount}</div>
          <div className="text-[11px] text-white/40 font-mono">{orders.length} total lifetime orders</div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs uppercase tracking-widest">Active Catalog</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-white">{products.length}</div>
          <div className="text-[11px] text-[#C9A96E] font-mono">Synced live to storefront</div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs uppercase tracking-widest">VIP Clients</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-white">{users.length}</div>
          <div className="text-[11px] text-emerald-400 font-mono">Clerk Auth Sessions</div>
        </div>
      </div>

      {/* Main Grid: Orders & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white">Recent Fulfillment Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#C9A96E] uppercase tracking-wider hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#C9A96E]">{o.id}</td>
                    <td className="px-4 py-3 text-xs">{o.customerName}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                        o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatPrice(o.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Promotions Overview */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-white">Active Coupons</h2>
            <Tag className="w-4 h-4 text-[#C9A96E]" />
          </div>

          <div className="space-y-4">
            {coupons.map((cp) => (
              <div key={cp.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-bold text-[#C9A96E] block mb-1">{cp.code}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">{cp.discountPercent}% Discount &bull; {cp.usedCount} Uses</span>
                </div>
                <span className={`w-2 h-2 rounded-full ${cp.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>
            ))}
          </div>

          <Link
            href="/admin/coupons"
            className="w-full block text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs uppercase tracking-widest text-white/80 transition-colors"
          >
            Manage Promotions
          </Link>
        </div>

      </div>
    </div>
  );
}
