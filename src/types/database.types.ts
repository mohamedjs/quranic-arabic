export type UserRole = 'student' | 'instructor' | 'admin';
export type SubscriptionTier = 'free' | 'active_subscriber' | 'expired';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing';
export type LessonType = 'alphabet' | 'letter_forms' | 'harakat' | 'sukoon_shaddah' | 'tanween' | 'vocab' | 'prayer' | 'quiz';
export type QuestionType = 'audio_mcq' | 'syllable_sort' | 'letter_trace' | 'srs_flashcard';

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  streak: number;
  total_xp: number;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface Level {
  id: string;
  slug: string;
  title: string;
  title_ar?: string | null;
  title_en?: string | null;
  title_ru?: string | null;
  description: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  order_index: number;
  is_free: boolean;
  icon: string | null;
}

export interface Unit {
  id: string;
  level_id: string;
  title: string;
  title_ar?: string | null;
  title_en?: string | null;
  title_ru?: string | null;
  description: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  order_index: number;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  title_ar?: string | null;
  title_en?: string | null;
  title_ru?: string | null;
  description: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  lesson_type: LessonType;
  order_index: number;
  xp_reward: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
  text_ar?: string;
  text_en?: string;
  text_ru?: string;
  transliteration?: string;
  is_correct?: boolean;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  question_text: string;
  question_ar?: string | null;
  question_en?: string | null;
  question_ru?: string | null;
  arabic_text: string | null;
  transliteration: string | null;
  translation: string | null;
  translation_en?: string | null;
  translation_ru?: string | null;
  question_type: QuestionType;
  audio_url: string | null;
  options_json: ExerciseOption[];
  correct_answer: string;
  explanation: string | null;
  explanation_ar?: string | null;
  explanation_en?: string | null;
  explanation_ru?: string | null;
  order_index: number;
}
