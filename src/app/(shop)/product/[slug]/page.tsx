"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RefreshCw, ChevronDown, ChevronUp, ZoomIn, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn, SlideUp } from "@/components/ui/animations";
import { getProductBySlug, getProducts, formatPrice } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductReviews } from "@/components/shop/product-reviews";
import { RecentlyViewed } from "@/components/shop/recently-viewed";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery & Selections
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const [isAdding, setIsAdding] = useState(false);

  const cart = useCart();
  const wishlist = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const prod = await getProductBySlug(slug);
        if (!prod) {
          notFound();
          return;
        }
        setProduct(prod);
        addRecentlyViewed(prod);
        
        const colorVariants = prod.variants?.filter(v => v.type === 'color') || [];
        const sizeVariants = prod.variants?.filter(v => v.type === 'size') || [];

        if (colorVariants.length > 0) setSelectedColor(colorVariants[0].value);
        if (sizeVariants.length > 0) setSelectedSize(sizeVariants[0].value);

        // Fetch related
        const allProds = await getProducts();
        setRelatedProducts(allProds.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, 4));
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images.map(img => img.url);
  const colorVariants = product.variants?.filter(v => v.type === 'color') || [];
  const sizeVariants = product.variants?.filter(v => v.type === 'size') || [];
  const isWishlisted = wishlist.isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (sizeVariants.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const selectedVariant = product.variants?.find(v => 
      (v.type === 'size' && v.value === selectedSize) || 
      (v.type === 'color' && v.value === selectedColor)
    );
    
    cart.addItem(product, quantity, selectedVariant);
    setIsAdding(false);
  };

  const toggleWishlist = () => {
    wishlist.toggleWishlist(product);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-[#C9A96E] selection:text-black">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs tracking-widest uppercase text-zinc-500 mb-8 font-light flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Left Column: Image Gallery & Lightbox Trigger */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 h-fit sticky top-24">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar w-full lg:w-20 shrink-0">
              {images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-24 shrink-0 transition-all rounded-lg overflow-hidden ${activeImage === idx ? 'opacity-100 ring-2 ring-[#C9A96E]' : 'opacity-50 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            
            <div 
              onClick={() => setIsZoomOpen(true)}
              className="relative w-full aspect-[3/4] lg:aspect-[4/5] bg-zinc-900 overflow-hidden cursor-zoom-in group rounded-2xl border border-white/10"
            >
              <Image 
                src={images[activeImage] || '/images/placeholder.jpg'} 
                alt={product.name} 
                fill 
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white/80 group-hover:text-[#C9A96E] transition-colors">
                <ZoomIn size={18} />
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col py-4">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-zinc-500 uppercase tracking-widest text-xs font-light">
                  {product.category} &nbsp;|&nbsp; SKU: {product.sku}
                </span>

                {/* Real-time Inventory Badge */}
                <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                  product.inventory > 5 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : product.inventory > 0 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {product.inventory > 5 
                    ? `In Stock (${product.inventory} available)` 
                    : product.inventory > 0 
                    ? `Low Stock: Only ${product.inventory} Left` 
                    : 'Out of Stock'}
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[#C9A96E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.ratings || 5) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm text-zinc-400 font-light">{product.reviewCount || 128} Client Reviews</span>
              </div>

              <div className="flex items-end gap-4">
                <span className="text-3xl font-serif font-medium text-white">{formatPrice(product.price, product.currency)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-zinc-500 line-through text-lg mb-1">{formatPrice(product.compareAtPrice, product.currency)}</span>
                )}
              </div>
            </div>

            <p className="text-zinc-300 font-light leading-relaxed mb-10 text-base">
              {product.description || "Meticulously crafted with unparalleled attention to detail, this piece embodies the essence of modern luxury and timeless elegance."}
            </p>

            {/* Colors */}
            {colorVariants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-medium">Color: <span className="text-[#C9A96E]">{selectedColor}</span></span>
                </div>
                <div className="flex gap-3">
                  {colorVariants.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-9 h-9 rounded-full border-2 ${selectedColor === color.value ? 'border-[#C9A96E] scale-110' : 'border-transparent ring-1 ring-zinc-700'} transition-all`}
                      style={{ backgroundColor: color.value.toLowerCase() }}
                      aria-label={`Select color ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizeVariants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-medium">Size</span>
                  <button className="text-xs text-zinc-400 underline underline-offset-4 hover:text-white transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizeVariants.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.value)}
                      className={`w-14 h-12 border rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                        selectedSize === size.value 
                          ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white'
                      }`}
                    >
                      {size.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-zinc-800 rounded-xl h-14 w-full sm:w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-zinc-400 hover:text-white transition-colors"><Minus size={16} /></button>
                <span className="flex-1 text-center font-light text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-zinc-400 hover:text-white transition-colors"><Plus size={16} /></button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || product.inventory === 0}
                className="flex-1 h-14 bg-[#C9A96E] hover:bg-[#D4B87C] text-black uppercase tracking-widest text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#C9A96E]/20"
              >
                {isAdding ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    {product.inventory === 0 ? 'Out of Stock' : 'Add to Bag'}
                  </>
                )}
              </button>

              <button 
                onClick={toggleWishlist}
                className={`h-14 w-14 rounded-xl flex items-center justify-center border transition-colors ${isWishlisted ? 'border-[#C9A96E] text-[#C9A96E]' : 'border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white'}`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-col gap-3 py-6 border-y border-zinc-900 mb-8">
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-light">
                <Truck size={18} className="text-[#C9A96E]" /> <span>Complimentary Express Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-light">
                <ShieldCheck size={18} className="text-[#C9A96E]" /> <span>100% Certified Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-light">
                <RefreshCw size={18} className="text-[#C9A96E]" /> <span>30-Day Easy Returns & Exchanges</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="flex flex-col">
              {[
                { id: "specifications", label: "Product Specifications", content: "Crafted from 100% premium materials. Designed in Milan, Italy. Intricate detailing and perfect tailoring ensure an impeccable fit." },
                { id: "care", label: "Materials & Care", content: "Dry clean only. Do not bleach. Store in a cool, dry place away from direct sunlight. Handle with care to maintain the pristine condition." },
                { id: "shipping", label: "Shipping & Returns", content: "Orders are processed within 24 hours. Complimentary express shipping worldwide. Returns accepted within 30 days of delivery in original unused condition." }
              ].map((tab) => (
                <div key={tab.id} className="border-b border-zinc-900">
                  <button 
                    onClick={() => setActiveTab(activeTab === tab.id ? "" : tab.id)}
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-xs tracking-widest uppercase font-medium group-hover:text-[#C9A96E] transition-colors">{tab.label}</span>
                    {activeTab === tab.id ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeTab === tab.id ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">{tab.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-zinc-900">
            <SlideUp>
              <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">Complete the Look</h2>
            </SlideUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((prod, idx) => (
                <FadeIn key={prod.id} delay={idx * 0.1}>
                  <ProductCard product={prod} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        <RecentlyViewed excludeId={product.id} />

      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close zoom"
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl aspect-[3/4] rounded-2xl overflow-hidden">
            <Image src={images[activeImage] || '/images/placeholder.jpg'} alt={product.name} fill className="object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}
