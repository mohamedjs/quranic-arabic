'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PricingPage() {
  const { t, dir } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16" dir={dir}>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {t('pricing.free_tier')}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-3 font-arabic">
          {t('pricing.title')}
        </h1>
        <p className="text-slate-500 text-base mt-3">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-slate-800">{t('pricing.free_tier')}</h3>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                Lifetime
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">{t('pricing.free_price')}</span>
              <span className="text-sm text-slate-500">/ forever</span>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              {t('pricing.free_desc')}
            </p>

            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>الوحدات التجريبية الأولى من سلسلة (العربية بين يديك)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مشغل صوتي نقي مع خيار إبطاء السرعة 0.75x</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دعم كامل لـ 3 لغات (عربي / إنجليزي / روسي)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>عداد أيام التتابع ونقاط الخبرة اليومية</span>
              </li>
            </ul>
          </div>

          <Link
            href="/learn"
            className="w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm text-center hover:bg-slate-50 transition-colors"
          >
            {t('pricing.start_free')}
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-3xl bg-emerald-950 text-white shadow-xl border-2 border-emerald-500 relative flex flex-col justify-between">
          <div className="absolute -top-3.5 right-8 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
            Best Value
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-white flex items-center gap-2">
                <span>{t('pricing.pro_tier')}</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold">
                Unlimited
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-white">{t('pricing.pro_monthly')}</span>
              <span className="text-sm text-emerald-300">/ month ({t('pricing.pro_yearly')}/year)</span>
            </div>
            <p className="text-sm text-emerald-200/80 mb-6">
              {t('pricing.pro_desc')}
            </p>

            <ul className="space-y-3 text-sm text-emerald-100 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>كافة ميزات الباقة المجانية</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الوصول لجميع كتب العربية بين يديك (الكتاب 1، 2، 3)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>مفردات القرآن الكريم وتلاوات EveryAyah لكبار القراء</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ميزة التكرار المتباعد (SRS) للمفردات المحفوظة</span>
              </li>
            </ul>
          </div>

          <Link
            href="/learn"
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm text-center shadow-lg transition-colors"
          >
            {t('pricing.upgrade_pro')}
          </Link>
        </div>
      </div>
    </div>
  );
}
