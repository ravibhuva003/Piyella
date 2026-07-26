export interface ArtworkMaterial {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ArtworkFrame {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ArtworkSize {
  id: string;
  name: string;
  dimensions: string;
  description: string;
}

export interface ArtworkBudget {
  id: string;
  label: string;
  range: string;
}

export const ARTWORK_MATERIALS: ArtworkMaterial[] = [
  {
    id: 'mat_oil_canvas',
    name: 'Oil on Belgic Linen Canvas',
    description: 'Traditional heavy-body Italian oils with multi-layered glaze techniques on organic Belgian linen.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mat_silk_tapestry',
    name: 'Hand-Embroidered Mulberry Silk',
    description: '100% pure Mulberry silk threads woven by master artisans into haute couture wall tapestries.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mat_gold_mahogany',
    name: '24K Gold Leaf Inlay on Mahogany',
    description: 'Genuine 24-karat Florentine gold leaf gilded onto polished mahogany wooden panels.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mat_marble_inlay',
    name: 'Carved Carrara Marble Relief',
    description: 'Sculpted Italian Carrara marble tiles inlaid with semi-precious lapis lazuli and mother of pearl.',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop',
  },
];

export const ARTWORK_FRAMES: ArtworkFrame[] = [
  {
    id: 'frame_gold_gilded',
    name: 'Museum Gilded Gold Frame',
    description: 'Ornate antique European carved wood frame with burnished gold leaf finish.',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'frame_black_onyx',
    name: 'Minimalist Black Onyx Frame',
    description: 'Sleek matte black hard-wood molding with anti-reflective museum glass.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'frame_mahogany',
    name: 'Hand-Carved Walnut & Mahogany',
    description: 'Warm mahogany grain with gold inner filigree fillet.',
    image: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'frame_stretched',
    name: 'Frameless Gallery Stretched',
    description: 'Modern 2-inch deep gallery edge stretch with painted sides.',
    image: 'https://images.unsplash.com/photo-1579783901467-31b604eac7a8?q=80&w=800&auto=format&fit=crop',
  },
];

export const ARTWORK_SIZES: ArtworkSize[] = [
  { id: 'size_petite', name: 'Petite Atelier', dimensions: '12" x 16" (30 x 40 cm)', description: 'Ideal for intimate study rooms and executive desks.' },
  { id: 'size_grand', name: 'Grand Salon', dimensions: '24" x 36" (60 x 90 cm)', description: 'Perfect centerpiece above luxury fireplace mantels.' },
  { id: 'size_royal', name: 'Royal Statement', dimensions: '36" x 48" (90 x 120 cm)', description: 'Imposing scale designed for high-ceiling living halls.' },
  { id: 'size_masterpiece', name: 'Masterpiece Mural', dimensions: '48" x 72" (120 x 180 cm)', description: 'Museum-grade monumental canvas statement.' },
];

export const ARTWORK_BUDGETS: ArtworkBudget[] = [
  { id: 'b1', label: 'Tier I Atelier', range: '₹50,000 – ₹1,00,000' },
  { id: 'b2', label: 'Tier II Mastercraft', range: '₹1,00,000 – ₹2,50,000' },
  { id: 'b3', label: 'Tier III High Fine Art', range: '₹2,50,000 – ₹5,00,000' },
  { id: 'b4', label: 'Bespoke Unlimited', range: '₹5,00,000+' },
];
