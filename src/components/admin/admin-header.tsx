'use client';

import React, { useState } from 'react';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import { 
  Bell, 
  LogOut, 
  ShoppingBag, 
  Palette, 
  Users, 
  ShieldAlert, 
  Check, 
  Trash2, 
  X, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'artwork' | 'user' | 'system';
  isRead: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'n1',
    title: 'New Custom Artwork Request',
    message: 'Lady Evelyn submitted a request for Bespoke Botanical Silk Tapestry.',
    time: '5 mins ago',
    type: 'artwork',
    isRead: false,
    link: '/admin/custom-artworks',
  },
  {
    id: 'n2',
    title: 'New Store Order Received',
    message: 'Order #PY-1048 placed by Marco Bernardi for ₹68,000.',
    time: '20 mins ago',
    type: 'order',
    isRead: false,
    link: '/admin/orders',
  },
  {
    id: 'n3',
    title: 'VIP Account Created',
    message: 'New VIP Connoisseur account registered: vip@piyella.com',
    time: '1 hour ago',
    type: 'user',
    isRead: true,
    link: '/admin/users',
  },
  {
    id: 'n4',
    title: 'Low Stock Alert',
    message: 'Gold Thread Silk Embroidery Clutch has only 2 units left in inventory.',
    time: '3 hours ago',
    type: 'system',
    isRead: true,
    link: '/admin/products',
  },
];

export function AdminHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const userName = user?.fullName || user?.firstName || 'Administrator';

  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <header className="h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-white/70 font-medium hidden sm:inline">
          Live Storefront Sync Active
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notifications Bell Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/70 hover:text-white transition-colors relative rounded-xl hover:bg-white/5"
            aria-label="Admin Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C9A96E] text-black text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#121212] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-white animate-fade-in">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-medium text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[9px] bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-full font-mono">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[#C9A96E] hover:underline text-[11px] font-medium"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-white/50 hover:text-white rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-white/40 text-xs font-light">
                    No notifications at this time.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => toggleRead(n.id)}
                      className={`p-4 transition-colors hover:bg-white/5 flex items-start gap-3 cursor-pointer ${
                        !n.isRead ? 'bg-white/[0.03]' : ''
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#C9A96E] shrink-0 mt-0.5">
                        {n.type === 'order' && <ShoppingBag className="w-4 h-4" />}
                        {n.type === 'artwork' && <Palette className="w-4 h-4" />}
                        {n.type === 'user' && <Users className="w-4 h-4" />}
                        {n.type === 'system' && <ShieldAlert className="w-4 h-4 text-amber-400" />}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-xs font-medium truncate ${!n.isRead ? 'text-white' : 'text-white/70'}`}>
                            {n.title}
                          </p>
                          <span className="text-[9px] text-white/40 font-mono shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-white/60 font-light line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>

                        {n.link && (
                          <Link
                            href={n.link}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[10px] text-[#C9A96E] hover:underline pt-1 font-mono"
                          >
                            <span>View Section</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={clearAllNotifications}
                    className="text-red-400 hover:underline text-[11px] flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                  <span className="text-[10px] text-white/40 font-mono">Store Realtime Engine</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile & Sign Out */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-serif text-white font-medium">{userName}</p>
            <p className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-mono">Super Admin</p>
          </div>

          <div className="p-1 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
            <UserButton />
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            title="Sign Out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
