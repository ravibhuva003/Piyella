import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/shop/product-card';
import { Container } from '@/components/layout/container';
import { getCollections, getProducts } from '@/lib/data';
import { Sparkles, ArrowRight } from 'lucide-react';

export default async function CollectionsPage() {
  const products = await getProducts();
  const collections = await getCollections();

  const curatedCollections = [
    { name: 'New Arrivals', slug: 'new-arrivals', count: products.filter((p) => p.isNew || (p as any).isNewArrival).length || 6, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Best Sellers', slug: 'best-sellers', count: products.filter((p) => (p as any).isBestSeller || p.ratings >= 4.8).length || 5, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop' },
    { name: 'Special Sale', slug: 'sale', count: products.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price)).length || 4, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-[#C9A96E] selection:text-black">
      {/* 1. Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden mb-16 border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop"
          alt="All Piyella Collections"
          fill
          priority
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Master Atelier Curations</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-light text-white leading-tight">
            All Atelier Collections
          </h1>

          <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Explore our complete curation of luxury handcrafted purses, pure silk scarves, velvet home accents, and bespoke art.
          </p>
        </div>
      </section>

      <Container>
        {/* 2. Featured Category Collections Grid */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-heading text-2xl text-white font-light">Featured Curations</h2>
            <span className="text-xs text-[#C9A96E] font-mono uppercase tracking-wider">Handcrafted Special Categories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedCollections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group relative h-64 rounded-3xl overflow-hidden border border-white/15 p-6 flex flex-col justify-end transition-all duration-300 hover:border-[#C9A96E]/60 shadow-xl"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] text-[#C9A96E] uppercase font-mono tracking-widest block">
                    {col.count} Items
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium flex items-center justify-between">
                    <span>{col.name}</span>
                    <ArrowRight className="w-5 h-5 text-[#C9A96E] group-hover:translate-x-1 transition-transform" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Full Product Catalog */}
        <section className="space-y-8">
          <div className="flex items-center justify-between py-4 border-y border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                Full Catalog ({products.length} Products)
              </span>
            </div>
            <span className="text-xs text-white/40 font-mono">Worldwide Delivery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
