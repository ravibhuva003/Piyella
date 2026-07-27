'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Plus, Trash2, FolderTree, Upload, ImagePlus } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { collections, addCollection, deleteCollection, isLoaded } = useCatalogStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
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
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addCollection({
      name,
      title: name,
      slug,
      description: description || 'Handcrafted luxury collection.',
      image: image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      productCount: 0,
      isFeatured: true,
      sortOrder: collections.length + 1,
    });

    setName('');
    setDescription('');
    setImage('');
    alert('Category created! Instantly visible on public storefront.');
  };

  return (
    <div className="space-y-10 text-foreground">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Catalog Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Category & Collection Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <form onSubmit={handleCreate} className="bg-surface border border-border p-6 rounded-2xl space-y-6 h-fit shadow-xl">
          <h2 className="font-serif text-xl text-foreground font-medium">Create Category</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hand-Embroidered Purses"
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Editorial Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of this handcrafted category..."
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
            />
          </div>

          {/* Direct Image File Upload & URL Input */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-foreground-muted font-medium">
              Category Cover Photo
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
              className="w-full py-3 bg-background border border-dashed border-border hover:border-[#C9A96E] text-foreground text-xs uppercase font-semibold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#C9A96E]" />
              <span>Choose Image File From Computer</span>
            </button>

            {image && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#C9A96E]">
                <Image src={image} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-[10px] uppercase tracking-wider rounded-md font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="pt-1">
              <span className="text-[10px] text-foreground-muted block mb-1">Or paste image web link:</span>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-background border border-border px-4 py-2.5 text-xs text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Category</span>
          </button>
        </form>

        {/* Existing Categories */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">Active Collections ({collections.length})</h2>
          
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {collections.map((col) => (
                <div key={col.id} className="group relative h-48 rounded-xl overflow-hidden bg-surface border border-border p-6 flex flex-col justify-end shadow-md">
                  <Image src={col.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-semibold">Collection</span>
                    <h3 className="font-serif text-xl text-white font-medium">{col.name}</h3>
                    <p className="text-white/70 text-xs font-light line-clamp-1">{col.description}</p>
                  </div>

                  <button
                    onClick={() => deleteCollection(col.id)}
                    className="absolute top-4 right-4 z-20 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-border rounded-2xl text-center space-y-3 bg-surface">
              <FolderTree className="w-10 h-10 text-foreground-muted/40 mx-auto" />
              <p className="text-sm font-medium text-foreground">No Categories Found</p>
              <p className="text-xs text-foreground-muted font-light">Create categories using the form on the left to organize your handcrafted catalog.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
