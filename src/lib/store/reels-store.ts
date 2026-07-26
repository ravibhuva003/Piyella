'use client';

import { useState, useEffect } from 'react';
import { InstagramReel, INITIAL_REELS } from '@/lib/data/reels-data';

export function useReelsStore() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('piyella_instagram_reels');
      setReels(saved ? JSON.parse(saved) : INITIAL_REELS);
    } catch {
      setReels(INITIAL_REELS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveReels = (newReels: InstagramReel[]) => {
    setReels(newReels);
    try {
      localStorage.setItem('piyella_instagram_reels', JSON.stringify(newReels));
    } catch {}
  };

  const addReel = (reel: Omit<InstagramReel, 'id' | 'viewsCount'>) => {
    const newReel: InstagramReel = {
      ...reel,
      id: `reel_${Date.now()}`,
      viewsCount: '1.2K',
    };
    saveReels([newReel, ...reels]);
  };

  const togglePinReel = (id: string) => {
    const updated = reels.map((r) => (r.id === id ? { ...r, isPinned: !r.isPinned } : r));
    saveReels(updated);
  };

  const deleteReel = (id: string) => {
    saveReels(reels.filter((r) => r.id !== id));
  };

  return {
    reels,
    isLoaded,
    addReel,
    togglePinReel,
    deleteReel,
  };
}
