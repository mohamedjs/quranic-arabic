'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveAudioExercisePlayer } from '@/components/audio/InteractiveAudioExercisePlayer';
import { Exercise } from '@/types/database.types';
import { BookOpen, Sparkles, CheckCircle, Volume2, ShieldCheck, ArrowRight, Layers, Flame } from 'lucide-react';

const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    lesson_id: 'l-1',
    question_text: 'Listen carefully. Which letter produces this sound?',
    arabic_text: 'ب',
    transliteration: 'Baa',
    translation: 'Letter Baa',
    question_type: 'audio_mcq',
    audio_url: 'https://everyayah.com/data/translations/arabic_alphabet/002.mp3',
    options_json: [
      { id: 'opt1', text: 'ب', transliteration: 'Baa (one dot below)' },
      { id: 'opt2', text: 'ت', transliteration: 'Taa (two dots above)' },
      { id: 'opt3', text: 'ث', transliteration: 'Thaa (three dots above)' },
      { id: 'opt4', text: 'ن', transliteration: 'Noon (one dot inside cup)' },
    ],
    correct_answer: 'opt1',
    explanation: 'ب (Baa) has a single dot directly underneath the base horizontal stroke.',
    order_index: 1,
  },
  {
    id: 'ex-2',
    lesson_id: 'l-1',
    question_text: 'Listen and identify the soft "Th" sound as in English "think":',
    arabic_text: 'ث',
    transliteration: 'Thaa',
    translation: 'Letter Thaa',
    question_type: 'audio_mcq',
    audio_url: 'https://everyayah.com/data/translations/arabic_alphabet/004.mp3',
    options_json: [
      { id: 'opt1', text: 'ت', transliteration: 'Taa' },
      { id: 'opt2', text: 'ث', transliteration: 'Thaa' },
      { id: 'opt3', text: 'ب', transliteration: 'Baa' },
      { id: 'opt4', text: 'س', transliteration: 'Seen' },
    ],
    correct_answer: 'opt2',
    explanation: 'ث (Thaa) is articulated with the tongue tip lightly touching the upper incisors.',
    order_index: 2,
  },
  {
    id: 'ex-3',
    lesson_id: 'l-1',
    question_text: 'Listen to the throat consonant (Deep Pharyngeal "H"):',
    arabic_text: 'ح',
    transliteration: 'Haa (throat)',
    translation: 'Letter Haa',
    question_type: 'audio_mcq',
    audio_url: 'https://everyayah.com/data/translations/arabic_alphabet/006.mp3',
    options_json: [
      { id: 'opt1', text: 'هـ', transliteration: 'Haa (chest soft)' },
      { id: 'opt2', text: 'خ', transliteration: 'Khaa (raspy throat)' },
      { id: 'opt3', text: 'ح', transliteration: 'Haa (middle throat)' },
      { id: 'opt4', text: 'ع', transliteration: 'Ayn (deep constriction)' },
    ],
    correct_answer: 'opt3',
    explanation: 'ح (Haa) is produced from the middle of the throat with a clear, sharp breath without rasp.',
    order_index: 3,
  },
];

export default function HomePage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const currentExercise = SAMPLE_EXERCISES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_EXERCISES.length);
  };

  const handleComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Classical & Quranic Arabic Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          From Zero to Reading the Sacred Quran in{' '}
          <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
            Weeks, Not Years
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Engineered for absolute beginners. Master letter phonetics, vowels (harakat), and sacred Quranic vocabulary with instant audio feedback and dual-speed repetition.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/learn"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-200 hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>Start Free Level 0</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-base shadow-sm transition-all"
          >
            View Full Curriculum & Pricing
          </Link>
        </div>
      </section>

      {/* Live Interactive Player Demo Showcase */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50 py-12 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Interactive Exercise Demo
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Try the Sound Player Engine Now
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Exercise {currentIdx + 1} of {SAMPLE_EXERCISES.length}
            </div>
          </div>

          {/* Embedded Reusable Player Component */}
          <InteractiveAudioExercisePlayer
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleComplete}
            onNext={handleNext}
            autoPlayAudio={false}
          />
        </div>
      </section>

      {/* Curriculum Pathway Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Structured Pedagogical Pathway
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Built for Real Quranic Comprehension
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Progress step-by-step from isolated strokes to full Ayahs of Surat Al-Fatiha and daily Adhkar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Level Pre-A1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              100% Free
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              0
            </div>
            <h3 className="text-xl font-bold text-slate-900">Level Pre-A1: Foundations</h3>
            <p className="text-slate-500 text-sm mt-2">
              The phonetic and orthographic foundation of classical Arabic.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>28 Arabic letters with isolated, initial, medial, and final forms</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Short vowels (Fatha, Kasra, Damma) & Long vowels (Mad)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Sukoon (zero-vowel) and Shaddah (consonant doubling)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Tanween (nunation) and Hamzat Al-Wasl basics</span>
              </li>
            </ul>

            <Link
              href="/learn"
              className="mt-8 block text-center py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-sm transition-colors"
            >
              Enter Level 0
            </Link>
          </div>

          {/* Level A1 */}
          <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-md relative overflow-hidden">
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
              Pro Access
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-emerald-200">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">Level A1: Quranic Literacy</h3>
            <p className="text-slate-500 text-sm mt-2">
              Recognizing high-frequency vocabulary and understanding recited verses.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Surat Al-Fatiha word-by-word morphological breakdown</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Top 500 Quranic words representing 80% of Quranic text</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Spaced Repetition (SRS) flashcard system for permanent retention</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Common prayers (Tashahhud, Ruku, Sujood remembrances)</span>
              </li>
            </ul>

            <Link
              href="/pricing"
              className="mt-8 block text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-200 transition-colors"
            >
              Unlock Full Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
