import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Compass, Feather, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Artisanal Heritage & Sanctuary | AEREO',
  description: 'The philosophy, genesis, and generational craftsmanship behind AEREO Haute Maison & Sanctuaries.',
};

export default function StoryPage() {
  return (
    <div className="py-16 sm:py-24 space-y-24">
      {/* 1. Hero Title */}
      <Container size="default" className="text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] text-[#9B7E55] font-medium">
          Artisanal Heritage & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#141414] font-normal tracking-tight leading-tight">
          A Sanctuary Built on the Eternity of Craft
        </h1>
        <p className="text-base sm:text-lg text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto font-sans">
          In an era dominated by fleeting trends and mechanized mass production, AEREO was conceived as a sanctuary for uncompromising patience, tactile beauty, and timeless mechanical purity.
        </p>
      </Container>

      {/* 2. Full-bleed editorial image */}
      <Container size="wide">
        <div className="relative aspect-21/9 w-full bg-[#ECE8E1] border border-[#DDD7CD] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1547996160-71dfa6309697?auto=format&fit=crop&w=2400&q=90"
            alt="Geneva Watchmaking Atelier"
            fill
            priority
            className="object-cover object-center"
            sizes="90vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <p className="font-serif text-lg sm:text-2xl text-[#FAF8F5] max-w-xl">
              &ldquo;True luxury does not clamor for attention. It speaks in whisper-quiet finishes, flawless hand-chamfered anglage, and the aroma of natural oak bark saddlery.&rdquo;
            </p>
          </div>
        </div>
      </Container>

      {/* 3. Narrative Chapters */}
      <Container size="default" className="space-y-20">
        {/* Chapter 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#E8E3DA] pt-12">
          <div className="md:col-span-4 space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55]">Chapter I</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141414]">The Genevan Genesis</h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed font-sans font-light">
            <p>
              Founded along the shores of Lake Geneva by a collective of independent master watchmakers and traditional leather artisans, AEREO began with a single radical principle: eliminate the compromise between aesthetic grace and mechanical fortitude.
            </p>
            <p>
              Rather than releasing seasonal commercial lines, our atelier produces no more than sixty horological masterworks and one hundred bespoke leather travel cases annually. Each creation is signed personally by the artisan responsible for its birth.
            </p>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#E8E3DA] pt-12">
          <div className="md:col-span-4 space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55]">Chapter II</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141414]">Elemental Provenance</h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed font-sans font-light">
            <p>
              Our raw materials are sourced with unrelenting scrupulousness. We carve dials from genuine prehistoric Gibeon meteorite slabs, forge cases from biocompatible 950 Platinum, and procure full-grain Baranil calfskin tanned exclusively using aged chestnut and mimosa barks in Alsace.
            </p>
            <p>
              Every element must possess the integrity to outlive its original custodian, developing a rich, poetic patina across generations.
            </p>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#E8E3DA] pt-12">
          <div className="md:col-span-4 space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E55]">Chapter III</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#141414]">Sanctuaries & Living Art</h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed font-sans font-light">
            <p>
              In 2024, AEREO expanded this doctrine into physical spaces—curating exclusive private architectural residencies in Kyoto and Sunnmøre. These private sanctuaries allow our patrons to immerse themselves in absolute stillness, bespoke gastronomy, and restorative landscape architecture away from digital noise.
            </p>
          </div>
        </div>
      </Container>

      {/* 4. The Pillars of Excellence */}
      <div className="bg-[#141414] text-[#FAF8F5] py-20 border-y border-[#282828]">
        <Container size="wide" className="space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">Our Core Pillars</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">Uncompromising Tenets</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#2D2D2D] bg-[#1A1A1A] space-y-4">
              <Award className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif text-xl text-[#FAF8F5]">Zero Compromise Finish</h4>
              <p className="text-xs sm:text-sm text-[#9C9488] leading-relaxed font-sans">
                Every movement component undergoes traditional hand-anglage with gentian wood paste, creating mirror-polished bevels invisible to the naked eye.
              </p>
            </div>

            <div className="p-8 border border-[#2D2D2D] bg-[#1A1A1A] space-y-4">
              <Shield className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif text-xl text-[#FAF8F5]">Cryptographic Provenance</h4>
              <p className="text-xs sm:text-sm text-[#9C9488] leading-relaxed font-sans">
                Each piece holds an embedded encrypted hardware certificate of authenticity registered on our private patron ledger.
              </p>
            </div>

            <div className="p-8 border border-[#2D2D2D] bg-[#1A1A1A] space-y-4">
              <Sparkles className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif text-xl text-[#FAF8F5]">Perpetual Atelier Care</h4>
              <p className="text-xs sm:text-sm text-[#9C9488] leading-relaxed font-sans">
                Lifetime complimentary conditioning for all leather trunks and a 5-year manufacture chronometric guarantee for all timepieces.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* 5. CTA Consultation */}
      <Container size="default" className="text-center space-y-6 pt-4">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#141414]">Begin Your Bespoke Journey</h3>
        <p className="text-sm text-[#57534E] max-w-lg mx-auto">
          Contact our Geneva salon or arrange a viewing in Paris, London, Tokyo, or New York.
        </p>
        <Button asChild variant="luxury" size="lg" className="tracking-[0.25em]">
          <Link href="/contact" className="flex items-center gap-2">
            <span>Arrange Salon Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </Container>
    </div>
  );
}
