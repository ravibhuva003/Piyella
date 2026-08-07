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
  const found = all.find((c) => c.slug === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase());
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
    productCount: 0,
    isFeatured: true,
    sortOrder: 99,
    createdAt: new Date().toISOString(),
  };
}

export async function getProductsByCollection(collectionSlugOrId: string): Promise<Product[]> {
  const allProducts = getLiveProducts();
  const collections = getLiveCollections();

  const collection = collections.find(
    (c) => c.slug === collectionSlugOrId || c.id === collectionSlugOrId || c.name.toLowerCase() === collectionSlugOrId.toLowerCase()
  ) || await getCollectionBySlug(collectionSlugOrId);

  const targetId = collection ? collection.id : collectionSlugOrId;
  const slug = collection ? collection.slug : collectionSlugOrId;
  const name = collection ? collection.name : collectionSlugOrId;

  // 1. Special Slugs filter (New Arrivals, Best Sellers, Sale)
  if (slug === 'new-arrivals') {
    return allProducts.filter((p) => p.isNew || (p as any).isNewArrival || p.tags?.includes('new-arrivals'));
  }
  if (slug === 'best-sellers') {
    return allProducts.filter((p) => (p as any).isBestSeller || (p.ratings && p.ratings >= 4.8) || p.tags?.includes('best-sellers'));
  }
  if (slug === 'sale') {
    return allProducts.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price) || p.tags?.includes('sale'));
  }

  // 2. Collection matching by ID, Slug, Category, or Tags
  const matched = allProducts.filter((p) => {
    const matchId = p.collectionId === targetId || p.collectionId === slug || p.collectionId === name;
    const matchCat = p.category && (
      p.category.toLowerCase() === slug.toLowerCase() ||
      p.category.toLowerCase() === name.toLowerCase() ||
      p.category.toLowerCase().includes(slug.toLowerCase()) ||
      slug.toLowerCase().includes(p.category.toLowerCase())
    );
    const matchTags = p.tags?.some((t) => 
      t.toLowerCase() === slug.toLowerCase() || 
      t.toLowerCase() === name.toLowerCase()
    );
    return matchId || matchCat || matchTags;
  });

  return matched;
}

export function searchProducts(query: string): Product[] {
  const allProducts = getLiveProducts();
  if (!query || !query.trim()) return allProducts;
  const q = query.trim().toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
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
