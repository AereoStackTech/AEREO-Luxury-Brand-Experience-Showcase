'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Language, LANGUAGES } from '@/lib/i18n/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile' | 'footer' | 'compact';
  className?: string;
}

export function LanguageSwitcher({ variant = 'header', className }: LanguageSwitcherProps) {
  const { language, setLanguage, currentLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Mobile Drawer Segmented Layout
  if (variant === 'mobile') {
    return (
      <div className={cn('space-y-2', className)} id="mobile-language-changer">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#8C827A] font-medium px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t('nav.language', 'Language')}</span>
          </span>
          <span className="text-[11px] text-[#C5A880] tracking-normal font-sans">
            {currentLanguage.nativeName}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F0EDE8] border border-[#DDD7CD]">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'h-10 text-xs uppercase tracking-wider font-medium transition-all duration-200 flex flex-col items-center justify-center',
                  isSelected
                    ? 'bg-[#141414] text-[#FAF8F5] shadow-xs font-semibold'
                    : 'text-[#5C564E] hover:text-[#141414] hover:bg-white/60'
                )}
                aria-pressed={isSelected}
                aria-label={`Select ${lang.name}`}
              >
                <span className="text-[11px] font-sans">{lang.nativeName}</span>
                <span className="text-[9px] text-[#8C827A] tracking-widest">{lang.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Footer Variant
  if (variant === 'footer') {
    return (
      <div className={cn('flex items-center gap-3', className)} id="footer-language-changer">
        <span className="text-xs uppercase tracking-widest text-[#736E67] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{t('nav.language', 'Language')}:</span>
        </span>
        <div className="flex items-center gap-2">
          {languages.map((lang, index) => (
            <React.Fragment key={lang.code}>
              <button
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'text-xs tracking-wider transition-colors',
                  language === lang.code
                    ? 'text-[#C5A880] font-semibold underline underline-offset-4 decoration-[#C5A880]/60'
                    : 'text-[#9C9488] hover:text-[#FAF8F5]'
                )}
                aria-label={`Switch language to ${lang.name}`}
              >
                {lang.nativeName}
              </button>
              {index < languages.length - 1 && (
                <span className="text-[#403C38] text-xs">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Standard Header Dropdown
  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        id="language-changer-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}
        className={cn(
          'h-8 px-2.5 sm:px-3 text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 border border-[#DDD7CD]',
          'bg-white/80 hover:bg-white text-[#2D2A26] hover:border-[#C5A880] hover:text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#C5A880]',
          isOpen && 'border-[#C5A880] bg-white ring-1 ring-[#C5A880]/30'
        )}
      >
        <Globe className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
        <span className="font-medium text-[11px] sm:text-xs tracking-widest font-sans">
          {currentLanguage.short}
        </span>
        <span className="hidden md:inline text-[10px] text-[#8C827A] font-light">
          · {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={cn(
            'w-3 h-3 text-[#8C827A] transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180 text-[#121212]'
          )}
        />
      </button>

      {/* Luxury Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selection"
          className={cn(
            'absolute end-0 mt-1.5 w-48 sm:w-52 bg-[#FAF8F5] border border-[#DDD7CD] shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150',
            'focus:outline-none'
          )}
        >
          <div className="px-3 py-1.5 border-b border-[#E8E3DA] text-[10px] uppercase tracking-[0.2em] text-[#8C827A] font-sans">
            {t('nav.select_language', 'Select Language')}
          </div>

          <div className="p-1 space-y-0.5">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-start px-2.5 py-2 text-xs transition-colors flex items-center justify-between',
                    isSelected
                      ? 'bg-[#F2ECE1] text-[#121212] font-semibold'
                      : 'text-[#44403C] hover:bg-[#F7F4EF] hover:text-[#121212]'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-[13px] font-sans leading-tight">
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-[#8C827A] tracking-wider uppercase">
                      {lang.name} · {lang.dir.toUpperCase()}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0 ms-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
