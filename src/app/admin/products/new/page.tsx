'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ImageUploader } from '@/components/admin/image-uploader';
import { ProductImage } from '@/types/product';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct } = useCatalogStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('women');
  const [price, setPrice] = useState<number>(45000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(55000);
  const [sku, setSku] = useState(`PYL-${Math.floor(1000 + Math.random() * 9000)}`);
  const [inventory, setInventory] = useState<number>(15);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [images, setImages] = useState<ProductImage[]>([
    {
      id: 'img_default',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      alt: 'Luxury Product Photo',
      width: 1000,
      height: 1500,
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

    addProduct({
      name,
      slug: slug || `product-${Date.now()}`,
      description: description || 'Handcrafted Italian luxury piece.',
      shortDescription: shortDescription || 'Bespoke luxury piece.',
      price,
      compareAtPrice,
      currency: 'INR',
      images,
      category,
      tags: ['featured', 'new'],
      variants: [
        { id: `v_${Date.now()}_s`, name: 'S', type: 'size', value: 'S', inventory: Math.floor(inventory / 2), sku: `${sku}-S` },
        { id: `v_${Date.now()}_m`, name: 'M', type: 'size', value: 'M', inventory: Math.ceil(inventory / 2), sku: `${sku}-M` },
      ],
      inventory,
      sku,
      isActive: true,
      isFeatured,
      isNew,
      ratings: 5.0,
      reviewCount: 1,
    });

    alert('Product created successfully! It is now live on the public website.');
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
          Add a new handcrafted item to the catalog. Changes are reflected instantly.
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
                placeholder="e.g. Mulberry Silk Evening Gown"
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="accessories">Accessories</option>
                <option value="timepieces">Timepieces</option>
              </select>
            </div>

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
