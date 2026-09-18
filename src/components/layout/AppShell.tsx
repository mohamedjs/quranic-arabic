'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { BookOpen, Users, Award, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans" dir={dir}>
      {/* Global Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5 font-arabic">
                {t('brand.name')} <span className="text-emerald-600 font-bold text-xs sm:text-sm font-sans">{t('brand.en_name')}</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                {t('brand.tagline')}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/learn"
                className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {t('nav.free_content')}
              </Link>
              <Link
                href="/one-to-one"
                className="px-3 py-1.5 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1"
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('nav.one_to_one')}</span>
              </Link>
              <Link
                href="/level-test"
                className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('nav.level_test')}</span>
              </Link>
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {t('nav.pricing')}
              </Link>
            </nav>

            {/* Language Selector Dropdown */}
            <LanguageSelector />

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t('nav.admin')}</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-right">
          <div>
            <span className="font-bold text-slate-900 font-arabic text-sm block mb-3">
              {t('brand.name')} • {t('brand.en_name')}
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              المنصة العالمية الأولى المتخصصة في تعليم اللغة العربية لغير الناطقين بها وتدريس القرآن الكريم والتجويد أونلاين.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs block mb-3">الدورات والمحتوى</span>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/#alphabet" className="hover:text-emerald-600">لوحة الحروف الأبجدية</Link></li>
              <li><Link href="/learn" className="hover:text-emerald-600">منهج العربية بين يديك</Link></li>
              <li><Link href="/level-test" className="hover:text-emerald-600">اختبار تحديد المستوى</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs block mb-3">الدروس الخصوصية</span>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/one-to-one" className="hover:text-emerald-600">دروس فردية 1:1</Link></li>
              <li><Link href="/one-to-one" className="hover:text-emerald-600">معلمو القرآن والتجويد</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-600">خطط الأسعار والحزم</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs block mb-3">الدعم والمشرف</span>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/admin" className="hover:text-emerald-600">لوحة تحكم المشرف</Link></li>
              <li><Link href="/admin/login" className="hover:text-emerald-600">تسجيل الدخول</Link></li>
              <li className="text-slate-400">admin@bayan.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>{t('footer.rights')}</p>
          <p className="font-mono text-[11px]">{t('footer.stack')}</p>
        </div>
      </footer>
    </div>
  );
};
