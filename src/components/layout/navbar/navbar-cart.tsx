'use client';

import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
// For demo purposes, we'll hardcode a count of 2. In a real app, this would come from a cart store/context.

export function NavbarCart() {
  const count = 2; // Mock count

  return (
    <Link href="/cart" className="relative p-1 text-foreground/80 hover:text-foreground transition-colors" aria-label="Cart">
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={count}
          className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-[#C9A96E] text-white text-[10px] font-bold px-1"
        >
          {count}
        </motion.div>
      )}
    </Link>
  );
}
