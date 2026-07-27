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

const INITIAL_REQUESTS: CustomArtworkRequest[] = [];

export function useArtworkStore() {
  const [requests, setRequests] = useState<CustomArtworkRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_artwork_requests');
      if (saved) {
        setRequests(JSON.parse(saved));
      } else {
        setRequests(INITIAL_REQUESTS);
      }
    } catch (e) {
      console.error('Failed to load artwork requests:', e);
      setRequests(INITIAL_REQUESTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveRequests = (newRequests: CustomArtworkRequest[]) => {
    setRequests(newRequests);
    try {
      localStorage.setItem('piyella_artwork_requests', JSON.stringify(newRequests));
    } catch (e) {
      console.error('Failed to save artwork requests:', e);
    }
  };

  const submitRequest = (
    data: Omit<CustomArtworkRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ) => {
    const newReq: CustomArtworkRequest = {
      ...data,
      id: `ART-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveRequests([newReq, ...requests]);
    return newReq;
  };

  const updateQuote = (
    id: string,
    update: {
      status: ArtworkStatus;
      quotePrice?: number;
      estimatedDays?: number;
      adminNotes?: string;
    }
  ) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          ...update,
          updatedAt: new Date().toISOString(),
        };
      }
      return req;
    });
    saveRequests(updated);
  };

  const updateArtworkQuote = (
    id: string,
    quotePrice: number,
    estimatedDays: number,
    status: ArtworkStatus = 'Quotation Sent',
    adminNotes?: string
  ) => {
    updateQuote(id, {
      status,
      quotePrice,
      estimatedDays,
      adminNotes,
    });
  };

  const updateArtworkStatus = (id: string, status: ArtworkStatus) => {
    updateQuote(id, { status });
  };

  const deleteRequest = (id: string) => {
    const updated = requests.filter((req) => req.id !== id);
    saveRequests(updated);
  };

  return {
    requests,
    isLoaded,
    submitRequest,
    addArtworkRequest: submitRequest,
    updateQuote,
    updateArtworkQuote,
    updateArtworkStatus,
    deleteRequest,
  };
}
