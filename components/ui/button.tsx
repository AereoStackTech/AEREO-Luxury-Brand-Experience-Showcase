import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] disabled:pointer-events-none disabled:opacity-40 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#141414] text-[#FAF8F5] hover:bg-[#282828] border border-[#141414]',
        luxury:
          'bg-[#C5A880] text-[#111111] hover:bg-[#B39366] font-semibold border border-[#C5A880]',
        outline:
          'border border-[#141414] text-[#141414] bg-transparent hover:bg-[#141414] hover:text-[#FAF8F5]',
        outlineLuxury:
          'border border-[#C5A880] text-[#C5A880] bg-transparent hover:bg-[#C5A880] hover:text-[#111111]',
        ghost:
          'text-[#141414] hover:bg-[#EFECE6]',
        link:
          'text-[#141414] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-7 py-3',
        sm: 'h-9 px-5 text-[11px]',
        lg: 'h-13 px-9 text-[13px] tracking-[0.25em]',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
