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
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <Quote className="w-12 h-12 text-[#C9A96E]/40 mb-8" />
          
          <div className="min-h-[220px] sm:min-h-[200px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 text-[#C9A96E] mb-6">
                  {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="font-serif text-2xl sm:text-4xl text-white font-light leading-snug italic max-w-3xl mb-8">
                  "{TESTIMONIALS[current].quote}"
                </blockquote>

                {/* Author Info */}
                <div>
                  <cite className="not-italic font-medium text-white text-base block mb-1">
                    {TESTIMONIALS[current].author}
                  </cite>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-light">
                    {TESTIMONIALS[current].title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-[#C9A96E] hover:bg-white/5 transition-all"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-8 bg-[#C9A96E]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-[#C9A96E] hover:bg-white/5 transition-all"
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
