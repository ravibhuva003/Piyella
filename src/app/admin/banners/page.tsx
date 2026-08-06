'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ImageIcon, Save, Sparkles, CheckCircle2, Upload, Link as LinkIcon } from 'lucide-react';

export default function AdminBannersPage() {
  const { banners, saveBanners, isLoaded } = useCatalogStore();
  const [announcementText, setAnnouncementText] = useState(banners.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(banners.announcementActive);
  const [heroHeadline, setHeroHeadline] = useState(banners.heroHeadline);
  const [heroSubtitle, setHeroSubtitle] = useState(banners.heroSubtitle);
  const [heroBackgroundImage, setHeroBackgroundImage] = useState(
    banners.heroBackgroundImage || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setHeroBackgroundImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveBanners({
      announcementText,
      announcementActive,
      heroHeadline,
      heroSubtitle,
      heroBackgroundImage,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Storefront Broadcasting
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Homepage Banner & Hero Image Manager
        </h1>
        <p className="text-xs text-white/60 font-light mt-1">
          Update the main homepage hero background photo, marquee announcement bar, and headline text live across all devices.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">Homepage background and banners updated live across all devices!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl space-y-8">
        
        {/* Homepage Hero Main Background Photo Uploader */}
        <div className="space-y-4 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-[#C9A96E] font-semibold flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>1. Main Homepage Hero Background Photo *</span>
            </label>
            <span className="text-[11px] text-white/50 font-mono">Live Sync Across Devices</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image Live Preview */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/20 bg-black group">
              <Image
                src={heroBackgroundImage}
                alt="Homepage Hero Background Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-white/90 bg-black/60 px-3 py-1 rounded-md border border-white/10">
                  Live Preview
                </span>
              </div>
            </div>

            {/* Photo Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-2 font-medium">Upload Image File from Device</label>
                <label className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-3 rounded-xl cursor-pointer text-xs text-white uppercase tracking-wider transition-colors">
                  <Upload className="w-4 h-4 text-[#C9A96E]" />
                  <span>Choose Photo File...</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-2 font-medium flex items-center gap-1">
                  <LinkIcon className="w-3 h-3 text-[#C9A96E]" />
                  <span>Or Paste Image Web URL</span>
                </label>
                <input
                  type="text"
                  value={heroBackgroundImage}
                  onChange={(e) => setHeroBackgroundImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-xs text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Marquee Announcement Bar */}
        <div className="space-y-4 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-white/70 font-medium">
              2. Top Marquee Announcement Bar
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
            3. Homepage Hero Headline & Subtitle Text
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
