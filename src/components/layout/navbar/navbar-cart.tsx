'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';

export function NavbarCart() {
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? itemCount : 0;

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
