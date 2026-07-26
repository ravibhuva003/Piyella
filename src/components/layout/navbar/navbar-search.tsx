'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Container } from '@/components/layout/container';

interface NavbarSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavbarSearch({ isOpen, onClose }: NavbarSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the element is mounted before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-0 z-[60] bg-background border-b border-border shadow-md"
        >
          <Container>
            <div className="flex items-center h-24 md:h-32">
              <Search className="w-6 h-6 text-foreground/50 mr-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search our collection..."
                className="flex-1 bg-transparent border-none outline-none text-xl md:text-3xl font-heading placeholder:text-foreground/30 text-foreground"
              />
              <button
                onClick={onClose}
                className="p-2 ml-4 text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
