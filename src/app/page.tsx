'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Exercise } from '@/types/database.types';
import { Sparkles, CheckCircle, ArrowRight, LayoutDashboard, Volume2, BookOpen } from 'lucide-react';

const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    lesson_id: 'l-1',
    question_text: 'استمع جيداً للصوت واضغط على الحرف المطابق له (Listen & Identify):',
    arabic_text: 'ب',
    transliteration: 'Baa',
    translation: 'Letter Baa',
    question_type: 'audio_mcq',
    audio_url: '/audio/letters/baa.mp3',
    options_json: [
      { id: 'opt1', text: 'ب', transliteration: 'Baa (نقطة واحدة بالأسفل)' },
      { id: 'opt2', text: 'ت', transliteration: 'Taa (نقطتان بالأعلى)' },
      { id: 'opt3', text: 'ث', transliteration: 'Thaa (ثلاث نقاط بالأعلى)' },
      { id: 'opt4', text: 'ن', transliteration: 'Noon (نقطة داخل الصحن)' },
    ],
    correct_answer: 'opt1',
    explanation: 'حرف الباء (ب) يتميز بوجود نقطة واحدة أسفل الصحن الأفقي.',
    order_index: 1,
  },
  {
    id: 'ex-2',
    lesson_id: 'l-1',
    question_text: 'استمع لحرف الثاء اللثوي (طرف اللسان مع أطراف الثنايا العليا):',
    arabic_text: 'ث',
    transliteration: 'Thaa',
    translation: 'Letter Thaa',
    question_type: 'audio_mcq',
    audio_url: '/audio/letters/thaa.mp3',
    options_json: [
      { id: 'opt1', text: 'ت', transliteration: 'Taa' },
      { id: 'opt2', text: 'ث', transliteration: 'Thaa' },
      { id: 'opt3', text: 'ب', transliteration: 'Baa' },
      { id: 'opt4', text: 'س', transliteration: 'Seen' },
    ],
    correct_answer: 'opt2',
    explanation: 'حرف الثاء (ث) يخرج من طرف اللسان مع الثنايا العليا وتزينه 3 نقاط.',
    order_index: 2,
  },
  {
    id: 'ex-3',
    lesson_id: 'l-1',
    question_text: 'استمع لصوت حرف الحاء الحلقي الصافي (وسط الحلق):',
    arabic_text: 'ح',
    transliteration: 'Haa',
    translation: 'Letter Haa',
    question_type: 'audio_mcq',
    audio_url: '/audio/letters/haa.mp3',
    options_json: [
      { id: 'opt1', text: 'هـ', transliteration: 'Haa (الصدر خفيفة)' },
      { id: 'opt2', text: 'خ', transliteration: 'Khaa (الحلق مع شخير)' },
      { id: 'opt3', text: 'ح', transliteration: 'Haa (وسط الحلق نقية)' },
      { id: 'opt4', text: 'ع', transliteration: 'Ayn (عصر الحلق)' },
    ],
    correct_answer: 'opt3',
    explanation: 'حرف الحاء (ح) يخرج من وسط الحلق بدون نقاط بنَفَس نقي وصوت رخو.',
    order_index: 3,
  },
];

export default function HomePage() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentExercise = SAMPLE_EXERCISES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_EXERCISES.length);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>منصة بيان: تعليم العربية والقرآن الكريم التفاعلية</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight font-arabic">
          من الصفر إلى تلاوة وفهم القرآن الكريم في{' '}
          <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
            أسابيع معدودة
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          نظام تعليمي متكامل لغير الناطقين بالعربية: تمييز المخارج والحركات (الفتحة والضمة والكسرة) مع مشغل صوت تفاعلي بنصف السرعة ولوحة تحكم شاملة لإدارة المنهج.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/admin"
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>الدخول إلى لوحة التحكم (Admin Panel)</span>
          </Link>

          <Link
            href="/learn"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-200 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>ابدأ المستوى التمهيدي مجاناً</span>
          </Link>
        </div>
      </section>

      {/* Live Interactive Player Demo Showcase */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>تجربة حية للمشغل الصوتي (Audio Player)</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-arabic mt-0.5">
                اضغط على زر الصوت واستمع للنطق الحقيقي
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              تمرين {currentIdx + 1} من {SAMPLE_EXERCISES.length}
            </div>
          </div>

          {/* Embedded Reusable Player Component */}
          <InteractiveAudioExercisePlayer
            key={currentExercise.id}
            exercise={currentExercise}
            onNext={handleNext}
            autoPlayAudio={false}
          />
        </div>
      </section>

      {/* Curriculum Pathway Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            المنهج التعليمي المتدرج
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1 font-arabic">
            بناء الفهم القرآني خطوة بخطوة
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            من الحروف المجردة إلى فهم وتدبر سورة الفاتحة وأذكار الصلاة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Level Pre-A1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              متاح مجاناً 100%
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              0
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-arabic">المستوى التمهيدي (Pre-A1): أساسيات القراءة</h3>
            <p className="text-slate-500 text-sm mt-2">
              التعرف الصوتي والبصري على الحروف ومخارجها والحركات القصيرة والطويلة.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>28 حرفاً بأشكالها (أول، ووسط، وآخر الكلمة والمفردة)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>الحركات القصيرة (فتحة، كسرة، ضمة) وحروف المد</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>السكون والشدة والتنوين وقواعد الابتداء</span>
              </li>
            </ul>

            <Link
              href="/learn"
              className="mt-8 block text-center py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-sm transition-colors cursor-pointer"
            >
              دخول المستوى مجاناً
            </Link>
          </div>

          {/* Level A1 */}
          <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-md relative overflow-hidden">
            <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
              اشتراك Pro
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-emerald-200">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-arabic">المستوى الأول (A1): معجم القرآن وسورة الفاتحة</h3>
            <p className="text-slate-500 text-sm mt-2">
              فهم الكلمات الأكثر تكراراً في كتاب الله وتطبيق التلاوة الصحيحة.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تفسير ومفردات سورة الفاتحة كلمة بكلمة بالصوت</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>أهم 500 كلمة تشكل 80% من نصوص القرآن الكريم</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>نظام التكرار المتباعد (SRS) لترسيخ المفردات في الذاكرة</span>
              </li>
            </ul>

            <Link
              href="/pricing"
              className="mt-8 block text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-200 transition-colors cursor-pointer"
            >
              فتح كامل المحتوى
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
