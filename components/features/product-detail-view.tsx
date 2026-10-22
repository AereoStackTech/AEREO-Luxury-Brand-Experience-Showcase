'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { ProductItemData } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InquiryForm } from './inquiry-form';
import { useLanguage } from '@/lib/i18n/context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProductDetailViewProps {
  product: ProductItemData;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { t, isRtl } = useLanguage();
  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const specs = product.specifications as Record<string, string> | null;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-16" id={`product-detail-${product.slug}`}>
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#8C827A]" aria-label="Breadcrumb">
        <Link href="/catalog" className="hover:text-[#141414] transition-colors flex items-center gap-1">
          <BackArrow className="w-3.5 h-3.5" />
          <span>{t('product.back', 'Collections')}</span>
        </Link>
        <ChevronIcon className="w-3 h-3 text-[#DDD7CD]" />
        {product.category && (
          <>
            <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-[#141414] transition-colors">
              {product.category.name}
            </Link>
            <ChevronIcon className="w-3 h-3 text-[#DDD7CD]" />
          </>
        )}
        <span className="text-[#141414] font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Showcase Grid: Gallery + Editorial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Multi-Angle Interactive Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Primary View */}
          <div className="relative aspect-4/5 w-full bg-[#ECE8E1] border border-[#E5E0D8] overflow-hidden">
            <Image
              src={images[activeImageIndex]}
              alt={`${product.title} - View ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover object-center transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 60vw"
              referrerPolicy="no-referrer"
            />

            {product.isFeatured && (
              <div className="absolute top-6 start-6">
                <Badge variant="gold" className="backdrop-blur-md">
                  <Sparkles className="w-3 h-3 me-1" />
                  {t('featured.badge', 'Limited Masterwork')}
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 pt-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                      : 'border-[#DDD7CD] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="20vw"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Narrative, Specs & Acquisition Consultation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Category & Status */}
            <div className="flex items-center space-x-3">
              {product.category && (
                <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55] font-medium">
                  {product.category.name}
                </span>
              )}
              <span className="text-[#DDD7CD]">·</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A]">
                {t('product.in_stock', 'In Private Vault')}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212] tracking-tight leading-tight">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-sm text-[#78716C] font-sans leading-relaxed">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Price Presentation */}
            <div className="p-5 border border-[#E8E3DA] bg-white space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C827A]">
                {t('product.acquire_title', 'Patron Acquisition Reference')}
              </span>
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#8C827A]">
                  {t('product.transport_desc', 'Taxes & Armored Transport Included')}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed font-sans">
              <p>{product.description}</p>
              {product.details && (
                <div className="p-4 bg-[#FAF8F5] border-s-2 border-[#C5A880] text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {product.details}
                </div>
              )}
            </div>

            {/* Actions: Direct Consultation Dialog */}
            <div className="space-y-3 pt-4">
              <Dialog open={inquiryModalOpen} onOpenChange={setInquiryModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    id="request-consultation-btn"
                    variant="luxury"
                    size="lg"
                    className="w-full justify-center text-xs tracking-[0.25em]"
                  >
                    <span>{t('product.consultation_cta', 'Request Private Consultation')}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t('product.acquire_title', 'Private Consultation & Acquisition')}</DialogTitle>
                    <DialogDescription>
                      {t('contact.subtitle', 'Submit your confidential inquiry for')} <span className="font-medium text-[#141414]">{product.title}</span>.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="pt-4">
                    <InquiryForm
                      initialProductId={product.id}
                      initialProductTitle={product.title}
                      compact
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                asChild
                variant="outline"
                size="default"
                className="w-full justify-center text-xs tracking-[0.2em]"
              >
                <Link href="/contact">
                  <span>{t('nav.consultation', 'Speak with Salon Director')}</span>
                </Link>
              </Button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-6 border-t border-[#E8E3DA] grid grid-cols-2 gap-4 text-xs text-[#78716C]">
              <div className="flex items-start space-x-2.5">
                <Award className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#141414]">{t('hero.provenance', 'Artisanal Provenance')}</p>
                  <p className="text-[11px] text-[#8C827A]">{t('hero.provenance_desc', 'Numbered certificate & NFC registry')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Shield className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#141414]">{t('hero.security', 'Armored Dispatch')}</p>
                  <p className="text-[11px] text-[#8C827A]">{t('hero.security_desc', 'Full global transit insurance')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craft Details Section */}
      {specs && Object.keys(specs).length > 0 && (
        <div className="pt-12 border-t border-[#E8E3DA] space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              {t('catalog.specifications', 'Technical Architecture')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#141414]">
              {t('catalog.specifications', 'Specifications & Material Composition')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                className="p-5 bg-white border border-[#E8E3DA] space-y-1.5"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-sans">
                  {key}
                </span>
                <p className="font-serif text-lg text-[#141414] font-medium">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In-Page Consultation Section */}
      <div className="pt-12 border-t border-[#E8E3DA] bg-[#FAF8F5] p-8 sm:p-12 border border-[#DDD7CD]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              {t('cta.badge', 'Direct Atelier Dialogue')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141414]">
              {t('featured.inquire', 'Inquire Regarding')} {product.title}
            </h3>
            <p className="text-sm text-[#78716C] max-w-lg mx-auto">
              {t('contact.subtitle', 'Our Geneva atelier accommodates bespoke engraving, custom sizing, and private viewing arrangements in your home city.')}
            </p>
          </div>

          <InquiryForm
            initialProductId={product.id}
            initialProductTitle={product.title}
          />
        </div>
      </div>
    </div>
  );
}

