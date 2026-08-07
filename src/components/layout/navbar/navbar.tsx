'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, User, LogIn, ShieldCheck } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { mainNavItems } from '@/constants/navigation';
import { Container } from '@/components/layout/container';
import { MobileMenu } from './mobile-menu';
import { NavbarCart } from './navbar-cart';
import { NavbarSearch } from './navbar-search';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isSignedIn } = useUser();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeroTransparent = isHomepage && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeroTransparent
            ? 'bg-gradient-to-b from-black via-black/70 to-transparent py-6 text-white'
            : isScrolled
            ? 'bg-background/95 backdrop-blur-md py-4 border-b border-border/40 shadow-xl text-foreground'
            : 'bg-background/90 backdrop-blur-md py-5 border-b border-border/30 text-foreground'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 -ml-2 lg:hidden transition-colors ${
                isHeroTransparent ? 'text-white hover:text-[#C9A96E]' : 'text-foreground hover:text-accent'
              }`}
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link
              href="/"
              className={`font-heading uppercase tracking-[0.3em] font-bold text-xl md:text-2xl transition-all ${
                isHeroTransparent
                  ? 'text-white hover:text-[#C9A96E]'
                  : 'text-foreground hover:opacity-90'
              }`}
            >
              PIYELLA
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs uppercase tracking-widest transition-all ${
                      isHeroTransparent
                        ? isActive
                          ? 'text-[#C9A96E] font-semibold'
                          : 'text-white/90 hover:text-[#C9A96E]'
                        : isActive
                        ? 'text-accent font-semibold'
                        : 'text-foreground/80 hover:text-accent'
                    }`}
                  >
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Icons Action Bar */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle Button */}
              <ThemeToggle className={isHeroTransparent ? 'text-[#C9A96E] hover:bg-white/10' : ''} />

              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 transition-colors ${
                  isHeroTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-foreground'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Admin Portal Access Button */}
              <Link
                href="/admin-login"
                className={`px-3 py-1.5 border text-xs uppercase font-semibold tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-sm ${
                  isHeroTransparent
                    ? 'bg-[#C9A96E]/20 hover:bg-[#C9A96E]/30 border-[#C9A96E]/60 text-[#C9A96E]'
                    : 'bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 border-[#C9A96E]/40 text-[#C9A96E]'
                }`}
                title="Admin Executive Portal Login"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Admin</span>
              </Link>

              {/* User Profile Action */}
              {isSignedIn ? (
                <div className="flex items-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 rounded-full border border-border hover:border-accent transition-colors',
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`p-2 transition-colors ${
                      isHeroTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-foreground'
                    }`}
                    aria-label="User Account"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full w-48 py-2 mt-1 bg-surface border border-border shadow-2xl rounded-xl z-50 overflow-hidden"
                      >
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-foreground-muted" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          href="/sign-in"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5 text-foreground-muted" />
                          <span>Sign In</span>
                        </Link>

                        <Link
                          href="/sign-up"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider text-[#C9A96E] hover:text-[#D4B87C] hover:bg-muted/50 transition-colors font-semibold"
                        >
                          <User className="w-3.5 h-3.5 text-[#C9A96E]" />
                          <span>Sign Up</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Cart Icon */}
              <div className={isHeroTransparent ? 'text-white/90 hover:text-white' : ''}>
                <NavbarCart />
              </div>
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
