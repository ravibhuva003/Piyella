"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag, Star, ZoomIn, X } from "lucide-react";
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
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-[#C9A96E] selection:text-black">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs tracking-widest uppercase text-foreground-muted mb-8 font-light flex items-center gap-2">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
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
              className="relative w-full aspect-[3/4] lg:aspect-[4/5] bg-surface overflow-hidden cursor-zoom-in group rounded-2xl border border-border"
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
                <span className="text-foreground-muted uppercase tracking-widest text-xs font-light">
                  {product.category} &nbsp;|&nbsp; SKU: {product.sku}
                </span>

                {/* Real-time Inventory Badge */}
                <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                  product.inventory > 5 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : product.inventory > 0 
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {product.inventory > 5 
                    ? `In Stock (${product.inventory} available)` 
                    : product.inventory > 0 
                    ? `Low Stock: Only ${product.inventory} Left` 
                    : 'Out of Stock'}
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-serif mb-4 leading-tight text-foreground">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[#C9A96E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.ratings || 5) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm text-foreground-muted font-light">{product.reviewCount || 0} Client Reviews</span>
              </div>

              <div className="flex items-end gap-4">
                <span className="text-3xl font-serif font-medium text-foreground">{formatPrice(product.price, product.currency)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-foreground-muted line-through text-lg mb-1">{formatPrice(product.compareAtPrice, product.currency)}</span>
                )}
              </div>
            </div>

            <p className="text-foreground-muted font-light leading-relaxed mb-10 text-base">
              {product.description || "Meticulously crafted with unparalleled attention to detail, this piece embodies the essence of modern luxury and timeless elegance."}
            </p>

            {/* Colors */}
            {colorVariants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-medium text-foreground">Color: <span className="text-[#C9A96E]">{selectedColor}</span></span>
                </div>
                <div className="flex gap-3">
                  {colorVariants.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-9 h-9 rounded-full border-2 ${selectedColor === color.value ? 'border-[#C9A96E] scale-110' : 'border-transparent ring-1 ring-border'} transition-all`}
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
                  <span className="text-xs tracking-widest uppercase font-medium text-foreground">Size</span>
                  <button className="text-xs text-foreground-muted underline underline-offset-4 hover:text-foreground transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizeVariants.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.value)}
                      className={`w-14 h-12 border rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                        selectedSize === size.value 
                          ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' 
                          : 'border-border text-foreground-muted hover:border-foreground/50 hover:text-foreground bg-surface'
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
              <div className="flex items-center border border-border bg-surface rounded-xl h-14 w-full sm:w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-foreground-muted hover:text-foreground transition-colors"><Minus size={16} /></button>
                <span className="flex-1 text-center font-light text-lg text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-foreground-muted hover:text-foreground transition-colors"><Plus size={16} /></button>
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
                className={`h-14 w-14 rounded-xl flex items-center justify-center border transition-colors bg-surface ${isWishlisted ? 'border-[#C9A96E] text-[#C9A96E]' : 'border-border text-foreground-muted hover:border-foreground/50 hover:text-foreground'}`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
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
