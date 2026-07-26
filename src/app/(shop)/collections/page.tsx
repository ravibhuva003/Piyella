import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/ui/animations";
import { getCollections, getProducts } from "@/lib/data";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { SortDropdown } from "@/components/shop/SortDropdown";

export default async function CollectionsPage() {
  const products = await getProducts();
  const collections = await getCollections();

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden mb-12">
        <Image 
          src="/images/collections-hero.jpg" 
          alt="All Collections" 
          fill 
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">All Collections</h1>
            <p className="text-zinc-300 font-light max-w-xl mx-auto">
              Explore our complete curation of luxury apparel, accessories, and timepieces.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-y border-zinc-800 mb-10 gap-4">
          <div className="flex items-center gap-6">
            <FilterDrawer />
            <span className="text-sm text-zinc-500 font-light">{products.length} Results</span>
          </div>
          <div className="flex items-center gap-6">
            <SortDropdown />
            <div className="hidden sm:flex gap-2">
              <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button className="p-2 text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="7"/><rect x="3" y="14" width="18" height="7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
            {products.map((product, idx) => (
              <FadeIn key={product.id} delay={(idx % 8) * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-zinc-500 font-light">
            <p>No products match your selected filters.</p>
            <button className="mt-4 text-[#C9A96E] border-b border-[#C9A96E] pb-1 hover:text-white hover:border-white transition-colors uppercase text-xs tracking-widest">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
