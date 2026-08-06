export interface ProductReview {
  id: string;
  productId: string;
  productName?: string;
  author: string;
  email?: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
  createdAt: string;
  likes?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  category: string;
  subcategory?: string;
  collectionId?: string;
  tags: string[];
  variants: ProductVariant[];
  inventory: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  ratings: number;
  reviewCount: number;
  reviews?: ProductReview[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material';
  value: string;
  price?: number;
  inventory: number;
  sku: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'name';
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}
