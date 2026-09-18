'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function OneToOnePage() {
  const { dir } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center" dir={dir}>
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-inner">
        <Clock className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>قريباً • Coming Soon</span>
      </span>

      <h1 className="text-3xl font-extrabold text-slate-900 font-arabic mt-2">
        جلسات الدروس الفردية 1:1 ستتاح قريباً!
      </h1>

      <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto leading-relaxed">
        نعمل حالياً على تأهيل نخبة من خيرة المعلمين والمعلمات. في الوقت الحالي، يمكنك الاستفادة من كافة مراحل المنهج الدراسي المتدرج (4 مراحل كاملة) مجاناً 100% بدون أي رسوم.
      </p>

      <div className="mt-8">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all"
        >
          <BookOpen className="w-5 h-5" />
          <span>الدخول إلى المنهج الدراسي المجاني الآن</span>
        </Link>
      </div>
    </div>
  );
}
