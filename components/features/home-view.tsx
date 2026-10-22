'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItemData, CategoryData, TestimonialData } from '@/lib/db';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Crown,
  Quote,
  Feather,
  Globe2,
} from 'lucide-react';

interface HomeViewProps {
  featuredProducts: ProductItemData[];
  categories: CategoryData[];
  testimonials: TestimonialData[];
}

export function HomeView({
  featuredProducts,
  categories,
  testimonials,
}: HomeViewProps) {
  const { t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Cinematic Editorial Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#0F0F0F] text-[#FAF8F5] overflow-hidden -mt-[65px] pt-[65px]">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2400&q=90"
            alt="AEREO Luxury Horology and Haute Craft"
            fill
            priority
            className="object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0F0F0F]/60 to-[#0F0F0F]" />
        </div>

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 sm:py-28 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#C5A880]/40 bg-[#1A1A1A]/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#E5D7C3] font-medium">
              {t('hero.badge', 'Geneva · Paris · Tokyo Private Salons')}
            </span>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] text-[#FAF8F5]">
              {t('hero.title', 'The Apex of Craftsmanship & Refined Sanctuaries')}
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#C8C2B7] max-w-2xl mx-auto font-light leading-relaxed">
              {t(
                'hero.subtitle',
                'Engineered for patrons of uncompromising taste. Bespoke horological complications, hand-saddled French calfskin trunks, and private aviation residencies.'
              )}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button asChild variant="luxury" size="lg" className="w-full sm:w-auto tracking-[0.25em]">
              <Link href="/catalog" className="flex items-center gap-2">
                <span>{t('hero.explore', 'Explore Curated Offerings')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </Button>

            <Button asChild variant="outlineLuxury" size="lg" className="w-full sm:w-auto tracking-[0.2em]">
              <Link href="/story">
                <span>{t('hero.heritage', 'Artisanal Heritage')}</span>
              </Link>
            </Button>
          </div>

          {/* Micro Stat Assurances */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-[#2D2D2D]/80 text-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">{t('hero.provenance', 'Provenance')}</p>
              <p className="text-xs text-[#FAF8F5] font-serif mt-0.5">{t('hero.provenance_desc', 'Swiss Chronometric Cert.')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">{t('hero.craft', 'Artisanal Touch')}</p>
              <p className="text-xs text-[#FAF8F5] font-serif mt-0.5">{t('hero.craft_desc', 'Over 400 Hours / Piece')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">{t('hero.security', 'Security')}</p>
              <p className="text-xs text-[#FAF8F5] font-serif mt-0.5">{t('hero.security_desc', 'Discrete Vault Delivery')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">{t('hero.sanctuary', 'Sanctuary')}</p>
              <p className="text-xs text-[#FAF8F5] font-serif mt-0.5">{t('hero.sanctuary_desc', 'Private Island & Jet Escort')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Brand Philosophy / Sanctuary Pillars */}
      <section className="pt-8">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#9B7E55] font-medium">
                  {t('pillars.badge', 'Pillars of Haute Excellence')}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] font-normal leading-tight">
                  {t('pillars.title', 'Three Disciplines of Uncompromising Mastercraft')}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
                {t(
                  'pillars.subtitle',
                  'Every creation is individually commissioned, numbered, and recorded in our permanent Genevan archives.'
                )}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 border border-[#C5A880]/50 bg-[#FAF3E8] text-[#9B7E55] shrink-0 mt-0.5">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-lg text-[#141414]">{t('pillars.p1_title', 'Haute Horlogerie')}</h4>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      {t('pillars.p1_desc', 'Tourbillons, perpetual astronomical complications, and hand-chamfered bridges crafted in the Swiss Jura Vallée.')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 border border-[#C5A880]/50 bg-[#FAF3E8] text-[#9B7E55] shrink-0 mt-0.5">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-lg text-[#141414]">{t('pillars.p2_title', 'Bespoke Leather Craft')}</h4>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      {t('pillars.p2_desc', 'Traditional saddle-stitched trunks and travel vaults forged from vegetable-tanned French calfskin and aerospace-grade titanium.')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 border border-[#C5A880]/50 bg-[#FAF3E8] text-[#9B7E55] shrink-0 mt-0.5">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-lg text-[#141414]">{t('pillars.p3_title', 'Private Sanctuaries')}</h4>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      {t('pillars.p3_desc', 'Architecturally secluded alpine retreats, coastal havens, and discrete private airstrip estates engineered for undisturbed serenity.')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild variant="outline" size="sm" className="tracking-[0.2em]">
                  <Link href="/story">{t('nav.story', 'Read Full Brand Manifesto')}</Link>
                </Button>
              </div>
            </div>

            {/* Editorial Showcase Image Banner */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative aspect-3/4 bg-[#ECE8E1] border border-[#DDD7CD] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
                  alt="AEREO Leather craftsmanship"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="35vw"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative aspect-3/4 bg-[#ECE8E1] border border-[#DDD7CD] overflow-hidden translate-y-6 sm:translate-y-10">
                <Image
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85"
                  alt="AEREO Watch movement"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="35vw"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Featured Curated Offerings Grid */}
      <section className="pt-8">
        <Container size="wide" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E3DA] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55] font-medium">
                {t('featured.badge', 'Curated Offerings')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] font-normal">
                {t('featured.title', 'Featured Masterworks & Residencies')}
              </h2>
            </div>

            <Button asChild variant="outline" size="sm" className="tracking-[0.2em]">
              <Link href="/catalog" className="flex items-center gap-2">
                <span>{t('featured.view_all', 'Examine Full Archive')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => {
              const img =
                product.images?.[0] ||
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80';

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between space-y-4 border border-[#E5E0D8] bg-white p-5 hover:border-[#C5A880] transition-all duration-300"
                >
                  <div className="relative aspect-4/5 w-full bg-[#ECE8E1] overflow-hidden">
                    <Image
                      src={img}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 start-3">
                      <Badge variant="gold">
                        <Sparkles className="w-3 h-3 me-1" />
                        {t('featured.badge', 'Atelier Focus')}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A]">
                      {product.category?.name || 'Exclusive Offering'}
                    </span>
                    <h3 className="font-serif text-2xl text-[#141414] group-hover:text-[#9B7E55] transition-colors">
                      <Link href={`/catalog/${product.slug}`}>{product.title}</Link>
                    </h3>
                    <p className="text-xs text-[#78716C] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                    <span className="font-serif text-lg text-[#141414]">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <Button asChild variant="outline" size="sm" className="text-[10px] tracking-[0.18em]">
                      <Link href={`/catalog/${product.slug}`} className="flex items-center gap-1.5">
                        <span>{t('featured.piece_detail', 'Examine Piece')}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Curated Testimonials / Press Showcase */}
      <section className="bg-[#141414] text-[#FAF8F5] py-24 border-y border-[#262626]">
        <Container size="wide" className="space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium">
              {t('testimonials.badge', 'Patron Testimonials')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF8F5]">
              {t('testimonials.title', 'Voices of the Haute Circle')}
            </h2>
            <p className="text-xs text-[#8C827A] max-w-lg mx-auto">
              {t('testimonials.subtitle', 'Reflections from private collectors, distinguished diplomats, and families of legacy across continents.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-8 border border-[#2D2D2D] bg-[#1A1A1A] space-y-6 flex flex-col justify-between relative"
              >
                <Quote className="w-8 h-8 text-[#C5A880]/30 absolute top-6 end-6" />

                <p className="font-serif text-lg text-[#E5E0D8] leading-relaxed italic relative z-10">
                  &ldquo;{test.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-[#2E2E2E] space-y-0.5">
                  <p className="font-medium text-sm text-[#FAF8F5] tracking-wide">{test.author}</p>
                  <p className="text-xs text-[#C5A880] font-sans">{test.roleOrPublication}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Private Consultation Callout Section */}
      <section>
        <Container size="default">
          <div className="border border-[#DDD7CD] bg-[#FAF8F5] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#9B7E55] font-medium">
                {t('cta.badge', 'Bespoke Private Client Office')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] font-normal">
                {t('cta.title', 'Commission an Irreplaceable Masterwork')}
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed font-sans max-w-xl mx-auto">
                {t(
                  'cta.subtitle',
                  'Whether seeking a personalized tourbillon commission, tailored leather luggage set, or discreet salon viewing, our senior curators await your inquiry.'
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="luxury" size="lg" className="tracking-[0.25em]">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>{t('cta.button', 'Initiate Confidential Inquiry')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="tracking-[0.2em]">
                <Link href="/faq">
                  <span>{t('nav.faq', 'Review Client Concierge')}</span>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
