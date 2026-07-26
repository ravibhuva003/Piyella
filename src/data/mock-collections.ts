import { Collection } from '@/types/collection';

export const collections: Collection[] = [
  {
    id: 'c_embroidery_purses',
    name: 'Hand-Embroidered Purses',
    title: 'Hand-Embroidered Purses & Clutches',
    slug: 'embroidery-purses',
    description: 'Single-needle French knot embroidery on Mulberry silk and Italian velvet.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    productCount: 12,
    isFeatured: true,
    sortOrder: 1,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c_crochet_gifts',
    name: 'Cozy Crochet Gifts',
    title: 'Cozy Hand-Crochet Gifts & Knitwear',
    slug: 'crochet-gifts',
    description: 'Hand-knit Merino wool and baby alpaca blankets, scarves, and plush keepsakes.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop',
    productCount: 16,
    isFeatured: true,
    sortOrder: 2,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c_home_decor',
    name: 'Handmade Home Décor',
    title: 'Artisanal Home Décor & Tapestries',
    slug: 'home-decor',
    description: 'Botanical wall tapestries, hand-embroidered velvet cushions, and terracotta accents.',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1200&auto=format&fit=crop',
    productCount: 14,
    isFeatured: true,
    sortOrder: 3,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c_hair_accessories',
    name: 'Hair Accessories',
    title: 'Embroidered Hair Pins & Silk Headbands',
    slug: 'hair-accessories',
    description: 'Hand-stitched botanical scrunchies, pearl hair pins, and padded silk headbands.',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1200&auto=format&fit=crop',
    productCount: 10,
    isFeatured: true,
    sortOrder: 4,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c_wool_embroidery',
    name: 'Wool Thread Embroidery',
    title: 'Wool Thread Embroidery & Wall Art',
    slug: 'wool-embroidery',
    description: 'Textured crewel wool embroidery on organic Belgian linen canvas.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    productCount: 8,
    isFeatured: true,
    sortOrder: 5,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
