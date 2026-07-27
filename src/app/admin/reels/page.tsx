'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useReelsStore } from '@/lib/store/reels-store';
import { ReelCategory } from '@/lib/data/reels-data';
import { Film, Plus, Trash2, Pin, Eye, Check, Upload } from 'lucide-react';

export default function AdminReelsPage() {
  const { reels, addReel, togglePinReel, deleteReel, isLoaded } = useReelsStore();

  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [category, setCategory] = useState<ReelCategory>('Making Process');
  const [instagramUrl, setInstagramUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-foreground">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPosterUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please fill in reel title');
      return;
    }

    const defaultPoster = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop';

    addReel({
      title,
      videoUrl: videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-a-canvas-with-a-brush-41584-large.mp4',
      posterUrl: posterUrl || defaultPoster,
      category,
      instagramUrl: instagramUrl || 'https://instagram.com/piyella.official',
      isPinned: false,
    });

    setTitle('');
    setVideoUrl('');
    setPosterUrl('');
    setInstagramUrl('');
    alert('Instagram Reel published live to Atelier Cinema gallery!');
  };

  return (
    <div className="space-y-10 text-foreground">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Storefront Broadcasting
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Instagram Reels Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Reel Form */}
        <form onSubmit={handleAdd} className="bg-surface border border-border p-6 rounded-2xl space-y-6 h-fit shadow-xl">
          <h2 className="font-serif text-xl text-foreground font-medium">Add Instagram Reel</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Reel Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Gold Gilder in Milan"
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ReelCategory)}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
            >
              <option value="Featured">Featured</option>
              <option value="Making Process">Making Process</option>
              <option value="Behind the Scenes">Behind the Scenes</option>
              <option value="Customer Unboxing">Customer Unboxing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">
              Poster Thumbnail (Optional)
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 bg-background border border-dashed border-border hover:border-[#C9A96E] text-foreground text-xs uppercase font-semibold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mb-2"
            >
              <Upload className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Upload Thumbnail File</span>
            </button>

            <input
              type="url"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="Or paste thumbnail URL (optional)"
              className="w-full bg-background border border-border px-4 py-2.5 text-xs text-foreground placeholder:text-foreground-muted focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Video File / MP4 URL (Optional)</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://assets.mixkit.co/..."
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Instagram Post URL (Optional)</label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/p/..."
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
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

        {/* Existing Reels List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">Active Gallery Reels ({reels.length})</h2>

          {reels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reels.map((r) => (
                <div key={r.id} className="bg-surface border border-border p-4 rounded-xl flex gap-4 items-center shadow-md">
                  <div className="relative w-16 h-24 rounded-lg overflow-hidden bg-background shrink-0 border border-border">
                    <Image src={r.posterUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop'} alt={r.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-semibold block">{r.category}</span>
                    <h3 className="font-serif text-sm font-medium text-foreground truncate">{r.title}</h3>
                    <p className="text-[10px] text-foreground-muted font-mono">{r.viewsCount} views</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePinReel(r.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        r.isPinned
                          ? 'bg-[#C9A96E] text-black border-[#C9A96E]'
                          : 'border-border text-foreground-muted hover:text-foreground'
                      }`}
                      title={r.isPinned ? 'Unpin Reel' : 'Pin Reel to Top'}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteReel(r.id)}
                      className="p-2 rounded-lg border border-border text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Reel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-border rounded-2xl text-center space-y-3 bg-surface">
              <Film className="w-10 h-10 text-foreground-muted/40 mx-auto" />
              <p className="text-sm font-medium text-foreground">No Video Reels Published</p>
              <p className="text-xs text-foreground-muted font-light">Add video URLs or Instagram posts using the form to populate your Atelier Cinema gallery.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
