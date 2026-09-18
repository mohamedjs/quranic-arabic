'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Level, Unit, Lesson } from '@/types/database.types';
import { BookOpen, CheckCircle, Lock, Play, Sparkles, Star, Gift, ArrowLeft } from 'lucide-react';

export default function LearnPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurriculum() {
      try {
        const { data: lvls } = await supabase.from('levels').select('*').order('order_index');
        const { data: unts } = await supabase.from('units').select('*').order('order_index');
        const { data: les } = await supabase.from('lessons').select('*').order('order_index');

        if (lvls) setLevels(lvls);
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" dir="rtl">
      {/* Marketing & Curriculum Banner */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
          <Gift className="w-4 h-4 text-emerald-600" />
          <span>منهج سلسلة (العربية بين يديك) • دروس تجريبية مجانية للبدء الفوري</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-arabic mt-1">
          خطة دراسة كتاب (العربية بين يديك)
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
          اختر أي درس من الدروس المجانية أدناه وابدأ التعلم الصوتي والتفاعلي مباشرة بدون الحاجة للتسجيل أو بطاقة ائتمان!
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-arabic">جاري تحميل وحدات ودروس العربية بين يديك...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {levels.map((level) => {
            const levelUnits = units.filter((u) => u.level_id === level.id);

            return (
              <div
                key={level.id}
                className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
                  level.is_free ? 'bg-white border-emerald-200 ring-2 ring-emerald-500/20' : 'bg-white border-slate-200'
                }`}
              >
                {/* Level Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {level.slug}
                      </span>
                      {level.is_free && (
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>دروس تجريبية مفتوحة للجميع</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 font-arabic">{level.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                  </div>

                  <div>
                    {level.is_free ? (
                      <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>متاح مجاناً 100%</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>باقة Pro</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-6">
                  {levelUnits.map((unit) => {
                    const unitLessons = lessons.filter((l) => l.unit_id === unit.id);

                    return (
                      <div key={unit.id} className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg font-arabic">{unit.title}</h3>
                          {level.is_free && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                              تجربة مجانية
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-5 leading-relaxed">{unit.description}</p>

                        {/* Lessons Grid */}
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          {unitLessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href={`/learn/session?lessonId=${lesson.id}`}
                              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                                  <Play className="w-4 h-4 fill-current" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors font-arabic">
                                    {lesson.title}
                                  </h4>
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    +{lesson.xp_reward} XP • استماع وحوار تفاعلي
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold group-hover:translate-x-[-3px] transition-transform">
                                <span className="hidden sm:inline">ابدأ</span>
                                <ArrowLeft className="w-4 h-4" />
                              </div>
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
      )}
    </div>
  );
}
