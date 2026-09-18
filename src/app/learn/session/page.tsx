'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Lesson, Exercise } from '@/types/database.types';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

function LessonSessionContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId');

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function loadLessonData() {
      try {
        let currentLesson: Lesson | null = null;
        let exerciseList: Exercise[] = [];

        if (lessonId) {
          const { data: les } = await supabase
            .from('lessons')
            .select('*')
            .eq('id', lessonId)
            .single();
          currentLesson = les;

          const { data: exs } = await supabase
            .from('exercises')
            .select('*')
            .eq('lesson_id', lessonId)
            .order('order_index');
          if (exs && exs.length > 0) {
            exerciseList = exs;
          }
        }

        // If no exercises found in DB, fallback to first available exercise in DB
        if (exerciseList.length === 0) {
          const { data: anyExs } = await supabase
            .from('exercises')
            .select('*')
            .order('order_index')
            .limit(3);
          if (anyExs && anyExs.length > 0) {
            exerciseList = anyExs;
          }
        }

        if (currentLesson) setLesson(currentLesson);
        setExercises(exerciseList);
      } catch (err) {
        console.error('Error fetching lesson:', err);
      } finally {
        setLoading(false);
      }
    }

    loadLessonData();
  }, [lessonId]);

  const handleNextExercise = () => {
    if (currentExerciseIdx + 1 < exercises.length) {
      setCurrentExerciseIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#60a5fa'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500" dir="rtl">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold font-arabic">جاري تحميل درس (العربية بين يديك)...</p>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIdx];
  const progressPercent = Math.round(((currentExerciseIdx + (completed ? 1 : 0)) / Math.max(exercises.length, 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <span>← العودة لقائمة الدروس</span>
          </Link>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>تمرين {Math.min(currentExerciseIdx + 1, exercises.length)} من {exercises.length}</span>
              <span className="text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>+{lesson?.xp_reward || 35} XP</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {!completed && currentExercise ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                منهج العربية بين يديك • تمرين تفاعلي
              </span>
              <h1 className="text-2xl font-bold text-slate-900 font-arabic mt-2">
                {lesson?.title || 'الدرس الأول: التحية والتعارف'}
              </h1>
            </div>

            <InteractiveAudioExercisePlayer
              key={currentExercise.id}
              exercise={currentExercise}
              onNext={handleNextExercise}
              autoPlayAudio={true}
            />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">أحسنت صنعاً!</span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-arabic mt-1">
                اكتمل الدرس بنجاح ممتاز 🎉
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                لقد أتممت هذا الدرس من سلسلة (العربية بين يديك) وحصلت على النقاط والمكافأة!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-medium block">نقاط XP المكتسبة</span>
                <span className="text-2xl font-black text-emerald-600">+{lesson?.xp_reward || 35} XP</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">الدقة والإتقان</span>
                <span className="text-2xl font-black text-amber-500">100%</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/learn"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                متابعة الدروس التالية
              </Link>
              <button
                onClick={() => {
                  setCompleted(false);
                  setCurrentExerciseIdx(0);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة الدرس</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function LessonSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500 font-arabic">
          جاري تجهيز الدرس...
        </div>
      }
    >
      <LessonSessionContent />
    </Suspense>
  );
}
