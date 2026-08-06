import { getServerProducts, getServerCollections } from '@/lib/server-data';
import { SingleCollectionView } from '@/components/shop/single-collection-view';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SingleCollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collections = getServerCollections();
  const allProducts = getServerProducts();

  const foundCol = collections.find(
    (c) => c.slug === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase()
  );

  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const collection = foundCol || {
    id: `col_${slug}`,
    name: formattedTitle,
    title: `${formattedTitle} Curation`,
    slug: slug,
    description: `Explore our curated selection of luxury ${formattedTitle.toLowerCase()} creations, handcrafted with unyielding devotion.`,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1000&auto=format&fit=crop',
    productCount: 0,
    isFeatured: true,
    sortOrder: 99,
    createdAt: new Date().toISOString(),
  };

  const targetId = collection.id;
  const colSlug = collection.slug || slug;
  const colName = collection.name || slug;

  let products = [];
  if (colSlug === 'new-arrivals') {
    products = allProducts.filter((p) => p.isNew || (p as any).isNewArrival || p.tags?.includes('new-arrivals'));
  } else if (colSlug === 'best-sellers') {
    products = allProducts.filter((p) => (p as any).isBestSeller || (p.ratings && p.ratings >= 4.8) || p.tags?.includes('best-sellers'));
  } else if (colSlug === 'sale') {
    products = allProducts.filter((p) => (p as any).isSale || (p.compareAtPrice && p.compareAtPrice > p.price) || p.tags?.includes('sale'));
  } else {
    products = allProducts.filter((p) => {
      const matchId = p.collectionId === targetId || p.collectionId === colSlug || p.collectionId === colName;
      const matchCat = p.category && (
        p.category.toLowerCase() === colSlug.toLowerCase() ||
        p.category.toLowerCase() === colName.toLowerCase() ||
        p.category.toLowerCase().includes(colSlug.toLowerCase()) ||
        colSlug.toLowerCase().includes(p.category.toLowerCase())
      );
      const matchTags = p.tags?.some((t) => 
        t.toLowerCase() === colSlug.toLowerCase() || 
        t.toLowerCase() === colName.toLowerCase()
      );
      return matchId || matchCat || matchTags;
    });
  }

  return (
    <SingleCollectionView
      slug={slug}
      initialCollection={collection as any}
      initialProducts={products}
    />
  );
}
