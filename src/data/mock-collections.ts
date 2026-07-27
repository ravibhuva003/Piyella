import { Collection } from '@/types/collection';

export const collections: Collection[] = [
  {
    id: 'col_heritage_embroidery',
    name: 'Heritage Embroidery Curation',
    title: 'Heritage Embroidery Curation',
    slug: 'heritage-embroidery',
    description: 'Hand-stitched needlework using 24K gold foil thread and pure Mulberry silk from Italian workshops.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1000&auto=format&fit=crop',
    productCount: 8,
    isFeatured: true,
    sortOrder: 1,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'col_handbags',
    name: 'Artisanal Handbags & Purses',
    title: 'Artisanal Handbags & Purses',
    slug: 'handbags',
    description: 'Meticulously crafted luxury evening clutches and totes featuring signature brass crest seals.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    productCount: 6,
    isFeatured: true,
    sortOrder: 2,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'col_silk_scarves',
    name: 'Silk Scarves & Wraps',
    title: 'Silk Scarves & Wraps',
    slug: 'silk-scarves',
    description: '100% pure Mulberry silk scarves with botanical Renaissance prints and rolled hand-stitched edges.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
    productCount: 5,
    isFeatured: true,
    sortOrder: 3,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'col_new_arrivals',
    name: 'New Arrivals',
    title: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Discover the latest seasonal creations handcrafted by our master embroiderers.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    productCount: 10,
    isFeatured: true,
    sortOrder: 4,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'col_best_sellers',
    name: 'Best Sellers',
    title: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most coveted handcrafted luxury heirlooms loved by discerning collectors.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    productCount: 7,
    isFeatured: true,
    sortOrder: 5,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'col_velvet_decor',
    name: 'Velvet & Home Accents',
    title: 'Velvet & Home Accents',
    slug: 'velvet-decor',
    description: 'Hand-embroidered velvet cushions and luxury home accents to elevate interior spaces.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
    productCount: 4,
    isFeatured: false,
    sortOrder: 6,
    createdAt: '2026-07-01T12:00:00Z',
  },
];

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug || c.id === slug);
}
