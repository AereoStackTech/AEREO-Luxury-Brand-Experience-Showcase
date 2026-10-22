import React from 'react';
import { db } from '@/lib/db';
import { FaqView } from '@/components/features/faq-view';

export const revalidate = 0;

export const metadata = {
  title: 'Client Concierge & FAQ | AEREO',
  description: 'Frequently asked questions regarding bespoke commissions, armored courier delivery, authentication, and salon consultations.',
};

export default async function FaqPage() {
  const faqs = await db.getFaqs();

  return <FaqView faqs={faqs} />;
}
