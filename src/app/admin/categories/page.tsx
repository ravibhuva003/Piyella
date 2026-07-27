'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Collection } from '@/types/collection';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Plus, Trash2, FolderTree, Upload, Edit3, X, Check, Sparkles, Flame, Tag, CheckCircle2, Circle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { collections, addCollection, deleteCollection, saveCollections, products, updateProduct, isLoaded } = useCatalogStore();
  
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<'taxonomy' | 'sections'>('sections');
  
  // Featured Section Tab State ('new-arrivals' | 'best-sellers' | 'sale')
  const [featuredSection, setFeaturedSection] = useState<'new-arrivals' | 'best-sellers' | 'sale'>('new-arrivals');
  
  // Category Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingCategory, setEditingCategory] = useState<Collection | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          if (isEdit && editingCategory) {
            setEditingCategory({ ...editingCategory, image: result });
          } else {
            setImage(result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
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

  const handleSaveCategoryEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const updated = collections.map((c) => (c.id === editingCategory.id ? editingCategory : c));
    saveCollections(updated);
    setEditingCategory(null);
    alert(`Category "${editingCategory.name}" updated successfully!`);
  };

  // Toggle product membership in featured sections
  const handleToggleProductSection = (product: Product, section: 'new-arrivals' | 'best-sellers' | 'sale') => {
    let update: Partial<Product> = {};

    if (section === 'new-arrivals') {
      const current = product.isNew || (product as any).isNewArrival;
      update = { isNew: !current };
    } else if (section === 'best-sellers') {
      const current = (product as any).isBestSeller ?? false;
      update = { isBestSeller: !current } as any;
    } else if (section === 'sale') {
      const current = (product as any).isSale ?? false;
      update = { isSale: !current } as any;
    }

    updateProduct(product.id, update);
  };

  // Get active items per section
  const newArrivalsList = products.filter((p) => p.isNew || (p as any).isNewArrival);
  const bestSellersList = products.filter((p) => (p as any).isBestSeller);
  const saleList = products.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price));

  return (
    <div className="space-y-8 text-foreground">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Storefront Curation Manager
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
            Categories & Featured Sections
          </h1>
        </div>

        {/* Top View Toggle */}
        <div className="flex bg-surface border border-border p-1 rounded-xl shadow-md">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'sections' ? 'bg-[#C9A96E] text-black shadow-md' : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Featured Sections</span>
          </button>
          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'taxonomy' ? 'bg-[#C9A96E] text-black shadow-md' : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Collections ({collections.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Featured Sections Manager */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* Section Selection Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setFeaturedSection('new-arrivals')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                featuredSection === 'new-arrivals'
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-xl shadow-emerald-950/20'
                  : 'bg-surface border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">1. New Arrivals</span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded-full">
                  {newArrivalsList.length} Active
                </span>
              </div>
              <p className="text-xs text-foreground-muted font-light">
                Products featured under /collections/new-arrivals
              </p>
            </button>

            <button
              onClick={() => setFeaturedSection('best-sellers')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                featuredSection === 'best-sellers'
                  ? 'bg-purple-500/10 border-purple-500/50 shadow-xl shadow-purple-950/20'
                  : 'bg-surface border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-purple-400">2. Best Sellers</span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-purple-500/20 text-purple-300 rounded-full">
                  {bestSellersList.length} Active
                </span>
              </div>
              <p className="text-xs text-foreground-muted font-light">
                Top performing pieces under /collections/best-sellers
              </p>
            </button>

            <button
              onClick={() => setFeaturedSection('sale')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                featuredSection === 'sale'
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-xl shadow-amber-950/20'
                  : 'bg-surface border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400">3. Special Sale</span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-amber-500/20 text-amber-300 rounded-full">
                  {saleList.length} Active
                </span>
              </div>
              <p className="text-xs text-foreground-muted font-light">
                Discounted creations under /collections/sale
              </p>
            </button>
          </div>

          {/* Section Product List Manager */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h2 className="font-serif text-2xl text-foreground font-medium capitalize">
                  Manage {featuredSection.replace('-', ' ')} Catalog Placements
                </h2>
                <p className="text-xs text-foreground-muted font-light">
                  Click the toggle on any product to instantly add or remove it from this storefront section.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => {
                const isSelected =
                  featuredSection === 'new-arrivals' ? Boolean(prod.isNew || (prod as any).isNewArrival) :
                  featuredSection === 'best-sellers' ? Boolean((prod as any).isBestSeller) :
                  Boolean((prod as any).isSale || (prod.compareAtPrice && prod.compareAtPrice > prod.price));

                const img = prod.images?.find((i) => i.isPrimary)?.url || prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop';

                return (
                  <div
                    key={prod.id}
                    onClick={() => handleToggleProductSection(prod, featuredSection)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                      isSelected
                        ? featuredSection === 'new-arrivals' ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md' :
                          featuredSection === 'best-sellers' ? 'bg-purple-500/10 border-purple-500/40 shadow-md' :
                          'bg-amber-500/10 border-amber-500/40 shadow-md'
                        : 'bg-background/60 border-border hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-background shrink-0 border border-border">
                        <Image src={img} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-medium text-foreground truncate">{prod.name}</h4>
                        <span className="text-[11px] text-foreground-muted font-mono">{formatPrice(prod.price, prod.currency)}</span>
                        <span className="text-[10px] text-[#C9A96E] block font-mono">Collection: {prod.collectionId || 'default'}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div className={`p-2 rounded-full font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider ${
                          featuredSection === 'new-arrivals' ? 'bg-emerald-500 text-black' :
                          featuredSection === 'best-sellers' ? 'bg-purple-500 text-white' :
                          'bg-amber-500 text-black'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Active</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded-full text-foreground-muted hover:text-foreground flex items-center gap-1 text-[11px] uppercase tracking-wider border border-border">
                          <Circle className="w-4 h-4" />
                          <span className="hidden sm:inline">Off</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Collections Taxonomy */}
      {activeTab === 'taxonomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <form onSubmit={handleCreateCategory} className="bg-surface border border-border p-6 rounded-2xl space-y-6 h-fit shadow-xl">
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

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest text-foreground-muted font-medium">
                Category Cover Photo
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, false)}
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

                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingCategory(col)}
                        className="p-2 bg-[#C9A96E] text-black rounded-full hover:bg-[#D4B87C] shadow-lg"
                        title="Edit Category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCollection(col.id)}
                        className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 shadow-lg"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setEditingCategory(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Category</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Category Details</h2>
            </div>

            <form onSubmit={handleSaveCategoryEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-foreground-muted font-medium">Cover Photo</label>
                
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => editFileInputRef.current?.click()}
                  className="w-full py-2.5 bg-background border border-dashed border-border hover:border-[#C9A96E] text-foreground text-xs uppercase font-semibold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mb-2"
                >
                  <Upload className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Choose New Image File</span>
                </button>

                <input
                  type="url"
                  value={editingCategory.image || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-background border border-border px-4 py-2.5 text-xs text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
