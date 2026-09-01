import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AEREO | Luxury Brand & Experience Showcase',
  description: 'A refined, high-end digital showcase and brand sanctuary engineered for luxury collections, bespoke experiences, and seamless client consultations.',
  openGraph: {
    title: 'AEREO | Luxury Brand & Experience Showcase',
    description: 'A refined, high-end digital showcase and brand sanctuary engineered for luxury collections, bespoke experiences, and seamless client consultations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEREO | Luxury Brand & Experience Showcase',
    description: 'A refined, high-end digital showcase and brand sanctuary engineered for luxury collections, bespoke experiences, and seamless client consultations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#141414] font-sans antialiased selection:bg-[#C5A880] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}
