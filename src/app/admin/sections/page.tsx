'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import {
  Sparkles,
  Flame,
  Tag,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  X,
  Check,
  Search,
  Layers,
  Filter
} from 'lucide-react';

export default function AdminFeaturedSectionsPage() {
  const { products, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  
  // Section tab state: 'new-arrivals' | 'best-sellers' | 'sale'
  const [activeSection, setActiveSection] = useState<'new-arrivals' | 'best-sellers' | 'sale'>('new-arrivals');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Toggle product membership in featured sections
  const handleToggleSection = (product: Product, section: 'new-arrivals' | 'best-sellers' | 'sale', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let update: Partial<Product> = {};

    if (section === 'new-arrivals') {
      const current = Boolean(product.isNew || (product as any).isNewArrival);
      update = { isNew: !current };
    } else if (section === 'best-sellers') {
      const current = Boolean((product as any).isBestSeller);
      update = { isBestSeller: !current } as any;
    } else if (section === 'sale') {
      const current = Boolean((product as any).isSale || (product.compareAtPrice && product.compareAtPrice > product.price));
      update = { isSale: !current } as any;
    }

    updateProduct(product.id, update);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      compareAtPrice: editingProduct.compareAtPrice ? Number(editingProduct.compareAtPrice) : undefined,
      category: editingProduct.category,
      collectionId: editingProduct.collectionId,
      inventory: Number(editingProduct.inventory),
      isNew: editingProduct.isNew,
      isBestSeller: (editingProduct as any).isBestSeller,
      isSale: (editingProduct as any).isSale,
    } as any);

    setEditingProduct(null);
    alert(`Product "${editingProduct.name}" updated successfully!`);
  };

  // Section Counts
  const newArrivalsList = products.filter((p) => p.isNew || (p as any).isNewArrival);
  const bestSellersList = products.filter((p) => (p as any).isBestSeller);
  const saleList = products.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price));

  // Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.collectionId && p.collectionId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 text-foreground">
      {/* Page Header */}
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Storefront Merchandising
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Featured Sections Management
        </h1>
        <p className="text-xs text-foreground-muted font-light mt-1">
          Manage items displayed under New Arrivals, Best Sellers, and Special Sale collections on the public storefront.
        </p>
      </div>

      {/* 3 Section Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. New Arrivals */}
        <button
          onClick={() => setActiveSection('new-arrivals')}
          className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden ${
            activeSection === 'new-arrivals'
              ? 'bg-emerald-500/10 border-emerald-500/50 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/30'
              : 'bg-surface border-border hover:border-border/80'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="text-sm uppercase tracking-widest font-bold text-emerald-400">1. New Arrivals</span>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              {newArrivalsList.length} Active
            </span>
          </div>
          <p className="text-xs text-foreground-muted font-light leading-relaxed">
            Items highlighted under <span className="font-mono text-emerald-400">/collections/new-arrivals</span>
          </p>
        </button>

        {/* 2. Best Sellers */}
        <button
          onClick={() => setActiveSection('best-sellers')}
          className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden ${
            activeSection === 'best-sellers'
              ? 'bg-purple-500/10 border-purple-500/50 shadow-xl shadow-purple-950/20 ring-1 ring-purple-500/30'
              : 'bg-surface border-border hover:border-border/80'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400" />
              <span className="text-sm uppercase tracking-widest font-bold text-purple-400">2. Best Sellers</span>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              {bestSellersList.length} Active
            </span>
          </div>
          <p className="text-xs text-foreground-muted font-light leading-relaxed">
            Top performing creations under <span className="font-mono text-purple-400">/collections/best-sellers</span>
          </p>
        </button>

        {/* 3. Special Sale */}
        <button
          onClick={() => setActiveSection('sale')}
          className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden ${
            activeSection === 'sale'
              ? 'bg-amber-500/10 border-amber-500/50 shadow-xl shadow-amber-950/20 ring-1 ring-amber-500/30'
              : 'bg-surface border-border hover:border-border/80'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400" />
              <span className="text-sm uppercase tracking-widest font-bold text-amber-400">3. Special Sale</span>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
              {saleList.length} Active
            </span>
          </div>
          <p className="text-xs text-foreground-muted font-light leading-relaxed">
            Discounted artworks under <span className="font-mono text-amber-400">/collections/sale</span>
          </p>
        </button>
      </div>

      {/* Main Section Catalog Box */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h2 className="font-serif text-2xl text-foreground font-medium capitalize flex items-center gap-2">
              <span>Manage {activeSection.replace('-', ' ')} Catalog</span>
            </h2>
            <p className="text-xs text-foreground-muted font-light">
              Toggle the Active button on any item to instantly add or remove it from this section.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product title..."
              className="w-full bg-background border border-border pl-10 pr-4 py-2.5 text-xs text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((prod) => {
            const isSelected =
              activeSection === 'new-arrivals' ? Boolean(prod.isNew || (prod as any).isNewArrival) :
              activeSection === 'best-sellers' ? Boolean((prod as any).isBestSeller) :
              Boolean((prod as any).isSale || (prod.compareAtPrice && prod.compareAtPrice > prod.price));

            const img = prod.images?.find((i) => i.isPrimary)?.url || prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop';

            return (
              <div
                key={prod.id}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                  isSelected
                    ? activeSection === 'new-arrivals' ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md' :
                      activeSection === 'best-sellers' ? 'bg-purple-500/10 border-purple-500/40 shadow-md' :
                      'bg-amber-500/10 border-amber-500/40 shadow-md'
                    : 'bg-background/60 border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-border">
                      <Image src={img} alt={prod.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-medium text-foreground truncate">{prod.name}</h4>
                      <span className="text-[11px] text-foreground-muted font-mono">{formatPrice(prod.price, prod.currency)}</span>
                      <span className="text-[10px] text-[#C9A96E] block font-mono">Collection: {prod.collectionId || 'default'}</span>
                    </div>
                  </div>

                  {/* Section Activation Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleSection(prod, activeSection, e)}
                    title="Toggle Section Placement"
                    className="shrink-0"
                  >
                    {isSelected ? (
                      <div className={`px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 text-[10px] uppercase tracking-wider ${
                        activeSection === 'new-arrivals' ? 'bg-emerald-500 text-black' :
                        activeSection === 'best-sellers' ? 'bg-purple-500 text-white' :
                        'bg-amber-500 text-black'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-full text-foreground-muted hover:text-foreground flex items-center gap-1 text-[10px] uppercase tracking-wider border border-border bg-background">
                        <Circle className="w-3.5 h-3.5" />
                        <span>Off</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Direct Action Bar */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-foreground-muted font-mono">Stock: {prod.inventory} units</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="px-2.5 py-1 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Item</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1 text-foreground-muted hover:text-red-400 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Product Details Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Item Details</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Product</h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              {/* Target Collection Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Target Collection Curation</span>
                </label>
                <select
                  value={editingProduct.collectionId || 'col_heritage_embroidery'}
                  onChange={(e) => setEditingProduct({ ...editingProduct, collectionId: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl"
                >
                  <option value="col_heritage_embroidery">Heritage Embroidery Curation (heritage-embroidery)</option>
                  <option value="col_handbags">Artisanal Handbags & Purses (handbags)</option>
                  <option value="col_silk_scarves">Silk Scarves & Wraps (silk-scarves)</option>
                  <option value="col_velvet_decor">Velvet Home Decor (decor)</option>
                  <option value="col_new_arrivals">New Arrivals (new-arrivals)</option>
                  <option value="col_best_sellers">Best Sellers (best-sellers)</option>
                  <option value="col_sale">Special Sale (sale)</option>
                </select>
              </div>

              {/* Placement Checkboxes */}
              <div className="p-4 bg-background border border-border rounded-xl space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold block font-medium">Storefront Section Placements</span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isNew}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>1. Show in <b>New Arrivals</b> Collection</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(editingProduct as any).isBestSeller ?? false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked } as any)}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>2. Show in <b>Best Sellers</b> Collection</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(editingProduct as any).isSale ?? false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isSale: e.target.checked } as any)}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>3. Show in <b>Special Sale</b> Collection</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.inventory}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inventory: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
