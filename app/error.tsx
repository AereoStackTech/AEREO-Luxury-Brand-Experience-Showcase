'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { ShieldAlert, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF8F5] py-16">
      <Container size="default" className="text-center space-y-6 max-w-lg">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55]">
            Temporary Interruption
          </span>
          <h2 className="font-serif text-3xl text-[#141414]">
            An Unexpected Disruption Occurred
          </h2>
          <p className="text-sm text-[#78716C] leading-relaxed">
            Our private salon system encountered a momentary discrepancy. You may re-attempt the connection or return to the main gallery.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Button variant="luxury" size="sm" onClick={() => reset()}>
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            <span>Re-attempt</span>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
