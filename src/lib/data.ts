import { products as defaultProducts } from '@/data/mock-products';
import { collections as defaultCollections } from '@/data/mock-collections';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';

export { defaultProducts as products, defaultProducts as mockProducts, defaultCollections as collections, defaultCollections as mockCollections };

function getLiveProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piyella_admin_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
  }
  return defaultProducts;
}

function getLiveCollections(): Collection[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piyella_admin_collections');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
  }
  return defaultCollections;
}

export async function getProducts(): Promise<Product[]> {
  return getLiveProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = getLiveProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function getCollections(): Promise<Collection[]> {
  return getLiveCollections();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const all = getLiveCollections();
  const found = all.find((c) => c.slug === slug || c.id === slug);
  if (found) return found;

  // Fallback: Smart collection generator so no collection URL ever 404s
  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: `col_${slug}`,
    name: formattedTitle,
    title: `${formattedTitle} Curation`,
    slug: slug,
    description: `Explore our curated selection of luxury ${formattedTitle.toLowerCase()} creations, handcrafted with unyielding devotion.`,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1000&auto=format&fit=crop',
    productCount: 6,
    isFeatured: true,
    sortOrder: 99,
    createdAt: '2026-07-01T12:00:00Z',
  };
}

export async function getProductsByCollection(collectionSlugOrId: string): Promise<Product[]> {
  const allProducts = getLiveProducts();
  const collection = await getCollectionBySlug(collectionSlugOrId);
  const targetId = collection ? collection.id : collectionSlugOrId;
  const slug = collection ? collection.slug : collectionSlugOrId;

  // 1. Direct Collection ID match
  let list = allProducts.filter((p) => p.collectionId === targetId || p.collectionId === collectionSlugOrId);
  if (list.length > 0) return list;

  // 2. Category or Tag match
  list = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === slug.toLowerCase() ||
      p.category.toLowerCase().includes(slug.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase() === slug.toLowerCase() || slug.toLowerCase().includes(t.toLowerCase()))
  );
  if (list.length > 0) return list;

  // 3. Special Slugs filter
  if (slug === 'new-arrivals') {
    const newItems = allProducts.filter((p) => p.isNew || (p as any).isNewArrival);
    if (newItems.length > 0) return newItems;
  }
  if (slug === 'best-sellers') {
    const bestItems = allProducts.filter((p) => (p.ratings && p.ratings >= 4.8) || (p as any).isBestSeller);
    if (bestItems.length > 0) return bestItems;
  }
  if (slug === 'sale') {
    const saleItems = allProducts.filter((p) => (p.compareAtPrice && p.compareAtPrice > p.price) || ((p as any).originalPrice && (p as any).originalPrice > p.price));
    if (saleItems.length > 0) return saleItems;
  }

  // 4. Return all products if specific collection filter yields no subset
  return allProducts;
}

export function searchProducts(query: string): Product[] {
  const allProducts = getLiveProducts();
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

export function formatPrice(price: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}
