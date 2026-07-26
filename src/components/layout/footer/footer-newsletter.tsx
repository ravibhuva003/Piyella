'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes('@')) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="w-full lg:w-auto min-w-[320px]">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 bg-transparent border-b border-border/50 pb-2 outline-none text-foreground placeholder:text-foreground-muted focus:border-[#C9A96E] transition-colors rounded-none w-full sm:min-w-[300px]"
            required
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !email}
            className="flex items-center justify-center gap-2 pb-2 border-b border-transparent text-[#C9A96E] font-medium hover:border-[#C9A96E] transition-all disabled:opacity-50 disabled:hover:border-transparent uppercase tracking-wider text-sm mt-4 sm:mt-0"
          >
            {status === 'loading' ? (
              <span className="inline-block animate-pulse">Subscribing...</span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-1 text-green-500"><Check className="w-4 h-4" /> Subscribed</span>
            ) : status === 'error' ? (
              <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-4 h-4" /> Error</span>
            ) : (
              <>
                Subscribe <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        
        {/* Status Message */}
        <div className="absolute top-full mt-2 left-0 right-0 h-6">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-500"
              >
                Thank you for subscribing to our newsletter.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500"
              >
                Please enter a valid email address.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
