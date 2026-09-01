import React from 'react';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import { adminLogoutAction } from '@/app/actions/admin';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import {
  Shield,
  LayoutDashboard,
  Layers,
  Inbox,
  LogOut,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#141414] flex flex-col font-sans">
      {/* Top Curator Bar */}
      <header className="sticky top-0 z-40 bg-[#141414] text-[#FAF8F5] border-b border-[#282828] py-3.5 shadow-md">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-2.5">
              <span className="font-serif text-xl tracking-[0.25em] text-[#FAF8F5]">
                A E R E O
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#C5A880]/50 bg-[#C5A880]/15 text-[#DFCA9B] font-medium">
                Curator Desk
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-xs uppercase tracking-[0.18em]">
              <Link
                href="/admin"
                className="text-[#DDD7CD] hover:text-[#C5A880] transition-colors py-1 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Overview</span>
              </Link>
              <Link
                href="/admin/inquiries"
                className="text-[#DDD7CD] hover:text-[#C5A880] transition-colors py-1 flex items-center gap-1.5"
              >
                <Inbox className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Inquiries</span>
              </Link>
              <Link
                href="/admin/catalog"
                className="text-[#DDD7CD] hover:text-[#C5A880] transition-colors py-1 flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Catalog Curation</span>
              </Link>
            </nav>
          </div>

          {/* Right Session & Exit */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs uppercase tracking-widest text-[#9C9488] hover:text-[#FAF8F5] transition-colors hidden sm:flex items-center gap-1"
            >
              <span>Public Salon</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {session?.isAuthenticated ? (
              <form action={adminLogoutAction}>
                <Button
                  type="submit"
                  variant="outlineLuxury"
                  size="sm"
                  className="text-[10px] h-8 px-3 tracking-widest border-[#444] text-[#E5D7C3] hover:bg-[#222]"
                >
                  <LogOut className="w-3 h-3 mr-1.5" />
                  <span>Exit Session</span>
                </Button>
              </form>
            ) : (
              <Button asChild variant="luxury" size="sm" className="text-[10px] h-8 px-3">
                <Link href="/admin/login">Curator Login</Link>
              </Button>
            )}
          </div>
        </Container>
      </header>

      {/* Sub Navigation Bar for Mobile */}
      <div className="md:hidden bg-[#1F1F1F] border-b border-[#333] px-6 py-2 flex items-center space-x-4 text-[11px] uppercase tracking-wider text-[#DDD7CD] overflow-x-auto">
        <Link href="/admin" className="hover:text-[#C5A880] py-1 whitespace-nowrap">
          Overview
        </Link>
        <Link href="/admin/inquiries" className="hover:text-[#C5A880] py-1 whitespace-nowrap">
          Inquiries
        </Link>
        <Link href="/admin/catalog" className="hover:text-[#C5A880] py-1 whitespace-nowrap">
          Catalog
        </Link>
        <Link href="/" target="_blank" className="hover:text-[#C5A880] py-1 whitespace-nowrap ml-auto">
          Public Salon ↗
        </Link>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-10">
        <Container size="wide">{children}</Container>
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#DDD7CD] py-6 text-center text-xs text-[#8C827A]">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>AEREO Luxury Administrative Console — Authorized Curators Only.</p>
          <p className="font-mono text-[10px] text-[#A8A29E]">Prisma ORM · PostgreSQL Relational Core</p>
        </Container>
      </footer>
    </div>
  );
}
