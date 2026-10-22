'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { useLanguage } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.collections', 'Collections & Sanctuaries'), href: '/catalog' },
    { label: t('nav.story', 'Artisanal Heritage'), href: '/story' },
    { label: t('nav.faq', 'Client Support & FAQ'), href: '/faq' },
    { label: t('nav.contact', 'Private Relations'), href: '/contact' },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <header
      id="main-header"
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DA] py-3.5 shadow-xs'
          : 'bg-transparent border-b border-[#E8E3DA]/60 py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            id="brand-logo-link"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-normal text-[#121212] group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
              A E R E O
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#8C827A] font-sans -mt-0.5 whitespace-nowrap">
              {t('brand.subtitle', 'Haute Maison & Sanctuaries')}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs uppercase tracking-[0.18em] xl:tracking-[0.2em] transition-all duration-200 py-1 font-medium whitespace-nowrap shrink-0',
                  isActive
                    ? 'text-[#C5A880] border-b border-[#C5A880]'
                    : 'text-[#5C564E] hover:text-[#141414]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center space-x-3 sm:space-x-4 shrink-0" id="header-actions">
          {/* Language Changer Button */}
          <LanguageSwitcher variant="header" />

          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.16em] text-[#8C827A] hover:text-[#141414] transition-colors flex items-center gap-1.5 px-2 py-1 whitespace-nowrap shrink-0"
          >
            <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t('nav.curator', 'Curator Portal')}</span>
          </Link>

          <Button asChild variant="luxury" size="sm" id="header-inquire-btn" className="whitespace-nowrap shrink-0">
            <Link href="/contact" className="flex items-center gap-2">
              <span>{t('nav.consultation', 'Private Consultation')}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Actions & Hamburger Trigger */}
        <div className="flex items-center lg:hidden space-x-2">
          <div className="sm:hidden">
            <LanguageSwitcher variant="header" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#141414]" /> : <Menu className="h-6 w-6 text-[#141414]" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAF8F5] border-b border-[#DDD7CD] shadow-2xl p-6 sm:p-8 animate-in slide-in-from-top-2 duration-300 z-50 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col space-y-6">
            {/* Mobile Language Changer Segment */}
            <div className="border-b border-[#E8E3DA] pb-5">
              <LanguageSwitcher variant="mobile" />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-4 border-b border-[#E8E3DA] pb-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-sm uppercase tracking-[0.2em] font-medium py-1.5 flex items-center justify-between',
                      isActive ? 'text-[#C5A880] font-semibold' : 'text-[#2D2A26]'
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowIcon className="w-4 h-4 text-[#8C827A]" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-2 flex flex-col space-y-3">
              <Button asChild variant="luxury" className="w-full justify-center">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.request_consultation', 'Request Private Consultation')}
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full justify-center text-xs tracking-widest">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="w-3.5 h-3.5 mr-2 text-[#C5A880]" />
                  {t('nav.admin_access', 'Admin Curator Access')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

