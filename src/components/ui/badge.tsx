import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'new' | 'sale';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-accent text-accent-foreground',
      secondary: 'bg-surface-elevated text-foreground-muted',
      destructive: 'bg-red-600 text-white',
      outline: 'text-foreground border border-border',
      new: 'bg-green-600 text-white',
      sale: 'bg-red-500 text-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
