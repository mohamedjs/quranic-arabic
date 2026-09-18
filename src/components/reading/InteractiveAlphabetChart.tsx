'use client';

import React, { useState } from 'react';
import { Volume2, Play, Sparkles, Gauge, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface ArabicLetter {
  letter: string;
  name_ar: string;
  name_en: string;
  name_ru: string;
  translit: string;
  audio: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  example_word: string;
  example_meaning_en: string;
  example_meaning_ru: string;
  example_meaning_ar: string;
}

export const ARABIC_ALPHABET: ArabicLetter[] = [
  { letter: 'أ', name_ar: 'أَلِف', name_en: 'Alif', name_ru: 'Алиф', translit: 'a / aa', audio: '/audio/letters/alif.mp3', isolated: 'أ', initial: 'أَ', medial: 'ـأ', final: 'ـأ', example_word: 'أَسَدٌ', example_meaning_ar: 'أسد', example_meaning_en: 'Lion', example_meaning_ru: 'Лев' },
  { letter: 'ب', name_ar: 'بَاء', name_en: 'Baa', name_ru: 'Ба', translit: 'b', audio: '/audio/letters/baa.mp3', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', example_word: 'بَابٌ', example_meaning_ar: 'باب', example_meaning_en: 'Door', example_meaning_ru: 'Дверь' },
  { letter: 'ت', name_ar: 'تَاء', name_en: 'Taa', name_ru: 'Та', translit: 't', audio: '/audio/letters/taa.mp3', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', example_word: 'تِينٌ', example_meaning_ar: 'تين', example_meaning_en: 'Fig', example_meaning_ru: 'Инжир' },
  { letter: 'ث', name_ar: 'ثَاء', name_en: 'Thaa', name_ru: 'Са (межзубный)', translit: 'th', audio: '/audio/letters/thaa.mp3', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', example_word: 'ثَوْبٌ', example_meaning_ar: 'ثوب', example_meaning_en: 'Garment', example_meaning_ru: 'Одежда' },
  { letter: 'ج', name_ar: 'جِيم', name_en: 'Jeem', name_ru: 'Джим', translit: 'j', audio: '/audio/letters/jeem.mp3', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', example_word: 'جَمَلٌ', example_meaning_ar: 'جمل', example_meaning_en: 'Camel', example_meaning_ru: 'Верблюд' },
  { letter: 'ح', name_ar: 'حَاء', name_en: 'Haa (pharyngeal)', name_ru: 'Ха (мягкий)', translit: 'ḥ', audio: '/audio/letters/haa.mp3', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', example_word: 'حَلِيبٌ', example_meaning_ar: 'حليب', example_meaning_en: 'Milk', example_meaning_ru: 'Молоко' },
  { letter: 'خ', name_ar: 'خَاء', name_en: 'Khaa', name_ru: 'Ха (твердый)', translit: 'kh', audio: '/audio/letters/khaa.mp3', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', example_word: 'خُبْزٌ', example_meaning_ar: 'خبز', example_meaning_en: 'Bread', example_meaning_ru: 'Хлеб' },
  { letter: 'د', name_ar: 'دَال', name_en: 'Daal', name_ru: 'Даль', translit: 'd', audio: '/audio/letters/daal.mp3', isolated: 'د', initial: 'دَ', medial: 'ـد', final: 'ـد', example_word: 'دَرْسٌ', example_meaning_ar: 'درس', example_meaning_en: 'Lesson', example_meaning_ru: 'Урок' },
  { letter: 'ذ', name_ar: 'ذَال', name_en: 'Thaal', name_ru: 'Заль (межзубный)', translit: 'dh', audio: '/audio/letters/thaa.mp3', isolated: 'ذ', initial: 'ذَ', medial: 'ـذ', final: 'ـذ', example_word: 'ذَهَبٌ', example_meaning_ar: 'ذهب', example_meaning_en: 'Gold', example_meaning_ru: 'Золото' },
  { letter: 'ر', name_ar: 'رَاء', name_en: 'Raa', name_ru: 'Ра', translit: 'r', audio: '/audio/letters/raa.mp3', isolated: 'ر', initial: 'رَ', medial: 'ـر', final: 'ـر', example_word: 'رَجُلٌ', example_meaning_ar: 'رجل', example_meaning_en: 'Man', example_meaning_ru: 'Мужчина' },
  { letter: 'ز', name_ar: 'زَاي', name_en: 'Zaay', name_ru: 'Зай', translit: 'z', audio: '/audio/letters/seen.mp3', isolated: 'ز', initial: 'زَ', medial: 'ـز', final: 'ـز', example_word: 'زَيْتُونٌ', example_meaning_ar: 'زيتون', example_meaning_en: 'Olive', example_meaning_ru: 'Оливки' },
  { letter: 'س', name_ar: 'سِين', name_en: 'Seen', name_ru: 'Син', translit: 's', audio: '/audio/letters/seen.mp3', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', example_word: 'سَمَكٌ', example_meaning_ar: 'سمك', example_meaning_en: 'Fish', example_meaning_ru: 'Рыба' },
  { letter: 'ش', name_ar: 'شِين', name_en: 'Sheen', name_ru: 'Шин', translit: 'sh', audio: '/audio/letters/seen.mp3', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', example_word: 'شَمْسٌ', example_meaning_ar: 'شمس', example_meaning_en: 'Sun', example_meaning_ru: 'Солнце' },
  { letter: 'ص', name_ar: 'صَاد', name_en: 'Saad (emphatic)', name_ru: 'Сад (твердый)', translit: 'ṣ', audio: '/audio/letters/saad.mp3', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', example_word: 'صَبَاحٌ', example_meaning_ar: 'صباح', example_meaning_en: 'Morning', example_meaning_ru: 'Утро' },
  { letter: 'ض', name_ar: 'ضَاد', name_en: 'Daad (emphatic)', name_ru: 'Дад (твердый)', translit: 'ḍ', audio: '/audio/letters/saad.mp3', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', example_word: 'ضَوْءٌ', example_meaning_ar: 'ضوء', example_meaning_en: 'Light', example_meaning_ru: 'Свет' },
  { letter: 'ط', name_ar: 'طَاء', name_en: 'Taa (emphatic)', name_ru: 'Та (твердый)', translit: 'ṭ', audio: '/audio/letters/taa2.mp3', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', example_word: 'طَالِبٌ', example_meaning_ar: 'طالب', example_meaning_en: 'Student', example_meaning_ru: 'Студент' },
  { letter: 'ظ', name_ar: 'ظَاء', name_en: 'Zhaa (emphatic)', name_ru: 'За (твердый межзубный)', translit: 'ẓ', audio: '/audio/letters/taa2.mp3', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', example_word: 'ظِلٌّ', example_meaning_ar: 'ظل', example_meaning_en: 'Shadow', example_meaning_ru: 'Тень' },
  { letter: 'ع', name_ar: 'عَيْن', name_en: 'Ayn (deep guttural)', name_ru: 'Айн (гортанный)', translit: '‘ayn', audio: '/audio/letters/ayn.mp3', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', example_word: 'عِلْمٌ', example_meaning_ar: 'علم', example_meaning_en: 'Knowledge', example_meaning_ru: 'Знание' },
  { letter: 'غ', name_ar: 'غَيْن', name_en: 'Ghayn', name_ru: 'Гайн', translit: 'gh', audio: '/audio/letters/ayn.mp3', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', example_word: 'غُرْفَةٌ', example_meaning_ar: 'غرفة', example_meaning_en: 'Room', example_meaning_ru: 'Комната' },
  { letter: 'ف', name_ar: 'فَاء', name_en: 'Faa', name_ru: 'Фа', translit: 'f', audio: '/audio/letters/baa.mp3', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', example_word: 'فَمٌ', example_meaning_ar: 'فم', example_meaning_en: 'Mouth', example_meaning_ru: 'Рот' },
  { letter: 'ق', name_ar: 'قَاف', name_en: 'Qaaf (uvular)', name_ru: 'Каф (твердый)', translit: 'q', audio: '/audio/letters/qaaf.mp3', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', example_word: 'قُرْآنٌ', example_meaning_ar: 'قرآن', example_meaning_en: 'Quran', example_meaning_ru: 'Коран' },
  { letter: 'ك', name_ar: 'كَاف', name_en: 'Kaaf', name_ru: 'Кяф', translit: 'k', audio: '/audio/letters/kaaf.mp3', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', example_word: 'كِتَابٌ', example_meaning_ar: 'كتاب', example_meaning_en: 'Book', example_meaning_ru: 'Книга' },
  { letter: 'ل', name_ar: 'لاَم', name_en: 'Laam', name_ru: 'Лям', translit: 'l', audio: '/audio/letters/alif.mp3', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', example_word: 'لَيْلٌ', example_meaning_ar: 'ليل', example_meaning_en: 'Night', example_meaning_ru: 'Ночь' },
  { letter: 'م', name_ar: 'مِيم', name_en: 'Meem', name_ru: 'Мим', translit: 'm', audio: '/audio/letters/meem.mp3', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', example_word: 'مَسْجِدٌ', example_meaning_ar: 'مسجد', example_meaning_en: 'Mosque', example_meaning_ru: 'Мечеть' },
  { letter: 'ن', name_ar: 'نُون', name_en: 'Noon', name_ru: 'Нун', translit: 'n', audio: '/audio/letters/noon.mp3', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', example_word: 'نُورٌ', example_meaning_ar: 'نور', example_meaning_en: 'Light', example_meaning_ru: 'Свет' },
  { letter: 'هـ', name_ar: 'هَاء', name_en: 'Haa', name_ru: 'Ха', translit: 'h', audio: '/audio/letters/haa.mp3', isolated: 'هـ', initial: 'هـ', medial: 'ـهـ', final: 'ـه', example_word: 'هَدِيَّةٌ', example_meaning_ar: 'هدية', example_meaning_en: 'Gift', example_meaning_ru: 'Подарок' },
  { letter: 'و', name_ar: 'وَاو', name_en: 'Waaw', name_ru: 'Вав', translit: 'w / uu', audio: '/audio/letters/noon.mp3', isolated: 'و', initial: 'وَ', medial: 'ـو', final: 'ـو', example_word: 'وَلَدٌ', example_meaning_ar: 'ولد', example_meaning_en: 'Boy', example_meaning_ru: 'Мальчик' },
  { letter: 'ي', name_ar: 'يَاء', name_en: 'Yaa', name_ru: 'Йа', translit: 'y / ee', audio: '/audio/letters/baa.mp3', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', example_word: 'يَوْمٌ', example_meaning_ar: 'يوم', example_meaning_en: 'Day', example_meaning_ru: 'День' },
];

export const InteractiveAlphabetChart: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_ALPHABET[0]);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (letter: ArabicLetter, playbackRate = speed) => {
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      const audio = new Audio(letter.audio);
      audio.playbackRate = playbackRate;
      audio.play().catch(() => {
        // Fallback to Web Speech API
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utt = new SpeechSynthesisUtterance(letter.letter);
          utt.lang = 'ar-SA';
          utt.rate = playbackRate;
          window.speechSynthesis.speak(utt);
        }
      });
      audio.onended = () => setIsPlaying(false);
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  const handleLetterClick = (item: ArabicLetter) => {
    setSelectedLetter(item);
    playSound(item);
  };

  const toggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
    setSpeed(nextSpeed);
    playSound(selectedLetter, nextSpeed);
  };

  const letterName =
    language === 'ru'
      ? selectedLetter.name_ru
      : language === 'en'
      ? selectedLetter.name_en
      : selectedLetter.name_ar;

  const exampleMeaning =
    language === 'ru'
      ? selectedLetter.example_meaning_ru
      : language === 'en'
      ? selectedLetter.example_meaning_en
      : selectedLetter.example_meaning_ar;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm" dir={dir}>
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('brand.name')} • {t('home.alphabet_title')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-arabic mt-2">
            {t('home.alphabet_title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {t('home.alphabet_desc')}
          </p>
        </div>

        {/* Speed Toggle */}
        <button
          type="button"
          onClick={toggleSpeed}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Gauge className="w-4 h-4 text-slate-500" />
          <span>{t('session.speed')}</span>
          <span className={speed === 0.75 ? 'text-amber-600 font-black' : 'text-emerald-600 font-black'}>
            {speed === 0.75 ? t('session.speed_slow') : t('session.speed_normal')}
          </span>
        </button>
      </div>

      {/* Grid of 28 Letters */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 mb-8">
        {ARABIC_ALPHABET.map((item) => {
          const isSelected = selectedLetter.letter === item.letter;

          return (
            <button
              key={item.letter}
              type="button"
              onClick={() => handleLetterClick(item)}
              className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer select-none group relative ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md ring-2 ring-emerald-500/30'
                  : 'border-slate-100 bg-white hover:border-emerald-300 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-arabic font-extrabold group-hover:scale-110 transition-transform">
                {item.letter}
              </span>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-700 mt-1">
                {item.translit}
              </span>

              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Letter Inspector Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => playSound(selectedLetter)}
            className="w-20 h-20 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform transform active:scale-95 cursor-pointer shrink-0"
            title="Play Pronunciation"
          >
            {isPlaying ? (
              <Volume2 className="w-10 h-10 animate-bounce" />
            ) : (
              <Play className="w-10 h-10 fill-current" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-arabic font-black">{selectedLetter.letter}</span>
              <span className="text-lg font-bold text-emerald-200 font-arabic">({letterName})</span>
              <span className="text-xs font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded text-emerald-300">
                /{selectedLetter.translit}/
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-1">
              مثال: <strong className="text-white text-sm font-arabic">{selectedLetter.example_word}</strong> ({exampleMeaning})
            </p>
          </div>
        </div>

        {/* Written Positions (Isolated, Initial, Medial, Final) */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-emerald-500/20 w-full md:w-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-2 text-center">
            أشكال الحرف في الكلمة (Letter Forms)
          </span>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-white/10 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">منفصل</span>
              <span className="text-xl font-arabic font-bold text-amber-300">{selectedLetter.isolated}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">أول</span>
              <span className="text-xl font-arabic font-bold text-emerald-300">{selectedLetter.initial}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">وسط</span>
              <span className="text-xl font-arabic font-bold text-emerald-300">{selectedLetter.medial}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">آخر</span>
              <span className="text-xl font-arabic font-bold text-emerald-300">{selectedLetter.final}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAlphabetChart;
