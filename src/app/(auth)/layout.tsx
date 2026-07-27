import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
      {/* Ambient Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <Link 
        href="/" 
        className="font-serif tracking-[0.3em] uppercase text-2xl font-bold text-white mb-8 hover:text-[#C9A96E] transition-colors relative z-10"
      >
        PIYELLA
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>

      <p className="relative z-10 text-xs text-white/40 font-light mt-8">
        &copy; {new Date().getFullYear()} Piyella. All Rights Reserved.
      </p>
    </main>
  );
}
