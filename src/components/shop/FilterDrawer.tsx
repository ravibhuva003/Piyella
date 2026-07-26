'use client';

import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductFilterDrawer } from './product-filter-drawer';

export interface FilterDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterDrawer({ isOpen: controlledIsOpen, onClose: controlledOnClose }: FilterDrawerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalIsOpen;
  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <>
      {!isControlled && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white uppercase tracking-widest transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C9A96E]" />
          <span>Filters</span>
        </button>
      )}
      <ProductFilterDrawer isOpen={open} onClose={handleClose} />
    </>
  );
}
