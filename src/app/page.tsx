'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { InteractiveAlphabetChart } from '@/components/reading/InteractiveAlphabetChart';
import { Exercise } from '@/types/database.types';
import { Sparkles, ArrowLeft, ArrowRight, LayoutDashboard, Volume2, BookOpen, Gift, Layers, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const TUHFA_SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'tuhfa-ex-1',
    lesson_id: 'l-1',
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
    lesson_id: 'l-1',
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
  {
    id: 'tuhfa-ex-3',
    lesson_id: 'l-1',
    question_text: 'استمع إلى التعريف بالجنسيات والبلدان: من أين أحمد وبلال في حوار الدرس الأول؟',
    question_ar: 'استمع إلى التعريف بالجنسيات والبلدان: من أين أحمد وبلال في حوار الدرس الأول؟',
    question_en: 'Listen to countries & origins: Where are Ahmed and Bilal from in Lesson 1?',
    question_ru: 'Послушайте представление стран: Откуда Ахмед и Биляль в 1-м уроке?',
    arabic_text: 'أَنَا أَحْمَدُ مِنْ أَلْمَانْيَا، وَأَنَا بِلَالٌ مِنْ بَاكِسْتَانَ',
    transliteration: 'Ana Ahmad min Almanya, wa ana Bilal min Pakistan',
    translation: 'I am Ahmed from Germany, and I am Bilal from Pakistan',
    translation_en: 'I am Ahmed from Germany, and I am Bilal from Pakistan',
    translation_ru: 'Я Ахмед из Германии, а я Биляль из Пакистана',
    question_type: 'audio_mcq',
    audio_url: '/audio/tuhfa/bilad.mp3',
    options_json: [
      { id: 'opt1', text: 'أَنَا أَحْمَدُ مِنْ أَلْمَانْيَا، وَأَنَا بِلَالٌ مِنْ بَاكِسْتَانَ', transliteration: 'Ana Ahmad min Almanya, wa ana Bilal min Pakistan', text_en: 'I am Ahmed from Germany, and I am Bilal from Pakistan', text_ru: 'Я Ахмед из Германии, а я Биляль из Пакистана' },
      { id: 'opt2', text: 'أَنَا مِنْ مِصْرَ وَهُوَ مِنْ فَرَنْسَا', transliteration: 'Ana min Misr wa huwa min Faransa', text_en: 'I am from Egypt and he is from France', text_ru: 'Я из Египта, а он из Франции' },
      { id: 'opt3', text: 'أَنَا رُوسِيٌّ وَهُوَ تُرْكِيٌّ', transliteration: 'Ana rusiyy wa huwa turkiyy', text_en: 'I am Russian and he is Turkish', text_ru: 'Я русский, а он турок' },
      { id: 'opt4', text: 'أَنَا أُسْتَاذٌ وَهُوَ طَبِيبٌ', transliteration: 'Ana ustadh', text_en: 'I am a professor', text_ru: 'Я преподаватель' },
    ],
    correct_answer: 'opt1',
    explanation: 'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
    explanation_ar: 'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
    explanation_en: 'In Al-Tuhfa Dialogue (p. 18): Ahmed is from Germany, Bilal is from Pakistan.',
    explanation_ru: 'В диалоге книги «Ат-Тухфа» (стр. 18): Ахмед из Германии, а Биляль из Пакистана.',
    order_index: 3,
  },
];

const BOOK_1_UNITS = [
  { id: '0', title: 'التمهيد: الأصوات الهجائية والتهيئة المصورة', en: 'Prep: Alphabet Phonics & Visual Primer', icon: '🔤' },
  { id: '1', title: 'الوحدة 1: تَحِيَّةٌ وَتَعَارُفٌ (حوار الأزهر)', en: 'Unit 1: Greetings & Meeting at Al-Azhar', icon: '🤝' },
  { id: '2', title: 'الوحدة 2: الأُسْرَةُ وَإِعْدَادُ الغَدَاءِ', en: 'Unit 2: The Family & Dining', icon: '👨‍👩‍👧‍👦' },
  { id: '3', title: 'الوحدة 3: السَّكَنُ وَالغُرَفُ وَالأَثَاثُ', en: 'Unit 3: Housing & The Home', icon: '🏠' },
  { id: '4', title: 'الوحدة 4: مَعْهَدِي وَالفُصُولُ الدِّرَاسِيَّةُ', en: 'Unit 4: My Institute (Al-Azhar)', icon: '🏫' },
  { id: '5', title: 'الوحدة 5: الحَيَوَانَاتُ الأَلِيفَةُ وَالمَزْرَعَةُ', en: 'Unit 5: Animals & Farm', icon: '🐎' },
  { id: '6', title: 'الوحدة 6: عَالَمُ الطُّيُورِ وَأَسْمَاؤُهَا', en: 'Unit 6: Birds World', icon: '🕊️' },
  { id: '7', title: 'الوحدة 7: وَسَائِلُ المَوَاصَلَاتِ', en: 'Unit 7: Transportation', icon: '🚆' },
  { id: '8', title: 'الوحدة 8: فِي الفُنْدُقِ وَالخِدْمَاتِ', en: 'Unit 8: At the Hotel', icon: '🏨' },
  { id: '9', title: 'الوحدة 9: المَطَارُ وَإِجْرَاءَاتُ الجَوَازَاتِ', en: 'Unit 9: Airport & Passports', icon: '✈️' },
  { id: '10', title: 'الوحدة 10: جِسْمُ الإِنْسَانِ وَالحَوَاسُّ', en: 'Unit 10: Human Body & Senses', icon: '👁️' },
  { id: '11', title: 'الوحدة 11: المَلَابِسُ وَالأَلْوَانُ', en: 'Unit 11: Clothes & Colors', icon: '👔' },
  { id: '12', title: 'الوحدة 12: فِي السُّوقِ وَالأَسْعَارِ', en: 'Unit 12: In the Market & Prices', icon: '🛒' },
  { id: '13', title: 'الوحدة 13: خَضْرَاوَاتٌ وَفَوَاكِهُ', en: 'Unit 13: Vegetables & Fruits', icon: '🍎' },
  { id: '14', title: 'الوحدة 14: الأَصْدِقَاءُ وَالزِّيَارَاتُ', en: 'Unit 14: Friends & Fellowship', icon: '👥' },
  { id: '15', title: 'الوحدة 15: النَّادِي وَالأَنْشِطَةُ الرِّيَاضِيَّةُ', en: 'Unit 15: Sports & The Club', icon: '⚽' },
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

      {/* 6-Level Azhari Roadmap */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>سلسلة التحفة الأزهرية الكاملة (6 مستويات)</span>
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

          {/* Level 2: Coming Soon */}
          <div className="p-6 rounded-3xl bg-white/70 border border-slate-200 opacity-90 flex flex-col justify-between">
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
            <div className="text-[11px] text-slate-400 font-medium mt-4">الكتاب الثاني — المرحلة اللاحقة</div>
          </div>

          {/* Level 3: Coming Soon */}
          <div className="p-6 rounded-3xl bg-white/70 border border-slate-200 opacity-90 flex flex-col justify-between">
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
            <div className="text-[11px] text-slate-400 font-medium mt-4">الكتاب الثالث — المستوى المتوسط الأول</div>
          </div>

          {/* Level 4: Coming Soon */}
          <div className="p-6 rounded-3xl bg-white/70 border border-slate-200 opacity-80 flex flex-col justify-between">
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
            <div className="text-[11px] text-slate-400 font-medium mt-4">الكتاب الرابع — المستوى المتوسط الثاني</div>
          </div>

          {/* Level 5: Coming Soon */}
          <div className="p-6 rounded-3xl bg-white/70 border border-slate-200 opacity-80 flex flex-col justify-between">
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
            <div className="text-[11px] text-slate-400 font-medium mt-4">الكتاب الخامس — المستوى المتقدم الأول</div>
          </div>

          {/* Level 6: Coming Soon */}
          <div className="p-6 rounded-3xl bg-white/70 border border-slate-200 opacity-80 flex flex-col justify-between">
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
            <div className="text-[11px] text-slate-400 font-medium mt-4">الكتاب السادس — المستوى المتقدم الثاني</div>
          </div>
        </div>
      </section>

      {/* Book 1 Units Matrix Grid */}
      <section id="units" className="w-full bg-slate-100/70 py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>فهرس الكتاب الأول: المستوى المبتدئ الأول</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic">
              وحدات المواقف الحياتية الـ 15 المعتمدة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              تغطي كل وحدة حواراً حياً، وقواعد صوتية وكتابية وتراكيب نحوية مستهدفة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOOK_1_UNITS.map((u, idx) => (
              <Link
                key={u.id}
                href="/learn"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex items-start gap-3"
              >
                <div className="text-2xl p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors shrink-0">
                  {u.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 font-arabic group-hover:text-emerald-700 transition-colors truncate">
                    {u.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                    {u.en}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>دخول المنهج الكامل والبدء في الدروس</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
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
