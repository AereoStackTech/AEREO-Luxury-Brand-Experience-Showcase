import React from 'react';
import { db } from '@/lib/db';
import { CatalogView } from '@/components/features/catalog-view';

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
    <CatalogView
      products={products}
      categories={categories}
      initialCategory={category || 'all'}
    />
  );
}
