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
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'Admin',
    href: '/admin-login',
  },
];

export const footerNavItems = {
  company: [
    { title: 'Behind the Stitch', href: '/story' },
    { title: 'Commission Artwork', href: '/custom-artwork' },
    { title: 'Cinema Reels', href: '/reels' },
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
