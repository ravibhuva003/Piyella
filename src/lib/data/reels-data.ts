export type ReelCategory = 'Featured' | 'Making Process' | 'Behind the Scenes' | 'Customer Unboxing';

export interface ReelProductLink {
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface InstagramReel {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  category: ReelCategory;
  instagramUrl: string;
  viewsCount: string;
  isPinned: boolean;
  linkedProduct?: ReelProductLink;
}

export const INITIAL_REELS: InstagramReel[] = [
  {
    id: 'reel_1',
    title: 'Florentine 24K Gold Leaf Gilding Process',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-a-canvas-with-a-brush-41584-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    category: 'Making Process',
    instagramUrl: 'https://instagram.com/p/C9A96E_gold_leaf',
    viewsCount: '148.5K',
    isPinned: true,
    linkedProduct: {
      name: 'Heritage Skeleton Automatic Watch',
      slug: 'heritage-skeleton-automatic',
      price: 280000,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'reel_2',
    title: 'Unboxing the Royal Gold Velvet Box',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-gift-wrapped-box-41595-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    category: 'Customer Unboxing',
    instagramUrl: 'https://instagram.com/p/C9A96E_unboxing',
    viewsCount: '92.3K',
    isPinned: true,
    linkedProduct: {
      name: 'Bespoke Mulberry Silk Evening Gown',
      slug: 'mulberry-silk-evening-gown',
      price: 185000,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'reel_3',
    title: 'Inside Milan Atelier: Hand-Carving Calfskin Leather',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-working-on-a-leather-strap-41586-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    category: 'Behind the Scenes',
    instagramUrl: 'https://instagram.com/p/C9A96E_atelier_leather',
    viewsCount: '210.8K',
    isPinned: true,
    linkedProduct: {
      name: 'Monogram Leather Duffle Bag',
      slug: 'monogram-leather-duffle',
      price: 125000,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'reel_4',
    title: 'Master Gilder Restoring 18th Century Frame',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-a-canvas-with-a-brush-41584-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    category: 'Featured',
    instagramUrl: 'https://instagram.com/p/C9A96E_frame_restore',
    viewsCount: '78.1K',
    isPinned: false,
    linkedProduct: {
      name: 'Museum Gilded Gold Artwork Frame',
      slug: 'custom-artwork',
      price: 250000,
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    },
  },
];
