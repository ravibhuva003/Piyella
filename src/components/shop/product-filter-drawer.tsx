'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['All', 'Women', 'Men', 'Accessories'];
const COLORS = [
  { name: 'Onyx', value: '#1A1A1A' },
  { name: 'Gold', value: '#C9A96E' },
  { name: 'Champagne', value: '#F7E7CE' },
  { name: 'Emerald', value: '#50C878' },
  { name: 'Ivory', value: '#FFFFF0' },
  { name: 'Navy', value: '#000080' },
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export function ProductFilterDrawer({ isOpen, onClose }: ProductFilterDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName) 
        : [...prev, colorName]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const clearAll = () => {
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 50000 });
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[90vw] max-w-md bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]/95 sticky top-0 z-10">
              <h2 className="font-serif text-2xl text-[#C9A96E]">Filters</h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={clearAll}
                  className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  Clear All
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
              
              {/* Category */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-4 py-2 text-sm border rounded-full transition-all duration-300",
                        selectedCategory === category 
                          ? "bg-[#C9A96E] border-[#C9A96E] text-black" 
                          : "bg-transparent border-white/20 text-white hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest">Price Range</h3>
                  <span className="text-xs text-[#C9A96E]">₹{priceRange.min} - ₹{priceRange.max}</span>
                </div>
                <div className="pt-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full accent-[#C9A96E]"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(color => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className="group relative flex flex-col items-center gap-2"
                      >
                        <div 
                          className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                            isSelected ? "border-[#C9A96E]" : "border-transparent group-hover:border-white/30"
                          )}
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md mix-blend-difference" />}
                        </div>
                        <span className="text-[10px] text-white/60 group-hover:text-white transition-colors">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "w-12 h-12 flex items-center justify-center text-sm border transition-all duration-300",
                        selectedSizes.includes(size)
                          ? "bg-[#C9A96E] border-[#C9A96E] text-black" 
                          : "bg-transparent border-white/20 text-white hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between py-4 border-t border-white/10">
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-widest">In Stock Only</h3>
                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors duration-300",
                    inStockOnly ? "bg-[#C9A96E]" : "bg-white/20"
                  )}
                >
                  <motion.div 
                    className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"
                    animate={{ x: inStockOnly ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]/95 sticky bottom-0">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-[#C9A96E] text-black font-medium text-sm tracking-wider uppercase hover:bg-[#D4B87C] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
