'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Star, Link as LinkIcon, Plus } from 'lucide-react';

interface ReferenceUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ReferenceUploader({ images, onChange }: ReferenceUploaderProps) {
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest text-white/70 font-medium">
          Reference Images ({images.length} Added)
        </label>
        <span className="text-[10px] text-[#C9A96E] font-mono">Cloudinary & High-Res URL Compatible</span>
      </div>

      {/* URL Input Form */}
      <div className="flex gap-2 p-3 bg-[#0a0a0a] border border-white/10 rounded-xl">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste reference image URL (Unsplash or Cloudinary)..."
            className="w-full bg-black/60 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none rounded-lg font-mono"
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-4 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Image Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((url, idx) => (
            <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <Image src={url} alt={`Reference ${idx + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex justify-between items-start">
                <span className="text-[9px] uppercase tracking-widest bg-[#C9A96E] text-black px-1.5 py-0.5 rounded font-bold">
                  {idx === 0 ? 'Primary Reference' : `Ref #${idx + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 rounded-full bg-black/60 text-white/70 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-6 text-white/40">
          <Upload className="w-8 h-8 text-[#C9A96E] mb-2" />
          <p className="text-xs uppercase tracking-wider mb-1 font-medium text-white/70">No reference images uploaded</p>
          <p className="text-[11px] font-light">Add inspiration photos, sketches, or color palettes to guide our master artisans.</p>
        </div>
      )}
    </div>
  );
}
