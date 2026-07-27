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
import { ThemeToggle } from '@/components/shared/theme-toggle';

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
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Left Mobile Menu Button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-foreground p-2 -ml-2 hover:text-[#C9A96E] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {/* Brand Logo */}
            <Link
              href="/"
              className="font-serif text-2xl md:text-3xl font-bold tracking-[0.25em] text-foreground hover:opacity-90 transition-opacity uppercase"
            >
              PIYELLA
            </Link>

            {/* Desktop Navigation Links */}
            {isDesktop && (
              <nav className="flex items-center space-x-8">
                {mainNavItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-xs uppercase tracking-[0.2em] font-medium text-foreground/80 hover:text-[#C9A96E] transition-colors py-2"
                    >
                      <span>{item.title}</span>
                      {item.children && <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                    </Link>

                    {item.children && (
                      <AnimatePresence>
                        {activeDropdown === item.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-56 py-3 bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-xl z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                className="block px-4 py-2 text-xs uppercase tracking-wider text-white/70 hover:text-[#C9A96E] hover:bg-white/5 transition-colors"
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
            <div className="flex items-center space-x-4 md:space-x-5">
              <ThemeToggle className="text-foreground/80 hover:text-[#C9A96E]" />

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-[#C9A96E] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {isDesktop && (
                <>
                  <Link href="/wishlist" className="text-foreground/80 hover:text-[#C9A96E] transition-colors" aria-label="Wishlist">
                    <Heart className="w-5 h-5" />
                  </Link>
                  <Link href="/account" className="text-foreground/80 hover:text-[#C9A96E] transition-colors" aria-label="Account">
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
