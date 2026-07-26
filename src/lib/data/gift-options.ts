export interface GiftBoxStyle {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export interface GiftCardTemplate {
  id: string;
  name: string;
  subtitle: string;
  themeColor: string;
  fontFamily: string;
  bgGradient: string;
}

export interface GiftPackagingData {
  enabled: boolean;
  boxStyleId: string;
  boxStyleName: string;
  boxPrice: number;
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
}

export const GIFT_BOX_STYLES: GiftBoxStyle[] = [
  {
    id: 'box_gold_velvet',
    name: 'Royal Gold Velvet Box',
    description: 'Deep emerald velvet casing adorned with hand-stitched 24K gold foil ribbons.',
    price: 500,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    badge: 'Popular Choice',
  },
  {
    id: 'box_black_silk',
    name: 'Midnight Black Silk Box',
    description: 'Matte onyx casing lined with 100% pure Mulberry silk and custom wax seal.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd4547?q=80&w=800&auto=format&fit=crop',
    badge: 'Atelier Signature',
  },
  {
    id: 'box_wooden_chest',
    name: 'Mahogany Atelier Chest',
    description: 'Hand-carved solid mahogany wooden chest with polished brass clasp and velvet cushion.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
    badge: 'Ultimate Luxury',
  },
];

export const GIFT_CARD_TEMPLATES: GiftCardTemplate[] = [
  {
    id: 'card_celebration',
    name: 'Bespoke Celebration',
    subtitle: 'Golden foil script on cream linen cardstock',
    themeColor: '#C9A96E',
    fontFamily: 'font-serif',
    bgGradient: 'from-[#141414] via-[#0a0a0a] to-[#1a1813]',
  },
  {
    id: 'card_affection',
    name: 'With Deepest Affection',
    subtitle: 'Romantic Italian calligraphy with gold leaf border',
    themeColor: '#E0A96D',
    fontFamily: 'font-serif',
    bgGradient: 'from-[#1c1212] via-[#0a0a0a] to-[#241515]',
  },
  {
    id: 'card_anniversary',
    name: 'Milestone Anniversary',
    subtitle: 'High-embossed serif typography for treasured moments',
    themeColor: '#D4B87C',
    fontFamily: 'font-serif',
    bgGradient: 'from-[#171612] via-[#0a0a0a] to-[#1f1d17]',
  },
  {
    id: 'card_honor',
    name: 'Atelier Honor & Distinction',
    subtitle: 'Executive gratitude card sealed with gold crest',
    themeColor: '#C9A96E',
    fontFamily: 'font-serif',
    bgGradient: 'from-[#121417] via-[#0a0a0a] to-[#151a21]',
  },
];
