'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, RotateCcw, CheckCircle2, XCircle, ArrowRight, Gauge, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Exercise, ExerciseOption } from '@/types/database.types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface InteractiveAudioExercisePlayerProps {
  exercise: Exercise;
  onComplete?: (isCorrect: boolean, score: number) => void;
  onNext?: () => void;
  autoPlayAudio?: boolean;
}

export const InteractiveAudioExercisePlayer: React.FC<InteractiveAudioExercisePlayerProps> = ({
  exercise,
  onComplete,
  onNext,
  autoPlayAudio = false,
}) => {
  const { language, t, getLocalized, dir } = useLanguage();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [speed, setSpeed] = useState<number>(1.0);

  // Fallback text is either the question's target letter or correct option's arabic text
  const correctOption = exercise.options_json?.find((o) => o.id === exercise.correct_answer);
  const fallbackArabicText = exercise.arabic_text || correctOption?.text || '';

  const { isPlaying, play, togglePlay, changeSpeed, error: audioError } = useAudioPlayer(
    exercise.audio_url,
    {
      initialSpeed: speed,
      autoPlay: autoPlayAudio,
      arabicFallbackText: fallbackArabicText,
    }
  );

  const { playSuccess, playError, playClick } = useSoundEffects();

  // Speed switch handler
  const handleToggleSpeed = () => {
    playClick();
    const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
    setSpeed(nextSpeed);
    changeSpeed(nextSpeed);
  };

  // Option select handler
  const handleSelectOption = (option: ExerciseOption) => {
    if (status !== 'unanswered') return;
    playClick();
    setSelectedOptionId(option.id);

    // Also pronounce the selected letter so user hears their choice
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && option.text) {
      try {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(option.text);
        utt.lang = 'ar-SA';
        utt.rate = speed;
        window.speechSynthesis.speak(utt);
      } catch (e) {
        // ignore
      }
    }
  };

  // Verification
  const handleCheckAnswer = useCallback(() => {
    if (!selectedOptionId || status !== 'unanswered') return;

    const isCorrect = selectedOptionId === exercise.correct_answer;

    if (isCorrect) {
      setStatus('correct');
      playSuccess();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#60a5fa'],
        });
      } catch (e) {
        // ignore
      }
      onComplete?.(true, 100);
    } else {
      setStatus('incorrect');
      playError();
      onComplete?.(false, 0);
    }
  }, [selectedOptionId, status, exercise.correct_answer, playSuccess, playError, onComplete]);

  // Keyboard Shortcuts (1-4 for options, Space/R for audio, Enter to check/advance)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        play();
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleToggleSpeed();
      } else if (['1', '2', '3', '4'].includes(e.key) && status === 'unanswered') {
        const index = parseInt(e.key, 10) - 1;
        if (exercise.options_json && exercise.options_json[index]) {
          handleSelectOption(exercise.options_json[index]);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (status === 'unanswered' && selectedOptionId) {
          handleCheckAnswer();
        } else if (status !== 'unanswered' && onNext) {
          onNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selectedOptionId, exercise.options_json, play, handleCheckAnswer, onNext]);

  // Multilingual content retrieval
  const localizedQuestion = getLocalized(exercise, 'question') || exercise.question_text;
  const localizedExplanation = getLocalized(exercise, 'explanation') || exercise.explanation;
  const localizedTranslation = getLocalized(exercise, 'translation') || exercise.translation;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-300" dir={dir}>
      {/* Top Header: Question Prompt */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-slate-50/80 to-white border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('session.badge')}</span>
          </span>

          {/* Audio Speed Switcher (0.75x / 1.0x) */}
          <button
            type="button"
            onClick={handleToggleSpeed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs text-slate-700 cursor-pointer"
            title="Toggle Recitation Speed (Key: S)"
          >
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('session.speed')}</span>
            <span className={`font-bold ${speed === 0.75 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {speed === 0.75 ? t('session.speed_slow') : t('session.speed_normal')}
            </span>
          </button>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
          {localizedQuestion}
        </h2>

        {(exercise.transliteration || localizedTranslation) && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {exercise.transliteration && (
              <span className="bg-slate-100 px-2.5 py-1 rounded-md font-mono text-slate-600">
                🔊 {exercise.transliteration}
              </span>
            )}
            {localizedTranslation && (
              <span className="text-slate-600 italic">
                {t('session.hint')} &ldquo;{localizedTranslation}&rdquo;
              </span>
            )}
          </div>
        )}
      </div>

      {/* Central Audio Playback Stage */}
      <div className="py-10 px-6 flex flex-col items-center justify-center bg-radial from-emerald-50/50 to-transparent">
        <div className="relative group">
          {isPlaying && (
            <div className="absolute -inset-4 rounded-full bg-emerald-400/30 animate-ping" />
          )}

          <button
            type="button"
            onClick={play}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-transform transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer ${
              isPlaying
                ? 'bg-emerald-600 text-white shadow-emerald-200 ring-4 ring-emerald-400'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100 hover:scale-105'
            }`}
            aria-label="Play Recitation Audio"
          >
            {isPlaying ? (
              <RotateCcw className="w-10 h-10 animate-spin" style={{ animationDuration: '2s' }} />
            ) : (
              <Volume2 className="w-10 h-10" />
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4 flex items-center gap-1.5 font-medium">
          <span>{t('session.play_audio')}</span>
        </p>

        {isPlaying && (
          <span className="mt-2 text-xs font-semibold text-emerald-600 animate-pulse">
            {t('session.playing')}
          </span>
        )}
      </div>

      {/* Options Grid */}
      <div className="p-6 md:p-8 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exercise.options_json.map((option: ExerciseOption, idx: number) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === exercise.correct_answer;

            // Option translation for English or Russian learners
            const optionTranslation =
              language === 'ru'
                ? option.text_ru
                : language === 'en'
                ? option.text_en
                : '';

            let cardStyles = 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800';

            if (status === 'unanswered' && isSelected) {
              cardStyles = 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500 text-emerald-900 shadow-md';
            } else if (status === 'correct' && isCorrectOption) {
              cardStyles = 'border-emerald-600 bg-emerald-100 ring-2 ring-emerald-600 text-emerald-950 font-bold';
            } else if (status === 'incorrect') {
              if (isSelected) {
                cardStyles = 'border-rose-500 bg-rose-50 ring-2 ring-rose-500 text-rose-900 animate-shake';
              } else if (isCorrectOption) {
                cardStyles = 'border-emerald-500 bg-emerald-50/50 text-emerald-800 border-dashed';
              } else {
                cardStyles = 'border-slate-200 opacity-40';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option)}
                disabled={status !== 'unanswered'}
                className={`relative group p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer select-none ${cardStyles}`}
              >
                {/* Keyboard badge */}
                <span className="absolute top-3 left-3 w-5 h-5 rounded-md bg-slate-100 text-slate-500 text-xs font-mono font-semibold flex items-center justify-center border border-slate-200">
                  {idx + 1}
                </span>

                {/* Arabic Script */}
                <span
                  dir="rtl"
                  className="text-2xl sm:text-3xl font-arabic text-slate-900 mb-1 py-1 leading-relaxed"
                >
                  {option.text}
                </span>

                {/* Transliteration */}
                {option.transliteration && (
                  <span className="text-xs font-medium tracking-wide text-slate-500 group-hover:text-emerald-700 transition-colors">
                    {option.transliteration}
                  </span>
                )}

                {/* Meaning / Translation in active language */}
                {optionTranslation && (
                  <span className="text-[11px] text-emerald-700 font-medium mt-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {optionTranslation}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action / Feedback Drawer */}
      <div
        className={`p-6 border-t transition-all duration-300 ${
          status === 'correct'
            ? 'bg-emerald-50 border-emerald-200'
            : status === 'incorrect'
            ? 'bg-rose-50 border-rose-200'
            : 'bg-slate-50 border-slate-100'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Message */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {status === 'correct' && (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-base">{t('session.correct_title')}</h4>
                  <p className="text-xs md:text-sm text-emerald-800 mt-0.5">
                    {localizedExplanation || 'أحسنت! إجابة صحيحة ومطابقة للصوت بدقة.'}
                  </p>
                </div>
              </div>
            )}

            {status === 'incorrect' && (
              <div className="flex items-start gap-3">
                <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-900 text-base">{t('session.incorrect_title')}</h4>
                  <p className="text-xs md:text-sm text-rose-800 mt-0.5">
                    {localizedExplanation || 'استمع جيداً لمخرج الصوت واختر الإجابة الصحيحة.'}
                  </p>
                </div>
              </div>
            )}

            {status === 'unanswered' && (
              <p className="text-xs text-slate-500 italic hidden md:block">
                {t('session.play_audio')}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full md:w-auto flex justify-end">
            {status === 'unanswered' ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className={`w-full md:w-44 py-3 px-6 rounded-xl font-bold text-sm tracking-wide shadow-xs transition-all ${
                  selectedOptionId
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:shadow-emerald-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {t('session.check_answer')}
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className={`w-full md:w-44 py-3 px-6 rounded-xl font-bold text-sm tracking-wide text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  status === 'correct'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                }`}
              >
                <span>{t('session.next')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAudioExercisePlayer;
