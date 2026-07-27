'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Container } from '@/components/layout/container';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanEmail === 'piyella@gmail.com' && cleanPass === 'piyella@123') {
      // Set secure admin session cookie & localStorage
      document.cookie = 'piyella_admin_session=true; path=/; max-age=86400; SameSite=Lax';
      try {
        localStorage.setItem('piyella_admin_session', 'true');
      } catch {}

      // Hard browser redirect to Executive Admin Portal
      window.location.href = '/admin';
    } else {
      setErrorMsg('Invalid admin email or password. Access restricted to authorized parent administrator.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center py-20 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleAdminLogin}
            className="bg-surface border border-border p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A96E] via-[#D4B87C] to-[#C9A96E]" />

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] flex items-center justify-center mx-auto mb-3 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.3em] font-semibold block">
                Executive Portal
              </span>
              <h1 className="font-serif text-3xl text-foreground font-medium">
                Admin Authentication
              </h1>
              <p className="text-xs text-foreground-muted font-light leading-relaxed">
                Enter your admin credentials to access executive controls.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your admin email"
                    className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
              <span>{loading ? 'Authenticating Admin...' : 'Access Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}
