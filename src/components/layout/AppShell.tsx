'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { BookOpen, Flame, Trophy, LayoutDashboard } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans" dir={dir}>
      {/* Global Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5 font-arabic">
                {t('brand.name')} <span className="text-emerald-600 font-semibold text-xs sm:text-sm font-sans">Bayan Arabic</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                {t('brand.tagline')}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Daily Streak & XP pills */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold shadow-xs">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{t('nav.streak', { count: 3 })}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('nav.xp', { count: 140 })}</span>
              </div>
            </div>

            {/* Language Selector Dropdown */}
            <LanguageSelector />

            <nav className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/learn"
                className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {t('nav.curriculum')}
              </Link>

              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t('nav.admin')}</span>
                <span className="sm:hidden">Admin</span>
              </Link>

              <Link
                href="/pricing"
                className="hidden md:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
              >
                {t('nav.pricing')}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t('footer.rights')}</p>
          <p className="text-slate-400 font-mono text-[11px]">{t('footer.stack')}</p>
        </div>
      </footer>
    </div>
  );
};
