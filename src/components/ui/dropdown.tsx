'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'left', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignments = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 mt-2 w-56 origin-top-right rounded-md border border-border bg-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              alignments[align],
              className
            )}
            onClick={() => setIsOpen(false)}
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

export function DropdownItem({ children, disabled, destructive, className, ...props }: DropdownItemProps) {
  return (
    <div
      className={cn(
        'block w-full px-4 py-2 text-sm text-left transition-colors cursor-pointer',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : destructive
          ? 'text-red-500 hover:bg-red-500/10'
          : 'text-foreground hover:bg-surface-elevated hover:text-accent',
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </div>
  );
}
