import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminInquiryTable } from '@/components/features/admin-inquiry-table';
import { Button } from '@/components/ui/button';
import {
  Inbox,
  Layers,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
} from 'lucide-react';

export const revalidate = 0;

export const metadata = {
  title: 'Curator Overview | AEREO Administration',
  description: 'Manage luxury inquiries, track client status, and curate catalog masterworks.',
};

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [inquiries, products, categories] = await Promise.all([
    db.getInquiries(),
    db.getProducts(),
    db.getCategories(),
  ]);

  const pendingCount = inquiries.filter((i) => i.status === 'PENDING').length;
  const reviewingCount = inquiries.filter((i) => i.status === 'REVIEWED').length;
  const resolvedCount = inquiries.filter((i) => i.status === 'RESOLVED').length;

  return (
    <div className="space-y-10" id="admin-overview-dashboard">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DDD7CD]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55] font-medium">
            Maison Curation Console
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#141414] font-normal">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs text-[#78716C] mt-1">
            Logged in via encrypted curator pass ({session.email})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/catalog">
              <Layers className="w-3.5 h-3.5 mr-2 text-[#C5A880]" />
              Manage Catalog ({products.length})
            </Link>
          </Button>

          <Button asChild variant="luxury" size="sm">
            <Link href="/admin/inquiries">
              <Inbox className="w-3.5 h-3.5 mr-2" />
              All Inquiries ({inquiries.length})
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Pending Inquiries */}
        <div className="p-6 bg-white border border-[#DDD7CD] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-medium">
              Pending Action
            </span>
            <div className="p-1.5 bg-amber-50 border border-amber-200 text-amber-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl text-[#141414]">{pendingCount}</p>
          <p className="text-[11px] text-[#78716C]">Requires liaison assignment</p>
        </div>

        {/* Card 2: In Active Consultation */}
        <div className="p-6 bg-white border border-[#DDD7CD] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-medium">
              Active Dialogue
            </span>
            <div className="p-1.5 bg-blue-50 border border-blue-200 text-blue-800">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl text-[#141414]">{reviewingCount}</p>
          <p className="text-[11px] text-[#78716C]">In salon/digital consultation</p>
        </div>

        {/* Card 3: Resolved / Archived */}
        <div className="p-6 bg-white border border-[#DDD7CD] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-medium">
              Resolved Leads
            </span>
            <div className="p-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl text-[#141414]">{resolvedCount}</p>
          <p className="text-[11px] text-[#78716C]">Successfully coordinated</p>
        </div>

        {/* Card 4: Curated Catalog Total */}
        <div className="p-6 bg-white border border-[#DDD7CD] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-medium">
              Live Exhibitions
            </span>
            <div className="p-1.5 bg-[#FAF3E8] border border-[#C5A880] text-[#9B7E55]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl text-[#141414]">{products.length}</p>
          <p className="text-[11px] text-[#78716C]">Across {categories.length} core categories</p>
        </div>
      </div>

      {/* Main Section: Recent Inquiries Stream */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-[#141414]">Incoming Patron Inquiries</h3>
            <p className="text-xs text-[#78716C]">Review, update status, and manage client briefs.</p>
          </div>
        </div>

        <AdminInquiryTable initialInquiries={inquiries} />
      </div>
    </div>
  );
}
