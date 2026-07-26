'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Bell, Sparkles, ShieldCheck } from 'lucide-react';

export function AdminHeader() {
  const { user } = useUser();
  const userName = user?.fullName || user?.firstName || 'Administrator';

  return (
    <header className="h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-white/60 font-light">
          Live Storefront Sync Active
        </span>
      </div>

      <div className="flex items-center gap-6">
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
          <div className="p-1 bg-white/5 border border-white/10 rounded-full">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
