import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Gold Thread Silk Embroidery Clutch',
    slug: 'gold-thread-silk-embroidery-clutch',
    description: 'Handcrafted evening clutch made from pure Mulberry silk and embroidered with 24K gold foil thread. Features signature brass crest seal.',
    shortDescription: 'Handcrafted evening clutch made from pure Mulberry silk with 24K gold foil thread.',
    price: 45000,
    compareAtPrice: 52000,
    currency: 'INR',
    category: 'Handbags',
    collectionId: 'col_heritage_embroidery',
    images: [
      {
        id: 'img_1_1',
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
        alt: 'Gold Thread Silk Embroidery Clutch',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['embroidery', 'handbags', 'gold', 'silk'],
    variants: [],
    inventory: 5,
    sku: 'PY-HD-001',
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: 4.9,
    reviewCount: 28,
    createdAt: '2026-07-01T12:00:00Z',
    updatedAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Renaissance Botanical Silk Scarf',
    slug: 'renaissance-botanical-silk-scarf',
    description: '100% Mulberry silk scarf printed with classical Renaissance botanical motifs. Finished with hand-rolled hems.',
    shortDescription: '100% Mulberry silk scarf printed with classical Renaissance botanical motifs.',
    price: 28000,
    compareAtPrice: 32000,
    currency: 'INR',
    category: 'Accessories',
    collectionId: 'col_silk_scarves',
    images: [
      {
        id: 'img_2_1',
        url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
        alt: 'Renaissance Botanical Silk Scarf',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['scarf', 'silk', 'botanical', 'accessories'],
    variants: [],
    inventory: 8,
    sku: 'PY-SC-002',
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: 4.8,
    reviewCount: 19,
    createdAt: '2026-07-05T12:00:00Z',
    updatedAt: '2026-07-05T12:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'Florentine Velvet Embroidered Cushion',
    slug: 'florentine-velvet-embroidered-cushion',
    description: 'Deep royal navy velvet cushion with hand-stitched Florentine embroidery and silk fringe trimming.',
    shortDescription: 'Deep royal navy velvet cushion with hand-stitched Florentine embroidery.',
    price: 32000,
    compareAtPrice: 38000,
    currency: 'INR',
    category: 'Decor',
    collectionId: 'col_velvet_decor',
    images: [
      {
        id: 'img_3_1',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        alt: 'Florentine Velvet Embroidered Cushion',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['cushion', 'velvet', 'decor', 'embroidery'],
    variants: [],
    inventory: 4,
    sku: 'PY-DC-003',
    isActive: true,
    isFeatured: true,
    isNew: false,
    ratings: 5.0,
    reviewCount: 34,
    createdAt: '2026-06-20T12:00:00Z',
    updatedAt: '2026-06-20T12:00:00Z',
  },
  {
    id: 'prod_4',
    name: 'Royal Crest Handcrafted Tote',
    slug: 'royal-crest-handcrafted-tote',
    description: 'Structured calfskin tote bag with hand-embroidered front panel and custom gold hardware.',
    shortDescription: 'Structured calfskin tote bag with hand-embroidered front panel.',
    price: 68000,
    compareAtPrice: 75000,
    currency: 'INR',
    category: 'Handbags',
    collectionId: 'col_handbags',
    images: [
      {
        id: 'img_4_1',
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
        alt: 'Royal Crest Handcrafted Tote',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['tote', 'handbags', 'leather', 'embroidery'],
    variants: [],
    inventory: 3,
    sku: 'PY-HD-004',
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: 4.9,
    reviewCount: 42,
    createdAt: '2026-07-10T12:00:00Z',
    updatedAt: '2026-07-10T12:00:00Z',
  },
  {
    id: 'prod_5',
    name: 'Atelier Gold-Foil Needlework Tapestry',
    slug: 'atelier-gold-foil-needlework-tapestry',
    description: 'Framed silk embroidery artwork featuring 120+ hours of continuous French knot needlework.',
    shortDescription: 'Framed silk embroidery artwork featuring 120+ hours of French knot needlework.',
    price: 85000,
    compareAtPrice: 95000,
    currency: 'INR',
    category: 'Artwork',
    collectionId: 'col_heritage_embroidery',
    images: [
      {
        id: 'img_5_1',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
        alt: 'Atelier Gold-Foil Needlework Tapestry',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['artwork', 'embroidery', 'tapestry', 'gold'],
    variants: [],
    inventory: 2,
    sku: 'PY-ART-005',
    isActive: true,
    isFeatured: true,
    isNew: false,
    ratings: 5.0,
    reviewCount: 15,
    createdAt: '2026-06-15T12:00:00Z',
    updatedAt: '2026-06-15T12:00:00Z',
  },
  {
    id: 'prod_6',
    name: 'Venetian Silk Evening Purse',
    slug: 'venetian-silk-evening-purse',
    description: 'Petite evening purse crafted in Venetian silk damask with antique gold chain strap.',
    shortDescription: 'Petite evening purse crafted in Venetian silk damask.',
    price: 52000,
    compareAtPrice: 58000,
    currency: 'INR',
    category: 'Handbags',
    collectionId: 'col_handbags',
    images: [
      {
        id: 'img_6_1',
        url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop',
        alt: 'Venetian Silk Evening Purse',
        width: 1000,
        height: 1000,
        isPrimary: true,
      },
    ],
    tags: ['purse', 'silk', 'handbags', 'evening'],
    variants: [],
    inventory: 6,
    sku: 'PY-HD-006',
    isActive: true,
    isFeatured: false,
    isNew: true,
    ratings: 4.8,
    reviewCount: 22,
    createdAt: '2026-07-12T12:00:00Z',
    updatedAt: '2026-07-12T12:00:00Z',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter(
    (p) =>
      p.collectionId === collectionId ||
      p.category.toLowerCase() === collectionId.toLowerCase() ||
      p.tags?.some((t) => t.toLowerCase() === collectionId.toLowerCase())
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
