'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Product } from '@/types/product';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);
  const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || '/images/placeholder.jpg';
  const secondaryImage = product.images.find(img => !img.isPrimary)?.url;
  const href = `/product/${product.slug}`;

  const badge = product.isNew 
    ? 'NEW' 
    : product.compareAtPrice && product.compareAtPrice > product.price 
    ? 'SALE' 
    : product.isFeatured 
    ? 'FEATURED' 
    : undefined;

  const getBadgeColor = (badgeName: string) => {
    switch (badgeName) {
      case 'NEW': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'SALE': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'FEATURED': return 'bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/20';
      default: return '';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-surface border border-border shadow-xl transition-all hover:shadow-2xl hover:shadow-[#C9A96E]/10"
    >
      {/* Images & Overlay */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
        <Link href={href} className="absolute inset-0 z-10">
          <span className="sr-only">View {product.name}</span>
        </Link>
        
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Secondary Image */}
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} lifestyle`}
            fill
            className="object-cover absolute inset-0 opacity-0 scale-100 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Badges */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className={cn("px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full backdrop-blur-md", getBadgeColor(badge))}>
              {badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/60 backdrop-blur-md border border-border text-foreground hover:text-[#C9A96E] transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("w-4 h-4 transition-all duration-300", isWishlisted && "fill-[#C9A96E] text-[#C9A96E] scale-110")}
          />
        </button>

        {/* Quick Add to Bag */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black text-xs uppercase tracking-widest font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted mb-2 font-medium">
          {product.category}
        </span>
        
        <Link href={href} className="group-hover:text-[#C9A96E] transition-colors">
          <h3 className="font-serif text-lg text-foreground font-medium line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-[#C9A96E] text-[#C9A96E]" />
          <span className="text-xs font-medium text-foreground">{product.ratings}</span>
          <span className="text-xs text-foreground-muted">({product.reviewCount})</span>
        </div>
        
        <div className="mt-auto flex items-center gap-2">
          <span className="text-foreground font-medium">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-foreground-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
