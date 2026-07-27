'use client';

import React from 'react';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import { Bell, LogOut } from 'lucide-react';

export function AdminHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const userName = user?.fullName || user?.firstName || 'Administrator';

  const handleSignOut = async () => {
    // Clear custom admin session cookie & localStorage
    document.cookie = 'piyella_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    try {
      localStorage.removeItem('piyella_admin_session');
    } catch {}

    // Sign out of Clerk if active
    try {
      await signOut();
    } catch {}

    // Redirect to Admin Login page
    window.location.href = '/admin-login';
  };

  return (
    <header className="h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-white/70 font-medium">
          Live Storefront Sync Active
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button
          className="p-2 text-white/60 hover:text-white transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-serif text-white font-medium">{userName}</p>
            <p className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-mono">Super Admin</p>
          </div>

          <div className="p-1 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
            <UserButton />
          </div>

          {/* Admin Sign Out Button */}
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
