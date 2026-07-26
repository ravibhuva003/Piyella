'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, UserButton, UserProfile } from '@clerk/nextjs';
import { Package, MapPin, Heart, ShoppingBag, ShieldCheck, ChevronRight, User as UserIcon, X, Settings } from 'lucide-react';

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [showProfileModal, setShowProfileModal] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const role = (user?.publicMetadata?.role as string) || 'vip';
  const fullName = user?.fullName || `${user?.firstName || 'Valued'} ${user?.lastName || 'Client'}`;
  const primaryEmail = user?.emailAddresses[0]?.emailAddress || 'client@piyella.com';
  const avatarUrl = user?.imageUrl;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-white">
      
      {/* Header with User Info & Clerk UserButton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-12">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A96E]/50 bg-white/5">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={fullName} fill className="object-cover" />
            ) : (
              <UserIcon className="w-8 h-8 text-[#C9A96E] absolute inset-0 m-auto" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium">{fullName}</h1>
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/30 font-semibold">
                {role === 'admin' ? 'Administrator' : 'VIP Connoisseur'}
              </span>
            </div>
            <p className="text-sm text-white/50 font-light mt-0.5">{primaryEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors"
          >
            <Settings size={14} className="text-[#C9A96E]" />
            <span>Manage Security</span>
          </button>
          
          <div className="p-1 bg-white/5 border border-white/10 rounded-full">
            <UserButton />
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/account/orders" className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:border-[#C9A96E] transition-all group">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#C9A96E] group-hover:scale-110 transition-transform">
            <Package size={20} />
          </div>
          <div>
            <div className="text-2xl font-serif text-white">4</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Total Orders</div>
          </div>
        </Link>

        <Link href="/account/orders" className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:border-[#C9A96E] transition-all group">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#C9A96E] group-hover:scale-110 transition-transform">
            <ShoppingBag size={20} />
          </div>
          <div>
            <div className="text-2xl font-serif text-white">1</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">In Transit</div>
          </div>
        </Link>

        <Link href="/account/addresses" className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:border-[#C9A96E] transition-all group">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#C9A96E] group-hover:scale-110 transition-transform">
            <MapPin size={20} />
          </div>
          <div>
            <div className="text-2xl font-serif text-white">2</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Saved Addresses</div>
          </div>
        </Link>

        <Link href="/wishlist" className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:border-[#C9A96E] transition-all group">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-[#C9A96E] group-hover:scale-110 transition-transform">
            <Heart size={20} />
          </div>
          <div>
            <div className="text-2xl font-serif text-white">5</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Wishlist Items</div>
          </div>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-white">Recent Purchases</h2>
            <Link href="/account/orders" className="text-xs text-[#C9A96E] uppercase tracking-wider hover:underline flex items-center">
              View All <ChevronRight size={14} className="ml-0.5" />
            </Link>
          </div>
          
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">#PYL-2026-8472</td>
                  <td className="px-6 py-4 text-xs font-light">Jul 20, 2026</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      In Transit
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">₹2,80,000</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">#PYL-2026-3910</td>
                  <td className="px-6 py-4 text-xs font-light">Jun 14, 2026</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">₹1,85,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-white">Client Summary</h2>
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl space-y-4">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Full Name</div>
              <div className="text-white font-medium">{fullName}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Primary Email</div>
              <div className="text-white/80 font-light">{primaryEmail}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Authentication Method</div>
              <div className="text-white/80 font-light flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#C9A96E]" />
                <span>Clerk Session Secured</span>
              </div>
            </div>
            {role === 'admin' && (
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/admin"
                  className="w-full block text-center py-3 bg-[#C9A96E] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#D4B87C] transition-colors"
                >
                  Enter Admin Console
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Clerk User Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="mt-4 flex justify-center">
              <UserProfile routing="hash" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
