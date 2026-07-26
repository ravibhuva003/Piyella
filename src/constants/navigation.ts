export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Collections',
    href: '/collections',
    children: [
      { title: 'Hand-Embroidered Purses', href: '/collections/embroidery-purses' },
      { title: 'Cozy Crochet Gifts', href: '/collections/crochet-gifts' },
      { title: 'Handmade Home Décor', href: '/collections/home-decor' },
      { title: 'Hair Accessories', href: '/collections/hair-accessories' },
      { title: 'Wool Thread Embroidery', href: '/collections/wool-embroidery' },
    ],
  },
  {
    title: 'Behind the Stitch',
    href: '/story',
  },
  {
    title: 'Custom Artwork',
    href: '/custom-artwork',
  },
  {
    title: 'Atelier Cinema',
    href: '/reels',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export const footerNavItems = {
  company: [
    { title: 'Behind the Stitch', href: '/story' },
    { title: 'Commission Artwork', href: '/custom-artwork' },
    { title: 'Atelier Cinema Reels', href: '/reels' },
    { title: 'About Us', href: '/about' },
  ],
  customerService: [
    { title: 'Contact Us', href: '/contact' },
    { title: 'Order History & Tracking', href: '/account/orders' },
    { title: 'Saved Wishlist', href: '/wishlist' },
    { title: 'Track Shipment', href: '/tracking/SHIP-881204' },
  ],
  legal: [
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Authenticity Guarantee', href: '/about' },
  ],
};
