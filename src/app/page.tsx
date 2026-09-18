'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAlphabetChart } from '@/components/reading/InteractiveAlphabetChart';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Exercise } from '@/types/database.types';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Video,
  CheckCircle2,
  Award,
  Star,
  Gift,
  Volume2,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const BAYNA_YADAYK_SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'by-ex-1',
    lesson_id: 'l-1',
    question_text: 'استمع إلى الحوار الأول من كتاب (العربية بين يديك): ما هو الرد النموذجي على التحية؟',
    question_ar: 'استمع إلى الحوار الأول من كتاب (العربية بين يديك): ما هو الرد النموذجي على التحية؟',
    question_en: 'Listen to Dialogue 1 from Bayna Yadayk: What is the correct response to the greeting?',
    question_ru: 'Послушайте диалог 1 из книги «Байна Ядайк»: Каков правильный ответ на приветствие?',
    arabic_text: 'وَعَلَيْكُمُ السَّلامُ',
    transliteration: 'Wa alaykumus-salam',
    translation: 'And upon you be peace',
    translation_en: 'And upon you be peace',
    translation_ru: 'И вам мир',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/salam_intro.mp3',
    options_json: [
      { id: 'opt1', text: 'وَعَلَيْكُمُ السَّلامُ', transliteration: 'Wa alaykumus-salam', text_en: 'And upon you be peace', text_ru: 'И вам мир' },
      { id: 'opt2', text: 'أَهْلاً وَسَهْلاً', transliteration: 'Ahlan wa sahlan', text_en: 'Welcome', text_ru: 'Добро пожаловать' },
      { id: 'opt3', text: 'مَعَ السَّلامَةِ', transliteration: 'Ma as-salamah', text_en: 'Goodbye', text_ru: 'До свидания' },
      { id: 'opt4', text: 'صَبَاحَ الْخَيْرِ', transliteration: 'Sabah al-khayr', text_en: 'Good morning', text_ru: 'Доброе утро' },
    ],
    correct_answer: 'opt1',
    explanation: 'الرد الإسلامي والأدبي المعتمد في الحوار الأول من سلسلة العربية بين يديك: وعليكم السلام ورحمة الله وبركاته.',
    explanation_ar: 'الرد الإسلامي والأدبي المعتمد في الحوار الأول من سلسلة العربية بين يديك: وعليكم السلام ورحمة الله وبركاته.',
    explanation_en: 'The standard response in Dialogue 1 of Al-Arabiyyah Bayna Yadayk: Wa alaykumus-salam.',
    explanation_ru: 'Канонический ответ в 1-м диалоге курса «Байна Ядайк»: Ва алейкумус-салям.',
    order_index: 1,
  },
  {
    id: 'by-ex-2',
    lesson_id: 'l-1',
    question_text: 'استمع للسؤال: (كَيْفَ حَالُكَ؟) - اختر الرد الصحيح كما ورد في كتاب العربية بين يديك:',
    question_ar: 'استمع للسؤال: (كَيْفَ حَالُكَ؟) - اختر الرد الصحيح كما ورد في كتاب العربية بين يديك:',
    question_en: 'Listen to the question: (How are you?) - Choose the matching response:',
    question_ru: 'Послушайте вопрос: (Как твои дела?) - Выберите правильный ответ:',
    arabic_text: 'بِخَيْرٍ وَالْحَمْدُ لِلَّهِ',
    transliteration: 'Bikhayrin walhamdulillah',
    translation: 'Fine, and praise be to Allah',
    translation_en: 'Fine, and praise be to Allah',
    translation_ru: 'В порядке, хвала Аллаху',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/kayfa_haluk.mp3',
    options_json: [
      { id: 'opt1', text: 'أَنَا مِنْ مِصْرَ', transliteration: 'Ana min Misr', text_en: 'I am from Egypt', text_ru: 'Я из Египта' },
      { id: 'opt2', text: 'بِخَيْرٍ وَالْحَمْدُ لِلَّهِ', transliteration: 'Bikhayrin walhamdulillah', text_en: 'Fine, praise be to Allah', text_ru: 'В порядке, хвала Аллаху' },
      { id: 'opt3', text: 'اسْمِي خَالِدٌ', transliteration: 'Ismi Khalid', text_en: 'My name is Khalid', text_ru: 'Меня зовут Халид' },
      { id: 'opt4', text: 'هُوَ مُدَرِّسٌ', transliteration: 'Huwa mudarris', text_en: 'He is a teacher', text_ru: 'Он учитель' },
    ],
    correct_answer: 'opt2',
    explanation: 'حوار خالد وخليل (العربية بين يديك): كيف حالك؟ - بخير والحمد لله.',
    explanation_ar: 'حوار خالد وخليل (العربية بين يديك): كيف حالك؟ - بخير والحمد لله.',
    explanation_en: 'Dialogue between Khalid and Khalil: How are you? - Fine, praise be to Allah.',
    explanation_ru: 'Диалог Халида и Халиля: Как дела? - Хорошо, хвала Аллаху.',
    order_index: 2,
  },
];

const REVIEWS = [
  {
    name: 'Annabelle Drummond',
    country: 'United Kingdom 🇬🇧',
    text: 'This is an excellent online Arabic teaching programme. I have found it most beneficial with both Tajweed and Arabic language lessons. Booking is seamless and teachers are exceptional.',
  },
  {
    name: 'Umm Omar',
    country: 'United States 🇺🇸',
    text: 'Madinah Arabic excels in teaching quality. My 5-year-old son has memorized 9 Surahs of Juz Amma with weekly classes and understands their meanings in simple English.',
  },
  {
    name: 'Zeyneb Temnenko',
    country: 'Kazakhstan / CIS 🇰🇿',
    text: 'После занятий с преподавателем я почувствовала огромный прогресс. Мой учитель — настоящий профессионал, я начала читать и понимать арабские тексты и грамматику.',
  },
];

export default function HomePage() {
  const { t, dir } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentExercise = BAYNA_YADAYK_SAMPLE_EXERCISES[currentIdx];
  const isRtl = dir === 'rtl';

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % BAYNA_YADAYK_SAMPLE_EXERCISES.length);
  };

  return (
    <div className="flex flex-col items-center" dir={dir}>
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2">
        <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>{t('banner.free_trial')}</span>
        <Link href="/one-to-one" className="underline hover:text-amber-200 transition-colors mx-2">
          {t('banner.start_now')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('home.hero_badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight font-arabic">
          {t('home.hero_title')}{' '}
          <span className="text-emerald-600 block sm:inline">
            (Madinah Arabic)
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('home.hero_subtitle')}
        </p>

        {/* Dual Primary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/one-to-one"
            className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-200 hover:shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Video className="w-5 h-5" />
            <span>{t('home.cta_trial')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          <Link
            href="/learn"
            className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>{t('home.cta_self_study')}</span>
          </Link>
        </div>
      </section>

      {/* Two Main Learning Options Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic">
            {t('home.paths_title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Path 1: Free Online Content */}
          <div className="p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  100% Free
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-arabic">
                {t('home.path_free_title')}
              </h3>
              <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-1">
                {t('home.path_free_subtitle')}
              </p>
              <p className="text-sm text-slate-600 mt-3 mb-6 leading-relaxed">
                {t('home.path_free_desc')}
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('home.path_free_f1')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('home.path_free_f2')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('home.path_free_f3')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('home.path_free_f4')}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/learn"
              className="w-full py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-sm text-center transition-colors block"
            >
              {t('home.path_free_btn')}
            </Link>
          </div>

          {/* Path 2: One-to-One Lessons */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl border-2 border-emerald-500 relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-8 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                  Certified Tutors
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-arabic">
                {t('home.path_1to1_title')}
              </h3>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mt-1">
                {t('home.path_1to1_subtitle')}
              </p>
              <p className="text-sm text-slate-300 mt-3 mb-6 leading-relaxed">
                {t('home.path_1to1_desc')}
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('home.path_1to1_f1')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('home.path_1to1_f2')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('home.path_1to1_f3')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('home.path_1to1_f4')}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/one-to-one"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center shadow-lg transition-colors block"
            >
              {t('home.path_1to1_btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Interactive Alphabet Sound Chart */}
      <section id="alphabet" className="w-full bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <InteractiveAlphabetChart />
        </div>
      </section>

      {/* Quick Level Placement Test Banner */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {t('home.level_test_banner_title')}
              </span>
            </div>
            <h3 className="text-2xl font-bold font-arabic">
              اختبار تحديد المستوى السريع (Level Placement Test)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {t('home.level_test_banner_desc')}
            </p>
          </div>

          <Link
            href="/level-test"
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-lg shrink-0 cursor-pointer"
          >
            {t('home.level_test_banner_btn')}
          </Link>
        </div>
      </section>

      {/* Live Dialogue Audio Player Preview */}
      <section className="w-full bg-white py-16 border-y border-slate-200">
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
              {currentIdx + 1} / {BAYNA_YADAYK_SAMPLE_EXERCISES.length}
            </div>
          </div>

          <InteractiveAudioExercisePlayer
            key={currentExercise.id}
            exercise={currentExercise}
            onNext={handleNext}
            autoPlayAudio={false}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            قصص وتجارب حقيقية
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 font-arabic">
            {t('home.testimonials_title')}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {t('home.testimonials_desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-900 text-sm block">{r.name}</span>
                <span className="text-[11px] text-slate-400 font-medium">{r.country}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
