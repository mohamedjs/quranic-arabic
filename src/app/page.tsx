'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Exercise } from '@/types/database.types';
import { Sparkles, CheckCircle, ArrowLeft, LayoutDashboard, Volume2, BookOpen, Gift, Star, ShieldCheck } from 'lucide-react';

const BAYNA_YADAYK_SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'by-ex-1',
    lesson_id: 'l-1',
    question_text: 'استمع إلى الحوار الأول من كتاب (العربية بين يديك): ما هو الرد النموذجي على التحية؟',
    arabic_text: 'وَعَلَيْكُمُ السَّلامُ',
    transliteration: 'Wa alaykumus-salam',
    translation: 'And upon you be peace',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/salam_intro.mp3',
    options_json: [
      { id: 'opt1', text: 'وَعَلَيْكُمُ السَّلامُ', transliteration: 'Wa alaykumus-salam (وعليكم السلام)' },
      { id: 'opt2', text: 'أَهْلاً وَسَهْلاً', transliteration: 'Ahlan wa sahlan (أهلاً وسهلاً)' },
      { id: 'opt3', text: 'مَعَ السَّلامَةِ', transliteration: 'Ma as-salamah (مع السلامة)' },
      { id: 'opt4', text: 'صَبَاحَ الْخَيْرِ', transliteration: 'Sabah al-khayr (صباح الخير)' },
    ],
    correct_answer: 'opt1',
    explanation: 'الرد الإسلامي والأدبي المعتمد في الحوار الأول من سلسلة العربية بين يديك: وعليكم السلام ورحمة الله وبركاته.',
    order_index: 1,
  },
  {
    id: 'by-ex-2',
    lesson_id: 'l-1',
    question_text: 'استمع للسؤال: (كَيْفَ حَالُكَ؟) - اختر الرد الصحيح كما ورد في كتاب العربية بين يديك:',
    arabic_text: 'بِخَيْرٍ وَالْحَمْدُ لِلَّهِ',
    transliteration: 'Bikhayrin walhamdulillah',
    translation: 'Fine, and praise be to Allah',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/kayfa_haluk.mp3',
    options_json: [
      { id: 'opt1', text: 'أَنَا مِنْ مِصْرَ', transliteration: 'Ana min Misr' },
      { id: 'opt2', text: 'بِخَيْرٍ وَالْحَمْدُ لِلَّهِ', transliteration: 'Bikhayrin walhamdulillah' },
      { id: 'opt3', text: 'اسْمِي خَالِدٌ', transliteration: 'Ismi Khalid' },
      { id: 'opt4', text: 'هُوَ مُدَرِّسٌ', transliteration: 'Huwa mudarris' },
    ],
    correct_answer: 'opt2',
    explanation: 'حوار خالد وخليل (العربية بين يديك): كيف حالك؟ - بخير والحمد لله.',
    order_index: 2,
  },
  {
    id: 'by-ex-3',
    lesson_id: 'l-1',
    question_text: 'استمع لسؤال الجنسية: (مِنْ أَيْنَ أَنْتَ؟) - ما هي الإجابة المطابقة للصوت المسموع؟',
    arabic_text: 'أَنَا مِنْ مِصْرَ، أَنَا مِصْرِيٌّ',
    transliteration: 'Ana min Misr, ana misriyy',
    translation: 'I am from Egypt, I am Egyptian',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/min_ayna_anta.mp3',
    options_json: [
      { id: 'opt1', text: 'أَنَا مِنْ مِصْرَ، أَنَا مِصْرِيٌّ', transliteration: 'Ana min Misr, ana misriyy' },
      { id: 'opt2', text: 'أَنَا مِنْ تُرْكِيَا، أَنَا تُرْكِيٌّ', transliteration: 'Ana min Turkiya, ana turkiyy' },
      { id: 'opt3', text: 'أَنَا مِنْ سُورِيَا، أَنَا سُورِيٌّ', transliteration: 'Ana min Suriya, ana suriyy' },
      { id: 'opt4', text: 'أَنَا مِنْ بَاكِسْتَانَ', transliteration: 'Ana min Pakistan' },
    ],
    correct_answer: 'opt1',
    explanation: 'الحوار الثاني في كتاب العربية بين يديك: من أين أنت؟ أنا من مصر، وأنا مصري.',
    order_index: 3,
  },
  {
    id: 'by-ex-4',
    lesson_id: 'l-2',
    question_text: 'استمع إلى مفردات شجرة الأسرة (الوحدة الثانية): حدد الوالدين المذكورين:',
    arabic_text: 'الأَبُ عَدْنَان، وَالأُمُّ خَدِيجَة',
    transliteration: 'Al-Abu Adnan, wal-Ummu Khadijah',
    translation: 'The father is Adnan, and the mother is Khadijah',
    question_type: 'audio_mcq',
    audio_url: '/audio/bayna-yadayk/shajarat_usrah.mp3',
    options_json: [
      { id: 'opt1', text: 'الأَبُ عَدْنَان، وَالأُمُّ خَدِيجَة', transliteration: 'Al-Abu Adnan, wal-Ummu Khadijah' },
      { id: 'opt2', text: 'الأَخُ عُمَر، وَالأُخْتُ فَاطِمَة', transliteration: 'Al-Akhu Umar, wal-Ukhtu Fatimah' },
      { id: 'opt3', text: 'الْجَدُّ حَسَن، وَالْجَدَّةُ مَرْيَم', transliteration: 'Al-Jaddu Hasan, wal-Jaddatu Maryam' },
      { id: 'opt4', text: 'الابْنُ عَلِيّ، وَالابْنَةُ عَائِشَة', transliteration: 'Al-Ibnu Ali, wal-Ibnatu Aishah' },
    ],
    correct_answer: 'opt1',
    explanation: 'شجرة الأسرة في كتاب العربية بين يديك: هذا والدي عدنان، وهذه والدتي خديجة.',
    order_index: 4,
  },
];

export default function HomePage() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentExercise = BAYNA_YADAYK_SAMPLE_EXERCISES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % BAYNA_YADAYK_SAMPLE_EXERCISES.length);
  };

  return (
    <div className="flex flex-col items-center" dir="rtl">
      {/* Top Marketing Alert Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2">
        <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>عرض الانطلاق التسويقي: ابدأ دراسة وحدات (العربية بين يديك) الأولى مجاناً 100% بدون أي رسوم!</span>
        <Link href="/learn" className="underline hover:text-amber-200 transition-colors mr-2">
          ابدأ التجربة المجانية الآن ←
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>المنهج العالمي المعتمد: سلسلة (العربية بين يديك - الكتاب الأول)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight font-arabic">
          تعلّم العربية وتحدث بها بطلاقة عبر منهج{' '}
          <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
            (العربية بين يديك)
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          منصة تفاعلية متكاملة مصممة خصيصاً لتدريس الكتاب الأول من سلسلة (العربية بين يديك). استمع للحوارات والنطق الصوتي، وتدرب على التراكيب النحوية والمفردات مع تصحيح فوري ومكافآت يومية.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/learn"
            className="px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-200 hover:shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>ابدأ الدروس المجانية فوراً (Free Trial)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            href="/admin"
            className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>لوحة تحكم المشرفين (AdminLTE)</span>
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
                <span>نموذج تجريبي تفاعلي من الكتاب الأول</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-arabic mt-1">
                جرب الاستماع للحوار الأول الآن واختبر إجابتك:
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
              تمرين {currentIdx + 1} من {BAYNA_YADAYK_SAMPLE_EXERCISES.length}
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

      {/* Free Trial Marketing Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            لماذا نبدأ بـ (العربية بين يديك)؟
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 font-arabic">
            خطة دراسية منظمة خطوة بخطوة
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            تم ترتيب محتوى الوحدات والدروس ليتطابق مع الفهرس المعتمد للكتاب الأول ليتمكن أي طالب من البدء فوراً.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">حوارات صوتية حية</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              استماع لجميع حوارات الوحدات (التحية والتعارف، الأسرة، السكن) مع إمكانية إبطاء السرعة إلى 0.75x لتسهيل تمييز المخارج.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">دروس تجريبية مفتوحة 100%</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              الوحدة الأولى والوحدة الثانية متاحتان بالكامل مجاناً لكل زائر لتجربة جودة المنصة والتأكد من ملاءمتها قبل الاشتراك.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-arabic mb-2">متابعة التتابع والنقاط</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              نظام تحفيزي يحسب أيام التتابع اليومي (Streak) ومكافآت نقاط الخبرة (XP) مع كل تمرين يتم حله بنجاح.
            </p>
          </div>
        </div>

        {/* Free Access CTA Box */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">جاهزون للانطلاق</span>
            <h3 className="text-2xl font-bold font-arabic">ابدأ دراسة الوحدة الأولى الآن مجاناً</h3>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-lg">
              لا داعي للانتظار، اضغط على الرابط بالأسفل لتجد دروس كتاب (العربية بين يديك) مفهرسة وجاهزة للاستخدام الفوري.
            </p>
          </div>

          <Link
            href="/learn"
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shrink-0 cursor-pointer"
          >
            دخول الدروس المجانية الآن ←
          </Link>
        </div>
      </section>
    </div>
  );
}
