'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className={cn('w-9 h-9 flex items-center justify-center', className)}>
        <Sun className="w-5 h-5 text-foreground/40" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-full transition-all hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-foreground',
        className
      )}
      aria-label="Toggle light/dark theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#C9A96E] hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-[#C9A96E] hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
