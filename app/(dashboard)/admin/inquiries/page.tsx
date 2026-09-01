import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminInquiryTable } from '@/components/features/admin-inquiry-table';

export const revalidate = 0;

export const metadata = {
  title: 'Client Inquiries Archive | AEREO Administration',
  description: 'Manage, review, and resolve private patron inquiries.',
};

export default async function AdminInquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const inquiries = await db.getInquiries();

  return (
    <div className="space-y-6" id="admin-inquiries-page">
      <div className="space-y-1">
        <h2 className="font-serif text-3xl text-[#141414]">Patron Consultations & Inquiries</h2>
        <p className="text-xs text-[#78716C]">
          Encrypted archive of all client consultation requests, bespoke orders, and private viewing bookings.
        </p>
      </div>

      <AdminInquiryTable initialInquiries={inquiries} />
    </div>
  );
}
