'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, RotateCcw, Award, ArrowRight, ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TestQuestion {
  id: number;
  question_ar: string;
  question_en: string;
  question_ru: string;
  arabic_prompt: string;
  audio_url?: string;
  options: { id: string; text_ar: string; text_en: string; text_ru: string }[];
  correct_id: string;
  explanation_ar: string;
  explanation_en: string;
  explanation_ru: string;
}

const LEVEL_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question_ar: 'حدد الحرف العربي الذي ينطق (Baa):',
    question_en: 'Identify the Arabic letter pronounced as (Baa):',
    question_ru: 'Выберите арабскую букву, которая читается как (Ба):',
    arabic_prompt: 'حَرْفُ الْبَاء',
    audio_url: '/audio/letters/baa.mp3',
    options: [
      { id: 'opt1', text_ar: 'ب', text_en: 'Baa (ب)', text_ru: 'Ба (ب)' },
      { id: 'opt2', text_ar: 'ت', text_en: 'Taa (ت)', text_ru: 'Та (ت)' },
      { id: 'opt3', text_ar: 'ث', text_en: 'Thaa (ث)', text_ru: 'Са (ث)' },
      { id: 'opt4', text_ar: 'ن', text_en: 'Noon (ن)', text_ru: 'Нун (ن)' },
    ],
    correct_id: 'opt1',
    explanation_ar: 'حرف الباء تحته نقطة واحدة (ب).',
    explanation_en: 'The letter Baa has one single dot below (ب).',
    explanation_ru: 'У буквы Ба одна точка снизу (ب).',
  },
  {
    id: 2,
    question_ar: 'ما هو المعنى الصحيح لتحية: (السَّلامُ عَلَيْكُمْ)؟',
    question_en: 'What is the correct meaning of the greeting: (As-Salamu Alaykum)?',
    question_ru: 'Что означает мусульманское приветствие (Ас-саляму алейкум)?',
    arabic_prompt: 'السَّلامُ عَلَيْكُمْ',
    audio_url: '/audio/bayna-yadayk/salam_intro.mp3',
    options: [
      { id: 'opt1', text_ar: 'صباح الخير', text_en: 'Good morning', text_ru: 'Доброе утро' },
      { id: 'opt2', text_ar: 'السلام عليكم ورحمة الله', text_en: 'Peace be upon you', text_ru: 'Мир вам' },
      { id: 'opt3', text_ar: 'أهلاً وسهلاً', text_en: 'Welcome', text_ru: 'Добро пожаловать' },
      { id: 'opt4', text_ar: 'مع السلامة', text_en: 'Goodbye', text_ru: 'До свидания' },
    ],
    correct_id: 'opt2',
    explanation_ar: 'السلام عليكم تعني الدعاء بالسلام والسكينة.',
    explanation_en: 'As-Salamu Alaykum means "Peace be upon you".',
    explanation_ru: 'Ас-саляму алейкум означает «Мир вам».',
  },
  {
    id: 3,
    question_ar: 'ما هو الرد النموذجي على سؤال: (كَيْفَ حَالُكَ؟)؟',
    question_en: 'What is the standard answer to the question: (Kayfa haluk)?',
    question_ru: 'Каков правильный ответ на вопрос: (Кейфа халюк - Как дела)?',
    arabic_prompt: 'كَيْفَ حَالُكَ؟',
    audio_url: '/audio/bayna-yadayk/kayfa_haluk.mp3',
    options: [
      { id: 'opt1', text_ar: 'اسمي خالد', text_en: 'My name is Khalid', text_ru: 'Меня зовут Халид' },
      { id: 'opt2', text_ar: 'أنا من مصر', text_en: 'I am from Egypt', text_ru: 'Я из Египта' },
      { id: 'opt3', text_ar: 'بِخَيْرٍ وَالْحَمْدُ لِلَّهِ', text_en: 'Fine, praise be to Allah', text_ru: 'В порядке, хвала Аллаху' },
      { id: 'opt4', text_ar: 'هو مدرس', text_en: 'He is a teacher', text_ru: 'Он учитель' },
    ],
    correct_id: 'opt3',
    explanation_ar: 'الرد القياسي في العربية بين يديك: بخير والحمد لله.',
    explanation_en: 'The standard response is "Bikhayrin walhamdulillah" (Fine, praise be to Allah).',
    explanation_ru: 'Канонический ответ: Бихайрин вальхамдулиллях.',
  },
  {
    id: 4,
    question_ar: 'حدد التركيب النحوي الصحيح لجملة: (هَذَا كِتَابٌ):',
    question_en: 'What is the grammatical meaning of the demonstrative phrase: (Hadha kitabun)?',
    question_ru: 'Каков перевод указательного предложения: (Хаза китабун)?',
    arabic_prompt: 'هَذَا كِتَابٌ',
    options: [
      { id: 'opt1', text_ar: 'هذا كتابٌ', text_en: 'This is a book', text_ru: 'Это книга' },
      { id: 'opt2', text_ar: 'تلك شجرة', text_en: 'That is a tree', text_ru: 'То дерево' },
      { id: 'opt3', text_ar: 'ذلك قلم', text_en: 'That is a pen', text_ru: 'То ручка' },
      { id: 'opt4', text_ar: 'هذه سيارة', text_en: 'This is a car', text_ru: 'Это машина' },
    ],
    correct_id: 'opt1',
    explanation_ar: 'هذا اسم إشارة للمفرد المذكر القريب.',
    explanation_en: '"Hadha" is the demonstrative pronoun for masculine singular near objects (This is a book).',
    explanation_ru: 'Хаза — указательное местоимение мужского рода (Это книга).',
  },
  {
    id: 5,
    question_ar: 'ما معنى الكلمة القرآنية المتكررة: (الرَّحْمَٰنِ الرَّحِيمِ)؟',
    question_en: 'What is the meaning of the Quranic divine names: (Ar-Rahman Ar-Raheem)?',
    question_ru: 'Что означают прекрасные имена Аллаха: (Ар-Рахман Ар-Рахим)?',
    arabic_prompt: 'الرَّحْمَٰنِ الرَّحِيمِ',
    audio_url: 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001003.mp3',
    options: [
      { id: 'opt1', text_ar: 'العزيز الحكيم', text_en: 'The Almighty, The Wise', text_ru: 'Могущественный, Мудрый' },
      { id: 'opt2', text_ar: 'الرَّحْمَنِ الرَّحِيمِ (ذو الرحمة الواسعة)', text_en: 'The Entirely Merciful, The Especially Merciful', text_ru: 'Милостивый, Милосердный' },
      { id: 'opt3', text_ar: 'المالك القدوس', text_en: 'The King, The Holy', text_ru: 'Владыка, Святой' },
      { id: 'opt4', text_ar: 'الغفور الشكور', text_en: 'The Forgiving, The Appreciative', text_ru: 'Прощающий, Благодарный' },
    ],
    correct_id: 'opt2',
    explanation_ar: 'اسمان من أسماء الله الحسنى يدلان على سعة رحمته بجميع خلقه وخاصة بالمؤمنين.',
    explanation_en: 'Two of the most exalted names of Allah denoting vast and specific mercy.',
    explanation_ru: 'Два прекрасных имени Аллаха, означающие Всемилостивый и Милосердный.',
  },
];

export default function LevelTestPage() {
  const { language, t, dir } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQ = LEVEL_TEST_QUESTIONS[currentIdx];
  const isRtl = dir === 'rtl';

  const handleSelectOption = (optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optId }));
  };

  const handleNext = () => {
    if (currentIdx + 1 < LEVEL_TEST_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#3b82f6'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const calculateScore = () => {
    let score = 0;
    LEVEL_TEST_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_id) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  // Recommendation logic based on score
  const getRecommendation = () => {
    if (score <= 2) {
      return {
        level: language === 'ru' ? 'Начальный (Pre-A1)' : language === 'en' ? 'Absolute Beginner (Pre-A1)' : 'مبتدئ تماماً (Pre-A1)',
        recommendation:
          language === 'ru'
            ? 'Рекомендуем начать с интерактивной таблицы алфавита и курса чтения букв с махраджем.'
            : language === 'en'
            ? 'We recommend starting with our Interactive Alphabet Chart & Arabic Reading Course.'
            : 'نوصيك بالبدء بدورة قراءة الحروف الأبجدية ومخارج الأصوات عبر لوحة الحروف التفاعلية.',
        pathUrl: '/#alphabet',
        pathLabel: language === 'ru' ? 'Перейти к таблице алфавита' : language === 'en' ? 'Start Reading Course' : 'ابدأ دورة القراءة والأبجدية',
      };
    } else if (score <= 4) {
      return {
        level: language === 'ru' ? 'Базовый разговорный (A1)' : language === 'en' ? 'Elementary (A1)' : 'المستوى التأسيسي (A1)',
        recommendation:
          language === 'ru'
            ? 'Вы уже знакомы с чтением! Начните с книги «Аль-Арабийя Байна Ядайк» (Урок 1: Приветствие и знакомство).'
            : language === 'en'
            ? 'You have reading foundation! We recommend Al-Arabiyyah Bayna Yadayk Book 1 dialogues.'
            : 'لديك معرفة جيدة بالقراءة! نوصيك ببدء دراسة حوارات كتاب (العربية بين يديك - الكتاب الأول).',
        pathUrl: '/learn',
        pathLabel: language === 'ru' ? 'Начать уроки Байна Ядайк' : language === 'en' ? 'Start Bayna Yadayk Lessons' : 'دخول دروس العربية بين يديك',
      };
    } else {
      return {
        level: language === 'ru' ? 'Средний уровень (B1)' : language === 'en' ? 'Intermediate (B1)' : 'مستوى متقدم / تجويد (B1)',
        recommendation:
          language === 'ru'
            ? 'Отличный результат! Рекомендуем индивидуальные уроки 1:1 с преподавателем и курс таджвида Корана.'
            : language === 'en'
            ? 'Outstanding score! We recommend One-to-One tutoring and Quranic vocabulary analysis.'
            : 'مستوى متميز! نوصيك بالانضمام للدروس الفردية 1:1 مع معلم معتمد لدراسة النحو وبلاغة القرآن.',
        pathUrl: '/one-to-one',
        pathLabel: language === 'ru' ? 'Записаться к преподавателю' : language === 'en' ? 'Book a 1:1 Teacher' : 'احجز جلسة مع معلم معتمد',
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir={dir}>
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          {t('brand.name')} • {t('level_test.title')}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 font-arabic mt-2">
          {t('level_test.title')}
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          {t('level_test.subtitle')}
        </p>
      </div>

      {!showResult ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* Progress header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 text-xs font-bold text-slate-500">
            <span>
              {t('level_test.question_of', {
                current: currentIdx + 1,
                total: LEVEL_TEST_QUESTIONS.length,
              })}
            </span>
            <div className="flex gap-1.5">
              {LEVEL_TEST_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`w-5 h-1.5 rounded-full transition-all ${
                    i === currentIdx
                      ? 'bg-emerald-600 w-8'
                      : i < currentIdx
                      ? 'bg-emerald-300'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Prompt */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {language === 'ru'
                ? currentQ.question_ru
                : language === 'en'
                ? currentQ.question_en
                : currentQ.question_ar}
            </h3>

            <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-arabic font-black text-slate-900">
                {currentQ.arabic_prompt}
              </span>

              {currentQ.audio_url && (
                <button
                  type="button"
                  onClick={() => {
                    const audio = new Audio(currentQ.audio_url);
                    audio.play().catch(() => {});
                  }}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                  title="Play Sound"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentIdx] === opt.id;
              const optText =
                language === 'ru'
                  ? opt.text_ru
                  : language === 'en'
                  ? opt.text_en
                  : opt.text_ar;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-emerald-300 bg-white text-slate-800'
                  }`}
                >
                  <span className="text-sm font-arabic">{optText}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswers[currentIdx]}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                selectedAnswers[currentIdx]
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>
                {currentIdx + 1 === LEVEL_TEST_QUESTIONS.length
                  ? t('level_test.finish')
                  : t('level_test.submit')}
              </span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            {t('level_test.result_title')}
          </span>

          <h2 className="text-3xl font-black text-slate-900 mt-3">
            {t('level_test.score', { score, total: LEVEL_TEST_QUESTIONS.length })}
          </h2>

          <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-right">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-base text-emerald-950">
                المستوى المناسب لك: <span className="text-emerald-700">{recommendation.level}</span>
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {recommendation.recommendation}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={recommendation.pathUrl}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              {recommendation.pathLabel}
            </Link>

            <button
              type="button"
              onClick={() => {
                setCurrentIdx(0);
                setSelectedAnswers({});
                setShowResult(false);
              }}
              className="px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
