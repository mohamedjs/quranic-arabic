'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Exercise } from '@/types/database.types';
import { Sparkles, ArrowLeft, ArrowRight, LayoutDashboard, Volume2, BookOpen, Gift } from 'lucide-react';
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
  {
    id: 'by-ex-3',
    lesson_id: 'l-1',
    question_text: 'استمع لسؤال الجنسية: (مِنْ أَيْنَ أَنْتَ؟) - ما هي الإجابة المطابقة للصوت المسموع؟',
    question_ar: 'استمع لسؤال الجنسية: (مِنْ أَيْنَ أَنْتَ؟) - ما هي الإجابة المطابقة للصوت المسموع؟',
    question_en: 'Listen to: (Where are you from?) - What is the matching answer?',
    question_ru: 'Послушайте: (Откуда ты?) - Каков правильный ответ?',
    arabic_text: 'أَنَا مِنْ مِصْرَ، أَنَا مِصْرِيٌّ',
    transliteration: 'Ana min Misr, ana misriyy',
    translation: 'I am from Egypt, I am Egyptian',
    translation_en: 'I am from Egypt, I am Egyptian',
    translation_ru: 'Я из Египта, я египтянин',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/min_ayna_anta.mp3',
    options_json: [
      { id: 'opt1', text: 'أَنَا مِنْ مِصْرَ، أَنَا مِصْرِيٌّ', transliteration: 'Ana min Misr, ana misriyy', text_en: 'I am from Egypt, I am Egyptian', text_ru: 'Я из Египта, я египтянин' },
      { id: 'opt2', text: 'أَنَا مِنْ تُرْكِيَا، أَنَا تُرْكِيٌّ', transliteration: 'Ana min Turkiya, ana turkiyy', text_en: 'I am from Turkey, I am Turkish', text_ru: 'Я из Турции, я турок' },
      { id: 'opt3', text: 'أَنَا مِنْ سُورِيَا، أَنَا سُورِيٌّ', transliteration: 'Ana min Suriya, ana suriyy', text_en: 'I am from Syria, I am Syrian', text_ru: 'Я из Сирии, я сириец' },
      { id: 'opt4', text: 'أَنَا مِنْ بَاكِسْتَانَ', transliteration: 'Ana min Pakistan', text_en: 'I am from Pakistan', text_ru: 'Я из Пакистана' },
    ],
    correct_answer: 'opt1',
    explanation: 'الحوار الثاني في كتاب العربية بين يديك: من أين أنت؟ أنا من مصر، وأنا مصري.',
    explanation_ar: 'الحوار الثاني في كتاب العربية بين يديك: من أين أنت؟ أنا من مصر، وأنا مصري.',
    explanation_en: 'Dialogue 2: Where are you from? I am from Egypt, and I am Egyptian.',
    explanation_ru: 'Диалог 2: Откуда ты? Я из Египта, я египтянин.',
    order_index: 3,
  },
];

export default function HomePage() {
  const { t, dir } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentExercise = BAYNA_YADAYK_SAMPLE_EXERCISES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % BAYNA_YADAYK_SAMPLE_EXERCISES.length);
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
          <span>{t('home.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight font-arabic">
          {t('home.hero_title_1')}{' '}
          <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
            {t('home.hero_title_highlight')}
          </span>
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
            <span>{t('home.cta_start')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
              {currentIdx + 1} / {BAYNA_YADAYK_SAMPLE_EXERCISES.length}
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

      {/* Multilingual Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">
              {t('home.feature_1_title')}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('home.feature_1_desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">
              {t('home.feature_2_title')}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('home.feature_2_desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">
              {t('home.feature_3_title')}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('home.feature_3_desc')}
            </p>
          </div>
        </div>

        {/* Free Access CTA Box */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
              Bayan Arabic • العربية بين يديك
            </span>
            <h3 className="text-2xl font-bold font-arabic">{t('learn.title')}</h3>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-lg">
              {t('learn.subtitle')}
            </p>
          </div>

          <Link
            href="/learn"
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shrink-0 cursor-pointer"
          >
            {t('home.cta_start')} {isRtl ? '←' : '→'}
          </Link>
        </div>
      </section>
    </div>
  );
}
