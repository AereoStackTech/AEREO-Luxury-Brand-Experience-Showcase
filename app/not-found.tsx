import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF8F5] py-20">
      <Container size="default" className="text-center space-y-6 max-w-lg">
        <Compass className="w-12 h-12 mx-auto text-[#C5A880] stroke-1" />

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9B7E55]">
            404 · Uncharted Domain
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#141414]">
            This Creation or Page Does Not Exist
          </h1>
          <p className="text-sm text-[#78716C] leading-relaxed">
            The archive record you are seeking may have been archived, transferred to private collection, or relocated.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-4">
          <Button asChild variant="luxury" size="sm">
            <Link href="/catalog" className="flex items-center gap-2">
              <span>Explore Active Offerings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <span>Return to Sanctuary</span>
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
