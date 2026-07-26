export interface Collection {
  id: string;
  name: string;
  title?: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
}
