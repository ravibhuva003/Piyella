'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';

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
  heroBackgroundImage?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vip' | 'user';
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
  isParentAdmin?: boolean;
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

const INITIAL_COUPONS: Coupon[] = [];

const INITIAL_BANNER: BannerConfig = {
  announcementText: 'Handcrafted Bespoke Luxury Collection',
  announcementActive: false,
  heroHeadline: 'Mastery of Bespoke Luxury',
  heroSubtitle: 'Handcrafted in Italian ateliers with rare calfskin, 100% pure Mulberry silk, and Swiss automatic movements.',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop',
};

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'u_piyella_parent_admin',
    name: 'Piyella Parent Admin',
    email: 'piyella@gmail.com',
    role: 'admin',
    isParentAdmin: true,
    ordersCount: 0,
    totalSpent: 0,
    createdAt: '2026-07-27T12:00:00Z',
  },
  {
    id: 'u_ravi_admin1',
    name: 'Ravi Bhuva',
    email: 'ravibhuva577@gmail.com',
    role: 'admin',
    ordersCount: 0,
    totalSpent: 0,
    createdAt: '2026-07-27T12:00:00Z',
  },
  {
    id: 'u_ravi_admin2',
    name: 'Ravi Bhuva',
    email: 'ravibhuva003@gmail.com',
    role: 'admin',
    ordersCount: 0,
    totalSpent: 0,
    createdAt: '2026-07-27T12:00:00Z',
  },
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
    async function loadGlobalState() {
      try {
        // 1. Fetch products from global server API
        const prodRes = await fetch('/api/products').then((res) => res.json()).catch(() => ({ products: [] }));
        // 2. Fetch collections from global server API
        const colRes = await fetch('/api/collections').then((res) => res.json()).catch(() => ({ collections: [] }));
        // 3. Fetch banners from global server API
        const bannerRes = await fetch('/api/banners').then((res) => res.json()).catch(() => ({ banners: INITIAL_BANNER }));

        // Local storage fallbacks
        const savedProds = localStorage.getItem('piyella_admin_products');
        const savedCols = localStorage.getItem('piyella_admin_collections');
        const savedCoupons = localStorage.getItem('piyella_admin_coupons');
        const savedBanners = localStorage.getItem('piyella_admin_banners');
        const savedUsers = localStorage.getItem('piyella_admin_users');
        const savedOrders = localStorage.getItem('piyella_admin_orders');

        const apiProds: Product[] = prodRes.products || [];
        const apiCols: Collection[] = colRes.collections || [];

        const localProds: Product[] = savedProds 
          ? JSON.parse(savedProds).filter((p: any) => !p.id.startsWith('prod_')) 
          : [];
        
        const localCols: Collection[] = savedCols 
          ? JSON.parse(savedCols).filter((c: any) => !c.id.startsWith('col_')) 
          : [];

        // Merge API & local data (server takes precedence for multi-device sync)
        const finalProds = apiProds.length > 0 ? apiProds : localProds;
        const finalCols = apiCols.length > 0 ? apiCols : localCols;
        const finalBanners = bannerRes.banners || (savedBanners ? JSON.parse(savedBanners) : INITIAL_BANNER);

        setProducts(finalProds);
        setCollections(finalCols);
        setBanners(finalBanners);

        setCoupons(savedCoupons ? JSON.parse(savedCoupons) : INITIAL_COUPONS);
        setUsers(savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS);
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);

        // Sync local storage
        localStorage.setItem('piyella_admin_products', JSON.stringify(finalProds));
        localStorage.setItem('piyella_admin_collections', JSON.stringify(finalCols));
        localStorage.setItem('piyella_admin_banners', JSON.stringify(finalBanners));
      } catch (e) {
        console.error('Error initializing admin store:', e);
      } finally {
        setIsLoaded(true);
      }
    }

    loadGlobalState();
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('piyella_admin_products', JSON.stringify(newProducts));
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC', products: newProducts }),
      }).catch(() => {});
    } catch {}
  };

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    try {
      localStorage.setItem('piyella_admin_collections', JSON.stringify(newCollections));
      fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC', collections: newCollections }),
      }).catch(() => {});
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
      fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banners: newBanners }),
      }).catch(() => {});
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

  const addAdminUser = (name: string, email: string, role: AdminUser['role'] = 'admin') => {
    const newUser: AdminUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      role,
      ordersCount: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
    };
    saveUsers([newUser, ...users]);
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
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC', products: [] }),
      }).catch(() => {});
      fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC', collections: [] }),
      }).catch(() => {});
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
    addAdminUser,
    addOrder,
    saveProducts,
    saveCollections,
    saveOrders,
    saveCoupons,
    saveBanners,
    saveUsers,
    clearAllCatalog,
    updateOrderStatus,
  };
}
