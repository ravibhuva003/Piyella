import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/ui/animations";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/data";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { SortDropdown } from "@/components/shop/SortDropdown";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SingleCollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  
  if (!collection) {
    notFound();
  }

  const products = await getProductsByCollection(slug);

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden mb-12">
        <Image 
          src={collection.image || "/images/collections-hero.jpg"} 
          alt={collection.title || collection.name} 
          fill 
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">{collection.title || collection.name}</h1>
            <p className="text-zinc-300 font-light">
              {collection.description || "Discover our curated selection of premium pieces designed for the modern connoisseur."}
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
            <p>No products found in this collection.</p>
          </div>
        )}
      </div>
    </main>
  );
}
