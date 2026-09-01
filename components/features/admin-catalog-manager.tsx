'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItemData, CategoryData } from '@/lib/db';
import { createCatalogProductAction, deleteCatalogProductAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2, ExternalLink, Sparkles, Loader2, Package } from 'lucide-react';

interface AdminCatalogManagerProps {
  initialProducts: ProductItemData[];
  categories: CategoryData[];
}

export function AdminCatalogManager({
  initialProducts,
  categories,
}: AdminCatalogManagerProps) {
  const [products, setProducts] = useState<ProductItemData[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New product form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('50000');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [specMaterial, setSpecMaterial] = useState('Platinum & Rose Gold');
  const [specOrigin, setSpecOrigin] = useState('Geneva Atelier, Switzerland');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const img = imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85';

    startTransition(async () => {
      const res = await createCatalogProductAction({
        title,
        slug,
        subtitle: subtitle || undefined,
        description,
        details: details || undefined,
        price: parseFloat(price) || 10000,
        currency: 'USD',
        images: [img],
        isFeatured,
        categoryId: categoryId || categories[0]?.id,
        specifications: {
          Material: specMaterial,
          Provenance: specOrigin,
        },
      });

      if (res.success && res.product) {
        setProducts((prev) => [res.product as ProductItemData, ...prev]);
        setIsDialogOpen(false);
        // Reset form
        setTitle('');
        setSlug('');
        setSubtitle('');
        setDescription('');
        setDetails('');
        setImageUrl('');
      } else {
        setErrorMsg(res.error || 'Failed to curate product item.');
      }
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Are you certain you wish to de-list this piece from the public salon?')) return;
    setErrorMsg(null);
    startTransition(async () => {
      const res = await deleteCatalogProductAction(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        setErrorMsg(res.error || 'Failed to delete piece.');
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8" id="admin-catalog-manager">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DA]">
        <div>
          <h3 className="font-serif text-2xl text-[#141414]">Catalog Portfolio Curation</h3>
          <p className="text-xs text-[#78716C]">
            Active pieces exhibited across Geneva, Paris, and bespoke salon viewings.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="luxury" size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Curate New Offering</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Curate New Luxury Offering</DialogTitle>
              <DialogDescription>
                Add a new masterwork, leather creation, or private residency to the AEREO catalog.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-4 text-xs font-sans">
              {errorMsg && (
                <div className="p-3 border border-rose-300 bg-rose-50 text-rose-800 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. AEREO Tourbillon Nocturne"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Slug (URL) *</label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="tourbillon-nocturne"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-12 border border-[#DDD7CD] bg-white px-3 text-xs text-[#141414] focus:border-[#C5A880] focus:outline-none"
                    required
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Acquisition Price (USD) *</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="120000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#444] font-medium">Subtitle</label>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Tantalum & White Gold with Celestial Dial"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#444] font-medium">Primary Image URL (Unsplash or CDN)</label>
                <Input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#444] font-medium">Editorial Narrative *</label>
                <Textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Artisanal narrative, movement specifications, hand-finishing details..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Material Spec</label>
                  <Input
                    value={specMaterial}
                    onChange={(e) => setSpecMaterial(e.target.value)}
                    placeholder="Platinum 950, Baranil Calfskin"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#444] font-medium">Provenance / Atelier</label>
                  <Input
                    value={specOrigin}
                    onChange={(e) => setSpecOrigin(e.target.value)}
                    placeholder="Geneva Atelier, Switzerland"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded-none border-[#DDD7CD] text-[#C5A880] focus:ring-[#C5A880]"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-[#141414] cursor-pointer">
                  Feature prominently on homepage and collection highlights
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-[#E8E3DA]">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="luxury" size="sm" disabled={isPending}>
                  {isPending ? (
                    <span className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing...</span>
                    </span>
                  ) : (
                    'Publish to Salon'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Catalog Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => {
          const img = item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

          return (
            <div
              key={item.id}
              className="border border-[#DDD7CD] bg-white p-4 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-16/10 w-full bg-[#FAF8F5] overflow-hidden border border-[#E8E3DA]">
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {item.isFeatured && <Badge variant="gold">Featured</Badge>}
                    {item.category && <Badge variant="secondary">{item.category.name}</Badge>}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-lg text-[#141414] font-medium line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-[#78716C] line-clamp-1">{item.subtitle || item.description}</p>
                </div>

                <p className="font-serif text-base text-[#141414] font-medium">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="text-[10px] h-7 px-2">
                  <Link href={`/catalog/${item.slug}`} target="_blank" className="flex items-center gap-1">
                    <span>Public View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteProduct(item.id)}
                  disabled={isPending}
                  className="text-rose-600 hover:text-rose-700 text-[10px] h-7 px-2"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
