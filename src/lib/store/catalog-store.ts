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
  { id: 'cp1', code: 'LUXE10', discountPercent: 10, minSpend: 10000, expiryDate: '2026-12-31', isActive: true, usedCount: 0 },
  { id: 'cp2', code: 'PIYELLA20', discountPercent: 20, minSpend: 50000, expiryDate: '2026-12-31', isActive: true, usedCount: 0 },
];

const INITIAL_BANNER: BannerConfig = {
  announcementText: 'Handcrafted Bespoke Luxury Collection',
  announcementActive: false,
  heroHeadline: 'Mastery of Bespoke Luxury',
  heroSubtitle: 'Handcrafted in Italian ateliers with rare calfskin, 100% pure Mulberry silk, and Swiss automatic movements.',
};

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

      setProducts(savedProds ? JSON.parse(savedProds) : []);
      setCollections(savedCols ? JSON.parse(savedCols) : []);
      setCoupons(savedCoupons ? JSON.parse(savedCoupons) : INITIAL_COUPONS);
      setBanners(savedBanners ? JSON.parse(savedBanners) : INITIAL_BANNER);
      setUsers(savedUsers ? JSON.parse(savedUsers) : []);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch (e) {
      console.error('Error initializing admin store:', e);
      setProducts([]);
      setCollections([]);
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

  const saveOrders = (newOrders: AdminOrder[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('piyella_admin_orders', JSON.stringify(newOrders));
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

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProd: Product = {
      ...product,
      id: `p_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProducts([newProd, ...products]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    const newProds = products.map((p) => (p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p));
    saveProducts(newProds);
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  const addCollection = (col: Omit<Collection, 'id' | 'createdAt'>) => {
    const newCol: Collection = {
      ...col,
      id: `c_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveCollections([newCol, ...collections]);
  };

  const deleteCollection = (id: string) => {
    saveCollections(collections.filter((c) => c.id !== id));
  };

  const addCoupon = (cp: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCp: Coupon = {
      ...cp,
      id: `cp_${Date.now()}`,
      usedCount: 0,
    };
    saveCoupons([newCp, ...coupons]);
  };

  const toggleCoupon = (id: string) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    saveCoupons(updated);
  };

  const deleteCoupon = (id: string) => {
    saveCoupons(coupons.filter((c) => c.id !== id));
  };

  const updateUserRole = (id: string, role: AdminUser['role']) => {
    const updated = users.map((u) => (u.id === id ? { ...u, role } : u));
    saveUsers(updated);
  };

  const addOrder = (order: AdminOrder) => {
    saveOrders([order, ...orders]);
  };

  const clearAllCatalog = () => {
    saveProducts([]);
    saveCollections([]);
    try {
      localStorage.removeItem('piyella_admin_products');
      localStorage.removeItem('piyella_admin_collections');
    } catch {}
  };

  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    saveOrders(updated);
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
    updateUserRole,
    addOrder,
    saveOrders,
    saveCoupons,
    saveBanners,
    saveUsers,
    clearAllCatalog,
    updateOrderStatus,
  };
}
