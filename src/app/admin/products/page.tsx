'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Plus, Search, Trash2, Edit3, Eye, Package, Sparkles, X, Check, Flame, Tag, Layers } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

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
          placeholder="Search products by name, category, or SKU..."
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
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Collection ID</th>
                <th className="px-6 py-4">Placements</th>
                <th className="px-6 py-4">Price</th>
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

                    <td className="px-6 py-4 text-xs uppercase tracking-wider text-foreground-muted font-semibold">
                      {prod.category}
                    </td>

                    <td className="px-6 py-4 text-xs font-mono text-[#C9A96E]">
                      {prod.collectionId || 'default'}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {isNewProd && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">New Arrival</span>}
                        {isBest && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Best Seller</span>}
                        {isSal && <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">Sale</span>}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-foreground">
                      {formatPrice(prod.price, prod.currency)}
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
                          onClick={() => setEditingProduct(prod)}
                          className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
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

      {/* Edit Product Modal */}
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
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Product</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Product Specifications</h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Product Name</label>
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
                <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold block">Storefront Placements</span>
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

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Category</label>
                <input
                  type="text"
                  required
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
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
