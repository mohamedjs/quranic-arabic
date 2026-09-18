'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, Clock, Calendar, Video, X, Sparkles, Filter, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Teacher {
  id: string;
  name_ar: string;
  name_en: string;
  name_ru: string;
  title_ar: string;
  title_en: string;
  title_ru: string;
  gender: 'male' | 'female';
  subjects: ('arabic' | 'quran')[];
  rate: number;
  rating: number;
  reviews_count: number;
  experience_years: number;
  languages: string[];
  avatar_color: string;
  bio_ar: string;
  bio_en: string;
  bio_ru: string;
}

const CERTIFIED_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    name_ar: 'الشيخ أحمد الأزهري',
    name_en: 'Sheikh Ahmad Al-Azhari',
    name_ru: 'Шейх Ахмад Аль-Азхари',
    title_ar: 'مجاز بالقراءات العشر • ماجستير أصول الدين (جامعة الأزهر)',
    title_en: 'Certified in 10 Qira\'at • MA in Islamic Studies (Al-Azhar University)',
    title_ru: 'Диплом 10 кираатов • Магистр исламских наук (Университет Аль-Азхар)',
    gender: 'male',
    subjects: ['arabic', 'quran'],
    rate: 18,
    rating: 5.0,
    reviews_count: 284,
    experience_years: 12,
    languages: ['Arabic', 'English'],
    avatar_color: 'from-emerald-600 to-teal-700',
    bio_ar: 'متخصص في تدريس سلسلة العربية بين يديك وتصحيح التلاوة وأحكام التجويد للطلاب غير الناطقين بالعربية بأسلوب تربوي مبسط.',
    bio_en: 'Specializing in Bayna Yadayk curriculum, Quran tajweed recitation, and phonetic articulation for adult beginners.',
    bio_ru: 'Специалист по программе Байна Ядайк, таджвиду Корана и постановке звуков для русскоговорящих и англоговорящих студентов.',
  },
  {
    id: 't-2',
    name_ar: 'الأستاذة فاطمة النجار',
    name_en: 'Ustadha Fatimah Al-Najjar',
    name_ru: 'Устаза Фатима Ан-Наджар',
    title_ar: 'خريجة كلية اللغات والترجمة • إجازة حفص عن عاصم',
    title_en: 'Faculty of Languages & Translation • Ijazah in Hafs \'an \'Asim',
    title_ru: 'Факультет языков и перевода • Иджаза по чтению Хафс от Асыма',
    gender: 'female',
    subjects: ['arabic', 'quran'],
    rate: 16,
    rating: 4.9,
    reviews_count: 196,
    experience_years: 9,
    languages: ['Arabic', 'English', 'Russian'],
    avatar_color: 'from-teal-600 to-cyan-700',
    bio_ar: 'خبرة واسعة في تعليم الأخوات والأطفال من الصفر، والتركيز على الطلاقة الحوارية وفهم معاني الآيات القرآنية.',
    bio_en: 'Extensive experience teaching women and children from zero, focusing on conversational fluency and Quran comprehension.',
    bio_ru: 'Большой опыт обучения сестер и детей с нуля, упор на разговорную практику и понимание аятов Корана.',
  },
  {
    id: 't-3',
    name_ar: 'الشيخ سمير المنشاوي',
    name_en: 'Ustadh Samir Al-Minshawi',
    name_ru: 'Устаз Самир Аль-Миншави',
    title_ar: 'متخصص النحو والبلاغة • الجامعة الإسلامية بالمدينة المنورة',
    title_en: 'Arabic Grammar & Rhetoric Specialist • Islamic University of Madinah',
    title_ru: 'Специалист по грамматике • Исламский Университет Медины',
    gender: 'male',
    subjects: ['arabic'],
    rate: 20,
    rating: 5.0,
    reviews_count: 312,
    experience_years: 14,
    languages: ['Arabic', 'English'],
    avatar_color: 'from-slate-800 to-emerald-900',
    bio_ar: 'خبير تدريس كتب المدينة النبوية والنحو العربي لطلاب المعاهد والجامعات العالمية بأسلوب شيق وواضح.',
    bio_en: 'Veteran teacher of Madinah Arabic books and classical grammar for university students worldwide.',
    bio_ru: 'Опытный преподаватель мединского курса и классической арабской грамматики для студентов по всему миру.',
  },
  {
    id: 't-4',
    name_ar: 'الأستاذة مريم خان',
    name_en: 'Ustadha Maryam Khan',
    name_ru: 'Устаза Марьям Хан',
    title_ar: 'معلمة معتمدة للقرآن والتجويد • متحدثة بالروسية والإنجليزية',
    title_en: 'Certified Quran & Tajweed Tutor • Fluent in Russian & English',
    title_ru: 'Преподаватель Корана и таджвида • Свободно говорит на русском и английском',
    gender: 'female',
    subjects: ['quran'],
    rate: 15,
    rating: 4.9,
    reviews_count: 142,
    experience_years: 7,
    languages: ['Arabic', 'Russian', 'English'],
    avatar_color: 'from-amber-600 to-emerald-800',
    bio_ar: 'متخصصة في مساعدة طلاب دول آسيا الوسطى وروسيا على تصحيح مخارج الحروف العربية وضبط تلاوة القرآن الكريم بدقة.',
    bio_en: 'Dedicated to helping non-Arab students from Central Asia and Russia master Quran recitation and correct phonetics.',
    bio_ru: 'Специализируется на обучении студентов из стран СНГ и России правильному махраджу букв и чтению Корана.',
  },
];

export default function OneToOnePage() {
  const { language, t, dir } = useLanguage();
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [filterSubject, setFilterSubject] = useState<'all' | 'arabic' | 'quran'>('all');

  // Modal State
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-09-20');
  const [bookingSubject, setBookingSubject] = useState('العربية بين يديك');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredTeachers = CERTIFIED_TEACHERS.filter((teacher) => {
    if (filterGender !== 'all' && teacher.gender !== filterGender) return false;
    if (filterSubject !== 'all' && !teacher.subjects.includes(filterSubject)) return false;
    return true;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedTeacher(null);
    }, 2800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" dir={dir}>
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Madinah Arabic • One-to-One Tuition</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-arabic">
          {t('one_to_one.title')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t('one_to_one.subtitle')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>تصفية:</span>
          </span>

          <button
            type="button"
            onClick={() => setFilterGender('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterGender === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('one_to_one.filter_all')}
          </button>
          <button
            type="button"
            onClick={() => setFilterGender('male')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterGender === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('one_to_one.filter_male')}
          </button>
          <button
            type="button"
            onClick={() => setFilterGender('female')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterGender === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('one_to_one.filter_female')}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterSubject === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            كافة التخصصات
          </button>
          <button
            type="button"
            onClick={() => setFilterSubject('arabic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterSubject === 'arabic' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('one_to_one.filter_arabic')}
          </button>
          <button
            type="button"
            onClick={() => setFilterSubject('quran')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterSubject === 'quran' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('one_to_one.filter_quran')}
          </button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => {
          const name =
            language === 'ru' ? teacher.name_ru : language === 'en' ? teacher.name_en : teacher.name_ar;
          const title =
            language === 'ru' ? teacher.title_ru : language === 'en' ? teacher.title_en : teacher.title_ar;
          const bio =
            language === 'ru' ? teacher.bio_ru : language === 'en' ? teacher.bio_en : teacher.bio_ar;

          return (
            <div
              key={teacher.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${teacher.avatar_color} text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0`}>
                    {teacher.name_ar.slice(6, 8)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 font-arabic">{name}</h3>
                      <span className="text-sm font-extrabold text-emerald-600 font-mono">
                        ${teacher.rate}/hr
                      </span>
                    </div>

                    <p className="text-xs text-emerald-800 font-medium mt-0.5">{title}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{teacher.rating}</span>
                        <span className="text-slate-400 font-normal">({teacher.reviews_count})</span>
                      </span>
                      <span>•</span>
                      <span>{teacher.experience_years} سنوات خبرة</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{bio}</p>

                {/* Languages spoken */}
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-500 font-medium">اللغات:</span>
                  <div className="flex flex-wrap gap-1">
                    {teacher.languages.map((lang) => (
                      <span key={lang} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => setSelectedTeacher(teacher)}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>{t('one_to_one.book_trial')}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-5 left-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="text-xl font-bold text-slate-900 font-arabic">تم حجز الجلسة بنجاح!</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {t('one_to_one.modal_success')}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full block w-fit mb-2">
                  درس تجريبي مجاني 100%
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-arabic">
                  {t('one_to_one.modal_title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  مع: <strong>{selectedTeacher.name_ar}</strong> (${selectedTeacher.rate}/hr)
                </p>

                <form onSubmit={handleBook} className="space-y-4 text-right text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t('one_to_one.modal_name')}</label>
                    <input
                      type="text"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                      placeholder="محمد عبد الله"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t('one_to_one.modal_email')}</label>
                    <input
                      type="email"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required
                      dir="ltr"
                      placeholder="student@example.com"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{t('one_to_one.modal_date')}</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{t('one_to_one.modal_subject')}</label>
                      <select
                        value={bookingSubject}
                        onChange={(e) => setBookingSubject(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                      >
                        <option value="العربية بين يديك">العربية بين يديك</option>
                        <option value="تجويد القرآن الكريم">تجويد القرآن الكريم</option>
                        <option value="المحادثة اليومية">المحادثة اليومية</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all mt-4 cursor-pointer"
                  >
                    {t('one_to_one.modal_submit')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
