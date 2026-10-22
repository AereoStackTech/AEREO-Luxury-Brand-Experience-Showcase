'use client';

import React from 'react';
import { FAQItemData } from '@/lib/db';
import { Container } from '@/components/shared/container';
import { FaqAccordion } from '@/components/features/faq-accordion';
import { ShieldCheck, Clock, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

interface FaqViewProps {
  faqs: FAQItemData[];
}

export function FaqView({ faqs }: FaqViewProps) {
  const { t } = useLanguage();

  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="default">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9B7E55] font-medium">
            {t('faq.badge', 'Private Client Concierge & Protocols')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            {t('faq.title', 'Frequently Addressed Inquiries')}
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-sans font-light">
            {t(
              'faq.subtitle',
              'Review guidelines on our bespoke commissions, international armored transit, private viewing salons, and perpetual warranty standards.'
            )}
          </p>
        </div>

        {/* Interactive FAQ Section */}
        <div className="pt-8">
          <FaqAccordion faqs={faqs} />
        </div>

        {/* Protocol Highlights */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#E8E3DA]">
          <div className="p-6 bg-white border border-[#E8E3DA] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            <h4 className="font-serif text-lg text-[#141414]">
              {t('story.v2_title', 'Confidentiality Guarantee')}
            </h4>
            <p className="text-xs text-[#78716C] leading-relaxed">
              {t('contact.form_discretion', 'All client records and commission specs are encrypted and protected under strict Swiss fiduciary privacy standards.')}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E3DA] space-y-2">
            <Clock className="w-5 h-5 text-[#C5A880]" />
            <h4 className="font-serif text-lg text-[#141414]">
              {t('hero.craft', '12-Hour Liaison SLA')}
            </h4>
            <p className="text-xs text-[#78716C] leading-relaxed">
              {t('contact.success_desc', 'Every formal consultation request receives a personalized response from a senior director within twelve hours.')}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E3DA] space-y-2">
            <Globe className="w-5 h-5 text-[#C5A880]" />
            <h4 className="font-serif text-lg text-[#141414]">
              {t('product.transport_title', 'Global Armored Delivery')}
            </h4>
            <p className="text-xs text-[#78716C] leading-relaxed">
              {t('product.transport_desc', 'Door-to-vault secure delivery coordinated with Malca-Amit and diplomat transport across 40+ countries.')}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
