'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Search, User, Heart } from 'lucide-react';
import { IconInstagram, IconTwitterX, IconFacebook } from '@/components/shared/social-icons';
import { mainNavItems } from '@/constants/navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background h-[100dvh] w-full"
        >
          <div className="flex items-center justify-between px-6 h-16 md:h-20 border-b border-border/50">
            <Link 
              href="/" 
              className="font-heading uppercase tracking-[0.3em] font-semibold text-lg"
              onClick={onClose}
            >
              PIYELLA
            </Link>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
            <nav className="flex flex-col gap-6">
              {mainNavItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {item.children ? (
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className="flex items-center justify-between w-full text-left font-heading text-2xl"
                      >
                        {item.title}
                        <ChevronDown 
                          className={cn(
                            "w-5 h-5 transition-transform duration-300", 
                            expandedItem === item.title ? "rotate-180" : ""
                          )} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItem === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-border/50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                onClick={onClose}
                                className="text-lg text-foreground/70 py-1"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block font-heading text-2xl"
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div 
              className="mt-auto flex flex-col gap-6 pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col gap-4">
                <Link href="/search" onClick={onClose} className="flex items-center gap-3 text-lg">
                  <Search className="w-5 h-5" /> Search
                </Link>
                <Link href="/account" onClick={onClose} className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5" /> Account
                </Link>
                <Link href="/account/wishlist" onClick={onClose} className="flex items-center gap-3 text-lg">
                  <Heart className="w-5 h-5" /> Wishlist
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <a href="#" className="text-foreground/60 hover:text-[#C9A96E] transition-colors"><IconInstagram className="w-5 h-5" /></a>
                <a href="#" className="text-foreground/60 hover:text-[#C9A96E] transition-colors"><IconTwitterX className="w-5 h-5" /></a>
                <a href="#" className="text-foreground/60 hover:text-[#C9A96E] transition-colors"><IconFacebook className="w-5 h-5" /></a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
