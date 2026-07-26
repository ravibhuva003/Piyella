'use client';

import { useState, useEffect } from 'react';

export type ArtworkStatus =
  | 'Submitted'
  | 'Under Atelier Review'
  | 'Quotation Sent'
  | 'Artisan Crafting'
  | 'Completed'
  | 'Shipped';

export interface CustomArtworkRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  material: string;
  frame: string;
  size: string;
  budget: string;
  deliveryDate: string;
  description: string;
  images: string[];
  status: ArtworkStatus;
  quotePrice?: number;
  estimatedDays?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_REQUESTS: CustomArtworkRequest[] = [
  {
    id: 'ART-9921',
    clientName: 'Lord Henry Cavendish',
    clientEmail: 'client@piyella.com',
    clientPhone: '+91 98765 43210',
    material: '24K Gold Leaf Inlay on Mahogany',
    frame: 'Museum Gilded Gold Frame',
    size: 'Royal Statement (36" x 48")',
    budget: '₹2,50,000 – ₹5,00,000',
    deliveryDate: '2026-09-15',
    description: 'Bespoke heraldic family crest with gold leaf inlay on dark mahogany panel.',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    ],
    status: 'Quotation Sent',
    quotePrice: 380000,
    estimatedDays: 45,
    adminNotes: 'Artisan Marco Bernardi assigned. Master gold gilder available.',
    createdAt: '2026-07-22T10:00:00Z',
    updatedAt: '2026-07-24T14:30:00Z',
  },
  {
    id: 'ART-8412',
    clientName: 'Lady Eleanor Vance',
    clientEmail: 'eleanor.vance@example.com',
    clientPhone: '+91 98123 45678',
    material: 'Oil on Belgic Linen Canvas',
    frame: 'Hand-Carved Walnut & Mahogany',
    size: 'Grand Salon (24" x 36")',
    budget: '₹1,00,000 – ₹2,50,000',
    deliveryDate: '2026-08-30',
    description: 'Venetian canal sunset landscape with Renaissance chiaroscuro lighting.',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    ],
    status: 'Artisan Crafting',
    quotePrice: 195000,
    estimatedDays: 30,
    adminNotes: 'Undercoat layer complete. Drying period 5 days.',
    createdAt: '2026-07-15T11:00:00Z',
    updatedAt: '2026-07-20T09:15:00Z',
  },
];

export function useArtworkStore() {
  const [requests, setRequests] = useState<CustomArtworkRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_artwork_requests');
      setRequests(saved ? JSON.parse(saved) : INITIAL_REQUESTS);
    } catch {
      setRequests(INITIAL_REQUESTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveRequests = (newRequests: CustomArtworkRequest[]) => {
    setRequests(newRequests);
    try {
      localStorage.setItem('piyella_artwork_requests', JSON.stringify(newRequests));
    } catch {}
  };

  const addArtworkRequest = (req: Omit<CustomArtworkRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newReq: CustomArtworkRequest = {
      ...req,
      id: `ART-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveRequests([newReq, ...requests]);
    return newReq;
  };

  const updateArtworkQuote = (
    id: string,
    quotePrice: number,
    estimatedDays: number,
    status: ArtworkStatus,
    adminNotes?: string
  ) => {
    const updated = requests.map((r) =>
      r.id === id
        ? {
            ...r,
            quotePrice,
            estimatedDays,
            status,
            adminNotes: adminNotes || r.adminNotes,
            updatedAt: new Date().toISOString(),
          }
        : r
    );
    saveRequests(updated);
  };

  const updateArtworkStatus = (id: string, status: ArtworkStatus) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r));
    saveRequests(updated);
  };

  return {
    requests,
    isLoaded,
    addArtworkRequest,
    updateArtworkQuote,
    updateArtworkStatus,
  };
}
