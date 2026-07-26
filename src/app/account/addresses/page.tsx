'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Input = React.forwardRef<HTMLInputElement, any>(({ className, ...props }, ref) => (
  <input ref={ref} className={`flex h-10 w-full rounded-none border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm ring-offset-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E] focus-visible:border-[#C9A96E] ${className}`} {...props} />
));
Input.displayName = 'Input';

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addresses = [
    { id: 1, name: 'Jane Doe', street: '123 Luxury Avenue, Apt 4B', city: 'Mumbai', state: 'Maharashtra', pin: '400001', country: 'India', isDefault: true },
    { id: 2, name: 'Jane Doe', street: '456 Business Park, Floor 9', city: 'Bengaluru', state: 'Karnataka', pin: '560001', country: 'India', isDefault: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
        <Link href="/account" className="hover:text-neutral-300">Account</Link>
        <span>/</span>
        <span className="text-[#C9A96E]">Addresses</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="font-serif text-3xl text-neutral-100">Address Book</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-[#C9A96E] text-neutral-950 text-sm font-medium hover:bg-[#C9A96E]/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-neutral-900/40 border p-6 relative ${addr.isDefault ? 'border-[#C9A96E]' : 'border-neutral-800'}`}>
            {addr.isDefault && (
              <span className="absolute top-0 right-0 bg-[#C9A96E] text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                Default
              </span>
            )}
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 text-neutral-500"><MapPin size={20} /></div>
              <div>
                <h3 className="text-lg font-medium text-neutral-200 mb-2">{addr.name}</h3>
                <div className="text-sm text-neutral-400 space-y-1">
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state} {addr.pin}</p>
                  <p>{addr.country}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-800">
              <button className="text-sm text-neutral-400 hover:text-[#C9A96E] flex items-center gap-1 transition-colors">
                <Edit2 size={14} /> Edit
              </button>
              <button className="text-sm text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 max-w-lg w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="font-serif text-2xl text-neutral-100 mb-6">Add New Address</h2>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">First Name</label>
                    <Input required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Last Name</label>
                    <Input required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Street Address</label>
                  <Input required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">City</label>
                    <Input required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">State</label>
                    <Input required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">PIN Code</label>
                    <Input required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Country</label>
                    <Input defaultValue="India" disabled className="opacity-50" />
                  </div>
                </div>
                
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input type="checkbox" className="accent-[#C9A96E] w-4 h-4 bg-neutral-900 border-neutral-700" />
                  <span className="text-sm text-neutral-300">Set as default address</span>
                </label>

                <div className="pt-4 mt-6 border-t border-neutral-800 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors text-sm uppercase tracking-wider font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-[#C9A96E] text-neutral-950 hover:bg-[#C9A96E]/90 transition-colors text-sm uppercase tracking-wider font-medium">
                    Save Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
