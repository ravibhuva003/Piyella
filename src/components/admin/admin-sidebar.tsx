'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import {
  LayoutDashboard,
  Package,
  Sparkles,
  FolderTree,
  ShoppingBag,
  Tag,
  Image as ImageIcon,
  Users,
  Palette,
  Film,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_NAV_ITEMS = [
  { title: 'Overview Analytics', href: '/admin', icon: LayoutDashboard },
  { title: 'Products Catalog', href: '/admin/products', icon: Package },
  { title: 'Featured Sections', href: '/admin/sections', icon: Sparkles },
  { title: 'Categories & Collections', href: '/admin/categories', icon: FolderTree },
  { title: 'Product Reviews', href: '/admin/reviews', icon: Star },
  { title: 'Customer Orders', href: '/admin/orders', icon: ShoppingBag },
  { title: 'Custom Artworks', href: '/admin/custom-artworks', icon: Palette },
  { title: 'Instagram Reels', href: '/admin/reels', icon: Film },
  { title: 'Contact & Social Links', href: '/admin/contact', icon: PhoneCall },
  { title: 'Promotions & Coupons', href: '/admin/coupons', icon: Tag },
  { title: 'Homepage Banners', href: '/admin/banners', icon: ImageIcon },
  { title: 'User Management', href: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    document.cookie = 'piyella_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    try {
      localStorage.removeItem('piyella_admin_session');
    } catch {}

    try {
      await signOut();
    } catch {}

    window.location.href = '/admin-login';
  };

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Brand Header */}
        <div>
          <Link href="/" className="font-serif tracking-[0.3em] uppercase text-xl font-bold text-white block mb-1">
            PIYELLA
          </Link>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C9A96E] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Executive Portal</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#C9A96E] text-black shadow-lg shadow-[#C9A96E]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-colors"
        >
          <span>View Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 uppercase tracking-wider transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Admin</span>
        </button>

        <p className="text-[10px] text-white/30 text-center font-mono pt-1">
          Piyella Admin Executive v2.4
        </p>
      </div>
    </aside>
  );
}
