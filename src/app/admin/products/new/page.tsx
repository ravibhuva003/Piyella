'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ImageUploader } from '@/components/admin/image-uploader';
import { ProductImage } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Sparkles, Check, Layers, Plus, Tag, Percent } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, collections } = useCatalogStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || '');
  
  // String state for text-type inputs to prevent native browser number bugs
  const [priceStr, setPriceStr] = useState('45000');
  const [discountStr, setDiscountStr] = useState('20');
  const [compareAtStr, setCompareAtStr] = useState('56250');
  const [sku, setSku] = useState(`PYL-${Math.floor(1000 + Math.random() * 9000)}`);
  const [inventoryStr, setInventoryStr] = useState('15');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  
  // Category Display Flags
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isSale, setIsSale] = useState(true);
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
      setIsSale(true);
    } else {
      setCompareAtStr('');
      setIsSale(false);
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
      setIsSale(true);
    } else {
      setDiscountStr('0');
      setIsSale(false);
    }
  };

  const priceNum = Number(priceStr) || 0;
  const compareAtNum = compareAtStr ? Number(compareAtStr) : undefined;
  const discountNum = Number(discountStr) || 0;
  const inventoryNum = Number(inventoryStr) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !priceNum) {
      alert('Please fill in product name and valid price');
      return;
    }

    const targetCollectionId = collectionId || collections[0]?.id || 'custom_collection';
    const selectedCollection = collections.find((c) => c.id === targetCollectionId);
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
      price: priceNum,
      compareAtPrice: (isSale || (discountNum > 0)) ? (compareAtNum || priceNum * 1.25) : undefined,
      currency: 'INR',
      images,
      category: categoryName,
      collectionId: targetCollectionId,
      tags,
      variants: [],
      inventory: inventoryNum,
      sku,
      isActive: true,
      isFeatured,
      isNew,
      isBestSeller,
      isSale: Boolean(isSale || (discountNum > 0)),
      ratings: 5.0,
      reviewCount: 1,
    } as any);

    alert('Product created successfully! Synchronized across all devices.');
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
        <span className="text-xs text-[#C9A96E] font-mono">Text Input Mode Active</span>
      </div>

      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-2">
          Create Luxury Product
        </h1>
        <p className="text-sm text-white/60 font-light">
          Add a new handcrafted item to the catalog. All price and discount inputs use text format to prevent auto-fill issues.
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

          {/* Collection Selection Box */}
          <div className="p-5 bg-black/80 border border-[#C9A96E]/40 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold">
                <Layers className="w-4 h-4" />
                <span>Target Collection (From Admin Collection Settings) *</span>
              </div>
              <Link
                href="/admin/categories"
                className="text-[11px] text-[#C9A96E] hover:underline uppercase tracking-wider font-mono flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Create Collection</span>
              </Link>
            </div>

            {collections.length > 0 ? (
              <select
                value={collectionId || collections[0]?.id}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full bg-black border border-[#C9A96E]/50 px-4 py-3.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.slug})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center justify-between">
                <span>No custom collections created yet. You can create your first collection in Collection Settings.</span>
                <Link href="/admin/categories" className="px-3 py-1.5 bg-[#C9A96E] text-black font-bold text-[10px] uppercase tracking-wider rounded-lg shrink-0 ml-2">
                  Create Collection
                </Link>
              </div>
            )}
          </div>

          {/* Pricing & Discount Percentage Box (Text Type Inputs) */}
          <div className="p-5 bg-black/80 border border-[#C9A96E]/30 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold">
              <Tag className="w-4 h-4" />
              <span>Pricing & Discount Calculator (Text Inputs)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                  Final Selling Price (₹) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={priceStr}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="e.g. 45000"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#C9A96E] mb-2 font-medium flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" />
                  <span>Discount Percentage (%)</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={discountStr}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full bg-black/60 border border-[#C9A96E]/40 px-4 py-3 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                  Original Struck-Through Price (₹)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={compareAtStr}
                  onChange={(e) => handleCompareAtChange(e.target.value)}
                  placeholder="Auto calculated"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white/80 focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                />
              </div>
            </div>

            {/* Live Pricing Visual Preview Box */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/50 font-medium">Customer Price Display Preview:</span>
              <div className="flex items-center gap-3">
                <span className="text-lg font-serif text-white font-bold">{formatPrice(priceNum, 'INR')}</span>
                {compareAtNum && compareAtNum > priceNum && (
                  <span className="text-sm text-white/40 line-through font-mono">
                    {formatPrice(compareAtNum, 'INR')}
                  </span>
                )}
                {discountNum > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase rounded-md font-mono">
                    {discountNum}% OFF
                  </span>
                )}
              </div>
            </div>
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
                type="text"
                inputMode="numeric"
                value={inventoryStr}
                onChange={(e) => setInventoryStr(e.target.value.replace(/[^0-9]/g, ''))}
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
