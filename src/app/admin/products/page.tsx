'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { ImageUploader } from '@/components/admin/image-uploader';
import { Plus, Search, Trash2, Edit3, Eye, Package, Sparkles, X, Check, Flame, Tag, Layers, Percent } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, collections, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // String state fields for smooth text-type input editing
  const [priceStr, setPriceStr] = useState('');
  const [discountStr, setDiscountStr] = useState('');
  const [compareAtStr, setCompareAtStr] = useState('');
  const [inventoryStr, setInventoryStr] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    const pStr = String(prod.price || 0);
    setPriceStr(pStr);

    if (prod.compareAtPrice && prod.compareAtPrice > prod.price) {
      const cStr = String(prod.compareAtPrice);
      const disc = Math.round(((prod.compareAtPrice - prod.price) / prod.compareAtPrice) * 100);
      setCompareAtStr(cStr);
      setDiscountStr(String(disc));
    } else {
      setCompareAtStr('');
      setDiscountStr('0');
    }

    setInventoryStr(String(prod.inventory || 0));
  };

  const handlePriceChange = (valStr: string) => {
    const cleaned = valStr.replace(/[^0-9.]/g, '');
    setPriceStr(cleaned);
    const numPrice = Number(cleaned) || 0;
    const numDisc = Number(discountStr) || 0;
    if (numDisc > 0 && numPrice > 0) {
      const calculatedOrig = Math.round(numPrice / (1 - numDisc / 100));
      setCompareAtStr(String(calculatedOrig));
    }
  };

  const handleDiscountChange = (valStr: string) => {
    const cleaned = valStr.replace(/[^0-9]/g, '');
    setDiscountStr(cleaned);
    const numDisc = Number(cleaned) || 0;
    const numPrice = Number(priceStr) || 0;
    if (numDisc > 0 && numPrice > 0) {
      const calculatedOrig = Math.round(numPrice / (1 - numDisc / 100));
      setCompareAtStr(String(calculatedOrig));
      if (editingProduct) setEditingProduct({ ...editingProduct, isSale: true } as any);
    } else {
      setCompareAtStr('');
      if (editingProduct) setEditingProduct({ ...editingProduct, isSale: false } as any);
    }
  };

  const handleCompareAtChange = (valStr: string) => {
    const cleaned = valStr.replace(/[^0-9.]/g, '');
    setCompareAtStr(cleaned);
    const numCompare = Number(cleaned) || 0;
    const numPrice = Number(priceStr) || 0;
    if (numCompare > numPrice && numPrice > 0) {
      const calculatedDisc = Math.round(((numCompare - numPrice) / numCompare) * 100);
      setDiscountStr(String(calculatedDisc));
      if (editingProduct) setEditingProduct({ ...editingProduct, isSale: true } as any);
    } else {
      setDiscountStr('0');
      if (editingProduct) setEditingProduct({ ...editingProduct, isSale: false } as any);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const selectedCol = collections.find((c) => c.id === editingProduct.collectionId);
    const categoryName = selectedCol?.name || editingProduct.category || 'General';

    const finalPrice = Number(priceStr) || 0;
    const finalCompare = compareAtStr ? Number(compareAtStr) : undefined;
    const finalInventory = Number(inventoryStr) || 0;
    const finalDisc = Number(discountStr) || 0;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      slug: editingProduct.slug,
      description: editingProduct.description,
      shortDescription: editingProduct.shortDescription,
      price: finalPrice,
      compareAtPrice: (finalCompare && finalCompare > finalPrice) ? finalCompare : undefined,
      category: categoryName,
      collectionId: editingProduct.collectionId,
      inventory: finalInventory,
      sku: editingProduct.sku,
      images: editingProduct.images,
      isNew: editingProduct.isNew,
      isBestSeller: (editingProduct as any).isBestSeller,
      isSale: Boolean((editingProduct as any).isSale || (finalCompare && finalCompare > finalPrice) || finalDisc > 0),
    } as any);

    setEditingProduct(null);
    alert(`Product "${editingProduct.name}" updated successfully across all devices!`);
  };

  const priceNum = Number(priceStr) || 0;
  const compareAtNum = compareAtStr ? Number(compareAtStr) : undefined;
  const discountNum = Number(discountStr) || 0;

  return (
    <div className="space-y-8 text-foreground">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Catalog Manager ({products.length} Items)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
            Products & Inventory
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center gap-4 bg-surface border border-border p-4 rounded-xl shadow-md">
        <Search className="w-4 h-4 text-foreground-muted ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, collection, or SKU..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-widest text-foreground-muted border-b border-border">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Assigned Collection</th>
                <th className="px-6 py-4">Placements</th>
                <th className="px-6 py-4">Price & Discount</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {filteredProducts.map((prod) => {
                const img = prod.images?.find((i) => i.isPrimary)?.url || prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop';
                const isNewProd = prod.isNew || (prod as any).isNewArrival;
                const isBest = (prod as any).isBestSeller || prod.ratings >= 4.8;
                const isSal = (prod as any).isSale || (prod.compareAtPrice && prod.compareAtPrice > prod.price);
                const assignedCol = collections.find((c) => c.id === prod.collectionId);
                const disc = (prod.compareAtPrice && prod.compareAtPrice > prod.price) 
                  ? Math.round(((prod.compareAtPrice - prod.price) / prod.compareAtPrice) * 100)
                  : 0;

                return (
                  <tr key={prod.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-border">
                        <Image src={img} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-foreground font-medium leading-tight mb-1">{prod.name}</h4>
                        <span className="text-[10px] text-foreground-muted font-mono">SKU: {prod.sku}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-mono text-[#C9A96E] font-medium">
                      {assignedCol ? `${assignedCol.name} (${assignedCol.slug})` : (prod.collectionId || 'default')}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {isNewProd && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">New Arrival</span>}
                        {isBest && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Best Seller</span>}
                        {isSal && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">Sale</span>}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-medium text-foreground block">{formatPrice(prod.price, prod.currency)}</span>
                        {prod.compareAtPrice && prod.compareAtPrice > prod.price && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-foreground-muted line-through font-mono">{formatPrice(prod.compareAtPrice, prod.currency)}</span>
                            {disc > 0 && <span className="text-[9px] font-bold text-amber-400 font-mono">({disc}% OFF)</span>}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                        prod.inventory > 10 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        prod.inventory > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {prod.inventory > 0 ? `${prod.inventory} In Stock` : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEditProduct(prod)}
                          className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit All Details</span>
                        </button>
                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                          title="Preview on Public Storefront"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${prod.name}? This change will instantly update the public site.`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-2 text-foreground-muted hover:text-red-500 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Feature Edit Product Modal (Text-Type Price & Discount Inputs) */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Full Edit Suite</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Product Details & Photos</h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">URL Slug</label>
                  <input
                    type="text"
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground-muted font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              {/* Target Collection Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Target Collection (From Admin Collection Settings)</span>
                </label>
                <select
                  value={editingProduct.collectionId || collections[0]?.id}
                  onChange={(e) => setEditingProduct({ ...editingProduct, collectionId: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl"
                >
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.slug})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing & Discount Calculator (Text Inputs) */}
              <div className="p-4 bg-background border border-[#C9A96E]/30 rounded-xl space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold block flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Pricing & Discount Calculator (Text Inputs)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-foreground-muted mb-1 font-medium">Final Selling Price (₹) *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={priceStr}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="e.g. 45000"
                      className="w-full bg-surface border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#C9A96E] mb-1 font-medium flex items-center gap-1">
                      <Percent className="w-3 h-3" /> Discount (%)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={discountStr}
                      onChange={(e) => handleDiscountChange(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-surface border border-[#C9A96E]/40 px-4 py-2.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-foreground-muted mb-1 font-medium">Struck-Through Original Price (₹)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={compareAtStr}
                      onChange={(e) => handleCompareAtChange(e.target.value)}
                      placeholder="Auto calculated"
                      className="w-full bg-surface border border-border px-4 py-2.5 text-sm text-foreground-muted focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-surface rounded-lg flex items-center justify-between text-xs">
                  <span className="text-foreground-muted">Customer Pricing Preview:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-foreground font-bold">{formatPrice(priceNum, 'INR')}</span>
                    {compareAtNum && compareAtNum > priceNum && (
                      <span className="text-foreground-muted line-through font-mono">{formatPrice(compareAtNum, 'INR')}</span>
                    )}
                    {discountNum > 0 && (
                      <span className="text-amber-400 font-mono font-bold">
                        ({discountNum}% OFF)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Placement Checkboxes */}
              <div className="p-4 bg-background border border-border rounded-xl space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold block">Storefront Badges & Placements</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-surface border border-border">
                    <input
                      type="checkbox"
                      checked={editingProduct.isNew}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>1. New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-surface border border-border">
                    <input
                      type="checkbox"
                      checked={(editingProduct as any).isBestSeller ?? false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked } as any)}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>2. Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-surface border border-border">
                    <input
                      type="checkbox"
                      checked={Boolean((editingProduct as any).isSale || (compareAtNum && compareAtNum > priceNum) || discountNum > 0)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isSale: e.target.checked } as any)}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                    <span>3. Special Sale</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">SKU Code</label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Stock Inventory Count</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={inventoryStr}
                    onChange={(e) => setInventoryStr(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Full Product Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              {/* Photo Management Component */}
              <div className="pt-2 border-t border-border">
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">
                  Product Photos & Cover Image Upload
                </label>
                <ImageUploader
                  images={editingProduct.images || []}
                  onChange={(imgs) => setEditingProduct({ ...editingProduct, images: imgs })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
