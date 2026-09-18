import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'التحفة الأزهرية | منصة تعليم اللغة العربية للناطقين بغيرها | Al-Tuhfa Al-Azhariyya',
  description: 'المنهج الأزهري المعتمد لتعليم اللغة العربية لغير الناطقين بها من الصفر حتى الإتقان (العربية - English - Русский) — متاح مجاناً 100% للجميع.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <LanguageProvider>
          <AppShell>
            {children}
          </AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
