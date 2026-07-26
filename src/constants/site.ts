export const siteConfig = {
  name: 'Piyella',
  description: 'Premium luxury fashion & lifestyle — Curated elegance for the modern connoisseur.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og/default.jpg',
  creator: 'Piyella',
  keywords: ['luxury fashion', 'premium clothing', 'designer wear', 'luxury ecommerce', 'Piyella'],
  social: {
    instagram: 'https://instagram.com/piyella',
    twitter: 'https://twitter.com/piyella',
    facebook: 'https://facebook.com/piyella',
    pinterest: 'https://pinterest.com/piyella',
  },
  contact: {
    email: 'hello@piyella.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, India',
  },
} as const;
