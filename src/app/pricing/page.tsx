'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Shield, Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Transparent Freemium Pricing
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
          Start for Free, Upgrade for Fluency
        </h1>
        <p className="text-slate-500 text-base mt-3">
          Level 0 is completely free forever. Unlock full Quranic vocabulary, Spaced Repetition (SRS), and word-by-word recitations with Pro.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-slate-800">Free Tier</h3>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                Lifetime
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm text-slate-500">/ forever</span>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Ideal for absolute beginners learning the alphabet and fundamental phonetics.
            </p>

            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Full access to Level Pre-A1 (28 Arabic letters)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>All short vowels (Fatha, Kasra, Damma)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Audio player with 0.75x slow speed playback</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Daily streak tracking and XP rewards</span>
              </li>
            </ul>
          </div>

          <Link
            href="/learn"
            className="w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm text-center hover:bg-slate-50 transition-colors"
          >
            Start Free Now
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-3xl bg-emerald-950 text-white shadow-xl border-2 border-emerald-500 relative flex flex-col justify-between">
          <div className="absolute -top-3.5 right-8 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-white flex items-center gap-2">
                <span>Pro Scholar</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold">
                Unlimited
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-white">$9</span>
              <span className="text-sm text-emerald-300">/ month or $69/year</span>
            </div>
            <p className="text-sm text-emerald-200/80 mb-6">
              Accelerate to complete Quranic literacy, prayers, and high-frequency vocabulary.
            </p>

            <ul className="space-y-3 text-sm text-emerald-100 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Full Level A1 & A2 Quranic Curriculum</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Surat Al-Fatiha word-by-word reciter & explanations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Spaced Repetition (SRS) Flashcards for 500 Quranic root words</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Canvas Letter Tracing Workbench with stroke grading</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => alert('Redirecting to Stripe / Paddle Checkout...')}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm text-center shadow-lg transition-all cursor-pointer"
          >
            Upgrade to Pro (14-Day Free Trial)
          </button>
        </div>
      </div>
    </div>
  );
}
