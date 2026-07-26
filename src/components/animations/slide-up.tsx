'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function SlideUp({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.6, 0.01, -0.05, 0.95] as const,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
