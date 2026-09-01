import React from 'react';
import { Container } from '@/components/shared/container';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8F5]">
      <Container size="default" className="text-center space-y-4">
        <div className="w-10 h-10 mx-auto border border-[#C5A880] border-t-transparent animate-spin" />
        <span className="font-serif text-lg text-[#141414] tracking-[0.25em] block">
          A E R E O
        </span>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C827A]">
          Loading Atelier Sanctuary...
        </p>
      </Container>
    </div>
  );
}
