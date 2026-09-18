'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Level, Unit, Lesson } from '@/types/database.types';
import { CheckCircle, Play, Sparkles, Gift, ArrowLeft, ArrowRight, Layers, BookOpen, Clock, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LearnPage() {
  const { t, getLocalized, dir } = useLanguage();
  const [levels, setLevels] = useState<Level[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>('11111111-1111-1111-1111-111111111111');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurriculum() {
      try {
        const { data: lvls } = await supabase.from('levels').select('*').order('order_index');
        const { data: unts } = await supabase.from('units').select('*').order('order_index');
        const { data: les } = await supabase.from('lessons').select('*').order('order_index');

        if (lvls && lvls.length > 0) {
          setLevels(lvls);
          setSelectedLevelId(lvls[0].id);
        }
        if (unts) setUnits(unts);
        if (les) setLessons(les);
      } catch (err) {
        console.error('Error fetching curriculum from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCurriculum();
  }, []);

  const isRtl = dir === 'rtl';

  const currentLevel = levels.find((l) => l.id === selectedLevelId) || levels[0];
  const currentUnits = units.filter((u) => u.level_id === selectedLevelId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" dir={dir}>
      {/* Top Curriculum Banner */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
          <Gift className="w-4 h-4 text-emerald-600" />
          <span>{t('learn.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-arabic mt-1">
          {t('learn.title')}
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
          {t('learn.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-arabic">{t('learn.loading')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Level Switcher Horizontal Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {levels.map((lvl, idx) => {
                const isActive = lvl.id === selectedLevelId;
                const isBook1 = idx === 0;

                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevelId(lvl.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>الكتاب {idx + 1}</span>
                    {isBook1 ? (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        نشط ومتاح
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        قريباً
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Level Header & Content */}
          {currentLevel && (
            <div>
              {/* Level Info Banner */}
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full">
                      سلسلة التحفة الأزهرية
                    </span>
                    <span className="text-xs font-bold text-emerald-200 bg-emerald-700/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('learn.free_badge')}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-arabic">
                    {getLocalized(currentLevel, 'title')}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                    {getLocalized(currentLevel, 'description')}
                  </p>
                </div>

                <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between">
                  <span className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>مفتوح مجاناً 100%</span>
                  </span>
                  <span className="text-xs text-emerald-200/80 mt-2 hidden md:block">
                    {currentUnits.length} وحدات منظمة
                  </span>
                </div>
              </div>

              {/* Units List */}
              {currentUnits.length > 0 ? (
                <div className="space-y-6">
                  {currentUnits.map((unit, uIdx) => {
                    const unitLessons = lessons.filter((l) => l.unit_id === unit.id);
                    const unitTitle = getLocalized(unit, 'title');
                    const unitDesc = getLocalized(unit, 'description');

                    return (
                      <div
                        key={unit.id}
                        className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-all"
                      >
                        {/* Unit Title and Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-2">
                          <div>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider block mb-1">
                              المسار {uIdx + 1}
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl font-arabic">
                              {unitTitle}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{unitDesc}</p>
                          </div>
                          <span className="self-start sm:self-center text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
                            {unitLessons.length} دروس
                          </span>
                        </div>

                        {/* Lessons Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          {unitLessons.map((lesson) => {
                            const lessonTitle = getLocalized(lesson, 'title');

                            return (
                              <Link
                                key={lesson.id}
                                href={`/learn/session?lessonId=${lesson.id}`}
                                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                      <Play className="w-3.5 h-3.5 fill-current" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                                      +{lesson.xp_reward} XP
                                    </span>
                                  </div>

                                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors font-arabic leading-snug mb-2">
                                    {lessonTitle}
                                  </h4>
                                </div>

                                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-emerald-700 group-hover:translate-x-[-2px] transition-transform">
                                  <span>{t('learn.start_lesson')}</span>
                                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state for upcoming levels */
                <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-arabic">
                    {getLocalized(currentLevel, 'title')} — قريباً
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                    يجري حالياً تنسيق وإعداد دروس هذا الكتاب بالكامل ليكون متاحاً لجميع الطلاب قريباً.
                  </p>
                  <button
                    onClick={() => setSelectedLevelId('11111111-1111-1111-1111-111111111111')}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    العودة للكتاب الأول (المتاح حالياً)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
