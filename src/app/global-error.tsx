'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { captureException } from '@/lib/monitoring/error-logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-[#C9A96E]">
        <div className="max-w-md w-full text-center space-y-6 bg-[#0a0a0a] border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-white">An Unexpected Error Occurred</h1>
            <p className="text-xs text-white/60 font-light">
              Our engineering team has been notified. Please try refreshing the session.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Session</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
