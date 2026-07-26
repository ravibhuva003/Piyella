import { Product } from '@/types/product';

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://piyella.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'LuxuryGoodsStore',
    name: 'Piyella Bespoke Luxury Atelier',
    url: baseUrl,
    logo: `${baseUrl}/images/og-image.jpg`,
    description: 'Premier Italian luxury fashion, horology, fine leather goods, and haute couture.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Montenapoleone 8',
      addressLocality: 'Milan',
      addressCountry: 'IT',
    },
    priceRange: '$$$$',
    telephone: '+919876543210',
    sameAs: [
      'https://instagram.com/piyella.official',
      'https://facebook.com/piyella.official',
    ],
  };
}

export function generateProductSchema(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://piyella.com';
  const primaryImage = product.images.find((i) => i.isPrimary)?.url || product.images[0]?.url || `${baseUrl}/images/placeholder.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [primaryImage],
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Piyella',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/product/${product.slug}`,
      priceCurrency: product.currency || 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inventory > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Piyella Luxury Atelier',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratings || 4.9,
      reviewCount: product.reviewCount || 40,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
