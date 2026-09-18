'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Level, Unit, Lesson, Exercise } from '@/types/database.types';
import {
  PlusCircle,
  Layers,
  BookOpen,
  Volume2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  LayoutDashboard,
  Eye,
  Sliders,
  Music,
  Radio
} from 'lucide-react';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { QURAN_RECITERS, COMMON_SURAHS, getEveryAyahUrl } from '@/lib/quranAudio';

const BUILT_IN_LETTER_PRESETS = [
  { label: 'حرف الباء (ب - Baa)', url: '/audio/letters/baa.mp3' },
  { label: 'حرف التاء (ت - Taa)', url: '/audio/letters/taa.mp3' },
  { label: 'حرف الثاء (ث - Thaa)', url: '/audio/letters/thaa.mp3' },
  { label: 'حرف الألف (أ - Alif)', url: '/audio/letters/alif.mp3' },
  { label: 'حرف الجيم (ج - Jeem)', url: '/audio/letters/jeem.mp3' },
  { label: 'حرف الحاء (ح - Haa)', url: '/audio/letters/haa.mp3' },
  { label: 'حرف الخاء (خ - Khaa)', url: '/audio/letters/khaa.mp3' },
  { label: 'حرف الدال (د - Daal)', url: '/audio/letters/daal.mp3' },
  { label: 'حرف الراء (ر - Raa)', url: '/audio/letters/raa.mp3' },
  { label: 'حرف السين (س - Seen)', url: '/audio/letters/seen.mp3' },
  { label: 'حرف الصاد (ص - Saad)', url: '/audio/letters/saad.mp3' },
  { label: 'حرف الطاء (ط - Taa)', url: '/audio/letters/taa2.mp3' },
  { label: 'حرف العين (ع - Ayn)', url: '/audio/letters/ayn.mp3' },
  { label: 'حرف القاف (ق - Qaaf)', url: '/audio/letters/qaaf.mp3' },
  { label: 'حرف الكاف (ك - Kaaf)', url: '/audio/letters/kaaf.mp3' },
  { label: 'حرف الميم (م - Meem)', url: '/audio/letters/meem.mp3' },
  { label: 'حرف النون (ن - Noon)', url: '/audio/letters/noon.mp3' },
  { label: 'كلمة: بِنْت (Bint)', url: '/audio/words/bint.mp3' },
  { label: 'كلمة: كِتَاب (Kitaab)', url: '/audio/words/kitaab.mp3' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'add_exercise' | 'add_lesson' | 'add_unit' | 'add_level' | 'manage'>('add_exercise');

  const [levels, setLevels] = useState<Level[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Audio Source Mode: 'quran_ayah' vs 'letter_preset' vs 'custom'
  const [audioSourceMode, setAudioSourceMode] = useState<'quran_ayah' | 'letter_preset' | 'custom'>('quran_ayah');
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS[0].folder);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState(1);

  // Exercise Form State
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [qText, setQText] = useState('استمع لتلاوة الشيخ وحدد الآية الكريمة:');
  const [qArabic, setQArabic] = useState('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
  const [qTranslit, setQTranslit] = useState('Bismillahir-Rahmanir-Raheem');
  const [qTranslation, setQTranslation] = useState('In the name of Allah, the Entirely Merciful');
  const [qAudioUrl, setQAudioUrl] = useState(getEveryAyahUrl(1, 1, QURAN_RECITERS[0].folder));
  const [qExplanation, setQExplanation] = useState('الآية الأولى من سورة الفاتحة المباركة.');
  const [opt1, setOpt1] = useState({ text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translit: 'Bismillahir-Rahmanir-Raheem' });
  const [opt2, setOpt2] = useState({ text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translit: 'Alhamdu lillahi Rabbil-alamin' });
  const [opt3, setOpt3] = useState({ text: 'الرَّحْمَٰنِ الرَّحِيمِ', translit: 'Ar-Rahmanir-Raheem' });
  const [opt4, setOpt4] = useState({ text: 'مَالِكِ يَوْمِ الدِّينِ', translit: 'Maliki yawmiddin' });
  const [correctOpt, setCorrectOpt] = useState('opt1');

  // Level Form State
  const [levelTitle, setLevelTitle] = useState('');
  const [levelSlug, setLevelSlug] = useState('');
  const [levelDesc, setLevelDesc] = useState('');
  const [levelIsFree, setLevelIsFree] = useState(true);

  // Unit Form State
  const [unitLevelId, setUnitLevelId] = useState('');
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDesc, setUnitDesc] = useState('');

  // Lesson Form State
  const [lessonUnitId, setLessonUnitId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonType, setLessonType] = useState('vocab');
  const [lessonXp, setLessonXp] = useState(30);

  const fetchAll = async () => {
    try {
      const [lRes, uRes, lesRes, exRes] = await Promise.all([
        supabase.from('levels').select('*').order('order_index'),
        supabase.from('units').select('*').order('order_index'),
        supabase.from('lessons').select('*').order('order_index'),
        supabase.from('exercises').select('*').order('order_index'),
      ]);

      if (lRes.data) setLevels(lRes.data);
      if (uRes.data) setUnits(uRes.data);
      if (lesRes.data) {
        setLessons(lesRes.data);
        if (lesRes.data.length > 0 && !selectedLessonId) {
          setSelectedLessonId(lesRes.data[0].id);
        }
      }
      if (exRes.data) setExercises(exRes.data);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Update URL whenever Quran Ayah params change
  useEffect(() => {
    if (audioSourceMode === 'quran_ayah') {
      const url = getEveryAyahUrl(selectedSurah, selectedAyah, selectedReciter);
      setQAudioUrl(url);
    }
  }, [audioSourceMode, selectedSurah, selectedAyah, selectedReciter]);

  const testAudio = (url: string, fallbackText: string) => {
    if (url) {
      const audio = new Audio(url);
      audio.play().catch(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utt = new SpeechSynthesisUtterance(fallbackText);
          utt.lang = 'ar-SA';
          window.speechSynthesis.speak(utt);
        }
      });
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(fallbackText);
      utt.lang = 'ar-SA';
      window.speechSynthesis.speak(utt);
    }
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId) {
      setStatusMsg({ type: 'error', text: 'يرجى اختيار الدرس أولاً' });
      return;
    }

    const options_json = [
      { id: 'opt1', text: opt1.text, transliteration: opt1.translit },
      { id: 'opt2', text: opt2.text, transliteration: opt2.translit },
      { id: 'opt3', text: opt3.text, transliteration: opt3.translit },
      { id: 'opt4', text: opt4.text, transliteration: opt4.translit },
    ];

    const newEx = {
      lesson_id: selectedLessonId,
      question_text: qText,
      arabic_text: qArabic,
      transliteration: qTranslit,
      translation: qTranslation,
      question_type: 'audio_mcq',
      audio_url: qAudioUrl,
      options_json,
      correct_answer: correctOpt,
      explanation: qExplanation,
      order_index: exercises.length + 1,
    };

    const { error } = await supabase.from('exercises').insert([newEx]);

    if (error) {
      setStatusMsg({ type: 'error', text: `فشل الحفظ: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة التمرين الصوتي بنجاح إلى قاعدة البيانات!' });
      fetchAll();
    }
  };

  const handleCreateLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('levels').insert([
      {
        title: levelTitle,
        slug: levelSlug.toLowerCase().trim(),
        description: levelDesc,
        is_free: levelIsFree,
        order_index: levels.length,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة المستوى بنجاح!' });
      setLevelTitle('');
      setLevelSlug('');
      setLevelDesc('');
      fetchAll();
    }
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('units').insert([
      {
        level_id: unitLevelId || levels[0]?.id,
        title: unitTitle,
        description: unitDesc,
        order_index: units.length,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة الوحدة بنجاح!' });
      setUnitTitle('');
      setUnitDesc('');
      fetchAll();
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('lessons').insert([
      {
        unit_id: lessonUnitId || units[0]?.id,
        title: lessonTitle,
        description: lessonDesc,
        lesson_type: lessonType,
        xp_reward: Number(lessonXp),
        order_index: lessons.length,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة الدرس بنجاح!' });
      setLessonTitle('');
      setLessonDesc('');
      fetchAll();
    }
  };

  const handleDeleteExercise = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التمرين؟')) return;
    const { error } = await supabase.from('exercises').delete().eq('id', id);
    if (!error) {
      setStatusMsg({ type: 'success', text: 'تم حذف التمرين بنجاح' });
      fetchAll();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>لوحة التحكم وإدارة المحتوى (Admin Panel)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-arabic">
            إدارة المنهج والتمارين الصوتية
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            دعم كامل لآيات القرآن الكريم عبر سيرفر EveryAyah (الشيخ عبد الباسط، العفاسي، الحصري) والحروف الهجائية.
          </p>
        </div>

        <button
          onClick={fetchAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>تحديث البيانات من Supabase</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl mb-6 flex items-center justify-between border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            <span className="font-semibold text-sm">{statusMsg.text}</span>
          </div>
          <button
            onClick={() => setStatusMsg(null)}
            className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('add_exercise')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'add_exercise'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>+ إضافة تمرين صوتي</span>
        </button>

        <button
          onClick={() => setActiveTab('add_lesson')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'add_lesson'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>+ إضافة درس</span>
        </button>

        <button
          onClick={() => setActiveTab('add_unit')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'add_unit'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>+ إضافة وحدة</span>
        </button>

        <button
          onClick={() => setActiveTab('add_level')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'add_level'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ إضافة مستوى</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'manage'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>إدارة المحتوى والتمارين ({exercises.length})</span>
        </button>
      </div>

      {/* TAB 1: ADD EXERCISE */}
      {activeTab === 'add_exercise' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exercise Form */}
          <form
            onSubmit={handleCreateExercise}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
          >
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 font-arabic">
              <Volume2 className="w-5 h-5 text-emerald-600" />
              <span>إنشاء تمرين صوتي قرآني تفاعلي</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                الدرس التابع له *
              </label>
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-slate-800"
              >
                {lessons.map((les) => (
                  <option key={les.id} value={les.id}>
                    {les.title} (+{les.xp_reward} XP)
                  </option>
                ))}
              </select>
            </div>

            {/* Audio Source Selector Mode */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-600" />
                  <span>مصدر الصوت التفاعلي (Audio Engine)</span>
                </span>

                <button
                  type="button"
                  onClick={() => testAudio(qAudioUrl, qArabic)}
                  className="text-xs text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg hover:bg-emerald-200 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>استمع للتلاوة الآن</span>
                </button>
              </div>

              {/* Toggle Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAudioSourceMode('quran_ayah')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    audioSourceMode === 'quran_ayah'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  آية قرآنية (EveryAyah)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAudioSourceMode('letter_preset');
                    setQAudioUrl(BUILT_IN_LETTER_PRESETS[0].url);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    audioSourceMode === 'letter_preset'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  حروف هجائية
                </button>

                <button
                  type="button"
                  onClick={() => setAudioSourceMode('custom')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    audioSourceMode === 'custom'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  رابط مخصص
                </button>
              </div>

              {/* Mode 1: Quran Ayah Selector */}
              {audioSourceMode === 'quran_ayah' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      القارئ المعتمد (Reciter)
                    </label>
                    <select
                      value={selectedReciter}
                      onChange={(e) => setSelectedReciter(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                    >
                      {QURAN_RECITERS.map((r) => (
                        <option key={r.folder} value={r.folder}>
                          {r.nameAr} ({r.folder})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        السورة الكريمة
                      </label>
                      <select
                        value={selectedSurah}
                        onChange={(e) => {
                          const s = Number(e.target.value);
                          setSelectedSurah(s);
                          setSelectedAyah(1);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                      >
                        {COMMON_SURAHS.map((s) => (
                          <option key={s.number} value={s.number}>
                            سورة {s.nameAr} ({s.versesCount} آيات)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        رقم الآية (Ayah Number)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={COMMON_SURAHS.find((s) => s.number === selectedSurah)?.versesCount || 286}
                        value={selectedAyah}
                        onChange={(e) => setSelectedAyah(Number(e.target.value))}
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs text-center font-bold"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-mono break-all">
                    الرابط المولد: {qAudioUrl}
                  </div>
                </div>
              )}

              {/* Mode 2: Letter Presets */}
              {audioSourceMode === 'letter_preset' && (
                <div className="pt-2">
                  <select
                    value={qAudioUrl}
                    onChange={(e) => setQAudioUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                  >
                    {BUILT_IN_LETTER_PRESETS.map((p) => (
                      <option key={p.url} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Mode 3: Custom URL */}
              {audioSourceMode === 'custom' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={qAudioUrl}
                    onChange={(e) => setQAudioUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                نص السؤال (Question Prompt)
              </label>
              <input
                type="text"
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  الآية أو الكلمة المستهدفة *
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={qArabic}
                  onChange={(e) => setQArabic(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 text-base font-arabic text-center focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  النطق الصوتي (Transliteration)
                </label>
                <input
                  type="text"
                  value={qTranslit}
                  onChange={(e) => setQTranslit(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm text-center focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                الخيارات الأربعة (اختر الصحيح منها):
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Opt 1 */}
                <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt1' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">الخيار 1</span>
                    <input type="radio" name="correct" checked={correctOpt === 'opt1'} onChange={() => setCorrectOpt('opt1')} />
                  </div>
                  <input type="text" dir="rtl" value={opt1.text} onChange={(e) => setOpt1({ ...opt1, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                  <input type="text" value={opt1.translit} onChange={(e) => setOpt1({ ...opt1, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                </div>

                {/* Opt 2 */}
                <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt2' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">الخيار 2</span>
                    <input type="radio" name="correct" checked={correctOpt === 'opt2'} onChange={() => setCorrectOpt('opt2')} />
                  </div>
                  <input type="text" dir="rtl" value={opt2.text} onChange={(e) => setOpt2({ ...opt2, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                  <input type="text" value={opt2.translit} onChange={(e) => setOpt2({ ...opt2, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                </div>

                {/* Opt 3 */}
                <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt3' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">الخيار 3</span>
                    <input type="radio" name="correct" checked={correctOpt === 'opt3'} onChange={() => setCorrectOpt('opt3')} />
                  </div>
                  <input type="text" dir="rtl" value={opt3.text} onChange={(e) => setOpt3({ ...opt3, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                  <input type="text" value={opt3.translit} onChange={(e) => setOpt3({ ...opt3, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                </div>

                {/* Opt 4 */}
                <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt4' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">الخيار 4</span>
                    <input type="radio" name="correct" checked={correctOpt === 'opt4'} onChange={() => setCorrectOpt('opt4')} />
                  </div>
                  <input type="text" dir="rtl" value={opt4.text} onChange={(e) => setOpt4({ ...opt4, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                  <input type="text" value={opt4.translit} onChange={(e) => setOpt4({ ...opt4, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                الشرح عند الإجابة
              </label>
              <textarea
                rows={2}
                value={qExplanation}
                onChange={(e) => setQExplanation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              حفظ التمرين في قاعدة البيانات (Save Exercise)
            </button>
          </form>

          {/* Real-Time Live Preview Stage */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600" />
                <span>المعاينة التفاعلية المباشرة (Live Simulator)</span>
              </h3>
              <span className="text-xs text-slate-500">تجربة الطالب الحقيقية</span>
            </div>

            <InteractiveAudioExercisePlayer
              key={`${qAudioUrl}-${qArabic}-${correctOpt}`}
              exercise={{
                id: 'preview',
                lesson_id: selectedLessonId || 'preview',
                question_text: qText,
                arabic_text: qArabic,
                transliteration: qTranslit,
                translation: qTranslation,
                question_type: 'audio_mcq',
                audio_url: qAudioUrl,
                options_json: [
                  { id: 'opt1', text: opt1.text, transliteration: opt1.translit },
                  { id: 'opt2', text: opt2.text, transliteration: opt2.translit },
                  { id: 'opt3', text: opt3.text, transliteration: opt3.translit },
                  { id: 'opt4', text: opt4.text, transliteration: opt4.translit },
                ],
                correct_answer: correctOpt,
                explanation: qExplanation,
                order_index: 1,
              }}
            />
          </div>
        </div>
      )}

      {/* TAB 2: ADD LESSON */}
      {activeTab === 'add_lesson' && (
        <form
          onSubmit={handleCreateLesson}
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
        >
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3 font-arabic">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>إضافة درس جديد (Add New Lesson)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              اختر الوحدة التابع لها *
            </label>
            <select
              value={lessonUnitId}
              onChange={(e) => setLessonUnitId(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              عنوان الدرس *
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              required
              placeholder="e.g. درس 1.2: تلاوة الآيات 1 إلى 3 من سورة الفاتحة"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              وصف الدرس
            </label>
            <textarea
              rows={2}
              value={lessonDesc}
              onChange={(e) => setLessonDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                نوع الدرس
              </label>
              <select
                value={lessonType}
                onChange={(e) => setLessonType(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm"
              >
                <option value="vocab">مفردات وآيات قرآنية (Quranic Verses)</option>
                <option value="alphabet">حروف هجائية (Alphabet)</option>
                <option value="harakat">حركات ومدود (Vowels & Mad)</option>
                <option value="prayer">أذكار وصلوات (Adhkar)</option>
                <option value="quiz">اختبار شامل (Quiz)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                نقاط المكافأة (XP)
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={lessonXp}
                onChange={(e) => setLessonXp(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            حفظ الدرس في قاعدة البيانات
          </button>
        </form>
      )}

      {/* TAB 3: ADD UNIT */}
      {activeTab === 'add_unit' && (
        <form
          onSubmit={handleCreateUnit}
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
        >
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3 font-arabic">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>إضافة وحدة تعليمية جديدة</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              اختر المستوى *
            </label>
            <select
              value={unitLevelId}
              onChange={(e) => setUnitLevelId(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
            >
              {levels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.slug})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              عنوان الوحدة *
            </label>
            <input
              type="text"
              value={unitTitle}
              onChange={(e) => setUnitTitle(e.target.value)}
              required
              placeholder="e.g. الوحدة 2: سورة الإخلاص والمعوذتين"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              وصف الوحدة
            </label>
            <textarea
              rows={2}
              value={unitDesc}
              onChange={(e) => setUnitDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            حفظ الوحدة في قاعدة البيانات
          </button>
        </form>
      )}

      {/* TAB 4: ADD LEVEL */}
      {activeTab === 'add_level' && (
        <form
          onSubmit={handleCreateLevel}
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
        >
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3 font-arabic">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <span>إضافة مستوى منهجي جديد</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              عنوان المستوى *
            </label>
            <input
              type="text"
              value={levelTitle}
              onChange={(e) => setLevelTitle(e.target.value)}
              required
              placeholder="e.g. المستوى الثاني (A2): قصار السور وأذكار الصلاة"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              المعرف الفريد (Slug) *
            </label>
            <input
              type="text"
              value={levelSlug}
              onChange={(e) => setLevelSlug(e.target.value)}
              required
              placeholder="a2"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              وصف المستوى
            </label>
            <textarea
              rows={2}
              value={levelDesc}
              onChange={(e) => setLevelDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              id="isFree"
              checked={levelIsFree}
              onChange={(e) => setLevelIsFree(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="isFree" className="text-sm font-semibold text-slate-800 cursor-pointer">
              مستوى مجاني بدون اشتراك
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            حفظ المستوى في قاعدة البيانات
          </button>
        </form>
      )}

      {/* TAB 5: CURRICULUM MANAGEMENT */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 font-arabic">
              التمارين المسجلة في قاعدة البيانات
            </h3>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              {exercises.length} تمرين متاح
            </span>
          </div>

          <div className="grid gap-4">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-arabic text-xl font-bold">
                    {ex.arabic_text ? ex.arabic_text.slice(0, 4) : '؟'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {ex.question_text}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      النص: <span className="font-arabic font-bold text-slate-800">{ex.arabic_text}</span> | النطق: {ex.transliteration || '-'}
                    </p>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block break-all">
                      {ex.audio_url || 'صوت تلقائي (Speech)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => testAudio(ex.audio_url || '', ex.arabic_text || '')}
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                    title="استمع للصوت"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteExercise(ex.id)}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
                    title="حذف التمرين"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
