'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, Sparkles, Scissors, Feather, Award, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';

export default function StoryPage() {
  const steps = [
    {
      number: '01',
      title: 'Selection of Pure Silk & Merino Wool',
      description: 'We source 100% pure Mulberry silk from historic Italian mills and un-spun organic Merino wool from sustainable heritage farms.',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
    },
    {
      number: '02',
      title: 'Botanical Sketching on Belgian Linen',
      description: 'Master embroiderers draw custom botanical motifs directly onto unbleached linen canvas, balancing classical Renaissance symmetry.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    },
    {
      number: '03',
      title: '100+ Hours of Single-Needle French Knots',
      description: 'Using fine 24K gold foil thread and silk floss, each French knot and bullion stitch is applied by hand over weeks of devotion.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    },
    {
      number: '04',
      title: 'Velvet Lining & Signature Crest Seal',
      description: 'Every purse and tapestry is hand-stitched with Mulberry silk lining, sealed with our brass crest, and inspected for perfection.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        
        {/* Story Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
            <Feather className="w-4 h-4" />
            <span>The Handcrafted Legacy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium leading-tight">
            Handcrafted with Soul, Thread & Devotion
          </h1>
          <p className="text-white/70 font-light text-base leading-relaxed">
            In an era of mass automation, Piyella stands as a sanctuary for traditional needlework. Every purse, crochet throw, and velvet cushion carries the warmth of human hands and centuries of Italian embroidery mastery.
          </p>
        </div>

        {/* Behind the Stitch Process */}
        <section className="space-y-16 mb-24">
          <div className="text-center space-y-2">
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block">
              Craftsmanship Unveiled
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Behind the Stitch: Our 4-Stage Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((st) => (
              <div key={st.number} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="font-mono text-3xl font-bold text-[#C9A96E] block">{st.number}</span>
                  <h3 className="font-serif text-2xl text-white font-medium">{st.title}</h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{st.description}</p>
                </div>
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <Image src={st.image} alt={st.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Artist Section */}
        <section className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-14 mb-24 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block">
              Artisan Guild Spotlight
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium">
              Meet Master Embroiderer Beatrice Vane
            </h2>
            <p className="text-white/70 font-light text-sm leading-relaxed">
              &ldquo;Needlework is a form of slow meditation. When I stitch gold thread into Mulberry silk, I am weaving patience, history, and emotion into a piece that will outlast generations.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="Beatrice Vane" fill className="object-cover" />
            </div>

            <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">25+ Years of Florentine Needlework</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Trained in the historic ateliers of Florence and Venice, Beatrice leads our team of 14 female artisans. Each purse and cushion is hand-signed and numbered by the master artisan who crafted it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C9A96E]">120+</span>
                  <span className="text-white/50 block">Hours Spent Per Purse</span>
                </div>
                <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C9A96E]">100%</span>
                  <span className="text-white/50 block">Natural Organic Threads</span>
                </div>
              </div>

              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 w-fit"
              >
                <span>Explore Handcrafted Curation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </Container>
    </main>
  );
}
