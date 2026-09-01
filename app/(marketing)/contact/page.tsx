import React from 'react';
import { Container } from '@/components/shared/container';
import { InquiryForm } from '@/components/features/inquiry-form';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

export const metadata = {
  title: 'Private Client Relations & Inquiries | AEREO',
  description: 'Submit a confidential consultation request or schedule a private viewing appointment with AEREO salon directors.',
};

export default function ContactPage() {
  const salons = [
    {
      city: 'Geneva Salon & Atelier',
      address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
      phone: '+41 22 819 0940',
      email: 'geneva@aereostack.luxury',
    },
    {
      city: 'Paris Private Suite',
      address: 'Place Vendôme 18, 75001 Paris, France',
      phone: '+33 1 42 68 00 90',
      email: 'paris@aereostack.luxury',
    },
    {
      city: 'Tokyo Ginza Sanctuary',
      address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan',
      phone: '+81 3 5537 2080',
      email: 'tokyo@aereostack.luxury',
    },
  ];

  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="default">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9B7E55] font-medium">
            Private Client Relations & Salons
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Initiate a Confidential Consultation
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-sans font-light">
            We welcome inquiries regarding bespoke commissions, catalog acquisitions, private viewings, and sanctuary residency reservations.
          </p>
        </div>

        {/* Form Container */}
        <div className="border border-[#DDD7CD] bg-white p-8 sm:p-12 shadow-xs">
          <InquiryForm />
        </div>

        {/* Global Salons & Direct Contacts */}
        <div className="pt-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A]">
              Physical Salons & Private Suites
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141414]">
              Global Atelier Presence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <div
                key={salon.city}
                className="p-6 bg-[#FAF8F5] border border-[#E8E3DA] space-y-3"
              >
                <div className="flex items-center space-x-2 text-[#9B7E55]">
                  <MapPin className="w-4 h-4" />
                  <h4 className="font-serif text-lg text-[#141414] font-medium">{salon.city}</h4>
                </div>
                <p className="text-xs text-[#57534E] font-sans leading-relaxed">{salon.address}</p>
                <div className="pt-2 border-t border-[#E8E3DA] text-xs text-[#78716C] space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#8C827A]" />
                    <span>{salon.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-[#C5A880]" />
                    <span>{salon.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
