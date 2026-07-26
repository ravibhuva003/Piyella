'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Star, Link as LinkIcon, Plus } from 'lucide-react';
import { ProductImage } from '@/types/product';

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [altInput, setAltInput] = useState('');

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newImage: ProductImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      url: urlInput.trim(),
      alt: altInput.trim() || 'Luxury Product Photo',
      width: 1000,
      height: 1500,
      isPrimary: images.length === 0,
    };

    onChange([...images, newImage]);
    setUrlInput('');
    setAltInput('');
  };

  const handleSetPrimary = (id: string) => {
    const updated = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onChange(updated);
  };

  const handleRemoveImage = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
      filtered[0].isPrimary = true;
    }
    onChange(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest text-white/70 font-medium">
          Product Media Gallery ({images.length} Photos)
        </label>
        <span className="text-[10px] text-[#C9A96E] font-mono">Cloudinary & Unsplash URL Compatible</span>
      </div>

      {/* URL Input Form */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste Image URL (https://images.unsplash.com/... or Cloudinary URL)"
              className="w-full bg-black/60 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none rounded-lg font-mono"
            />
          </div>
          <input
            type="text"
            value={altInput}
            onChange={(e) => setAltInput(e.target.value)}
            placeholder="Alt description (optional)"
            className="w-48 bg-black/60 border border-white/10 px-3 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none rounded-lg hidden sm:block"
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="px-4 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Thumbnail Previews Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`group relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border-2 transition-all ${
                img.isPrimary ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/30' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" />

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      img.isPrimary ? 'bg-[#C9A96E] text-black' : 'bg-black/60 text-white/70 hover:text-white'
                    }`}
                    title={img.isPrimary ? 'Primary Photo' : 'Set as Primary'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.id)}
                    className="p-1.5 rounded-full bg-black/60 text-white/70 hover:text-red-400 transition-colors"
                    title="Remove Photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {img.isPrimary && (
                  <span className="text-[9px] uppercase tracking-widest bg-[#C9A96E] text-black font-bold px-2 py-0.5 rounded text-center">
                    Primary Cover
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-6 text-white/40">
          <Upload className="w-8 h-8 text-[#C9A96E] mb-3" />
          <p className="text-xs uppercase tracking-wider mb-1 font-medium text-white/70">No photos added yet</p>
          <p className="text-[11px] font-light">Paste a Cloudinary or high-res photo URL above to populate the product gallery.</p>
        </div>
      )}
    </div>
  );
}
