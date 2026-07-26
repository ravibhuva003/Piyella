'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-8 sm:p-16 border border-[#C9A96E]/30 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          
          {/* Top Gold Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent animate-pulse" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5 text-[#C9A96E]" />
            </div>

            <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-3">
              Private Invitation
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight mb-4">
              Join The Inner Circle
            </h2>

            <p className="text-white/70 font-light text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Subscribe to receive private invitations to exclusive runway previews, bespoke capsule drops, and VIP personal styling concierge services.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl max-w-md mx-auto"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">Welcome to the Inner Circle. Please check your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-black/60 border border-white/20 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:border-[#C9A96E] focus:outline-none rounded-xl font-light transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all rounded-xl shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Request Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="text-[10px] text-white/40 font-light mt-6">
              We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
