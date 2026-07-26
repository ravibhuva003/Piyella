import { MetadataRoute } from 'next';
import { products as mockProducts } from '@/data/mock-products';
import { collections as mockCollections } from '@/data/mock-collections';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://piyella.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/collections',
    '/cart',
    '/wishlist',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productPages = mockProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const collectionPages = mockCollections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
