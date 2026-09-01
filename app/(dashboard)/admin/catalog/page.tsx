import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminCatalogManager } from '@/components/features/admin-catalog-manager';

export const revalidate = 0;

export const metadata = {
  title: 'Catalog Curation | AEREO Administration',
  description: 'Manage luxury offerings, specifications, and imagery.',
};

export default async function AdminCatalogPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [products, categories] = await Promise.all([
    db.getProducts(),
    db.getCategories(),
  ]);

  return (
    <div className="space-y-8" id="admin-catalog-page">
      <AdminCatalogManager
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
