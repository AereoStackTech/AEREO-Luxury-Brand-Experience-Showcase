import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function Container({
  children,
  className,
  size = 'default',
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-[1500px]',
  };

  return (
    <div
      className={cn('w-full mx-auto px-6 sm:px-8 lg:px-12', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
