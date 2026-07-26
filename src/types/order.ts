import { CartItem } from './cart';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

export interface PaymentInfo {
  method: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  last4?: string;
  cardBrand?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  trackingNumber?: string;
  trackingUrl?: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
