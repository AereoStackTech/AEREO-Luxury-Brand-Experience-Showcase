import React from 'react';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
