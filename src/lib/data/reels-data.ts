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

export const INITIAL_REELS: InstagramReel[] = [];
