'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, ShoppingBag, User, LogIn, Sun, Moon, ShieldCheck } from 'lucide-react';
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

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md py-4 border-b border-border/40 shadow-lg'
            : 'bg-gradient-to-b from-background/90 via-background/40 to-transparent py-6'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-foreground hover:text-accent transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link
              href="/"
              className="font-heading uppercase tracking-[0.3em] font-bold text-xl md:text-2xl text-foreground hover:opacity-90 transition-opacity"
            >
              PIYELLA
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                const isAdmin = item.title === 'Admin';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs uppercase tracking-widest transition-all hover:text-accent flex items-center gap-1 ${
                      isAdmin ? 'text-[#C9A96E] font-semibold hover:underline' :
                      isActive ? 'text-accent font-semibold' : 'text-foreground/80'
                    }`}
                  >
                    {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />}
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Icons Action Bar */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

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
                    className="p-2 text-foreground/80 hover:text-foreground transition-colors"
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
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-foreground-muted" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          href="/sign-in"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5 text-foreground-muted" />
                          <span>Sign In</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
