import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'p_rose_gold_purse',
    name: 'Florentine Rose Gold Silk Purse',
    slug: 'florentine-rose-gold-silk-purse',
    description: 'Meticulously hand-embroidered with 24K gold foil thread and Mulberry silk on Italian velvet. Features 120+ hours of single-needle French knot needlework by master artisan Beatrice Vane.',
    shortDescription: 'Hand-embroidered silk purse with 24K gold foil thread.',
    price: 45000,
    compareAtPrice: 55000,
    currency: 'INR',
    images: [
      {
        id: 'img_purse_1',
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
        alt: 'Florentine Rose Gold Silk Purse',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
      {
        id: 'img_purse_2',
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
        alt: 'Hand Embroidery Details',
        width: 1200,
        height: 1600,
        isPrimary: false,
      },
    ],
    category: 'Hand-Embroidered Purses',
    collectionId: 'c_embroidery_purses',
    tags: ['featured', 'new', 'handmade', 'embroidery'],
    variants: [
      { id: 'v_rose_gold', name: 'Rose Gold Thread', type: 'color', value: 'Rose Gold', inventory: 5, sku: 'PUR-01-RG' },
      { id: 'v_onyx_gold', name: 'Onyx Gold Thread', type: 'color', value: 'Onyx Gold', inventory: 4, sku: 'PUR-01-OG' },
    ],
    inventory: 9,
    sku: 'PUR-FLORENTINE-01',
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: 5.0,
    reviewCount: 38,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'p_crochet_merino_blanket',
    name: 'Merino Wool Hand-Crochet Throw',
    slug: 'merino-wool-hand-crochet-throw',
    description: 'Cozy hand-knit throw blanket crafted from 100% un-spun organic Merino wool. Exceptionally soft, lightweight, and warm for cozy winter evenings.',
    shortDescription: '100% organic Merino wool hand-crochet throw blanket.',
    price: 32000,
    compareAtPrice: 38000,
    currency: 'INR',
    images: [
      {
        id: 'img_blanket_1',
        url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop',
        alt: 'Merino Wool Hand-Crochet Throw',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
    ],
    category: 'Cozy Crochet Gifts',
    collectionId: 'c_crochet_gifts',
    tags: ['featured', 'crochet', 'cozy'],
    variants: [
      { id: 'v_cream', name: 'Soft Cream', type: 'color', value: 'Cream', inventory: 8, sku: 'CR-BLNK-CRM' },
      { id: 'v_sage', name: 'Sage Green', type: 'color', value: 'Sage', inventory: 6, sku: 'CR-BLNK-SAG' },
    ],
    inventory: 14,
    sku: 'CR-MERINO-BLANKET',
    isActive: true,
    isFeatured: true,
    isNew: false,
    ratings: 4.9,
    reviewCount: 42,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'p_botanical_embroidery_tapestry',
    name: 'Wildflower Wool Thread Tapestry',
    slug: 'wildflower-wool-thread-tapestry',
    description: 'Textured crewel wool embroidery wall hanging depicting wildflower blooms on unbleached Belgian linen. Framed in a museum gilded gold frame.',
    shortDescription: 'Hand-stitched crewel wool wall tapestry in gilded gold frame.',
    price: 68000,
    compareAtPrice: 85000,
    currency: 'INR',
    images: [
      {
        id: 'img_tapestry_1',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
        alt: 'Wildflower Wool Thread Tapestry',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
    ],
    category: 'Wool Thread Embroidery',
    collectionId: 'c_wool_embroidery',
    tags: ['featured', 'wallart', 'wool'],
    variants: [
      { id: 'v_grand', name: 'Grand (24" x 36")', type: 'size', value: '24x36', inventory: 3, sku: 'TAP-2436' },
      { id: 'v_royal', name: 'Royal (36" x 48")', type: 'size', value: '36x48', inventory: 2, sku: 'TAP-3648' },
    ],
    inventory: 5,
    sku: 'TAP-WILDFLOWER-01',
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: 5.0,
    reviewCount: 19,
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'p_embroidered_headband',
    name: 'Terracotta Velvet Embroidered Headband',
    slug: 'terracotta-velvet-embroidered-headband',
    description: 'Padded terracotta velvet headband hand-stitched with freshwater pearls, gold sequins, and botanical floral embroidery.',
    shortDescription: 'Padded velvet headband with pearls & hand embroidery.',
    price: 12500,
    compareAtPrice: 15000,
    currency: 'INR',
    images: [
      {
        id: 'img_headband_1',
        url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Terracotta Velvet Embroidered Headband',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
    ],
    category: 'Hair Accessories',
    collectionId: 'c_hair_accessories',
    tags: ['hair', 'accessories', 'velvet'],
    variants: [
      { id: 'v_terracotta', name: 'Terracotta', type: 'color', value: 'Terracotta', inventory: 12, sku: 'HAIR-TER' },
      { id: 'v_rose', name: 'Dusty Rose', type: 'color', value: 'Dusty Rose', inventory: 9, sku: 'HAIR-ROS' },
    ],
    inventory: 21,
    sku: 'HAIR-HEADBAND-01',
    isActive: true,
    isFeatured: false,
    isNew: true,
    ratings: 4.8,
    reviewCount: 29,
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
  },
  {
    id: 'p_crochet_alpaca_plush',
    name: 'Artisanal Alpaca Crochet Heirloom Plush',
    slug: 'artisanal-alpaca-crochet-heirloom-plush',
    description: 'Hand-crocheted heirloom keepsake toy crafted from hypoallergenic baby alpaca yarn. Soft, gentle, and designed to be passed down through generations.',
    shortDescription: 'Hand-crocheted baby alpaca heirloom plush toy.',
    price: 18500,
    compareAtPrice: 22000,
    currency: 'INR',
    images: [
      {
        id: 'img_plush_1',
        url: 'https://images.unsplash.com/photo-1558060370-d644479be6e7?q=80&w=1200&auto=format&fit=crop',
        alt: 'Artisanal Alpaca Crochet Heirloom Plush',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
    ],
    category: 'Cozy Crochet Gifts',
    collectionId: 'c_crochet_gifts',
    tags: ['crochet', 'heirloom', 'gift'],
    variants: [
      { id: 'v_oatmeal', name: 'Oatmeal', type: 'color', value: 'Oatmeal', inventory: 7, sku: 'PLUSH-OAT' },
    ],
    inventory: 7,
    sku: 'CR-ALPACA-PLUSH',
    isActive: true,
    isFeatured: false,
    isNew: false,
    ratings: 5.0,
    reviewCount: 15,
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-01-12T00:00:00Z',
  },
  {
    id: 'p_velvet_cushion',
    name: 'Botanical Embroidered Velvet Cushion',
    slug: 'botanical-embroidered-velvet-cushion',
    description: 'Plush sage green velvet cushion featuring hand-stitched botanical foliage embroidery and gold metallic trim.',
    shortDescription: 'Sage green velvet cushion with botanical hand embroidery.',
    price: 24000,
    compareAtPrice: 28000,
    currency: 'INR',
    images: [
      {
        id: 'img_cushion_1',
        url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1200&auto=format&fit=crop',
        alt: 'Botanical Embroidered Velvet Cushion',
        width: 1200,
        height: 1600,
        isPrimary: true,
      },
    ],
    category: 'Handmade Home Décor',
    collectionId: 'c_home_decor',
    tags: ['decor', 'cushion', 'embroidery'],
    variants: [
      { id: 'v_square', name: 'Square (18" x 18")', type: 'size', value: '18x18', inventory: 10, sku: 'CUSH-1818' },
    ],
    inventory: 10,
    sku: 'DEC-CUSHION-01',
    isActive: true,
    isFeatured: true,
    isNew: false,
    ratings: 4.9,
    reviewCount: 34,
    createdAt: '2026-01-08T00:00:00Z',
    updatedAt: '2026-01-08T00:00:00Z',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collectionId === collectionId);
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
