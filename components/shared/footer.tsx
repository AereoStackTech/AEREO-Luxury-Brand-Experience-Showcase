'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, ArrowUpRight } from 'lucide-react';
import { Container } from './container';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/lib/i18n/context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="main-footer" className="bg-[#121212] text-[#E5E0D8] border-t border-[#262626] pt-16 pb-12">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.3em] font-normal text-[#FAF8F5] block">
              A E R E O
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880]">
              {t('brand.subtitle', 'Haute Maison & Sanctuaries')}
            </p>
            <p className="text-sm text-[#9C9488] leading-relaxed font-sans pt-2">
              {t('footer.philosophy', 'Engineering the apex of human craftsmanship, horological complications, bespoke leather saddlery, and secluded private residency sanctuaries.')}
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-[#C5A880]">
              <Globe className="w-3.5 h-3.5" />
              <span>{t('footer.cities', 'Geneva · Paris · Tokyo · Milan')}</span>
            </div>
          </div>

          {/* Col 2: Collections & Offerings */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FAF8F5]">
              {t('footer.curated_collections', 'Curated Collections')}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9C9488]">
              <li>
                <Link href="/catalog?category=haute-horlogerie" className="hover:text-[#C5A880] transition-colors flex items-center justify-between group">
                  <span>{t('pillars.p1_title', 'Haute Horlogerie')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=bespoke-leather" className="hover:text-[#C5A880] transition-colors flex items-center justify-between group">
                  <span>{t('pillars.p2_title', 'Bespoke Leather Craft')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=curated-sanctuaries" className="hover:text-[#C5A880] transition-colors flex items-center justify-between group">
                  <span>{t('pillars.p3_title', 'Private Sanctuaries')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#C5A880] transition-colors flex items-center justify-between group text-xs uppercase tracking-widest text-[#C5A880] pt-1">
                  <span>{t('featured.view_all', 'Explore Full Archive')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Heritage */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FAF8F5]">
              {t('footer.sanctuary_lore', 'Sanctuary & Lore')}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9C9488]">
              <li>
                <Link href="/story" className="hover:text-[#C5A880] transition-colors">
                  {t('nav.story', 'Artisanal Heritage & Values')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C5A880] transition-colors">
                  {t('nav.faq', 'Client Concierge & FAQ')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
                  {t('nav.contact', 'Private Salon Appointments')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 text-xs text-[#8C827A] pt-1">
                  <Shield className="w-3 h-3 text-[#C5A880]" />
                  <span>{t('nav.curator', 'Curator Management Desk')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Client Liaison */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FAF8F5]">
              {t('footer.desk_title', 'Private Client Desk')}
            </h4>
            <p className="text-xs text-[#9C9488] leading-relaxed">
              {t('footer.desk_desc', 'Available 24/7 for bespoke commissions, viewing appointments, and discrete courier coordination.')}
            </p>
            <div className="border border-[#2D2D2D] p-3.5 bg-[#181818] space-y-1">
              <p className="text-[11px] uppercase tracking-widest text-[#C5A880]">{t('footer.hotline_label', 'Direct Liaison Hotline')}</p>
              <p className="text-sm font-serif text-[#FAF8F5] dir-ltr text-left">+41 22 819 0940</p>
              <p className="text-xs text-[#9C9488] dir-ltr text-left">concierge@aereostack.luxury</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & language switcher bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#736E67] gap-4">
          <p>© {new Date().getFullYear()} {t('footer.copyright', 'AEREO Haute Maison. All Rights Reserved. Engineered by AereoStack.')}</p>

          <div className="flex flex-wrap items-center gap-6">
            {/* Language Switcher in Footer */}
            <LanguageSwitcher variant="footer" />

            <div className="flex items-center space-x-6 border-s border-[#2A2A2A] ps-6">
              <Link href="/faq" className="hover:text-[#C5A880] transition-colors">
                {t('footer.security_link', 'Security & Guarantee')}
              </Link>
              <Link href="/story" className="hover:text-[#C5A880] transition-colors">
                {t('footer.provenance_link', 'Ethical Provenance')}
              </Link>
              <Link href="/admin" className="hover:text-[#C5A880] transition-colors">
                {t('footer.admin_link', 'Admin Login')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

