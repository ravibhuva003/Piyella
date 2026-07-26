import { products as defaultProducts } from '@/data/mock-products';
import { collections as defaultCollections } from '@/data/mock-collections';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';

export { defaultProducts as products, defaultProducts as mockProducts, defaultCollections as collections, defaultCollections as mockCollections };

function getLiveProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piyella_admin_products');
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return defaultProducts;
}

function getLiveCollections(): Collection[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piyella_admin_collections');
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return defaultCollections;
}

export async function getProducts(): Promise<Product[]> {
  return getLiveProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = getLiveProducts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getCollections(): Promise<Collection[]> {
  return getLiveCollections();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const all = getLiveCollections();
  return all.find((c) => c.slug === slug) || null;
}

export async function getProductsByCollection(collectionSlugOrId: string): Promise<Product[]> {
  const allProducts = getLiveProducts();
  const collection = await getCollectionBySlug(collectionSlugOrId);
  const targetId = collection ? collection.id : collectionSlugOrId;

  const list = allProducts.filter((p) => p.collectionId === targetId);
  if (list.length > 0) return list;

  return allProducts.filter((p) =>
    p.category.toLowerCase() === collectionSlugOrId.toLowerCase() ||
    p.tags?.some((t) => t.toLowerCase() === collectionSlugOrId.toLowerCase())
  );
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
