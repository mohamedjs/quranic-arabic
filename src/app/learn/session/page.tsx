'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Lesson, Exercise } from '@/types/database.types';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Trophy, RotateCcw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function LessonSessionContent() {
  const { t, getLocalized, dir } = useLanguage();
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

        // If no exercises found in DB for this specific lesson, fallback to first available exercises in DB
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
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500" dir={dir}>
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold font-arabic">{t('learn.loading')}</p>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIdx];
  const progressPercent = Math.round(((currentExerciseIdx + (completed ? 1 : 0)) / Math.max(exercises.length, 1)) * 100);
  const lessonTitle = lesson ? getLocalized(lesson, 'title') : t('session.badge');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900" dir={dir}>
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <span>{t('session.back')}</span>
          </Link>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>
                {t('session.exercise_count', {
                  current: Math.min(currentExerciseIdx + 1, exercises.length),
                  total: exercises.length,
                })}
              </span>
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
                {t('session.badge')}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 font-arabic mt-2">
                {lessonTitle}
              </h1>
            </div>

            <InteractiveAudioExercisePlayer
              key={currentExercise.id}
              exercise={currentExercise}
              onNext={handleNextExercise}
              autoPlayAudio={true}
            />
          </div>
        ) : completed ? (
          /* Completion Screen */
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Bayna Yadayk • Book 1
            </span>

            <h2 className="text-2xl font-black text-slate-900 font-arabic mt-3">
              {t('session.completed_title')}
            </h2>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {t('session.completed_desc')}
            </p>

            <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold text-amber-900">مكافأة إتقان الحوار</span>
              </div>
              <span className="font-extrabold text-amber-700 text-sm">+{lesson?.xp_reward || 35} XP</span>
            </div>

            <div className="space-y-3">
              <Link
                href="/learn"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('session.back_to_curriculum')}</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setCurrentExerciseIdx(0);
                  setCompleted(false);
                }}
                className="w-full py-3 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('session.repeat_lesson')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p className="text-sm font-arabic">لا توجد تمارين مسجلة لهذا الدرس حالياً.</p>
            <Link href="/learn" className="text-xs text-emerald-600 font-bold underline mt-2 block">
              {t('session.back')}
            </Link>
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
        <div className="min-h-screen flex items-center justify-center text-slate-400">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LessonSessionContent />
    </Suspense>
  );
}
