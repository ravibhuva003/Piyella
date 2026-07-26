'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Plus, Trash2, FolderTree } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { collections, addCollection, deleteCollection, isLoaded } = useCatalogStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
    <div className="space-y-10 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Catalog Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Category & Collection Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <form onSubmit={handleCreate} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-6 h-fit">
          <h2 className="font-serif text-xl text-white">Create Category</h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diamond & Fine Jewelry"
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short editorial description..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Cover Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
            />
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
          <h2 className="font-serif text-xl text-white mb-4">Active Collections ({collections.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((col) => (
              <div key={col.id} className="group relative h-48 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-6 flex flex-col justify-end">
                <Image src={col.image || '/images/placeholder.jpg'} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1">{col.title || col.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#C9A96E]">{col.productCount} Products</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete collection ${col.name}?`)) deleteCollection(col.id);
                    }}
                    className="p-2 rounded-full bg-black/60 text-white/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
