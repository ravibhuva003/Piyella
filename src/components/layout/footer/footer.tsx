import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { IconInstagram, IconTwitterX, IconFacebook } from '@/components/shared/social-icons';
import { Container } from '@/components/layout/container';
import { footerNavItems } from '@/constants/navigation';
import { FooterNewsletter } from './footer-newsletter';


export function Footer() {
  return (
    <footer className="bg-background border-t border-border/30 pt-16 lg:pt-24 pb-8 overflow-hidden">
      <Container>
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 lg:mb-24">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl md:text-4xl mb-4 text-foreground">Join the Piyella World</h2>
            <p className="text-foreground-muted">
              Subscribe for exclusive access to new collections, private sales, and curated content.
            </p>
          </div>
          <FooterNewsletter />
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-heading uppercase tracking-[0.3em] font-bold text-2xl">
              PIYELLA
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
              Redefining modern luxury. Exquisite craftsmanship meets contemporary design, creating timeless pieces for the discerning individual.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 rounded-full border border-border hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Instagram">
                <IconInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Twitter">
                <IconTwitterX className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Facebook">
                <IconFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/collections" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">Shop All</Link></li>
              <li><Link href="/collections/new-arrivals" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">New Arrivals</Link></li>
              <li><Link href="/collections/best-sellers" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">Best Sellers</Link></li>
              <li><Link href="/collections/sale" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-sm">Customer Care</h3>
            <ul className="flex flex-col gap-4">
              {footerNavItems.customerService.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li><Link href="/track-order" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">Track Order</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="flex flex-col gap-4">
              {footerNavItems.company.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li><Link href="/sustainability" className="text-foreground-muted hover:text-foreground hover:translate-x-1 transition-all inline-block text-sm">Sustainability</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-foreground-muted">
            <p>&copy; {new Date().getFullYear()} Piyella. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-border"></div>
            <div className="flex gap-4">
              {footerNavItems.legal.map((item) => (
                <Link key={item.title} href={item.href} className="hover:text-foreground transition-colors">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Simple text spans for payment methods */}
            <span className="px-2 py-1 border border-border rounded text-xs font-medium">VISA</span>
            <span className="px-2 py-1 border border-border rounded text-xs font-medium">MASTERCARD</span>
            <span className="px-2 py-1 border border-border rounded text-xs font-medium">UPI</span>
            <span className="px-2 py-1 border border-border rounded text-xs font-medium">RAZORPAY</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
