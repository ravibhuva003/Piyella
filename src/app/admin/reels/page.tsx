'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useReelsStore } from '@/lib/store/reels-store';
import { ReelCategory } from '@/lib/data/reels-data';
import { Film, Plus, Trash2, Pin, Eye, Check } from 'lucide-react';

export default function AdminReelsPage() {
  const { reels, addReel, togglePinReel, deleteReel, isLoaded } = useReelsStore();

  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [category, setCategory] = useState<ReelCategory>('Making Process');
  const [instagramUrl, setInstagramUrl] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !posterUrl) {
      alert('Please fill in title and poster thumbnail URL');
      return;
    }

    addReel({
      title,
      videoUrl: videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-a-canvas-with-a-brush-41584-large.mp4',
      posterUrl,
      category,
      instagramUrl: instagramUrl || 'https://instagram.com/piyella.official',
      isPinned: false,
    });

    setTitle('');
    setVideoUrl('');
    setPosterUrl('');
    alert('Instagram Reel published live to Atelier Cinema gallery!');
  };

  return (
    <div className="space-y-10 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Storefront Broadcasting
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Instagram Reels Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Reel Form */}
        <form onSubmit={handleAdd} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-6 h-fit">
          <h2 className="font-serif text-xl text-white">Add Instagram Reel</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Reel Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Gold Gilder in Milan"
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ReelCategory)}
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
            >
              <option value="Featured">Featured</option>
              <option value="Making Process">Making Process</option>
              <option value="Behind the Scenes">Behind the Scenes</option>
              <option value="Customer Unboxing">Customer Unboxing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Poster Thumbnail URL *</label>
            <input
              type="url"
              required
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Video File / MP4 URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://assets.mixkit.co/..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Instagram Post URL</label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/p/..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Reel</span>
          </button>
        </form>

        {/* Existing Reels Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl text-white mb-4">Active Gallery Reels ({reels.length})</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reels.map((r) => (
              <div key={r.id} className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl flex gap-4 items-center">
                <div className="relative w-16 h-24 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <Image src={r.posterUrl} alt={r.title} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-medium">{r.category}</span>
                  <h4 className="font-serif text-sm text-white font-medium truncate">{r.title}</h4>
                  <span className="text-[11px] text-white/40 font-mono block">{r.viewsCount} Views</span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => togglePinReel(r.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      r.isPinned ? 'bg-[#C9A96E] text-black border-[#C9A96E]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                    }`}
                    title={r.isPinned ? 'Pinned to Top' : 'Pin Reel'}
                  >
                    <Pin className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete reel ${r.title}?`)) deleteReel(r.id);
                    }}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
