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
  Filter
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
  { label: 'حوار 1: السَّلامُ عَلَيْكُمْ (العربية بين يديك)', url: '/audio/bayna-yadayk/salam_intro.mp3' },
  { label: 'حوار 2: كَيْفَ حَالُك (العربية بين يديك)', url: '/audio/bayna-yadayk/kayfa_haluk.mp3' },
  { label: 'حوار 3: مِنْ أَيْنَ أَنْتَ (العربية بين يديك)', url: '/audio/bayna-yadayk/min_ayna_anta.mp3' },
  { label: 'حوار 4: شَجَرَةُ الأُسْرَة (العربية بين يديك)', url: '/audio/bayna-yadayk/shajarat_usrah.mp3' },
];

export default function AdminLTEPage() {
  const router = useRouter();

  // Auth State
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string } | null>(null);

  // Layout State: Sidebar Toggle & Active Vertical Tab
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'exercises' | 'add_exercise' | 'lessons' | 'units' | 'levels' | 'users' | 'settings'
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

  // Exercise Form State
  const [audioSourceMode, setAudioSourceMode] = useState<'quran_ayah' | 'letter_preset' | 'custom'>('letter_preset');
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS[0].folder);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [qText, setQText] = useState('استمع للعبارة التالية وحدد المعنى الصحيح:');
  const [qArabic, setQArabic] = useState('السَّلامُ عَلَيْكُمْ');
  const [qTranslit, setQTranslit] = useState('As-Salamu Alaykum');
  const [qTranslation, setQTranslation] = useState('Peace be upon you');
  const [qAudioUrl, setQAudioUrl] = useState('/audio/bayna-yadayk/salam_intro.mp3');
  const [qExplanation, setQExplanation] = useState('التحية المعتمدة في الحوار الأول من سلسلة العربية بين يديك.');
  const [opt1, setOpt1] = useState({ text: 'وَعَلَيْكُمُ السَّلامُ', translit: 'Wa alaykumus-salam' });
  const [opt2, setOpt2] = useState({ text: 'أَهْلاً وَسَهْلاً', translit: 'Ahlan wa sahlan' });
  const [opt3, setOpt3] = useState({ text: 'مَعَ السَّلامَةِ', translit: 'Ma as-salamah' });
  const [opt4, setOpt4] = useState({ text: 'صَبَاحَ الْخَيْرِ', translit: 'Sabah al-khayr' });
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

  // Create Exercise
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
      setActiveTab('exercises');
    }
  };

  // Create Level
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
      setActiveTab('levels');
    }
  };

  // Create Unit
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
      setActiveTab('units');
    }
  };

  // Create Lesson
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
    <div className="min-h-screen bg-slate-100 flex selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* 1. VERTICAL SIDEBAR (AdminLTE) */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col fixed inset-y-0 right-0 z-40 shadow-2xl border-l border-slate-800`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-extrabold text-lg text-white font-arabic">بيان</span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold block">AdminLTE v4</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-emerald-200 font-bold flex items-center justify-center text-sm border-2 border-emerald-500">
                AD
              </div>
              <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 absolute bottom-0 left-0" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white truncate">{adminUser?.name || 'مدير النظام'}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-slate-400 truncate">{adminUser?.email || 'admin@bayan.com'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>لوحة المؤشرات (Dashboard)</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('units');
              setSelectedFilterUnitId('all');
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'units'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>الوحدات الدراسية (Units)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {units.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('lessons');
              setSelectedFilterUnitId('all');
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'lessons'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>الدروس والمناهج (Lessons)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {lessons.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('exercises');
              setSelectedFilterLessonId('all');
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'exercises' || activeTab === 'add_exercise'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>التمارين الصوتية (Exercises)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-400">
                {exercises.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('levels')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'levels'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>المستويات (Levels)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {levels.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>الطلاب والمشتركين (Users)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {profiles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>إعدادات النظام (Settings)</span>}
          </button>
        </nav>

        {/* Footer Links */}
        <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-950/60">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-emerald-400" />
            {sidebarOpen && <span>معاينة الموقع كطالب</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-20'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              title="طي / توسيع القائمة"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>لوحة الإدارة</span>
              <span>/</span>
              <span className="text-emerald-700 capitalize font-bold">
                {activeTab === 'overview' && 'لوحة المؤشرات العامة'}
                {activeTab === 'exercises' && 'التمارين الصوتية'}
                {activeTab === 'add_exercise' && 'إضافة تمرين جديد'}
                {activeTab === 'lessons' && 'الدروس التعليمية'}
                {activeTab === 'units' && 'الوحدات الدراسية'}
                {activeTab === 'levels' && 'المستويات'}
                {activeTab === 'users' && 'الطلاب والمستخدمين'}
                {activeTab === 'settings' && 'الإعدادات'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>مزامنة البيانات</span>
            </button>

            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                AD
              </div>
              <span className="text-xs font-bold text-slate-800 hidden sm:inline-block">
                {adminUser?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Notifications Alert */}
        {statusMsg && (
          <div className="px-6 pt-4">
            <div
              className={`p-4 rounded-2xl flex items-center justify-between border ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {statusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
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
          </div>
        )}

        {/* Dynamic Body Content */}
        <main className="p-6 flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-arabic">لوحة المؤشرات والتحكم</h2>
                  <p className="text-xs text-slate-500 mt-0.5">اضغط على أي قسم بالأسفل لفتح تفاصيله وإدارته مباشرة</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('add_exercise')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-200 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ إضافة تمرين صوتي</span>
                  </button>
                </div>
              </div>

              {/* 4 Colored KPI Cards (Clickable!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <button
                  onClick={() => {
                    setActiveTab('units');
                    setSelectedFilterUnitId('all');
                  }}
                  className="bg-gradient-to-tr from-amber-500 to-amber-400 rounded-2xl p-5 text-white shadow-lg shadow-amber-500/20 relative overflow-hidden flex flex-col justify-between text-right cursor-pointer hover:scale-102 transition-transform"
                >
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الوحدات الدراسية (Units)</span>
                    <h3 className="text-3xl font-extrabold mt-1">{units.length} وحدة</h3>
                  </div>
                  <Layers className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between">
                    <span>تصفح وإدارة الوحدات</span>
                    <span>←</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('lessons');
                    setSelectedFilterUnitId('all');
                  }}
                  className="bg-gradient-to-tr from-emerald-600 to-emerald-500 rounded-2xl p-5 text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden flex flex-col justify-between text-right cursor-pointer hover:scale-102 transition-transform"
                >
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الدروس المنهجية (Lessons)</span>
                    <h3 className="text-3xl font-extrabold mt-1">{lessons.length} درس</h3>
                  </div>
                  <BookOpen className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between">
                    <span>تصفح وإدارة الدروس</span>
                    <span>←</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('exercises');
                    setSelectedFilterLessonId('all');
                  }}
                  className="bg-gradient-to-tr from-cyan-600 to-cyan-500 rounded-2xl p-5 text-white shadow-lg shadow-cyan-600/20 relative overflow-hidden flex flex-col justify-between text-right cursor-pointer hover:scale-102 transition-transform"
                >
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">التمارين الصوتية (Exercises)</span>
                    <h3 className="text-3xl font-extrabold mt-1">{exercises.length} تمرين</h3>
                  </div>
                  <Volume2 className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between">
                    <span>عرض وحل التمارين</span>
                    <span>←</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('users')}
                  className="bg-gradient-to-tr from-rose-600 to-rose-500 rounded-2xl p-5 text-white shadow-lg shadow-rose-600/20 relative overflow-hidden flex flex-col justify-between text-right cursor-pointer hover:scale-102 transition-transform"
                >
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الطلاب المسجلين</span>
                    <h3 className="text-3xl font-extrabold mt-1">{profiles.length}</h3>
                  </div>
                  <Users className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between">
                    <span>قائمة الطلاب</span>
                    <span>←</span>
                  </div>
                </button>
              </div>

              {/* Quick Interactive Units & Lessons Tree */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-base font-arabic">
                    هيكل منهج (العربية بين يديك) السريع
                  </h3>
                  <span className="text-xs text-slate-400">انقر على أي درس لتشغيله أو إضافة تمارين له</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {units.map((u) => {
                    const unitLessons = lessons.filter((les) => les.unit_id === u.id);
                    return (
                      <div key={u.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-sm text-slate-900 font-arabic">{u.title}</h4>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {unitLessons.length} دروس
                          </span>
                        </div>
                        <div className="space-y-2 mt-3">
                          {unitLessons.map((les) => {
                            const lesExs = exercises.filter((ex) => ex.lesson_id === les.id);
                            return (
                              <div
                                key={les.id}
                                className="p-2.5 rounded-lg bg-white border border-slate-100 flex items-center justify-between text-xs"
                              >
                                <span className="font-semibold text-slate-800">{les.title}</span>
                                <div className="flex items-center gap-1.5">
                                  <Link
                                    href={`/learn/session?lessonId=${les.id}`}
                                    target="_blank"
                                    className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100"
                                  >
                                    تشغيل ({lesExs.length})
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setSelectedLessonId(les.id);
                                      setActiveTab('add_exercise');
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-slate-800"
                                    title="إضافة تمرين لهذا الدرس"
                                  >
                                    <PlusCircle className="w-4 h-4" />
                                  </button>
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
            </div>
          )}

          {/* TAB 2: UNITS (Active Clickable Management) */}
          {activeTab === 'units' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة وتصفح الوحدات الدراسية (Units)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">انقر على زر "عرض دروس الوحدة" لعرض وتعديل دروس كل وحدة</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Form */}
                <form onSubmit={handleCreateUnit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span>إضافة وحدة دراسية جديدة</span>
                  </h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المستوى التابع له *</label>
                    <select
                      value={unitLevelId}
                      onChange={(e) => setUnitLevelId(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    >
                      {levels.map((l) => (
                        <option key={l.id} value={l.id}>{l.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الوحدة *</label>
                    <input
                      type="text"
                      value={unitTitle}
                      onChange={(e) => setUnitTitle(e.target.value)}
                      required
                      placeholder="e.g. الوحدة 4: الحياة اليومية"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">وصف الوحدة</label>
                    <textarea
                      rows={2}
                      value={unitDesc}
                      onChange={(e) => setUnitDesc(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs">
                    حفظ الوحدة
                  </button>
                </form>

                {/* List of Units */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 mb-2">الوحدات الحالية ({units.length})</h4>
                  {units.map((u) => {
                    const unitLessons = lessons.filter((les) => les.unit_id === u.id);
                    return (
                      <div key={u.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                              {u.order_index}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm font-arabic">{u.title}</h4>
                          </div>
                          <p className="text-xs text-slate-500 max-w-lg">{u.description || 'وحدة دراسية في منهج العربية بين يديك'}</p>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-2">
                            تحتوي على {unitLessons.length} دروس مسجلة
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => {
                              setSelectedFilterUnitId(u.id);
                              setActiveTab('lessons');
                            }}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span>عرض دروس الوحدة</span>
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LESSONS (Active Clickable Management) */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة الدروس التعليمية (Lessons)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">يمكنك تشغيل أي درس كتجربة طالب أو إضافة تمارين صوتية له</p>
                </div>

                {/* Filter by Unit */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">تصفية حسب الوحدة:</span>
                  <select
                    value={selectedFilterUnitId}
                    onChange={(e) => setSelectedFilterUnitId(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800"
                  >
                    <option value="all">كافة الوحدات ({lessons.length} درس)</option>
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>{u.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Form */}
                <form onSubmit={handleCreateLesson} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span>إضافة درس جديد</span>
                  </h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الوحدة التابع لها *</label>
                    <select
                      value={lessonUnitId}
                      onChange={(e) => setLessonUnitId(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                    >
                      {units.map((u) => (
                        <option key={u.id} value={u.id}>{u.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الدرس *</label>
                    <input
                      type="text"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      required
                      placeholder="e.g. الدرس 2.3: حوار المسجد والأذان"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نقاط المكافأة (XP)</label>
                    <input
                      type="number"
                      value={lessonXp}
                      onChange={(e) => setLessonXp(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs">
                    حفظ الدرس
                  </button>
                </form>

                {/* List of Lessons */}
                <div className="lg:col-span-2 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-800">
                      الدروس المعروضة ({filteredLessons.length})
                    </h4>
                    {selectedFilterUnitId !== 'all' && (
                      <button
                        onClick={() => setSelectedFilterUnitId('all')}
                        className="text-xs text-emerald-600 font-bold hover:underline"
                      >
                        إلغاء التصفية
                      </button>
                    )}
                  </div>

                  {filteredLessons.map((les) => {
                    const lesExs = exercises.filter((ex) => ex.lesson_id === les.id);
                    const parentUnit = units.find((u) => u.id === les.unit_id);
                    return (
                      <div
                        key={les.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">{parentUnit?.title}</span>
                          <h4 className="font-bold text-slate-900 text-sm font-arabic">{les.title}</h4>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                            {lesExs.length} تمارين صوتية تفاعلية • +{les.xp_reward} XP
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          {/* Play Lesson button */}
                          <Link
                            href={`/learn/session?lessonId=${les.id}`}
                            target="_blank"
                            className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>تشغيل الدرس</span>
                          </Link>

                          {/* Add exercise to this lesson */}
                          <button
                            onClick={() => {
                              setSelectedLessonId(les.id);
                              setActiveTab('add_exercise');
                            }}
                            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>+ تمرين</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXERCISES */}
          {activeTab === 'exercises' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة التمارين الصوتية</h3>
                  <p className="text-xs text-slate-500 mt-0.5">استمع للتمارين أو قم بتشغيلها أو حذفها</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('add_exercise')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-200 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ إضافة تمرين جديد</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-3.5">
                {filteredExercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-arabic text-xl font-bold shrink-0">
                        {ex.arabic_text ? ex.arabic_text.slice(0, 4) : '؟'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{ex.question_text}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          النص: <span className="font-arabic font-bold text-slate-800">{ex.arabic_text}</span> | النطق: {ex.transliteration || '-'}
                        </p>
                        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block break-all max-w-lg truncate">
                          {ex.audio_url || 'صوت تلقائي'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
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

          {/* TAB 5: ADD EXERCISE */}
          {activeTab === 'add_exercise' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <form
                onSubmit={handleCreateExercise}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-arabic">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <span>إنشاء تمرين صوتي تفاعلي</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('exercises')}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    ← العودة للقائمة
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    الدرس التابع له *
                  </label>
                  <select
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800"
                  >
                    {lessons.map((les) => (
                      <option key={les.id} value={les.id}>
                        {les.title} (+{les.xp_reward} XP)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Audio selector */}
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
                      <span>استمع الآن</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
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
                      حوارات وحروف
                    </button>

                    <button
                      type="button"
                      onClick={() => setAudioSourceMode('quran_ayah')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        audioSourceMode === 'quran_ayah'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      آية قرآنية
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

                  {audioSourceMode === 'letter_preset' && (
                    <div className="pt-2">
                      <select
                        value={qAudioUrl}
                        onChange={(e) => setQAudioUrl(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                      >
                        {BUILT_IN_LETTER_PRESETS.map((p) => (
                          <option key={p.url} value={p.url}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {audioSourceMode === 'quran_ayah' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">القارئ</label>
                        <select
                          value={selectedReciter}
                          onChange={(e) => setSelectedReciter(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                        >
                          {QURAN_RECITERS.map((r) => (
                            <option key={r.folder} value={r.folder}>{r.nameAr}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">السورة</label>
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
                              <option key={s.number} value={s.number}>سورة {s.nameAr}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">رقم الآية</label>
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
                    </div>
                  )}

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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">نص السؤال *</label>
                  <input
                    type="text"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">العبارة المستهدفة *</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">النطق الصوتي</label>
                    <input
                      type="text"
                      value={qTranslit}
                      onChange={(e) => setQTranslit(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm text-center focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* 4 Options */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">الخيارات الأربعة:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt1' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">الخيار 1</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt1'} onChange={() => setCorrectOpt('opt1')} />
                      </div>
                      <input type="text" dir="rtl" value={opt1.text} onChange={(e) => setOpt1({ ...opt1, text: e.target.value })} className="w-full p-1.5 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt1.translit} onChange={(e) => setOpt1({ ...opt1, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[10px] text-slate-500 mt-1 border rounded" />
                    </div>

                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt2' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">الخيار 2</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt2'} onChange={() => setCorrectOpt('opt2')} />
                      </div>
                      <input type="text" dir="rtl" value={opt2.text} onChange={(e) => setOpt2({ ...opt2, text: e.target.value })} className="w-full p-1.5 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt2.translit} onChange={(e) => setOpt2({ ...opt2, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[10px] text-slate-500 mt-1 border rounded" />
                    </div>

                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt3' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">الخيار 3</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt3'} onChange={() => setCorrectOpt('opt3')} />
                      </div>
                      <input type="text" dir="rtl" value={opt3.text} onChange={(e) => setOpt3({ ...opt3, text: e.target.value })} className="w-full p-1.5 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt3.translit} onChange={(e) => setOpt3({ ...opt3, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[10px] text-slate-500 mt-1 border rounded" />
                    </div>

                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt4' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">الخيار 4</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt4'} onChange={() => setCorrectOpt('opt4')} />
                      </div>
                      <input type="text" dir="rtl" value={opt4.text} onChange={(e) => setOpt4({ ...opt4, text: e.target.value })} className="w-full p-1.5 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt4.translit} onChange={(e) => setOpt4({ ...opt4, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[10px] text-slate-500 mt-1 border rounded" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 transition-all cursor-pointer"
                >
                  حفظ التمرين في قاعدة البيانات
                </button>
              </form>

              {/* Simulator */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    <span>المعاينة التفاعلية المباشرة (Live Simulator)</span>
                  </h3>
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

          {/* TAB 6: LEVELS */}
          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة المستويات (Levels)</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <form onSubmit={handleCreateLevel} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2">إضافة مستوى جديد</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">عنوان المستوى *</label>
                    <input
                      type="text"
                      value={levelTitle}
                      onChange={(e) => setLevelTitle(e.target.value)}
                      required
                      placeholder="e.g. الكتاب الثاني - الجزء الأول"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المعرف (Slug) *</label>
                    <input
                      type="text"
                      value={levelSlug}
                      onChange={(e) => setLevelSlug(e.target.value)}
                      required
                      placeholder="bayna-yadayk-3"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="freeLvl"
                      checked={levelIsFree}
                      onChange={(e) => setLevelIsFree(e.target.checked)}
                    />
                    <label htmlFor="freeLvl" className="text-xs text-slate-700 font-semibold cursor-pointer">مستوى مجاني</label>
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer">
                    حفظ المستوى
                  </button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">المستويات الحالية ({levels.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {levels.map((lvl) => (
                      <div key={lvl.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{lvl.title}</h5>
                          <span className="text-[11px] text-slate-400 font-mono">Slug: {lvl.slug}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lvl.is_free ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {lvl.is_free ? 'مجاني' : 'مدفوع Pro'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">سجل الطلاب والمستخدمين ({profiles.length})</h3>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b">
                    <tr>
                      <th className="p-3.5">الاسم / البريد</th>
                      <th className="p-3.5">الدور (Role)</th>
                      <th className="p-3.5">التتابع (Streak)</th>
                      <th className="p-3.5">نقاط الخبرة (XP)</th>
                      <th className="p-3.5">الباقة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {profiles.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="p-3.5 font-semibold text-slate-900">
                          <div>{p.display_name || 'طالب جديد'}</div>
                          <span className="text-[11px] text-slate-400 font-normal">{p.email}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.role === 'admin' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {p.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-amber-600 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{p.streak} يوم</span>
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

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3 font-arabic">إعدادات النظام والاتصال</h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">منهج المنصة النشط:</span>
                  <span className="text-xs font-bold text-emerald-700 block">سلسلة العربية بين يديك - الكتاب الأول</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">مشروع Supabase:</span>
                  <span className="text-xs font-mono text-slate-800 block">quranic-arabic (sfojwjlbhbhxppfxgxxb)</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">✓ RLS نشط وغير متداخل</span>
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
