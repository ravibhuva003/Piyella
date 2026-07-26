import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link href="/" className={cn('font-heading uppercase tracking-[0.3em] font-medium text-foreground', sizes[size], className)}>
      Piyella
    </Link>
  );
}
