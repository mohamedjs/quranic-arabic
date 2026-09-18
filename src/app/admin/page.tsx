'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Level, Unit, Lesson, Exercise, Profile } from '@/types/database.types';
import {
  LayoutDashboard,
  Volume2,
  BookOpen,
  Layers,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  Play,
  RotateCcw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Radio,
  ExternalLink,
  Flame,
  ArrowRight,
  Filter,
  Languages,
  Sparkles
} from 'lucide-react';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { QURAN_RECITERS, COMMON_SURAHS, getEveryAyahUrl } from '@/lib/quranAudio';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  { label: 'حوار 1: السَّلامُ عَلَيْكُمْ (التحفة الأزهرية ص 18)', url: '/audio/tuhfa/salam_full.mp3' },
  { label: 'حوار 2: لِمَاذَا جِئْتَ إِلَى مِصْرَ؟ (التحفة الأزهرية ص 18)', url: '/audio/tuhfa/limadha_jita.mp3' },
  { label: 'حوار 3: بِلَادٌ وَجِنْسِيَّاتٌ (التحفة الأزهرية ص 18)', url: '/audio/tuhfa/bilad.mp3' },
  { label: 'حوار 4: أُسْرَةُ تَامِرٍ (التحفة الأزهرية ص 28)', url: '/audio/tuhfa/shajarat_usrah.mp3' },
];

export default function AdminLTEPage() {
  const router = useRouter();
  const { t, dir } = useLanguage();

  // Auth State
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string } | null>(null);

  // Layout State: Sidebar Toggle & Active Vertical Tab
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'curriculum' | 'exercises' | 'add_exercise' | 'lessons' | 'units' | 'levels' | 'users' | 'settings'
  >('overview');

  // Filter State
  const [selectedFilterUnitId, setSelectedFilterUnitId] = useState<string>('all');
  const [selectedFilterLessonId, setSelectedFilterLessonId] = useState<string>('all');

  // Database Entities
  const [levels, setLevels] = useState<Level[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Exercise Form State - Trilingual
  const [audioSourceMode, setAudioSourceMode] = useState<'quran_ayah' | 'letter_preset' | 'custom'>('letter_preset');
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS[0].folder);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  
  // Trilingual Questions
  const [qTextAr, setQTextAr] = useState('استمع للعبارة التالية وحدد المعنى الصحيح:');
  const [qTextEn, setQTextEn] = useState('Listen to the following audio and choose the correct meaning:');
  const [qTextRu, setQTextRu] = useState('Послушайте аудиозапись и выберите правильное значение:');

  // Target Arabic & Audio
  const [qArabic, setQArabic] = useState('السَّلامُ عَلَيْكُمْ');
  const [qTranslit, setQTranslit] = useState('As-Salamu Alaykum');
  const [qAudioUrl, setQAudioUrl] = useState('/audio/bayna-yadayk/salam_intro.mp3');

  // Trilingual Translations
  const [qTransEn, setQTransEn] = useState('Peace be upon you');
  const [qTransRu, setQTransRu] = useState('Мир вам');

  // Trilingual Explanations
  const [qExplAr, setQExplAr] = useState('التحية المعتمدة في الحوار الأول من سلسلة العربية بين يديك.');
  const [qExplEn, setQExplEn] = useState('The standard Islamic greeting from dialogue 1 of Bayna Yadayk.');
  const [qExplRu, setQExplRu] = useState('Стандартное мусульманское приветствие из первого диалога Байна Ядайк.');

  // Trilingual Options
  const [opt1, setOpt1] = useState({ text: 'وَعَلَيْكُمُ السَّلامُ', translit: 'Wa alaykumus-salam', text_en: 'And upon you be peace', text_ru: 'И вам мир' });
  const [opt2, setOpt2] = useState({ text: 'أَهْلاً وَسَهْلاً', translit: 'Ahlan wa sahlan', text_en: 'Welcome', text_ru: 'Добро пожаловать' });
  const [opt3, setOpt3] = useState({ text: 'مَعَ السَّلامَةِ', translit: 'Ma as-salamah', text_en: 'Goodbye', text_ru: 'До свидания' });
  const [opt4, setOpt4] = useState({ text: 'صَبَاحَ الْخَيْرِ', translit: 'Sabah al-khayr', text_en: 'Good morning', text_ru: 'Доброе утро' });
  const [correctOpt, setCorrectOpt] = useState('opt1');

  // Level Form State - Trilingual
  const [levelTitleAr, setLevelTitleAr] = useState('');
  const [levelTitleEn, setLevelTitleEn] = useState('');
  const [levelTitleRu, setLevelTitleRu] = useState('');
  const [levelDescAr, setLevelDescAr] = useState('');
  const [levelDescEn, setLevelDescEn] = useState('');
  const [levelDescRu, setLevelDescRu] = useState('');
  const [levelSlug, setLevelSlug] = useState('');
  const [levelIsFree, setLevelIsFree] = useState(true);

  // Unit Form State - Trilingual
  const [unitLevelId, setUnitLevelId] = useState('');
  const [unitTitleAr, setUnitTitleAr] = useState('');
  const [unitTitleEn, setUnitTitleEn] = useState('');
  const [unitTitleRu, setUnitTitleRu] = useState('');
  const [unitDescAr, setUnitDescAr] = useState('');
  const [unitDescEn, setUnitDescEn] = useState('');
  const [unitDescRu, setUnitDescRu] = useState('');

  // Lesson Form State - Trilingual
  const [lessonUnitId, setLessonUnitId] = useState('');
  const [lessonTitleAr, setLessonTitleAr] = useState('');
  const [lessonTitleEn, setLessonTitleEn] = useState('');
  const [lessonTitleRu, setLessonTitleRu] = useState('');
  const [lessonDescAr, setLessonDescAr] = useState('');
  const [lessonDescEn, setLessonDescEn] = useState('');
  const [lessonDescRu, setLessonDescRu] = useState('');
  const [lessonType, setLessonType] = useState('vocab');
  const [lessonXp, setLessonXp] = useState(35);

  // Check Authentication on Mount
  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setAdminUser({
            email: session.user.email,
            name: session.user.user_metadata?.full_name || 'مدير النظام',
          });
        }
      } catch (err) {
        console.warn('Auth check error:', err);
      }
    }
    checkAdminAuth();
  }, []);

  // Fetch all curriculum data
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [lRes, uRes, lesRes, exRes, profRes] = await Promise.all([
        supabase.from('levels').select('*').order('order_index'),
        supabase.from('units').select('*').order('order_index'),
        supabase.from('lessons').select('*').order('order_index'),
        supabase.from('exercises').select('*').order('order_index'),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      ]);

      if (lRes.data) setLevels(lRes.data);
      if (uRes.data) {
        setUnits(uRes.data);
        if (uRes.data.length > 0 && !unitLevelId) {
          setUnitLevelId(uRes.data[0].level_id);
        }
      }
      if (lesRes.data) {
        setLessons(lesRes.data);
        if (lesRes.data.length > 0 && !selectedLessonId) {
          setSelectedLessonId(lesRes.data[0].id);
        }
        if (lesRes.data.length > 0 && !lessonUnitId) {
          setLessonUnitId(lesRes.data[0].unit_id);
        }
      }
      if (exRes.data) setExercises(exRes.data);
      if (profRes.data) setProfiles(profRes.data);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bayan_admin_auth');
    }
    router.push('/admin/login');
  };

  // Create Trilingual Exercise
  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId) {
      setStatusMsg({ type: 'error', text: 'يرجى اختيار الدرس أولاً' });
      return;
    }

    const options_json = [
      { id: 'opt1', text: opt1.text, transliteration: opt1.translit, text_en: opt1.text_en, text_ru: opt1.text_ru },
      { id: 'opt2', text: opt2.text, transliteration: opt2.translit, text_en: opt2.text_en, text_ru: opt2.text_ru },
      { id: 'opt3', text: opt3.text, transliteration: opt3.translit, text_en: opt3.text_en, text_ru: opt3.text_ru },
      { id: 'opt4', text: opt4.text, transliteration: opt4.translit, text_en: opt4.text_en, text_ru: opt4.text_ru },
    ];

    const newEx = {
      lesson_id: selectedLessonId,
      question_text: qTextAr || qTextEn || '',
      question_ar: qTextAr,
      question_en: qTextEn,
      question_ru: qTextRu,
      arabic_text: qArabic,
      transliteration: qTranslit,
      translation: qTransEn || qTransRu || '',
      translation_en: qTransEn,
      translation_ru: qTransRu,
      question_type: 'audio_mcq',
      audio_url: qAudioUrl,
      options_json,
      correct_answer: correctOpt,
      explanation: qExplAr || qExplEn || '',
      explanation_ar: qExplAr,
      explanation_en: qExplEn,
      explanation_ru: qExplRu,
      order_index: exercises.length + 1,
    };

    const { error } = await supabase.from('exercises').insert([newEx]);

    if (error) {
      setStatusMsg({ type: 'error', text: `فشل الحفظ: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة التمرين الصوتي باللغات الثلاث بنجاح!' });
      fetchAll();
      setActiveTab('exercises');
    }
  };

  // Create Trilingual Level
  const handleCreateLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('levels').insert([
      {
        title: levelTitleAr || levelTitleEn || '',
        title_ar: levelTitleAr,
        title_en: levelTitleEn,
        title_ru: levelTitleRu,
        description: levelDescAr || levelDescEn || '',
        description_ar: levelDescAr,
        description_en: levelDescEn,
        description_ru: levelDescRu,
        slug: levelSlug.toLowerCase().trim(),
        is_free: levelIsFree,
        order_index: levels.length + 1,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة المستوى باللغات الثلاث بنجاح!' });
      setLevelTitleAr('');
      setLevelTitleEn('');
      setLevelTitleRu('');
      setLevelDescAr('');
      setLevelDescEn('');
      setLevelDescRu('');
      setLevelSlug('');
      fetchAll();
      setActiveTab('levels');
    }
  };

  // Create Trilingual Unit
  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('units').insert([
      {
        level_id: unitLevelId || levels[0]?.id,
        title: unitTitleAr || unitTitleEn || '',
        title_ar: unitTitleAr,
        title_en: unitTitleEn,
        title_ru: unitTitleRu,
        description: unitDescAr || unitDescEn || '',
        description_ar: unitDescAr,
        description_en: unitDescEn,
        description_ru: unitDescRu,
        order_index: units.length + 1,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة الوحدة باللغات الثلاث بنجاح!' });
      setUnitTitleAr('');
      setUnitTitleEn('');
      setUnitTitleRu('');
      setUnitDescAr('');
      setUnitDescEn('');
      setUnitDescRu('');
      fetchAll();
      setActiveTab('units');
    }
  };

  // Create Trilingual Lesson
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('lessons').insert([
      {
        unit_id: lessonUnitId || units[0]?.id,
        title: lessonTitleAr || lessonTitleEn || '',
        title_ar: lessonTitleAr,
        title_en: lessonTitleEn,
        title_ru: lessonTitleRu,
        description: lessonDescAr || lessonDescEn || '',
        description_ar: lessonDescAr,
        description_en: lessonDescEn,
        description_ru: lessonDescRu,
        lesson_type: lessonType,
        xp_reward: Number(lessonXp),
        order_index: lessons.length + 1,
      },
    ]);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message });
    } else {
      setStatusMsg({ type: 'success', text: 'تمت إضافة الدرس باللغات الثلاث بنجاح!' });
      setLessonTitleAr('');
      setLessonTitleEn('');
      setLessonTitleRu('');
      setLessonDescAr('');
      setLessonDescEn('');
      setLessonDescRu('');
      fetchAll();
      setActiveTab('lessons');
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

  // Filtered Exercises
  const filteredExercises = exercises.filter((ex) => {
    if (selectedFilterLessonId !== 'all') {
      return ex.lesson_id === selectedFilterLessonId;
    }
    return true;
  });

  // Filtered Lessons
  const filteredLessons = lessons.filter((les) => {
    if (selectedFilterUnitId !== 'all') {
      return les.unit_id === selectedFilterUnitId;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900" dir={dir}>
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white h-16 flex items-center justify-between px-4 sm:px-6 shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1 font-arabic">
                بيان <span className="text-emerald-400 font-semibold text-xs font-sans">AdminLTE 3-Lang</span>
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>مشرف: <strong className="text-white">{adminUser?.email || 'admin@bayan.com'}</strong></span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </header>

      {/* Main AdminLTE Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Vertical Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shrink-0 border-r border-slate-800 shadow-xl`}
        >
          {/* Sidebar Menu Items */}
          <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
            {[
              { id: 'overview', label: 'لوحة القيادة (Dashboard)', icon: LayoutDashboard, badge: null },
              { id: 'curriculum', label: 'شجرة المنهج التفاعلية', icon: Layers, badge: levels.length },
              { id: 'add_exercise', label: '+ تمرين ثلاثي اللغات', icon: PlusCircle, badge: '3-Lang' },
              { id: 'exercises', label: 'بنك التمارين', icon: Volume2, badge: exercises.length },
              { id: 'lessons', label: 'الدروس المنهجية', icon: BookOpen, badge: lessons.length },
              { id: 'units', label: 'الوحدات الدراسية', icon: Layers, badge: units.length },
              { id: 'levels', label: 'المستويات والكتب', icon: BookOpen, badge: levels.length },
              { id: 'users', label: 'الطلاب والمستخدمين', icon: Users, badge: profiles.length },
              { id: 'settings', label: 'الربط والإعدادات', icon: Settings, badge: null },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-right ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
                  {sidebarOpen && <span className="flex-1 truncate">{tab.label}</span>}
                  {sidebarOpen && tab.badge !== null && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-emerald-300 border border-slate-700">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {statusMsg && (
            <div
              className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-center justify-between shadow-xs ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}
            >
              <span>{statusMsg.text}</span>
              <button
                type="button"
                onClick={() => setStatusMsg(null)}
                className="text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 font-arabic">لوحة التحكم والمتابعة</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    نظام إدارة سلسلة (التحفة الأزهرية) المتكامل مع دعم اللغات الثلاث (العربية - الإنجليزية - الروسية)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3 لغات نشطة: AR / EN / RU</span>
                  </span>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">الكتب والمستويات</span>
                  <p className="text-3xl font-black text-slate-900 mt-1">{levels.length}</p>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">التحفة الأزهرية</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">الوحدات الدراسية</span>
                  <p className="text-3xl font-black text-slate-900 mt-1">{units.length}</p>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">مترجمة 3 لغات</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">الدروس والحوارات</span>
                  <p className="text-3xl font-black text-slate-900 mt-1">{lessons.length}</p>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">حوارات صوتية حية</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">التمارين الصوتية</span>
                  <p className="text-3xl font-black text-emerald-600 mt-1">{exercises.length}</p>
                  <span className="text-[11px] text-slate-400 font-bold mt-1 block">تفاعلية فورية</span>
                </div>
              </div>

              {/* Quick Trilingual Tree Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-bold text-sm text-slate-800 mb-4 font-arabic">استعراض المنهج المسجل باللغات الثلاث:</h3>
                <div className="space-y-4">
                  {units.map((u) => {
                    const unitLessons = lessons.filter((l) => l.unit_id === u.id);
                    return (
                      <div key={u.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2 mb-3">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{u.title_ar || u.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              <span className="font-medium text-emerald-800">🇬🇧 {u.title_en || 'English'}</span>
                              <span className="font-medium text-blue-800">🇷🇺 {u.title_ru || 'Russian'}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border">
                            {unitLessons.length} دروس
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {unitLessons.map((l) => {
                            const exCount = exercises.filter((e) => e.lesson_id === l.id).length;
                            return (
                              <div key={l.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                                <span className="font-bold text-slate-800 block truncate">{l.title_ar || l.title}</span>
                                <span className="text-[11px] text-slate-400 block truncate">🇬🇧 {l.title_en}</span>
                                <span className="text-[11px] text-slate-400 block truncate">🇷🇺 {l.title_ru}</span>
                                <span className="text-[10px] font-bold text-emerald-700 mt-1 block">
                                  {exCount} تمارين مسجلة
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM TREE */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">شجرة المنهج المعتمد والترجمات</h3>
                  <p className="text-xs text-slate-500 mt-1">تصفح المستويات والوحدات والدروس وفق سلسلة التحفة الأزهرية</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('add_exercise')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة تمرين جديد</span>
                </button>
              </div>

              <div className="space-y-4">
                {levels.map((lvl) => {
                  const lvlUnits = units.filter((u) => u.level_id === lvl.id);
                  return (
                    <div key={lvl.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <div>
                          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                            {lvl.slug}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 font-arabic mt-1">{lvl.title_ar || lvl.title}</h4>
                          <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                            <span>🇬🇧 {lvl.title_en}</span>
                            <span>🇷🇺 {lvl.title_ru}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                          {lvlUnits.length} وحدات
                        </span>
                      </div>

                      <div className="space-y-3">
                        {lvlUnits.map((u) => {
                          const unitLessons = lessons.filter((l) => l.unit_id === u.id);
                          return (
                            <div key={u.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-bold text-sm text-slate-900">{u.title_ar || u.title}</h5>
                                <span className="text-xs text-slate-400 font-medium">{unitLessons.length} دروس</span>
                              </div>
                              <p className="text-xs text-slate-500 mb-3">{u.description_ar || u.description}</p>

                              <div className="grid sm:grid-cols-2 gap-2">
                                {unitLessons.map((les) => (
                                  <Link
                                    key={les.id}
                                    href={`/learn/session?lessonId=${les.id}`}
                                    target="_blank"
                                    className="p-3 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 flex items-center justify-between text-xs group"
                                  >
                                    <div>
                                      <span className="font-bold text-slate-800 group-hover:text-emerald-700 block">
                                        {les.title_ar || les.title}
                                      </span>
                                      <span className="text-[10px] text-slate-400 block">
                                        🇬🇧 {les.title_en} • 🇷🇺 {les.title_ru}
                                      </span>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ADD TRILINGUAL EXERCISE */}
          {activeTab === 'add_exercise' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">
                  إضافة تمرين صوتي وتفاعلي جديد (باللغات الثلاث)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  أدخل نصوص السؤال والترجمة والخيارات بالعربية والإنجليزية والروسية، مع تحديد الصوت والنطق.
                </p>
              </div>

              <form onSubmit={handleCreateExercise} className="space-y-6">
                {/* 1. Target Lesson */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 border-b pb-3 mb-4">
                    1. الدرس التابع له التمرين
                  </h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اختر الدرس *</label>
                    <select
                      value={selectedLessonId}
                      onChange={(e) => setSelectedLessonId(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                    >
                      {lessons.map((les) => (
                        <option key={les.id} value={les.id}>
                          {les.title_ar || les.title} ({les.title_en || 'Lesson'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Arabic Target & Phonetics */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 border-b pb-3 mb-4">
                    2. المحتوى العربي والصوتيات
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        النص العربي المستهدف *
                      </label>
                      <input
                        type="text"
                        value={qArabic}
                        onChange={(e) => setQArabic(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-base font-arabic font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        النطق الصوتي (Transliteration)
                      </label>
                      <input
                        type="text"
                        value={qTranslit}
                        onChange={(e) => setQTranslit(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        رابط الصوت المباشر (Audio URL) *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={qAudioUrl}
                          onChange={(e) => setQAudioUrl(e.target.value)}
                          required
                          className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => testAudio(qAudioUrl, qArabic)}
                          className="px-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                          title="تشغيل تجريبي"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Audio Presets Helper */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-600 mb-2">
                      اختر نموذج صوتي جاهز (حوارات التحفة الأزهرية أو حروف الهجاء):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUILT_IN_LETTER_PRESETS.map((p) => (
                        <button
                          key={p.url}
                          type="button"
                          onClick={() => {
                            setQAudioUrl(p.url);
                            testAudio(p.url, qArabic);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            qAudioUrl === p.url
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Trilingual Question Prompts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 border-b pb-3 mb-4 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-emerald-600" />
                    <span>3. نص السؤال باللغات الثلاث (AR / EN / RU)</span>
                  </h4>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-800 mb-1">
                        🇸🇦 السؤال بالعربية *
                      </label>
                      <textarea
                        value={qTextAr}
                        onChange={(e) => setQTextAr(e.target.value)}
                        required
                        rows={2}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-arabic"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-800 mb-1">
                        🇬🇧 السؤال بالإنجليزية (English) *
                      </label>
                      <textarea
                        value={qTextEn}
                        onChange={(e) => setQTextEn(e.target.value)}
                        required
                        rows={2}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-purple-800 mb-1">
                        🇷🇺 السؤال بالروسية (Русский) *
                      </label>
                      <textarea
                        value={qTextRu}
                        onChange={(e) => setQTextRu(e.target.value)}
                        required
                        rows={2}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        🇬🇧 الترجمة / المعنى بالإنجليزي
                      </label>
                      <input
                        type="text"
                        value={qTransEn}
                        onChange={(e) => setQTransEn(e.target.value)}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        🇷🇺 الترجمة / المعنى بالروسي
                      </label>
                      <input
                        type="text"
                        value={qTransRu}
                        onChange={(e) => setQTransRu(e.target.value)}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  {/* Trilingual Explanations */}
                  <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        🇸🇦 شرح وتوضيح الإجابة (العربية)
                      </label>
                      <input
                        type="text"
                        value={qExplAr}
                        onChange={(e) => setQExplAr(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        🇬🇧 شرح الإجابة (English)
                      </label>
                      <input
                        type="text"
                        value={qExplEn}
                        onChange={(e) => setQExplEn(e.target.value)}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        🇷🇺 شرح الإجابة (Русский)
                      </label>
                      <input
                        type="text"
                        value={qExplRu}
                        onChange={(e) => setQExplRu(e.target.value)}
                        dir="ltr"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Trilingual Options */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 border-b pb-3 mb-4">
                    4. خيارات الإجابة الأربعة باللغات الثلاث
                  </h4>

                  <div className="space-y-4">
                    {[
                      { optId: 'opt1', state: opt1, setter: setOpt1, label: 'الخيار الأول (1)' },
                      { optId: 'opt2', state: opt2, setter: setOpt2, label: 'الخيار الثاني (2)' },
                      { optId: 'opt3', state: opt3, setter: setOpt3, label: 'الخيار الثالث (3)' },
                      { optId: 'opt4', state: opt4, setter: setOpt4, label: 'الخيار الرابع (4)' },
                    ].map((item) => (
                      <div key={item.optId} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-slate-800">{item.label}</span>
                          <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <input
                              type="radio"
                              name="correct_option"
                              checked={correctOpt === item.optId}
                              onChange={() => setCorrectOpt(item.optId)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <span className={correctOpt === item.optId ? 'text-emerald-700' : 'text-slate-500'}>
                              هو الإجابة الصحيحة
                            </span>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">النص العربي *</label>
                            <input
                              type="text"
                              value={item.state.text}
                              onChange={(e) => item.setter({ ...item.state, text: e.target.value })}
                              required
                              className="w-full p-2 rounded-lg border border-slate-200 text-sm font-arabic font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">النطق (Translit)</label>
                            <input
                              type="text"
                              value={item.state.translit}
                              onChange={(e) => item.setter({ ...item.state, translit: e.target.value })}
                              className="w-full p-2 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">🇬🇧 المعنى الإنجليزي</label>
                            <input
                              type="text"
                              value={item.state.text_en}
                              onChange={(e) => item.setter({ ...item.state, text_en: e.target.value })}
                              dir="ltr"
                              className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">🇷🇺 المعنى الروسي</label>
                            <input
                              type="text"
                              value={item.state.text_ru}
                              onChange={(e) => item.setter({ ...item.state, text_ru: e.target.value })}
                              dir="ltr"
                              className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    حفظ التمرين ونشره فوراً
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: EXERCISES LIST */}
          {activeTab === 'exercises' && (
            <div className="space-y-6">
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">
                    بنك التمارين التفاعلية ({exercises.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    جميع التمارين المتاحة للمتعلمين باللغات الثلاث
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('add_exercise')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة تمرين جديد</span>
                </button>
              </div>

              <div className="grid gap-4">
                {exercises.map((ex) => (
                  <div key={ex.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                          {ex.arabic_text} ({ex.transliteration})
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-2">{ex.question_ar || ex.question_text}</h4>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                          <span>🇬🇧 {ex.question_en}</span>
                          <span>🇷🇺 {ex.question_ru}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => testAudio(ex.audio_url || '', ex.arabic_text || '')}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer"
                          title="استماع"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteExercise(ex.id)}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LESSONS */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة الدروس (Lessons)</h3>
                <p className="text-xs text-slate-500 mt-1">إضافة وإدارة دروس الوحدات باللغات الثلاث</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <form onSubmit={handleCreateLesson} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2">إضافة درس جديد (3 لغات)</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الوحدة التابع لها *</label>
                    <select
                      value={lessonUnitId}
                      onChange={(e) => setLessonUnitId(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    >
                      {units.map((u) => (
                        <option key={u.id} value={u.id}>{u.title_ar || u.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">🇸🇦 عنوان الدرس (عربي) *</label>
                    <input
                      type="text"
                      value={lessonTitleAr}
                      onChange={(e) => setLessonTitleAr(e.target.value)}
                      required
                      placeholder="الحوار الأول: السلام والتحية"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-800 mb-1">🇬🇧 عنوان الدرس (English) *</label>
                    <input
                      type="text"
                      value={lessonTitleEn}
                      onChange={(e) => setLessonTitleEn(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Dialogue 1: Salam & Greeting"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-purple-800 mb-1">🇷🇺 عنوان الدرس (Русский) *</label>
                    <input
                      type="text"
                      value={lessonTitleRu}
                      onChange={(e) => setLessonTitleRu(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Диалог 1: Приветствие и знакомство"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer">
                    حفظ الدرس باللغات الثلاث
                  </button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">الدروس المسجلة ({lessons.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {lessons.map((les) => (
                      <div key={les.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{les.title_ar || les.title}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>🇬🇧 {les.title_en}</span>
                            <span>•</span>
                            <span>🇷🇺 {les.title_ru}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          +{les.xp_reward} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: UNITS */}
          {activeTab === 'units' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة الوحدات (Units)</h3>
                <p className="text-xs text-slate-500 mt-1">إضافة وحدات جديدة باللغات الثلاث</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <form onSubmit={handleCreateUnit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2">إضافة وحدة جديدة (3 لغات)</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المستوى التابع له *</label>
                    <select
                      value={unitLevelId}
                      onChange={(e) => setUnitLevelId(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    >
                      {levels.map((l) => (
                        <option key={l.id} value={l.id}>{l.title_ar || l.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">🇸🇦 عنوان الوحدة (عربي) *</label>
                    <input
                      type="text"
                      value={unitTitleAr}
                      onChange={(e) => setUnitTitleAr(e.target.value)}
                      required
                      placeholder="الوحدة الأولى: التحية والتعارف"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-800 mb-1">🇬🇧 عنوان الوحدة (English) *</label>
                    <input
                      type="text"
                      value={unitTitleEn}
                      onChange={(e) => setUnitTitleEn(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Unit 1: Greetings & Introductions"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-purple-800 mb-1">🇷🇺 عنوان الوحدة (Русский) *</label>
                    <input
                      type="text"
                      value={unitTitleRu}
                      onChange={(e) => setUnitTitleRu(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Урок 1: Приветствие и знакомство"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer">
                    حفظ الوحدة باللغات الثلاث
                  </button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">الوحدات المسجلة ({units.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {units.map((u) => (
                      <div key={u.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{u.title_ar || u.title}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>🇬🇧 {u.title_en}</span>
                            <span>•</span>
                            <span>🇷🇺 {u.title_ru}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LEVELS */}
          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة المستويات والكتب (Levels)</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <form onSubmit={handleCreateLevel} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2">إضافة كتاب / مستوى جديد (3 لغات)</h4>
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">🇸🇦 العنوان بالعربية *</label>
                    <input
                      type="text"
                      value={levelTitleAr}
                      onChange={(e) => setLevelTitleAr(e.target.value)}
                      required
                      placeholder="الكتاب الأول: المبتدئ"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-800 mb-1">🇬🇧 العنوان بالإنجليزية *</label>
                    <input
                      type="text"
                      value={levelTitleEn}
                      onChange={(e) => setLevelTitleEn(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Book 1: Beginner Level"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-purple-800 mb-1">🇷🇺 العنوان بالروسية *</label>
                    <input
                      type="text"
                      value={levelTitleRu}
                      onChange={(e) => setLevelTitleRu(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="Книга 1: Начальный уровень"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المعرف الفريد (Slug) *</label>
                    <input
                      type="text"
                      value={levelSlug}
                      onChange={(e) => setLevelSlug(e.target.value)}
                      required
                      placeholder="tuhfa-book-1"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer">
                    حفظ المستوى باللغات الثلاث
                  </button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">المستويات المسجلة ({levels.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {levels.map((lvl) => (
                      <div key={lvl.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{lvl.title_ar || lvl.title}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>🇬🇧 {lvl.title_en}</span>
                            <span>•</span>
                            <span>🇷🇺 {lvl.title_ru}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded">
                          {lvl.slug}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">سجل الطلاب والمستخدمين ({profiles.length})</h3>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="p-3.5">البريد الإلكتروني</th>
                      <th className="p-3.5">الدور (Role)</th>
                      <th className="p-3.5">أيام التتابع</th>
                      <th className="p-3.5">مجموع الـ XP</th>
                      <th className="p-3.5">حالة الاشتراك</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {profiles.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-slate-800 font-mono">{p.email}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {p.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-600">
                          {p.streak} يوم
                        </td>
                        <td className="p-3.5 font-bold text-emerald-600">{p.total_xp} XP</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                            {p.subscription_tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-5">
              <h3 className="font-bold text-base text-slate-900 font-arabic border-b pb-3">إعدادات المنصة واللغات</h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">اللغات المدعومة حالياً:</span>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">🇸🇦 العربية (RTL)</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">🇬🇧 English (LTR)</span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold">🇷🇺 Русский (LTR)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">مشروع Supabase:</span>
                  <span className="text-xs font-mono text-slate-800 block">quranic-arabic (sfojwjlbhbhxppfxgxxb)</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">✓ قاعدة البيانات تدعم اللغات الثلاث عبر أعمدة مخصصة</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">بيانات دخول المشرف المعتمدة:</span>
                  <span className="text-xs font-mono text-slate-800 block">admin@bayan.com</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
