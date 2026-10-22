'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { ProductItemData, CategoryData } from '@/lib/db';
import { CatalogFilters } from './catalog-filters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';

interface CatalogGridProps {
  products: ProductItemData[];
  categories: CategoryData[];
  initialCategory?: string;
}

export function CatalogGrid({
  products,
  categories,
  initialCategory = 'all',
}: CatalogGridProps) {
  const { t, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(
        (p) => p.category?.slug === activeCategory || p.categoryId === activeCategory
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-12" id="catalog-explorer">
      {/* Interactive Controls */}
      <CatalogFilters
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredProducts.length}
      />

      {/* Grid of Luxury Offerings */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-6 border border-dashed border-[#DDD7CD] bg-[#FAF8F5] space-y-4">
          <Compass className="w-10 h-10 text-[#8C827A] mx-auto stroke-1" />
          <h3 className="font-serif text-2xl text-[#141414]">
            {t('catalog.empty_title', 'No Creations Found')}
          </h3>
          <p className="text-sm text-[#78716C] max-w-md mx-auto">
            {t('catalog.empty_desc', 'Our curators can arrange bespoke acquisitions or commissions matching your exact specifications.')}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
          >
            {t('catalog.empty_reset', 'Reset All Filters')}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" id="catalog-products-grid">
          {filteredProducts.map((product) => {
            const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80';

            return (
              <article
                key={product.id}
                id={`product-card-${product.slug}`}
                className="group flex flex-col justify-between space-y-4 transition-all duration-300"
              >
                {/* Visual Image Container */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-[#ECE8E1] border border-[#E5E0D8]">
                  <Image
                    src={primaryImage}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges Over Image */}
                  <div className="absolute top-4 start-4 flex flex-col gap-2 z-10">
                    {product.isFeatured && (
                      <Badge variant="gold" className="backdrop-blur-xs">
                        <Sparkles className="w-3 h-3 me-1" />
                        {t('featured.badge', 'Featured Atelier')}
                      </Badge>
                    )}
                    {product.category && (
                      <Badge variant="secondary" className="bg-[#FAF8F5]/90 backdrop-blur-xs">
                        {product.category.name}
                      </Badge>
                    )}
                  </div>

                  {/* Subtle Dark Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium flex items-center gap-2">
                      <span>{t('featured.piece_detail', 'Examine Piece')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Meta */}
                <div className="space-y-2 pt-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#141414] font-normal group-hover:text-[#9B7E55] transition-colors line-clamp-1">
                        <Link href={`/catalog/${product.slug}`}>
                          {product.title}
                        </Link>
                      </h3>
                    </div>

                    {product.subtitle && (
                      <p className="text-xs text-[#78716C] font-sans line-clamp-1 mt-1">
                        {product.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-[#57534E] font-sans line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A]">
                        {t('product.acquire_title', 'Acquisition')}
                      </span>
                      <span className="font-serif text-lg text-[#141414] font-medium">
                        {formatPrice(product.price, product.currency)}
                      </span>
                    </div>

                    <Button asChild variant="outline" size="sm" className="group-hover:border-[#C5A880] group-hover:text-[#9B7E55]">
                      <Link href={`/catalog/${product.slug}`} className="flex items-center gap-1.5">
                        <span>{t('featured.piece_detail', 'Details')}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

