'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ReturnRequestModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReturnRequestModal({ orderId, isOpen, onClose }: ReturnRequestModalProps) {
  const [reason, setReason] = useState('Size Exchange Needed');
  const [comments, setComments] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      alert(`Return/Exchange Request for Order ${orderId} submitted! Shiprocket reverse pickup scheduled.`);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 text-white">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#C9A96E]" />
            <h3 className="font-serif text-2xl text-white font-medium">Return / Exchange Request</h3>
          </div>

          {submitted ? (
            <div className="py-8 text-center text-emerald-400 space-y-2">
              <CheckCircle2 className="w-12 h-12 mx-auto" />
              <p className="font-serif text-xl">Return Ticket Registered!</p>
              <p className="text-xs text-white/60">Our Shiprocket reverse pickup courier will arrive within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Return Reason *</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                >
                  <option value="Size Exchange Needed">Size Exchange Needed</option>
                  <option value="Item Damaged / Defect">Item Damaged / Defect</option>
                  <option value="Color Swap">Color Swap</option>
                  <option value="Buyer Remorse">Buyer Remorse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Pickup Address</label>
                <textarea
                  rows={2}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Address for Shiprocket reverse courier pickup..."
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Comments / Special Instructions</label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Mention desired size or refund preference..."
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-[11px] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Items must be unwashed with original luxury tags intact.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
              >
                Schedule Reverse Pickup
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
