import { InputHTMLAttributes, forwardRef, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, required, value, defaultValue, onChange, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    // Determine if we have a value to keep label up
    const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined ? String(defaultValue).length > 0 : false;
    const isFloating = isFocused || hasValue || props.placeholder;

    return (
      <div className="relative w-full">
        <div className="relative flex items-end border-b border-border transition-colors duration-200 focus-within:border-accent">
          {icon && (
            <div className="pb-2 pr-3 text-foreground-muted flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="relative w-full">
            <input
              ref={ref}
              className={cn(
                'peer w-full bg-transparent pt-6 pb-2 text-foreground outline-none transition-all placeholder:text-transparent focus:placeholder:text-foreground-muted',
                className
              )}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              {...props}
            />
            <label
              className={cn(
                'pointer-events-none absolute left-0 text-foreground-muted transition-all duration-300 ease-in-out',
                isFloating
                  ? '-top-1 text-xs'
                  : 'top-4 text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-xs',
                error && 'text-red-500'
              )}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
