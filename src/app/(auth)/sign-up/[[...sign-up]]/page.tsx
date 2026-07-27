'use client';

import React, { useState } from 'react';
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('piyella@gmail.com');
  const [password, setPassword] = useState('piyella123');
  const [loading, setLoading] = useState(false);
  const [showAdminBypass, setShowAdminBypass] = useState(true);

  const handleAdminDirectSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/admin');
    }, 300);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex bg-surface border border-border rounded-xl p-1 text-xs uppercase font-semibold tracking-wider">
        <button
          type="button"
          onClick={() => setShowAdminBypass(true)}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            showAdminBypass ? 'bg-[#C9A96E] text-black shadow-md font-bold' : 'text-foreground-muted hover:text-foreground'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Admin Direct (No OTP)</span>
        </button>
        <button
          type="button"
          onClick={() => setShowAdminBypass(false)}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            !showAdminBypass ? 'bg-[#C9A96E] text-black shadow-md font-bold' : 'text-foreground-muted hover:text-foreground'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Standard Clerk</span>
        </button>
      </div>

      {showAdminBypass ? (
        <form onSubmit={handleAdminDirectSignUp} className="bg-surface border border-border p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-foreground font-medium">Create Admin Account</h2>
            <p className="text-xs text-foreground-muted font-light">Direct registration for <span className="text-[#C9A96E] font-medium">piyella@gmail.com</span></p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Processing...' : 'Direct Sign In / Register (No OTP)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                cardBox: 'w-full shadow-2xl',
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
