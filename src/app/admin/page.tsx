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
  X,
  Play,
  RotateCcw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Radio,
  ExternalLink,
  Shield,
  TrendingUp,
  Activity,
  Flame,
  Award
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

export default function AdminLTEPage() {
  const router = useRouter();

  // Auth State
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Layout State: Sidebar Toggle & Active Vertical Tab
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'exercises' | 'add_exercise' | 'lessons' | 'units' | 'levels' | 'users' | 'settings'
  >('overview');

  // Database Entities
  const [levels, setLevels] = useState<Level[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Exercise Form State
  const [audioSourceMode, setAudioSourceMode] = useState<'quran_ayah' | 'letter_preset' | 'custom'>('quran_ayah');
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS[0].folder);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState(1);
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

  // Check Authentication on Mount
  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // If no active session, redirect to dedicated login
          router.push('/admin/login');
          return;
        }

        setAdminUser({
          email: session.user.email,
          name: session.user.user_metadata?.full_name || 'مدير النظام',
        });
      } catch (err) {
        console.warn('Auth check error:', err);
      } finally {
        setAuthChecked(true);
      }
    }

    checkAdminAuth();
  }, [router]);

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
      if (uRes.data) setUnits(uRes.data);
      if (lesRes.data) {
        setLessons(lesRes.data);
        if (lesRes.data.length > 0 && !selectedLessonId) {
          setSelectedLessonId(lesRes.data[0].id);
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

  // Form Submissions
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

  return (
    <div className="min-h-screen bg-slate-100 flex selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* 1. VERTICAL SIDEBAR (AdminLTE Style) */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col fixed inset-y-0 right-0 z-40 shadow-2xl border-l border-slate-800`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold shrink-0 shadow-md shadow-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="leading-none">
                <span className="font-extrabold text-lg text-white font-arabic">بيان</span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-0.5">AdminLTE v4</span>
              </div>
            )}
          </div>
        </div>

        {/* Admin User Profile Widget */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
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

        {/* Vertical Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {/* Item 1: Overview */}
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

          {/* Item 2: Audio Exercises */}
          <button
            onClick={() => setActiveTab('exercises')}
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

          {/* Item 3: Lessons */}
          <button
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'lessons'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>الدروس التعليمية (Lessons)</span>}
            </div>
            {sidebarOpen && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {lessons.length}
              </span>
            )}
          </button>

          {/* Item 4: Units */}
          <button
            onClick={() => setActiveTab('units')}
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

          {/* Item 5: Levels */}
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

          {/* Item 6: Users & Learners */}
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

          {/* Item 7: Settings */}
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

        {/* Sidebar Footer: Public site & Logout */}
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

      {/* 2. MAIN CONTENT WRAPPER */}
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
              <span>مزامنة Supabase</span>
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

        {/* Dynamic Page Content */}
        <main className="p-6 flex-1 space-y-6">
          {/* TAB 1: OVERVIEW & KPIS (AdminLTE Style Colored Stat Cards) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-arabic">لوحة الإحصائيات والمؤشرات</h2>
                  <p className="text-xs text-slate-500 mt-0.5">ملخص مباشر لحالة المحتوى والطلاب في منصة بيان</p>
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

              {/* 4 Colored KPI Cards (AdminLTE Theme: Aqua, Green, Yellow, Red) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Card 1: Exercises */}
                <div className="bg-gradient-to-tr from-cyan-600 to-cyan-500 rounded-2xl p-5 text-white shadow-lg shadow-cyan-600/20 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">إجمالي التمارين الصوتية</span>
                    <h3 className="text-3xl font-extrabold mt-1">{exercises.length}</h3>
                  </div>
                  <Volume2 className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <button
                    onClick={() => setActiveTab('exercises')}
                    className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span>عرض كافة التمارين</span>
                    <span>←</span>
                  </button>
                </div>

                {/* Card 2: Lessons */}
                <div className="bg-gradient-to-tr from-emerald-600 to-emerald-500 rounded-2xl p-5 text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الدروس التعليمية</span>
                    <h3 className="text-3xl font-extrabold mt-1">{lessons.length}</h3>
                  </div>
                  <BookOpen className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <button
                    onClick={() => setActiveTab('lessons')}
                    className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span>إدارة الدروس</span>
                    <span>←</span>
                  </button>
                </div>

                {/* Card 3: Units & Levels */}
                <div className="bg-gradient-to-tr from-amber-500 to-amber-400 rounded-2xl p-5 text-white shadow-lg shadow-amber-500/20 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الوحدات والمستويات</span>
                    <h3 className="text-3xl font-extrabold mt-1">{units.length} / {levels.length}</h3>
                  </div>
                  <Layers className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <button
                    onClick={() => setActiveTab('units')}
                    className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span>تفاصيل الوحدات</span>
                    <span>←</span>
                  </button>
                </div>

                {/* Card 4: Learners */}
                <div className="bg-gradient-to-tr from-rose-600 to-rose-500 rounded-2xl p-5 text-white shadow-lg shadow-rose-600/20 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">الطلاب المسجلين</span>
                    <h3 className="text-3xl font-extrabold mt-1">{profiles.length}</h3>
                  </div>
                  <Users className="w-16 h-16 absolute -bottom-3 -left-3 opacity-20" />
                  <button
                    onClick={() => setActiveTab('users')}
                    className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span>قائمة الطلاب</span>
                    <span>←</span>
                  </button>
                </div>
              </div>

              {/* Quick Summary Tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Exercises */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                      <span>آخر التمارين المضافة</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('exercises')}
                      className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                    >
                      عرض الكل
                    </button>
                  </div>

                  <div className="space-y-3">
                    {exercises.slice(0, 4).map((ex) => (
                      <div key={ex.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-arabic text-base font-bold flex items-center justify-center">
                            {ex.arabic_text?.slice(0, 2) || '؟'}
                          </span>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 truncate max-w-xs">{ex.question_text}</h5>
                            <span className="text-[11px] text-slate-400">{ex.transliteration}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => testAudio(ex.audio_url || '', ex.arabic_text || '')}
                          className="p-1.5 rounded-lg bg-white border text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registered Students */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>أحدث الطلاب في المنصة</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                    >
                      عرض الكل
                    </button>
                  </div>

                  <div className="space-y-3">
                    {profiles.slice(0, 4).map((p) => (
                      <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                            {p.display_name?.slice(0, 2) || 'طالب'}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800">{p.display_name || p.email}</h5>
                            <span className="text-[11px] text-slate-400">{p.email}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.role === 'admin' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.role === 'admin' ? 'مدير' : 'طالب'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXERCISES LIST */}
          {activeTab === 'exercises' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة التمارين الصوتية</h3>
                  <p className="text-xs text-slate-500 mt-0.5">قائمة التمارين التفاعلية المرتبطة بالدروس</p>
                </div>
                <button
                  onClick={() => setActiveTab('add_exercise')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-200 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ إضافة تمرين جديد</span>
                </button>
              </div>

              <div className="grid gap-3.5">
                {exercises.map((ex) => (
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
                          {ex.audio_url || 'صوت تلقائي (Speech)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => testAudio(ex.audio_url || '', ex.arabic_text || '')}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="استمع للصوت"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteExercise(ex.id)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
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

          {/* TAB 3: ADD EXERCISE (With EveryAyah and Letter presets & Live Simulator) */}
          {activeTab === 'add_exercise' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Exercise Form */}
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

                {/* Audio Engine Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مصدر الصوت القرآني (Audio Engine)</span>
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
                      رابط مباشر
                    </button>
                  </div>

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
                            <option key={r.folder} value={r.folder}>
                              {r.nameAr}
                            </option>
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
                              <option key={s.number} value={s.number}>
                                سورة {s.nameAr} ({s.versesCount} آيات)
                              </option>
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

                      <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-mono break-all">
                        {qAudioUrl}
                      </div>
                    </div>
                  )}

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
                    نص السؤال *
                  </label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      الآية أو الحرف المستهدف *
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
                      النطق الصوتي
                    </label>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    الخيارات الأربعة (حدد الإجابة الصحيحة):
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt1' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500">الخيار 1</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt1'} onChange={() => setCorrectOpt('opt1')} />
                      </div>
                      <input type="text" dir="rtl" value={opt1.text} onChange={(e) => setOpt1({ ...opt1, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt1.translit} onChange={(e) => setOpt1({ ...opt1, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                    </div>

                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt2' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500">الخيار 2</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt2'} onChange={() => setCorrectOpt('opt2')} />
                      </div>
                      <input type="text" dir="rtl" value={opt2.text} onChange={(e) => setOpt2({ ...opt2, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt2.translit} onChange={(e) => setOpt2({ ...opt2, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                    </div>

                    <div className={`p-3 rounded-xl border-2 ${correctOpt === 'opt3' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500">الخيار 3</span>
                        <input type="radio" name="correct" checked={correctOpt === 'opt3'} onChange={() => setCorrectOpt('opt3')} />
                      </div>
                      <input type="text" dir="rtl" value={opt3.text} onChange={(e) => setOpt3({ ...opt3, text: e.target.value })} className="w-full p-2 text-center text-sm font-arabic border rounded-lg bg-white" />
                      <input type="text" value={opt3.translit} onChange={(e) => setOpt3({ ...opt3, translit: e.target.value })} placeholder="Translit" className="w-full p-1 text-center text-[11px] text-slate-500 mt-1 border rounded" />
                    </div>

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
                    الشرح التعليمي
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
                  حفظ التمرين في قاعدة البيانات
                </button>
              </form>

              {/* Live Simulator */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    <span>المعاينة التفاعلية الفورية (Live Simulator)</span>
                  </h3>
                  <span className="text-xs text-slate-500">محاكاة تجربة الطالب</span>
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

          {/* TAB 4: LESSONS MANAGER */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة الدروس التعليمية</h3>
                  <p className="text-xs text-slate-500 mt-0.5">الدروس المرتبطة بكل وحدة في المنهج</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Add Lesson Form */}
                <form onSubmit={handleCreateLesson} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 border-b pb-2">
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span>إضافة درس جديد</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الوحدة التابع لها *</label>
                    <select
                      value={lessonUnitId}
                      onChange={(e) => setLessonUnitId(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
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
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نوع الدرس</label>
                    <select
                      value={lessonType}
                      onChange={(e) => setLessonType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="vocab">مفردات قرآنية (Quranic Verses)</option>
                      <option value="alphabet">حروف هجائية (Alphabet)</option>
                      <option value="harakat">حركات ومدود (Harakat)</option>
                      <option value="prayer">أذكار وصلوات (Adhkar)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نقاط XP</label>
                    <input
                      type="number"
                      value={lessonXp}
                      onChange={(e) => setLessonXp(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    حفظ الدرس
                  </button>
                </form>

                {/* Lessons Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">قائمة الدروس الحالية ({lessons.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {lessons.map((les) => (
                      <div key={les.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{les.title}</h5>
                          <span className="text-[11px] text-slate-400 font-mono">النوع: {les.lesson_type} | +{les.xp_reward} XP</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          نشط
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: UNITS MANAGER */}
          {activeTab === 'units' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة الوحدات الدراسية (Units)</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <form onSubmit={handleCreateUnit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-b pb-2">إضافة وحدة جديدة</h4>
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
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer">
                    حفظ الوحدة
                  </button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-4">الوحدات المسجلة ({units.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {units.map((u) => (
                      <div key={u.id} className="py-3 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{u.title}</h5>
                          <span className="text-[11px] text-slate-400">{u.description || 'بدون وصف إضافي'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LEVELS MANAGER */}
          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">إدارة المستويات المنهجية (Levels)</h3>
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

          {/* TAB 7: USERS & LEARNERS */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-arabic">سجل الطلاب والمستخدمين (Profiles)</h3>
                <p className="text-xs text-slate-500 mt-0.5">المستخدمين المسجلين في قاعدة بيانات Supabase Auth</p>
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
                        <td className="p-3.5 font-bold text-emerald-600">
                          {p.total_xp} XP
                        </td>
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
                  <span className="text-xs font-bold text-slate-700 block mb-1">سيرفر EveryAyah الافتراضي للقرآن:</span>
                  <span className="text-xs font-mono text-emerald-700 block">https://everyayah.com/data/</span>
                  <p className="text-[11px] text-slate-500 mt-1">توليد مسارات الصوت وفق معيار SSSAAA.mp3 لكافة السور والآيات.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">مشروع Supabase المتصل:</span>
                  <span className="text-xs font-mono text-slate-800 block">quranic-arabic (sfojwjlbhbhxppfxgxxb)</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">✓ متصل بنجاح مع RLS نشط</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">بيانات دخول المسؤول الحالي:</span>
                  <span className="text-xs font-mono text-slate-800 block">admin@bayan.com (Super Admin)</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
