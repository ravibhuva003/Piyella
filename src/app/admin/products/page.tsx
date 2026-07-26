'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Plus, Search, Trash2, Edit3, Eye, Package, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, deleteProduct, isLoaded } = useCatalogStore();
  const [search, setSearch] = useState('');

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

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Catalog Manager ({products.length} Items)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
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
      <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
        <Search className="w-4 h-4 text-white/40 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, category, or SKU..."
          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredProducts.map((prod) => {
                const img = prod.images?.find((i) => i.isPrimary)?.url || prod.images?.[0]?.url || '/images/placeholder.jpg';
                return (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                        <Image src={img} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-white font-medium leading-tight mb-1">{prod.name}</h4>
                        <span className="text-[10px] text-white/40 font-mono">SKU: {prod.sku}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs uppercase tracking-wider text-white/70">
                      {prod.category}
                    </td>

                    <td className="px-6 py-4 font-medium text-white">
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
                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-2 text-white/50 hover:text-white transition-colors"
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
                          className="p-2 text-white/30 hover:text-red-400 transition-colors"
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
    </div>
  );
}
