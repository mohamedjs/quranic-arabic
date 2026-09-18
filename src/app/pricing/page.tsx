'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Heart, Gift, BookOpen, Volume2, Award } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PricingPage() {
  const { t, dir } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16" dir={dir}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-emerald-200">
          <Gift className="w-3.5 h-3.5 text-emerald-600" />
          <span>مبادرة وقفية عالمية مجانية 100%</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 font-arabic">
          {t('pricing.title')}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-800/80 pb-8 mb-8">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              {t('pricing.free_tier')}
            </span>
            <h2 className="text-3xl font-extrabold text-white font-arabic mt-2">
              تعلّم العربية والقرآن بدون أي مقابل
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              {t('pricing.free_desc')}
            </p>
          </div>

          <div className="text-right sm:text-left">
            <span className="text-5xl font-black text-emerald-400 font-mono">$0</span>
            <span className="text-xs text-slate-400 block font-medium">مجاناً مدى الحياة</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10 text-xs sm:text-sm text-emerald-100">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>المرحلة 1: التأسيس والأصوات والحروف الـ 28</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>المرحلة 2: المحادثة اليومية (سلسلة العربية بين يديك)</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>المرحلة 3: القواعد وبناء الجمل والضمائر وأسماء الإشارة</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>المرحلة 4: مفردات القرآن الأكثر تكراراً وقصار السور</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>لوحة الحروف الأبجدية التفاعلية مع خيار إبطاء السرعة 0.75x</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>اختبار تحديد المستوى الذكي مع تقرير وتوصية فورية</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>دعم كامل لـ 3 لغات (العربية، الإنجليزية، الروسية)</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>لا يلزم التسجيل أو إدخال بطاقة ائتمان إطلاقاً</span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>{t('pricing.start_free')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
