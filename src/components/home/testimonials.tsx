'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container } from '@/components/layout/container';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Piyella redefines modern luxury with an unparalleled dedication to timeless Italian craftsmanship, flawless tailoring, and sustainable luxury.",
    author: "Vogue Editorial",
    title: "International Luxury Fashion Review",
    rating: 5,
  },
  {
    id: 2,
    quote: "The Heritage Skeleton Automatic timepiece stands shoulder-to-shoulder with Geneva's finest horological houses. Outstanding precision and finish.",
    author: "Robb Report",
    title: "The Ultimate Luxury Guide 2026",
    rating: 5,
  },
  {
    id: 3,
    quote: "Sublime Mulberry silk and handcrafted calfskin leather goods that elevate everyday elegance. Piyella is setting the benchmark for D2C luxury.",
    author: "GQ Magazine",
    title: "Style & Innovation Journal",
    rating: 5,
  },
  {
    id: 4,
    quote: "Receiving my Atelier Cashmere Overcoat felt like unboxing a masterpiece. Every stitch and button detail reflects uncompromising quality.",
    author: "Lord Henry Cavendish",
    title: "Verified Private VIP Client",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border relative overflow-hidden text-foreground transition-colors duration-300">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Quote Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 text-[#C9A96E] flex items-center justify-center mb-8 shadow-lg">
            <Quote className="w-7 h-7" />
          </div>

          {/* Testimonial Card Slider */}
          <div className="relative min-h-[220px] sm:min-h-[180px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={TESTIMONIALS[current].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1.5">
                  {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-xl sm:text-3xl md:text-4xl text-foreground font-medium italic leading-relaxed max-w-3xl">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-2">
                  <h4 className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                    {TESTIMONIALS[current].author}
                  </h4>
                  <p className="text-xs text-foreground-muted font-light mt-1">
                    {TESTIMONIALS[current].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-border text-foreground-muted hover:text-foreground hover:border-[#C9A96E] transition-all"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-8 bg-[#C9A96E]' : 'w-2 bg-foreground-muted/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-border text-foreground-muted hover:text-foreground hover:border-[#C9A96E] transition-all"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
}
