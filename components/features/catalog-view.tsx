'use client';

import React from 'react';
import { ProductItemData, CategoryData } from '@/lib/db';
import { Container } from '@/components/shared/container';
import { CatalogGrid } from '@/components/features/catalog-grid';
import { useLanguage } from '@/lib/i18n/context';

interface CatalogViewProps {
  products: ProductItemData[];
  categories: CategoryData[];
  initialCategory: string;
}

export function CatalogView({
  products,
  categories,
  initialCategory,
}: CatalogViewProps) {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-20 space-y-12">
      <Container size="wide">
        {/* Editorial Header */}
        <div className="space-y-4 max-w-3xl pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9B7E55] font-medium">
            {t('catalog.title', 'The Curated Archive')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            {t('featured.title', 'Curated Collections & Bespoke Offerings')}
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-sans font-light">
            {t(
              'catalog.subtitle',
              'Explore rare horological masterworks, bespoke leather luggage, and discreet private sanctum residences.'
            )}
          </p>
        </div>

        {/* Interactive Catalog Explorer */}
        <CatalogGrid
          products={products}
          categories={categories}
          initialCategory={initialCategory}
        />
      </Container>
    </div>
  );
}
