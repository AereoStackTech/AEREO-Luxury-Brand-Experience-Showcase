import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]',
  {
    variants: {
      variant: {
        default: 'border border-[#C5A880]/40 bg-[#FAF3E8] text-[#8C6D38]',
        secondary: 'border border-[#DDD7CD] bg-[#F3EFEA] text-[#5C564E]',
        gold: 'border border-[#C5A880] bg-[#C5A880]/15 text-[#856123] font-semibold',
        dark: 'border border-[#2D2D2D] bg-[#1A1A1A] text-[#FAF8F5]',
        pending: 'border border-amber-300 bg-amber-50 text-amber-900',
        reviewed: 'border border-blue-300 bg-blue-50 text-blue-900',
        resolved: 'border border-emerald-300 bg-emerald-50 text-emerald-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
