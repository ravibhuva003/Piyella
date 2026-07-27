'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ImageUploader } from '@/components/admin/image-uploader';
import { ProductImage } from '@/types/product';
import { ArrowLeft, Sparkles, Check, Layers, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, collections } = useCatalogStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || 'col_heritage_embroidery');
  const [price, setPrice] = useState<number>(45000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(55000);
  const [sku, setSku] = useState(`PYL-${Math.floor(1000 + Math.random() * 9000)}`);
  const [inventory, setInventory] = useState<number>(15);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  
  // Category Display Flags
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  const [images, setImages] = useState<ProductImage[]>([
    {
      id: 'img_default',
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      alt: 'Luxury Product Photo',
      width: 1000,
      height: 1000,
      isPrimary: true,
    },
  ]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Please fill in product name and price');
      return;
    }

    // Find selected collection details
    const selectedCollection = collections.find((c) => c.id === collectionId);
    const categoryName = selectedCollection?.name || 'General';

    const tags: string[] = [];
    if (isNew) tags.push('new-arrivals');
    if (isBestSeller) tags.push('best-sellers');
    if (isSale) tags.push('sale');

    addProduct({
      name,
      slug: slug || `product-${Date.now()}`,
      description: description || 'Handcrafted luxury piece.',
      shortDescription: shortDescription || 'Bespoke luxury piece.',
      price,
      compareAtPrice: isSale ? (compareAtPrice || price * 1.2) : undefined,
      currency: 'INR',
      images,
      category: categoryName,
      collectionId,
      tags,
      variants: [],
      inventory,
      sku,
      isActive: true,
      isFeatured,
      isNew,
      isBestSeller,
      isSale,
      ratings: 5.0,
      reviewCount: 1,
    } as any);

    alert('Product created successfully! It is now assigned to the selected collection and live on the public website.');
    router.push('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs text-[#C9A96E] font-mono">Live Sync to Public Site</span>
      </div>

      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-2">
          Create Luxury Product
        </h1>
        <p className="text-sm text-white/60 font-light">
          Add a new handcrafted item to the catalog. Select its target collection generated in Collection Settings below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form Grid */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Gold Thread Silk Embroidery Clutch"
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                URL Slug (Auto Generated)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white/70 font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Collection Selection Box (Pulls directly from Admin Collection Settings) */}
          <div className="p-5 bg-black/80 border border-[#C9A96E]/40 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold">
                <Layers className="w-4 h-4" />
                <span>Target Collection (Created in Admin Collection Settings) *</span>
              </div>
              <Link
                href="/admin/categories"
                className="text-[11px] text-[#C9A96E] hover:underline uppercase tracking-wider font-mono flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Manage Collections</span>
              </Link>
            </div>
            <p className="text-xs text-white/60 font-light">
              Select which admin-generated collection this product belongs to.
            </p>

            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full bg-black border border-[#C9A96E]/50 px-4 py-3.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl"
            >
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} ({col.slug})
                </option>
              ))}
            </select>
          </div>

          {/* Special Placement Toggles */}
          <div className="p-5 bg-black/80 border border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              <span>Special Storefront Placement Badges</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                isNew ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/70'
              }`}>
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-[#C9A96E] rounded"
                />
                <div>
                  <span className="font-semibold text-xs uppercase block">1. New Arrival</span>
                  <span className="text-[10px] opacity-70 block font-light">Show in /collections/new-arrivals</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                isBestSeller ? 'bg-purple-500/10 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-white/70'
              }`}>
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="w-4 h-4 accent-[#C9A96E] rounded"
                />
                <div>
                  <span className="font-semibold text-xs uppercase block">2. Best Seller</span>
                  <span className="text-[10px] opacity-70 block font-light">Show in /collections/best-sellers</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                isSale ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-white/5 border-white/10 text-white/70'
              }`}>
                <input
                  type="checkbox"
                  checked={isSale}
                  onChange={(e) => setIsSale(e.target.checked)}
                  className="w-4 h-4 accent-[#C9A96E] rounded"
                />
                <div>
                  <span className="font-semibold text-xs uppercase block">3. Special Sale</span>
                  <span className="text-[10px] opacity-70 block font-light">Show in /collections/sale</span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                Price (INR ₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                Compare-at Price (INR ₹)
              </label>
              <input
                type="number"
                value={compareAtPrice || ''}
                onChange={(e) => setCompareAtPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                SKU Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                Initial Inventory Stock
              </label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
              Detailed Product Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the craftsmanship, materials, and origin..."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
            />
          </div>

          {/* Media Uploader */}
          <div className="pt-4 border-t border-white/10">
            <ImageUploader images={images} onChange={setImages} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Publish & Sync Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
