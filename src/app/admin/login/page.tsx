'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fillDemoCredentials = () => {
    setEmail('admin@bayan.com');
    setPassword('Admin@123456');
    setErrorMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(error.message === 'Invalid login credentials' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Verify role in profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile && profile.role !== 'admin') {
          setErrorMsg('هذا الحساب مسجل كطالب وليس لديه صلاحية الدخول للوحة التحكم.');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        // Store session flag for rapid reload
        if (typeof window !== 'undefined') {
          localStorage.setItem('bayan_admin_auth', 'true');
        }

        router.push('/admin');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5 font-arabic">
                بيان <span className="text-emerald-400 font-semibold text-sm font-sans">AdminLTE</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                بوابة إدارة منصة القرآن الكريم
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white font-arabic mt-2">تسجيل دخول المسؤولين</h1>
          <p className="text-sm text-slate-400 mt-1">يرجى إدخال بيانات حساب المدير للوصول للوحة التحكم</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50">
          {errorMsg && (
            <div className="p-4 rounded-2xl mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                البريد الإلكتروني للوحة الإدارة
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                  placeholder="admin@bayan.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  كلمة المرور
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                  placeholder="••••••••••••"
                  className="w-full pl-20 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Lock className="w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>تسجيل الدخول للوحة التحكم</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-3">بيانات الدخول المعتمدة للاختبار الفوري:</p>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 flex flex-col gap-1.5 select-all">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Email:</span>
                <span className="text-emerald-400 font-bold">admin@bayan.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Password:</span>
                <span className="text-emerald-400 font-bold">Admin@123456</span>
              </div>
            </div>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>اضغط هنا لتعبئة بيانات المدير تلقائياً</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
            ← العودة للموقع الرئيسي (Bayan Learning)
          </Link>
        </div>
      </div>
    </div>
  );
}
