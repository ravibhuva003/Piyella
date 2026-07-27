'use client';

import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCollection } from '@/components/home/featured-collection';
import { CategoryShowcase } from '@/components/home/category-showcase';
import { BestSellers } from '@/components/home/best-sellers';
import { TestimonialsSection } from '@/components/home/testimonials';
import { products, collections } from '@/lib/data';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-[#C9A96E] selection:text-black">
      {/* 1. Animated Luxury Hero */}
      <HeroSection />

      {/* 2. Handcrafted Categories Showcase */}
      <CategoryShowcase />

      {/* 3. Handcrafted Best Sellers Grid */}
      <BestSellers products={products} />

      {/* 4. Featured Parallax Collection */}
      <FeaturedCollection collections={collections} />

      {/* 5. VIP Reviews & Testimonials */}
      <TestimonialsSection />
    </main>
  );
}
