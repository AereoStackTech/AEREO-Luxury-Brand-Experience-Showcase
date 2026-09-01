import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-none border border-[#DDD7CD] bg-white px-4 py-2 text-sm text-[#141414] placeholder:text-[#9C9488] transition-colors focus-visible:outline-none focus-visible:border-[#C5A880] focus-visible:ring-1 focus-visible:ring-[#C5A880] disabled:cursor-not-allowed disabled:opacity-50 font-sans',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
