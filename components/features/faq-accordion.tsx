'use client';

import React, { useState } from 'react';
import { FAQItemData } from '@/lib/db';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';

interface FaqAccordionProps {
  faqs: FAQItemData[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10" id="faq-interactive-section">
      {/* Search filter for questions */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
        <Input
          id="faq-search-input"
          placeholder={t('faq.search_placeholder', 'Search inquiries, warranties, or delivery terms...')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-10 pe-4 text-xs h-12 bg-white"
        />
      </div>

      {/* Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[#DDD7CD] p-6 space-y-3">
          <HelpCircle className="w-8 h-8 text-[#8C827A] mx-auto" />
          <p className="font-serif text-xl text-[#141414]">{t('faq.no_results', 'No matching questions found')}</p>
          <p className="text-xs text-[#78716C]">
            {t('faq.no_results_desc', 'Our concierge team is available to answer any bespoke questions directly.')}
          </p>
          <Button asChild variant="luxury" size="sm">
            <Link href="/contact">{t('faq.contact_concierge', 'Contact Concierge')}</Link>
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.id || index}
              value={`faq-${faq.id || index}`}
              className="border border-[#E8E3DA] bg-white px-6 sm:px-8 transition-colors hover:border-[#C5A880]/60"
            >
              <AccordionTrigger className="text-lg sm:text-xl font-serif text-[#141414]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Footer Support Card */}
      <div className="p-8 border border-[#DDD7CD] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
        <div className="space-y-1">
          <h4 className="font-serif text-xl text-[#141414]">{t('faq.need_assistance', 'Have a bespoke question not answered here?')}</h4>
          <p className="text-xs text-[#78716C]">
            {t('footer.desk_desc', 'Our Salon Directors provide private consultations in English, Spanish, and Arabic.')}
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 tracking-[0.2em]">
          <Link href="/contact" className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t('faq.contact_concierge', 'Connect with Concierge')}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

