'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Menu, X, Heart, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { useMediaQuery } from '@/hooks/use-media-query';
import { mainNavItems } from '@/constants/navigation';
import { Container } from '@/components/layout/container';

import { MobileMenu } from './mobile-menu';
import { NavbarSearch } from './navbar-search';
import { NavbarCart } from './navbar-cart';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { direction: scrollDirection } = useScrollDirection();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideNav = scrollDirection === 'down' && isScrolled;

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex flex-col w-full transition-colors duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ y: hideNav ? -120 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-foreground text-background relative flex items-center justify-center px-4 py-2 text-xs md:text-sm font-medium tracking-wide"
            >
              <p className="text-[#C9A96E]">Free Shipping on Orders Above ₹2,999</p>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-4 p-1 hover:text-[#C9A96E] transition-colors"
                aria-label="Close announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <Container>
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Logo */}
            <Link 
              href="/" 
              className={cn(
                "font-heading uppercase tracking-[0.3em] font-semibold text-lg md:text-xl",
                !isDesktop ? "absolute left-1/2 -translate-x-1/2" : ""
              )}
            >
              PIYELLA
            </Link>

            {/* Desktop Navigation */}
            {isDesktop && (
              <nav className="hidden lg:flex items-center space-x-8">
                {mainNavItems.map((item) => (
                  <div 
                    key={item.title}
                    className="relative group"
                    onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                    onMouseLeave={() => item.children && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                    >
                      <span>{item.title}</span>
                      {item.children && <ChevronDown className="w-3 h-3" />}
                    </Link>
                    
                    {/* Hover Underline */}
                    <span className="absolute left-0 bottom-1 w-0 h-px bg-foreground transition-all duration-300 ease-out group-hover:w-full" />

                    {/* Dropdown Menu */}
                    {item.children && (
                      <AnimatePresence>
                        {activeDropdown === item.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-48 py-2 mt-1 bg-background border border-border shadow-lg rounded-sm"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {isDesktop && (
                <>
                  <Link href="/account/wishlist" className="text-foreground/80 hover:text-foreground transition-colors" aria-label="Wishlist">
                    <Heart className="w-5 h-5" />
                  </Link>
                  <Link href="/account" className="text-foreground/80 hover:text-foreground transition-colors" aria-label="Account">
                    <User className="w-5 h-5" />
                  </Link>
                </>
              )}

              <NavbarCart />
            </div>
          </div>
        </Container>
      </motion.header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      <NavbarSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
