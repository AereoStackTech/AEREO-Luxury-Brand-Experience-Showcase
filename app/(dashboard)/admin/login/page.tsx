'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { adminLoginAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, KeyRound, Loader2, Sparkles, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('curator@aereostack.luxury');
  const [password, setPassword] = useState('AereoLuxury2026!');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    startTransition(async () => {
      const res = await adminLoginAction(formData);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMessage(res.error || 'Authentication rejected.');
      }
    });
  };

  const handleQuickDemoLogin = () => {
    setEmail('curator@aereostack.luxury');
    setPassword('AereoLuxury2026!');
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('email', 'curator@aereostack.luxury');
    formData.append('password', 'AereoLuxury2026!');

    startTransition(async () => {
      const res = await adminLoginAction(formData);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMessage(res.error || 'Authentication rejected.');
      }
    });
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="border border-[#DDD7CD] bg-white p-8 sm:p-10 shadow-lg space-y-8">
        {/* Insignia & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF3E8] border border-[#C5A880] flex items-center justify-center text-[#9B7E55]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#141414] font-normal">
            Curator Access Portal
          </h2>
          <p className="text-xs text-[#78716C] font-sans uppercase tracking-[0.18em]">
            Restricted Administrative Control
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 border border-rose-300 bg-rose-50 text-rose-800 text-xs tracking-wide">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-xs font-sans">
          <div className="space-y-1.5">
            <label className="uppercase tracking-wider text-[#444] font-medium">Curator Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@aereostack.luxury"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="uppercase tracking-wider text-[#444] font-medium">Security Passphrase</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isPending}
            className="w-full justify-center tracking-[0.25em]"
          >
            {isPending ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>Enter Curator Desk</span>
                <KeyRound className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </form>

        {/* Demo Fast Access Box */}
        <div className="pt-6 border-t border-[#E8E3DA] space-y-3 bg-[#FAF8F5] p-4 border border-[#E5E0D8]">
          <div className="flex items-center space-x-2 text-[#9B7E55]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Demo Reviewer Pass</span>
          </div>
          <p className="text-[11px] text-[#78716C] leading-relaxed">
            Click below to immediately log in with default curator permissions:
          </p>
          <Button
            type="button"
            variant="luxury"
            size="sm"
            onClick={handleQuickDemoLogin}
            disabled={isPending}
            className="w-full justify-center tracking-widest text-[11px]"
          >
            Instant Demo Sign-In
          </Button>
        </div>
      </div>
    </div>
  );
}
