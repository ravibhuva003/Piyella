'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Menu, X, Heart, ShieldCheck, LogIn } from 'lucide-react';

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
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex flex-col w-full transition-all duration-300',
          isScrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-md' : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
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
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/80 hover:text-[#C9A96E] transition-colors py-2"
                  >
                    {item.title}
                  </Link>
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

                  {/* Account / Admin Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <Link
                      href="/account"
                      className="text-foreground/80 hover:text-[#C9A96E] transition-colors flex items-center gap-1 py-2"
                      aria-label="Account"
                    >
                      <User className="w-5 h-5" />
                    </Link>

                    <AnimatePresence>
                      {showUserDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full w-52 py-2 mt-1 bg-surface border border-border shadow-2xl rounded-xl z-50 overflow-hidden"
                        >
                          <Link
                            href="/admin"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#C9A96E] hover:bg-muted/50 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                            <span>Admin Portal</span>
                          </Link>
                          
                          <div className="h-px bg-border my-1" />

                          <Link
                            href="/account"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-foreground-muted" />
                            <span>My Profile</span>
                          </Link>

                          <Link
                            href="/sign-in"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            <LogIn className="w-3.5 h-3.5 text-foreground-muted" />
                            <span>Sign In</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
