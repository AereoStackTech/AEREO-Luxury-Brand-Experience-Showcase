import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Container } from '@/components/shared/container';
import { ProductDetailView } from '@/components/features/product-detail-view';
import type { Metadata } from 'next';

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Creation Not Found | AEREO',
    };
  }

  return {
    title: `${product.title} | AEREO Haute Maison`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.title} | AEREO`,
      description: product.description.substring(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <Container size="wide">
        <ProductDetailView product={product} />
      </Container>
    </div>
  );
}
