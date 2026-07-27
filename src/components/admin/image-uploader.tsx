'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Star, Link as LinkIcon, Plus, ImagePlus } from 'lucide-react';
import { ProductImage } from '@/types/product';

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [altInput, setAltInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList | File[]) => {
    const newImages: ProductImage[] = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newImg: ProductImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            url: result,
            alt: file.name.replace(/\.[^/.]+$/, '') || 'Product Image',
            width: 1000,
            height: 1500,
            isPrimary: images.length === 0 && newImages.length === 0,
          };

          onChange([...images, ...newImages, newImg]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newImage: ProductImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
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
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest text-foreground/80 font-semibold">
          Product Media Gallery ({images.length} Photos)
        </label>
        <span className="text-[10px] text-[#C9A96E] font-mono">Direct File Upload & URL Supported</span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Direct File Upload Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 ${
          isDragging
            ? 'border-[#C9A96E] bg-[#C9A96E]/10 scale-[1.01]'
            : 'border-border hover:border-[#C9A96E] bg-surface hover:bg-surface-elevated'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[#C9A96E] shadow-md">
          <Upload className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            Click to upload photos directly from your computer
          </p>
          <p className="text-xs text-foreground-muted font-light">
            Supports PNG, JPG, WEBP, GIF, and SVG (Drag & drop multiple files supported)
          </p>
        </div>
        <button
          type="button"
          className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <ImagePlus className="w-4 h-4" />
          <span>Select Image Files</span>
        </button>
      </div>

      {/* Optional URL Input Dropdown / Secondary Option */}
      <div className="p-4 bg-surface border border-border rounded-xl space-y-3">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground-muted block">
          Or Add Photo via Image Web Link:
        </span>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste Image URL (https://images.unsplash.com/... or Cloudinary URL)"
              className="w-full bg-background border border-border pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-foreground-muted focus:border-[#C9A96E] focus:outline-none rounded-lg font-mono"
            />
          </div>
          <input
            type="text"
            value={altInput}
            onChange={(e) => setAltInput(e.target.value)}
            placeholder="Alt description (optional)"
            className="w-48 bg-background border border-border px-3 py-2.5 text-xs text-foreground placeholder:text-foreground-muted focus:border-[#C9A96E] focus:outline-none rounded-lg hidden sm:block"
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="px-4 py-2.5 border border-border hover:border-[#C9A96E] text-foreground font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      {/* Thumbnail Previews Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`group relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border-2 transition-all ${
                img.isPrimary ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/30' : 'border-border hover:border-foreground/40'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || 'Product Image'}
                fill
                className="object-cover"
              />

              {/* Badges */}
              {img.isPrimary && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-[#C9A96E] text-black rounded-full shadow-md">
                    Cover Photo
                  </span>
                </div>
              )}

              {/* Action Overlays */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 z-20">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="self-end p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    className="w-full py-1.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black text-[10px] uppercase font-bold tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Star className="w-3 h-3 fill-black" />
                    <span>Set Cover</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border border-dashed border-border rounded-xl text-center text-foreground-muted text-xs font-light">
          No photos uploaded yet. Click above to select image files directly from your device.
        </div>
      )}
    </div>
  );
}
