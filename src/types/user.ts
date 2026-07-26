import { Address } from './order';

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[]; // Product IDs
  preferences?: UserPreferences;
  createdAt: string;
}
