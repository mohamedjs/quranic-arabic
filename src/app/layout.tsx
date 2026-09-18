import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Flame, Trophy, LayoutDashboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'بيان | منصة تعليم اللغة العربية والقرآن للمبتدئين',
  description: 'منصة تفاعلية لتعليم اللغة العربية الفصحى والقرآنية لغير الناطقين بها من الصفر حتى الإتقان مع تمارين صوتية ولوحة تحكم لإدارة المنهج.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans">
        {/* Global Navigation */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5 font-arabic">
                  بيان <span className="text-emerald-600 font-semibold text-sm font-sans">Bayan Arabic</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  تعليم لغة القرآن
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              {/* Daily Streak & XP pills */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold shadow-xs">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>3 أيام تتابع</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                  <span>140 XP</span>
                </div>
              </div>

              <nav className="flex items-center gap-2">
                <Link
                  href="/learn"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  المنهج (Curriculum)
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>لوحة التحكم (Admin)</span>
                </Link>

                <Link
                  href="/pricing"
                  className="hidden md:inline-flex px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
                >
                  الباقات (Pro)
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 بيان لتعليم العربية والقرآن الكريم. جميع الحقوق محفوظة.</p>
            <p className="text-slate-400 font-mono">Supabase Auth & PostgreSQL • Next.js App Router • Netlify CDN</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
