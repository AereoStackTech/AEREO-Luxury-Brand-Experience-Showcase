import React from 'react';
import { db } from '@/lib/db';
import { HomeView } from '@/components/features/home-view';

export const revalidate = 0; // Dynamic server-rendered

export default async function HomePage() {
  const [featuredProducts, categories, testimonials] = await Promise.all([
    db.getProducts({ featuredOnly: true }),
    db.getCategories(),
    db.getTestimonials(),
  ]);

  return (
    <HomeView
      featuredProducts={featuredProducts}
      categories={categories}
      testimonials={testimonials}
    />
  );
}
