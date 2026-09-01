import React from 'react';
import { db } from '@/lib/db';
import { Container } from '@/components/shared/container';
import { CatalogGrid } from '@/components/features/catalog-grid';

export const revalidate = 0;

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    db.getProducts(),
    db.getCategories(),
  ]);

  return (
    <div className="py-12 sm:py-20 space-y-12">
      <Container size="wide">
        {/* Editorial Header */}
        <div className="space-y-4 max-w-3xl pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9B7E55] font-medium">
            The Permanent Archive & Sanctuary Roster
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Curated Collections & Bespoke Offerings
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-sans font-light">
            Each creation is an uncompromising synthesis of rare material science, generational atelier hand-finishing, and discreet luxury. Explore our current inventory or initiate a bespoke commission.
          </p>
        </div>

        {/* Interactive Catalog Explorer */}
        <CatalogGrid
          products={products}
          categories={categories}
          initialCategory={category || 'all'}
        />
      </Container>
    </div>
  );
}
