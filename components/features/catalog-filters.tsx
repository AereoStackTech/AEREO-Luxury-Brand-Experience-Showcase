'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CatalogFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export function CatalogFilters({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-6 pb-8 border-b border-[#E8E3DA]">
      {/* Top Bar: Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
          <Input
            id="catalog-search-input"
            type="text"
            placeholder="Search creations or specs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 text-xs"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between md:justify-end space-x-4">
          <span className="text-xs uppercase tracking-[0.15em] text-[#78716C] font-sans">
            {totalCount} {totalCount === 1 ? 'Creation' : 'Creations'}
          </span>

          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C827A]" />
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-11 border border-[#DDD7CD] bg-white px-3 text-xs uppercase tracking-wider text-[#141414] focus:border-[#C5A880] focus:outline-none cursor-pointer"
            >
              <option value="featured">Curation (Featured First)</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none" id="catalog-category-tabs">
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            'px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap cursor-pointer',
            activeCategory === 'all'
              ? 'bg-[#141414] text-[#FAF8F5] border border-[#141414]'
              : 'bg-white text-[#57534E] border border-[#DDD7CD] hover:border-[#C5A880] hover:text-[#141414]'
          )}
        >
          All Collections
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onSelectCategory(category.slug)}
            className={cn(
              'px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap cursor-pointer',
              activeCategory === category.slug
                ? 'bg-[#141414] text-[#FAF8F5] border border-[#141414]'
                : 'bg-white text-[#57534E] border border-[#DDD7CD] hover:border-[#C5A880] hover:text-[#141414]'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
