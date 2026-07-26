import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  label?: string;
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, label, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          'shrink-0 bg-border flex items-center justify-center',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      >
        {label && orientation === 'horizontal' && (
          <span className="bg-background px-2 text-xs text-foreground-muted uppercase tracking-widest font-medium">
            {label}
          </span>
        )}
      </div>
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
