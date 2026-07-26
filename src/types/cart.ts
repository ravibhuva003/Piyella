import { Product, ProductVariant } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  price: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  itemCount: number;
}
