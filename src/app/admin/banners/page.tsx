'use client';

import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ImageIcon, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminBannersPage() {
  const { banners, saveBanners, isLoaded } = useCatalogStore();
  const [announcementText, setAnnouncementText] = useState(banners.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(banners.announcementActive);
  const [heroHeadline, setHeroHeadline] = useState(banners.heroHeadline);
  const [heroSubtitle, setHeroSubtitle] = useState(banners.heroSubtitle);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveBanners({
      announcementText,
      announcementActive,
      heroHeadline,
      heroSubtitle,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Storefront Broadcasting
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Homepage Banner & Announcement Manager
        </h1>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">Storefront banners updated live! Changes are visible on the public website.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl space-y-8">
        
        {/* Top Marquee Announcement Bar */}
        <div className="space-y-4 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-white/70 font-medium">
              Top Announcement Bar Marquee
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50">Active Status</span>
              <button
                type="button"
                onClick={() => setAnnouncementActive(!announcementActive)}
                className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                  announcementActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {announcementActive ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="e.g. Free Shipping on Orders Above ₹2,999"
            className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
          />
        </div>

        {/* Hero Section Headlines */}
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest text-white/70 font-medium block">
            Homepage Hero Headline & Subtitle
          </label>

          <div>
            <input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              placeholder="e.g. Mastery of Bespoke Luxury"
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-serif focus:border-[#C9A96E] focus:outline-none rounded-xl mb-4"
            />
          </div>

          <div>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Hero paragraph text..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
