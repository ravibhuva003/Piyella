'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_TAGS = ['Silk Dress', 'Cashmere Coat', 'Rose Gold Watch', 'Leather Tote'];
const RECENT_SEARCHES = ['Evening Gowns', 'Diamond Earrings', 'Men\'s Suits'];

// Mock search results for demo
const MOCK_RESULTS = [
  { id: '1', title: 'Midnight Silk Slip Dress', price: 14999, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop' },
  { id: '2', title: 'Cashmere Blend Trench', price: 34500, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=300&auto=format&fit=crop' },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Mock search debounce
  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden mx-4"
          >
            {/* Search Input Area */}
            <div className="flex items-center p-6 border-b border-white/10 bg-white/5">
              <Search className="w-6 h-6 text-[#C9A96E]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collections..."
                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder:text-white/30 px-4 font-serif"
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-2 text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="w-px h-8 bg-white/20 mx-4" />
              <button onClick={onClose} className="text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Close
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {!query ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Quick Tags */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest mb-6">Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                      {QUICK_TAGS.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 text-sm border border-white/20 text-white/80 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all rounded-full"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Searches */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest mb-6">Recent Searches</h3>
                    <ul className="space-y-4">
                      {RECENT_SEARCHES.map(recent => (
                        <li key={recent}>
                          <button
                            onClick={() => setQuery(recent)}
                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                          >
                            <Clock className="w-4 h-4 group-hover:text-[#C9A96E] transition-colors" />
                            <span>{recent}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-[#C9A96E] rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest mb-6">
                        Results for "{query}"
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {MOCK_RESULTS.map(item => (
                          <Link 
                            href={`/product/${item.id}`} 
                            key={item.id}
                            onClick={onClose}
                            className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="relative w-20 h-24 overflow-hidden rounded-md bg-white/5 flex-shrink-0">
                              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h4 className="font-serif text-lg text-white group-hover:text-[#C9A96E] transition-colors line-clamp-1">{item.title}</h4>
                              <p className="text-white/60 mt-1">₹{item.price.toLocaleString()}</p>
                            </div>
                            <div className="ml-auto flex items-center">
                              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <button className="text-[#C9A96E] hover:text-[#D4B87C] font-medium tracking-wide uppercase text-sm transition-colors">
                          View all 24 results
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
