'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { products as mockProducts } from '@/data/mock-products';
import { collections as mockCollections } from '@/data/mock-collections';

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  expiryDate: string;
  isActive: boolean;
  usedCount: number;
}

export interface BannerConfig {
  announcementText: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubtitle: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vip' | 'user';
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  createdAt: string;
  giftPackaging?: {
    enabled: boolean;
    boxStyleName: string;
    recipientName: string;
    senderName: string;
    message: string;
    boxPrice: number;
  };
}

const INITIAL_COUPONS: Coupon[] = [
  { id: 'cp1', code: 'LUXE10', discountPercent: 10, minSpend: 10000, expiryDate: '2026-12-31', isActive: true, usedCount: 142 },
  { id: 'cp2', code: 'PIYELLA20', discountPercent: 20, minSpend: 50000, expiryDate: '2026-12-31', isActive: true, usedCount: 89 },
  { id: 'cp3', code: 'VIPATELIER', discountPercent: 25, minSpend: 100000, expiryDate: '2026-12-31', isActive: true, usedCount: 34 },
];

const INITIAL_BANNER: BannerConfig = {
  announcementText: 'Complimentary Express Worldwide Shipping on Orders Above ₹2,999',
  announcementActive: true,
  heroHeadline: 'Mastery of Bespoke Luxury',
  heroSubtitle: 'Handcrafted in Italian ateliers with rare calfskin, 100% pure Mulberry silk, and Swiss automatic movements.',
};

const INITIAL_USERS: AdminUser[] = [
  { id: 'u1', name: 'Ravi Bhuva', email: 'ravibhuva003@gmail.com', role: 'admin', ordersCount: 8, totalSpent: 645000, createdAt: '2026-01-10T10:00:00Z' },
  { id: 'u2', name: 'Eleanor Vance', email: 'eleanor.vance@example.com', role: 'vip', ordersCount: 5, totalSpent: 420000, createdAt: '2026-02-15T10:00:00Z' },
  { id: 'u3', name: 'Julian Mercer', email: 'julian.mercer@example.com', role: 'user', ordersCount: 2, totalSpent: 185000, createdAt: '2026-03-20T10:00:00Z' },
];

const INITIAL_ORDERS: AdminOrder[] = [
  { id: 'ORD-8472', customerName: 'Ravi Bhuva', customerEmail: 'ravibhuva003@gmail.com', itemsCount: 2, totalAmount: 280000, status: 'Processing', trackingNumber: 'SHIP-992481', createdAt: '2026-07-24T14:30:00Z' },
  { id: 'ORD-6391', customerName: 'Eleanor Vance', customerEmail: 'eleanor.vance@example.com', itemsCount: 1, totalAmount: 185000, status: 'Delivered', trackingNumber: 'SHIP-881204', createdAt: '2026-07-18T09:15:00Z' },
  { id: 'ORD-5219', customerName: 'Julian Mercer', customerEmail: 'julian.mercer@example.com', itemsCount: 3, totalAmount: 125000, status: 'Shipped', trackingNumber: 'SHIP-773192', createdAt: '2026-07-15T11:45:00Z' },
];

export function useCatalogStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [banners, setBanners] = useState<BannerConfig>(INITIAL_BANNER);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProds = localStorage.getItem('piyella_admin_products');
      const savedCols = localStorage.getItem('piyella_admin_collections');
      const savedCoupons = localStorage.getItem('piyella_admin_coupons');
      const savedBanners = localStorage.getItem('piyella_admin_banners');
      const savedUsers = localStorage.getItem('piyella_admin_users');
      const savedOrders = localStorage.getItem('piyella_admin_orders');

      setProducts(savedProds ? JSON.parse(savedProds) : mockProducts);
      setCollections(savedCols ? JSON.parse(savedCols) : mockCollections);
      setCoupons(savedCoupons ? JSON.parse(savedCoupons) : INITIAL_COUPONS);
      setBanners(savedBanners ? JSON.parse(savedBanners) : INITIAL_BANNER);
      setUsers(savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS);
      setOrders(savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS);
    } catch (e) {
      console.error('Error initializing admin store:', e);
      setProducts(mockProducts);
      setCollections(mockCollections);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('piyella_admin_products', JSON.stringify(newProducts));
    } catch {}
  };

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    try {
      localStorage.setItem('piyella_admin_collections', JSON.stringify(newCollections));
    } catch {}
  };

  const saveCoupons = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    try {
      localStorage.setItem('piyella_admin_coupons', JSON.stringify(newCoupons));
    } catch {}
  };

  const saveBanners = (newBanners: BannerConfig) => {
    setBanners(newBanners);
    try {
      localStorage.setItem('piyella_admin_banners', JSON.stringify(newBanners));
    } catch {}
  };

  const saveUsers = (newUsers: AdminUser[]) => {
    setUsers(newUsers);
    try {
      localStorage.setItem('piyella_admin_users', JSON.stringify(newUsers));
    } catch {}
  };

  const saveOrders = (newOrders: AdminOrder[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('piyella_admin_orders', JSON.stringify(newOrders));
    } catch {}
  };

  // Product Actions
  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `p_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // Category Actions
  const addCollection = (collection: Omit<Collection, 'id' | 'createdAt'>) => {
    const newCollection: Collection = {
      ...collection,
      id: `c_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...collections, newCollection];
    saveCollections(updated);
  };

  const deleteCollection = (id: string) => {
    const updated = collections.filter((c) => c.id !== id);
    saveCollections(updated);
  };

  // Coupon Actions
  const addCoupon = (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: `cp_${Date.now()}`,
      usedCount: 0,
    };
    saveCoupons([newCoupon, ...coupons]);
  };

  const toggleCoupon = (id: string) => {
    saveCoupons(coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  const deleteCoupon = (id: string) => {
    saveCoupons(coupons.filter((c) => c.id !== id));
  };

  // Order Actions
  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    saveOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // User Actions
  const updateUserRole = (id: string, role: AdminUser['role']) => {
    saveUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return {
    products,
    collections,
    coupons,
    banners,
    users,
    orders,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    addCollection,
    deleteCollection,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    saveBanners,
    saveOrders,
    updateOrderStatus,
    updateUserRole,
  };
}
