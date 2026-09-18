'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { InteractiveAlphabetChart } from '@/components/reading/InteractiveAlphabetChart';
import { Exercise } from '@/types/database.types';
import { Sparkles, ArrowLeft, ArrowRight, LayoutDashboard, Volume2, BookOpen, Gift, Layers, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const TUHFA_SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'tuhfa-ex-1',
    lesson_id: 'b1000000-0000-0000-0000-000000000003',
    question_text: 'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟',
    question_ar: 'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟',
    question_en: "Listen to Ahmed's greeting in Lesson 1 of Al-Tuhfa: What is the exact matching response?",
    question_ru: 'Послушайте приветствие Ахмеда в Уроке 1 книги «Ат-Тухфа»: Каков точный ответ?',
    arabic_text: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    transliteration: 'As-salamu alaykum wa rahmatullahi wa barakatuh',
    translation: 'Peace be upon you and the mercy of Allah and His blessings',
    translation_en: 'Peace be upon you and the mercy of Allah and His blessings',
    translation_ru: 'Мир вам, милость Аллаха и Его благословение',
    question_type: 'audio_mcq',
    audio_url: '/audio/tuhfa/salam_full.mp3',
    options_json: [
      { id: 'opt1', text: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ', transliteration: 'Wa alaykumus-salam wa rahmatullah', text_en: "And upon you be peace and Allah's mercy", text_ru: 'И вам мир и милость Аллаха' },
      { id: 'opt2', text: 'أَهْلاً وَسَهْلاً بِكَ', transliteration: 'Ahlan wa sahlan bik', text_en: 'Welcome to you', text_ru: 'Добро пожаловать' },
      { id: 'opt3', text: 'إِلَى اللِّقَاءِ يَا أَخِي', transliteration: "Ila al-liqa' ya akhi", text_en: 'See you later, brother', text_ru: 'До встречи, брат' },
      { id: 'opt4', text: 'صَبَاحُ الخَيْرِ وَالنُّورِ', transliteration: 'Sabah al-khayr', text_en: 'Good morning', text_ru: 'Доброе утро' },
    ],
    correct_answer: 'opt1',
    explanation: 'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
    explanation_ar: 'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
    explanation_en: 'In Lesson 1 dialogue (Al-Tuhfa): Bilal replies: Wa alaykumus-salam wa rahmatullahi wa barakatuh.',
    explanation_ru: 'В диалоге 1-го урока («Ат-Тухфа»): Биляль отвечает: «Ва алейкумус-салям ва рахматуллахи ва баракатух».',
    order_index: 1,
  },
  {
    id: 'tuhfa-ex-2',
    lesson_id: 'b1000000-0000-0000-0000-000000000003',
    question_text: 'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟',
    question_ar: 'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟',
    question_en: "Ahmed asked: (Why did you come to Egypt?) - What was Bilal's response in Al-Tuhfa?",
    question_ru: 'Ахмед спросил: (Зачем ты приехал в Египет?) - Что ответил Биляль в книге «Ат-Тухфа»?',
    arabic_text: 'لِمَاذَا جِئْتَ إِلَى مِصْرَ؟',
    transliteration: "Limadha ji'ta ila Misr?",
    translation: 'Why did you come to Egypt?',
    translation_en: 'Why did you come to Egypt?',
    translation_ru: 'Зачем ты приехал в Египет?',
    question_type: 'audio_mcq',
    audio_url: '/audio/tuhfa/limadha_jita.mp3',
    options_json: [
      { id: 'opt1', text: 'لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ', transliteration: "Li-ata'allama fil-Azhar ash-Sharif", text_en: 'To study at Al-Azhar Al-Sharif', text_ru: 'Чтобы учиться в благородном Аль-Азхаре' },
      { id: 'opt2', text: 'لِزِيَارَةِ الأَهْرَامَاتِ', transliteration: 'Li-ziyaratil-ahramat', text_en: 'To visit the Pyramids', text_ru: 'Чтобы посетить пирамиды' },
      { id: 'opt3', text: 'لِلْعَمَلِ فِي التِّجَارَةِ', transliteration: "Lil-'amali fit-tijarah", text_en: 'To work in commerce', text_ru: 'Для работы в торговле' },
      { id: 'opt4', text: 'لِلْعِلَاجِ فِي المُسْتَشْفَى', transliteration: "Lil-'ilaj", text_en: 'For medical treatment', text_ru: 'Для лечения' },
    ],
    correct_answer: 'opt1',
    explanation: 'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
    explanation_ar: 'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
    explanation_en: 'Bilal answered: (To study at Al-Azhar Al-Sharif), the primary goal of students of this series.',
    explanation_ru: 'Биляль ответил: «Чтобы учиться в благородном Аль-Азхаре».',
    order_index: 2,
  },
];

const CLEAN_BOOK1_UNITS = [
  {
    number: 'التمهيد',
    title: 'الوحدة التمهيدية: أصوات وحروف العربية',
    en: 'Intro Unit: Arabic Alphabet & Phonics',
    desc: 'عائلة الحروف الهجائية، مخارج الحروف، الحركات القصيرة والطويلة، والتهيئة المصورة.',
    lessons: ['الدرس 1: عائلة الحروف الهجائية', 'الدرس 2: التهيئة اللغوية المصورة'],
    icon: '🔤',
    badge: 'درسان'
  },
  {
    number: 'الوحدة 1',
    title: 'الوحدة الأولى: التعارف والحياة الأسرية والسكن',
    en: 'Unit 1: Greetings, Family & Housing',
    desc: 'حوار التعارف في الأزهر الشريف، أفراد الأسرة، البيت والغرف والأثاث والأعداد.',
    lessons: ['الدرس 1: تحية وتعارف', 'الدرس 2: الأسرة', 'الدرس 3: السكن'],
    icon: '🤝',
    badge: '3 دروس'
  },
  {
    number: 'الوحدة 2',
    title: 'الوحدة الثانية: المعهد والتعليم والبيئة',
    en: 'Unit 2: Education, Institute & Nature',
    desc: 'الفصول المدرسية بالمعهد الأزهري، الأدوات التعليمية، حيوانات المزرعة، والطيور.',
    lessons: ['الدرس 4: معهدي', 'الدرس 5: الحيوانات', 'الدرس 6: الطيور'],
    icon: '🏫',
    badge: '3 دروس'
  },
  {
    number: 'الوحدة 3',
    title: 'الوحدة الثالثة: السفر والمواصلات والضيافة',
    en: 'Unit 3: Travel, Transport & Hospitality',
    desc: 'وسائل النقل والمواصلات، حجز الفندق وخدمات الغرف، وإجراءات المطار والجوازات.',
    lessons: ['الدرس 7: وسائل المواصلات', 'الدرس 8: في الفندق', 'الدرس 9: المطار والجوازات'],
    icon: '✈️',
    badge: '3 دروس'
  },
  {
    number: 'الوحدة 4',
    title: 'الوحدة الرابعة: الإنسان والمظهر والتسوق',
    en: 'Unit 4: Human Body, Clothes & Shopping',
    desc: 'أعضاء الجسم والحواس والصحة، الملابس والألوان، والتسوق في السوق والأسعار.',
    lessons: ['الدرس 10: جسم الإنسان', 'الدرس 11: الملابس', 'الدرس 12: في السوق'],
    icon: '👔',
    badge: '3 دروس'
  },
  {
    number: 'الوحدة 5',
    title: 'الوحدة الخامسة: الغذاء والصداقة والأنشطة',
    en: 'Unit 5: Nutrition, Friendship & Activities',
    desc: 'أنواع الخضراوات والفواكه وأسلوب التفضيل، زيارة الأصدقاء، والترويح في النادي الرياضي.',
    lessons: ['الدرس 13: خضراوات وفواكه', 'الدرس 14: الأصدقاء', 'الدرس 15: النادي'],
    icon: '⚽',
    badge: '3 دروس'
  },
];

export default function HomePage() {
  const { t, dir } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentExercise = TUHFA_SAMPLE_EXERCISES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TUHFA_SAMPLE_EXERCISES.length);
  };

  const isRtl = dir === 'rtl';

  return (
    <div className="flex flex-col items-center" dir={dir}>
      {/* Top Marketing Alert Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2">
        <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>{t('banner.free_trial')}</span>
        <Link href="/learn" className="underline hover:text-amber-200 transition-colors mx-2">
          {t('banner.start_now')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('home.hero_badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight font-arabic">
          {t('home.hero_title')}
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('home.hero_subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/learn"
            className="px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-200 hover:shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>{t('home.cta_curriculum')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          <Link
            href="/level-test"
            className="px-6 py-4 rounded-2xl bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>{t('home.cta_level_test')}</span>
          </Link>

          <Link
            href="/admin"
            className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>{t('nav.admin')}</span>
          </Link>
        </div>
      </section>

      {/* Live Interactive Player Demo Showcase */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                <span>{t('home.simulator_title')}</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-arabic mt-1">
                {t('home.simulator_desc')}
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
              {currentIdx + 1} / {TUHFA_SAMPLE_EXERCISES.length}
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

      {/* Book 1 Thematic Units Grid */}
      <section id="units" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>الكتاب الأول: المستوى المبتدئ الأول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic">
            وحدات ودروس الكتاب الأول المنظمة
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            تم تنظيم الـ 15 درساً والتمهيد الهجائي في 6 وحدات موضوعية واضحة ومحكمة لتسهيل التعلم خطوة بخطوة:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLEAN_BOOK1_UNITS.map((u, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-2xl transition-colors shrink-0">
                    {u.icon}
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {u.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 font-arabic mb-1 group-hover:text-emerald-700 transition-colors">
                  {u.title}
                </h3>
                <span className="text-[11px] font-sans text-slate-400 block mb-3 font-semibold">
                  {u.en}
                </span>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {u.desc}
                </p>

                {/* Lesson List Preview */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                  {u.lessons.map((les, lIdx) => (
                    <div key={lIdx} className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 font-arabic">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{les}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/learn"
                className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>دخول دروس الوحدة</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <span>استعراض المنهج بالكامل في صفحة التعلم</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </section>

      {/* 6-Level Azhari Roadmap */}
      <section className="w-full bg-slate-100/70 py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>سلسلة التحفة الأزهرية الكاملة (6 كتب ومستويات)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic">
              {t('home.stages_title')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              {t('home.stages_subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Level 1: Active */}
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-500 shadow-lg shadow-emerald-50 relative flex flex-col justify-between">
              <div className="absolute top-4 left-4 sm:left-auto sm:right-4 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                متاح ونشط الآن
              </div>
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm mb-4">
                  1
                </div>
                <h3 className="font-extrabold text-base text-slate-900 font-arabic mb-2">
                  {t('home.stage1_title')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t('home.stage1_desc')}
                </p>
              </div>
              <Link
                href="/learn"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>دخول وحدات الكتاب الأول</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>

            {/* Level 2 */}
            <div className="p-6 rounded-3xl bg-white/80 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm mb-4">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-800 font-arabic mb-2">
                  {t('home.stage2_title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('home.stage2_desc')}
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-bold mt-4 bg-slate-50 p-2 rounded-lg text-center">الكتاب الثاني — المرحلة اللاحقة</div>
            </div>

            {/* Level 3 */}
            <div className="p-6 rounded-3xl bg-white/80 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm mb-4">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-800 font-arabic mb-2">
                  {t('home.stage3_title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('home.stage3_desc')}
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-bold mt-4 bg-slate-50 p-2 rounded-lg text-center">الكتاب الثالث — المستوى المتوسط الأول</div>
            </div>

            {/* Level 4 */}
            <div className="p-6 rounded-3xl bg-white/80 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm mb-4">
                  4
                </div>
                <h3 className="font-bold text-base text-slate-800 font-arabic mb-2">
                  {t('home.stage4_title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('home.stage4_desc')}
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-bold mt-4 bg-slate-50 p-2 rounded-lg text-center">الكتاب الرابع — المستوى المتوسط الثاني</div>
            </div>

            {/* Level 5 */}
            <div className="p-6 rounded-3xl bg-white/80 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm mb-4">
                  5
                </div>
                <h3 className="font-bold text-base text-slate-800 font-arabic mb-2">
                  {t('home.stage5_title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('home.stage5_desc')}
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-bold mt-4 bg-slate-50 p-2 rounded-lg text-center">الكتاب الخامس — المستوى المتقدم الأول</div>
            </div>

            {/* Level 6 */}
            <div className="p-6 rounded-3xl bg-white/80 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm mb-4">
                  6
                </div>
                <h3 className="font-bold text-base text-slate-800 font-arabic mb-2">
                  {t('home.stage6_title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('home.stage6_desc')}
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-bold mt-4 bg-slate-50 p-2 rounded-lg text-center">الكتاب السادس — المستوى المتقدم الثاني</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Alphabet Sound Chart */}
      <section id="alphabet" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            {t('home.alphabet_title')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic">
            التهيئة الصوتية لأصوات الحروف العربية
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            {t('home.alphabet_desc')}
          </p>
        </div>

        <InteractiveAlphabetChart />
      </section>

      {/* Global Free Access CTA Box */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-2">
              100% Free Educational Initiative
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-arabic">
              منهج «التحفة الأزهرية» متاح مجاناً لكافة البشرية
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 max-w-xl leading-relaxed">
              تعلّم لغة القرآن والبيان بدون أي رسوم تسجيل أو اشتراكات شهرية، مع المحاكي الصوتي والاختبارات التفاعلية المباشرة.
            </p>
          </div>

          <Link
            href="/learn"
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>{t('home.cta_curriculum')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </section>
    </div>
  );
}
