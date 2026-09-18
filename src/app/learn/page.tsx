'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Level, Unit, Lesson } from '@/types/database.types';
import { BookOpen, CheckCircle, Lock, Play, Sparkles, Star } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Curriculum Map
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          Your Arabic Journey
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Step-by-step pathway from isolated alphabet sounds to sacred Quranic verses.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm">Loading curriculum from Supabase...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {levels.map((level) => {
            const levelUnits = units.filter((u) => u.level_id === level.id);

            return (
              <div
                key={level.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      {level.slug.toUpperCase()}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">{level.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                  </div>
                  <div>
                    {level.is_free ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        Free Access
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pro Only</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-6">
                  {levelUnits.map((unit) => {
                    const unitLessons = lessons.filter((l) => l.unit_id === unit.id);

                    return (
                      <div key={unit.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                        <h3 className="font-bold text-slate-800 text-base mb-1">{unit.title}</h3>
                        <p className="text-xs text-slate-500 mb-4">{unit.description}</p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {unitLessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href="/"
                              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                                    {lesson.title}
                                  </h4>
                                  <span className="text-[11px] text-slate-400">
                                    +{lesson.xp_reward} XP
                                  </span>
                                </div>
                              </div>
                              <Star className="w-4 h-4 text-amber-400" />
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
