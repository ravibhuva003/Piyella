'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Feather, 
  Award, 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  Gem,
  Compass
} from 'lucide-react';
import { Container } from '@/components/layout/container';

export function AboutContent() {
  const stats = [
    { value: '100+', label: 'Stitch Hours Per Piece', description: 'Meticulous single-needle embroidery' },
    { value: '100%', label: 'Organic Materials', description: 'Pure Mulberry silk & Merino wool' },
    { value: '14', label: 'Master Female Artisans', description: 'Preserving heritage Italian needlework' },
    { value: '40+', label: 'Countries Delivered', description: 'Worldwide luxury door-step shipping' },
  ];

  const pillars = [
    {
      icon: Scissors,
      title: 'Handmade Artistry',
      description:
        'Every handbag, scarf, and velvet piece is painstakingly embroidered using traditional French knot and bullion stitch techniques.',
    },
    {
      icon: Feather,
      title: 'Sustainable Elegance',
      description:
        'We partner exclusively with ethical Italian silk mills and organic heritage farms prioritizing zero-waste and cruelty-free practices.',
    },
    {
      icon: Gem,
      title: 'Bespoke Customization',
      description:
        'Access our Master Studio for custom-commissioned artwork, personalized monograms, and one-of-a-kind bespoke creations.',
    },
    {
      icon: ShieldCheck,
      title: 'Authenticated Heirloom',
      description:
        'Every creation comes with a hand-signed Certificate of Authenticity and a unique serial-numbered signature brass crest.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Ethical Sourcing',
      desc: 'Selecting pure Mulberry silk floss, 24K gold foil thread, and organic un-spun wool.',
    },
    {
      step: '02',
      title: 'Botanical Sketching',
      desc: 'Hand-drafting Renaissance motifs and botanical patterns onto unbleached Belgian linen.',
    },
    {
      step: '03',
      title: 'Master Needlework',
      desc: 'Over 100 hours of continuous hand-stitching by master embroiderers in our studio.',
    },
    {
      step: '04',
      title: 'Brass Crest Seal',
      desc: 'Rigorous quality inspection, hand-signed artisan tag, and brass seal application.',
    },
  ];

  return (
    <div className="pt-28 pb-24 text-foreground selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* 1. Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>The House of Piyella • Est. 2024</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl font-light text-foreground leading-tight tracking-wide"
          >
            Where Heritage Craftsmanship Meets <span className="italic font-serif text-[#C9A96E]">Timeless Luxury</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground-muted font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Piyella was born out of a deep reverence for slow fashion, artisanal needlework, and unyielding elegance. We handcraft modern heirlooms designed to outlast trends and pass down through generations.
          </motion.p>
        </div>

        {/* 2. Key Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28"
        >
          {stats.map((st, i) => (
            <div
              key={i}
              className="bg-surface backdrop-blur-md border border-border p-6 rounded-2xl text-center space-y-2 hover:border-[#C9A96E]/50 transition-all duration-300 group shadow-sm"
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A96E] group-hover:scale-105 transition-transform duration-300">
                {st.value}
              </div>
              <div className="text-sm font-medium text-foreground tracking-wide">{st.label}</div>
              <div className="text-xs text-foreground-muted font-light">{st.description}</div>
            </div>
          ))}
        </motion.div>

        {/* 3. Heritage & Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
              alt="Piyella Craftsmanship"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white">
              <div className="flex items-center gap-3 text-[#C9A96E]">
                <Award className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">Master Needlework Guild</span>
              </div>
              <p className="text-xs text-white/80 mt-2 font-light">
                Hand-stitched in limited batches using 24K gold foil thread and Mulberry silk.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[#C9A96E] text-xs font-medium uppercase tracking-[0.25em]">
              <Compass className="w-4 h-4" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-light text-foreground leading-tight">
              Redefining Luxury Through <span className="italic font-serif text-[#C9A96E]">Slow Artistry</span>
            </h2>

            <p className="text-foreground-muted font-light text-sm sm:text-base leading-relaxed">
              In a fast-paced world dominated by synthetic mass production, Piyella stands as a sanctuary for traditional embroidery. We believe that true luxury requires time, patience, and human emotion.
            </p>

            <blockquote className="p-5 border-l-2 border-[#C9A96E] bg-surface rounded-r-2xl italic text-foreground text-sm font-serif">
              &ldquo;True luxury is not created in minutes; it is built over weeks of devotion, single-needle precision, and quiet passion.&rdquo;
            </blockquote>

            <ul className="space-y-3 pt-2">
              {[
                '100% Transparent, ethical fair-wage artisan employment',
                'Zero mass-factory production; strictly limited production batches',
                'Hand-numbered signature crest on every finished piece',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/story"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/custom-artwork"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface hover:bg-muted text-foreground border border-border font-semibold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                <span>Request Custom Artwork</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 4. Four Pillars Grid */}
        <section className="mb-28 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-semibold block">
              Core Principles
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-foreground">
              The Four Pillars of Piyella
            </h2>
            <p className="text-foreground-muted font-light text-sm">
              Our unwavering commitment to craftsmanship, sustainability, and authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-surface border border-border p-8 rounded-3xl space-y-4 hover:border-[#C9A96E]/50 transition-all duration-300 group flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground font-medium">{pil.title}</h3>
                    <p className="text-xs text-foreground-muted font-light leading-relaxed">{pil.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Process Stage */}
        <section className="mb-28 bg-surface border border-border rounded-3xl p-8 sm:p-14 space-y-12 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block">
              Craftsmanship Lifecycle
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground font-light">
              From Raw Silk to Finished Heirloom
            </h2>
            <p className="text-foreground-muted text-sm font-light">
              Each piece progresses through four stringent stages of creation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((ps, idx) => (
              <div key={idx} className="bg-background border border-border p-6 rounded-2xl space-y-3 relative overflow-hidden">
                <span className="font-mono text-4xl font-bold text-[#C9A96E]/20 absolute top-4 right-4 select-none">
                  {ps.step}
                </span>
                <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider block">Stage {ps.step}</span>
                <h4 className="font-serif text-lg text-foreground font-medium">{ps.title}</h4>
                <p className="text-xs text-foreground-muted font-light leading-relaxed">{ps.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-surface border border-[#C9A96E]/30 p-10 sm:p-16 text-center space-y-6 shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-foreground leading-tight">
              Experience the Elegance of <span className="italic font-serif text-[#C9A96E]">Piyella</span>
            </h2>
            <p className="text-foreground-muted font-light text-sm sm:text-base">
              Explore our latest seasonal curations or commission a customized piece crafted exclusively for you.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/collections"
                className="px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
              >
                Browse Collections
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-background hover:bg-muted text-foreground border border-border font-semibold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
