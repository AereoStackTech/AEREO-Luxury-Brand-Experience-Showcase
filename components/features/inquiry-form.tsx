'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquirySchema, InquiryInput } from '@/lib/validations/inquiry';
import { submitInquiryAction } from '@/app/actions/inquiry';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';
import { CheckCircle2, Send, ShieldCheck, Loader2, Sparkles } from 'lucide-react';

interface InquiryFormProps {
  initialProductId?: string;
  initialProductTitle?: string;
  compact?: boolean;
}

export function InquiryForm({
  initialProductId,
  initialProductTitle,
  compact = false,
}: InquiryFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      phone: '',
      serviceType: initialProductTitle ? `Inquiry regarding ${initialProductTitle}` : 'Private Viewing & Bespoke Commission',
      preferredDate: '',
      message: initialProductTitle
        ? `I am expressing formal interest in acquiring or arranging a private viewing of ${initialProductTitle}. Please provide consultation details.`
        : '',
      productItemId: initialProductId || '',
    },
  });

  const onSubmit = async (data: InquiryInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await submitInquiryAction(data);
      if (response.success) {
        setIsSuccess(true);
        reset();
      } else {
        setServerError(response.message || 'Unable to submit your inquiry at this time.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        id="inquiry-success-message"
        className="p-8 sm:p-10 border border-[#C5A880]/50 bg-[#FAF8F5] text-center space-y-5 animate-in fade-in zoom-in-95 duration-500"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF3E8] border border-[#C5A880] flex items-center justify-center text-[#9B7E55]">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            {t('contact.success_title', 'Transmission Confirmed')}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#141414] font-normal">
            {t('contact.success_title', 'Your Private Consultation is Received')}
          </h3>
          <p className="text-sm text-[#736E67] max-w-md mx-auto leading-relaxed font-sans">
            {t('contact.success_desc', 'Our Private Client Liaison has logged your request. We will reach out discreetly to your provided email within 12 hours.')}
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="tracking-[0.2em]"
          >
            {t('contact.form_submit', 'Submit Another Request')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="client-inquiry-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-start"
      noValidate
    >
      {serverError && (
        <div className="p-4 border border-rose-300 bg-rose-50 text-rose-800 text-xs tracking-wide">
          {serverError}
        </div>
      )}

      {initialProductTitle && (
        <div className="p-3.5 border border-[#E8E3DA] bg-[#F4EFE6]/60 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[#5C564E]">Selected Creation:</span>
            <span className="font-semibold text-[#141414]">{initialProductTitle}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#9B7E55]">Priority Routing</span>
        </div>
      )}

      {/* Grid Inputs: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
            {t('contact.form_name', 'Full Name')} <span className="text-[#C5A880]">*</span>
          </label>
          <Input
            id="inquiry-client-name"
            placeholder={t('contact.form_name_placeholder', 'e.g. Lord Alistair Vance')}
            {...register('clientName')}
            className={errors.clientName ? 'border-rose-400 focus-visible:border-rose-500' : ''}
          />
          {errors.clientName && (
            <p className="text-[11px] text-rose-600">{errors.clientName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
            {t('contact.form_email', 'Confidential Email')} <span className="text-[#C5A880]">*</span>
          </label>
          <Input
            id="inquiry-client-email"
            type="email"
            placeholder={t('contact.form_email_placeholder', 'client@domain.com')}
            {...register('clientEmail')}
            className={errors.clientEmail ? 'border-rose-400 focus-visible:border-rose-500' : ''}
          />
          {errors.clientEmail && (
            <p className="text-[11px] text-rose-600">{errors.clientEmail.message}</p>
          )}
        </div>
      </div>

      {/* Grid Inputs: Phone & Preferred Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
            {t('contact.form_phone', 'Direct Phone / Signal (Optional)')}
          </label>
          <Input
            id="inquiry-client-phone"
            type="tel"
            placeholder={t('contact.form_phone_placeholder', '+41 22 819 0000')}
            {...register('phone')}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
            {t('contact.form_date', 'Preferred Timing / Date (Optional)')}
          </label>
          <Input
            id="inquiry-client-date"
            placeholder="e.g. Immediate / Next 30 Days"
            {...register('preferredDate')}
          />
        </div>
      </div>

      {/* Service Type Selection */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
          {t('contact.form_service', 'Nature of Engagement / Commission')}
        </label>
        <Input
          id="inquiry-service-type"
          placeholder={t('contact.form_service_default', 'e.g. Bespoke Commission, Private Salon Viewing, Villa Residency')}
          {...register('serviceType')}
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#44403C]">
          {t('contact.form_message', 'Personalized Request & Specifications')} <span className="text-[#C5A880]">*</span>
        </label>
        <Textarea
          id="inquiry-message"
          rows={compact ? 3 : 5}
          placeholder={t('contact.form_message_placeholder', 'Please outline your bespoke requirements, desired customization, location preferences, or scheduling parameters...')}
          {...register('message')}
          className={errors.message ? 'border-rose-400 focus-visible:border-rose-500' : ''}
        />
        {errors.message && (
          <p className="text-[11px] text-rose-600">{errors.message.message}</p>
        )}
      </div>

      {/* Footer Trust & Submit button */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E8E3DA] pt-5">
        <div className="flex items-center space-x-2 text-[11px] text-[#78716C]">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>{t('contact.form_discretion', 'Encrypted transmission & strict client discretion')}</span>
        </div>

        <Button
          id="submit-inquiry-btn"
          type="submit"
          variant="luxury"
          size={compact ? 'default' : 'lg'}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t('contact.form_submitting', 'Transmitting...')}</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>{t('contact.form_submit', 'Submit Request')}</span>
              <Send className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

