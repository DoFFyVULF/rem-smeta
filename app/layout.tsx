import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'РемСмета — онлайн-калькулятор стоимости ремонта квартиры',
    template: '%s · РемСмета',
  },
  description:
    'Рассчитайте предварительную стоимость и сроки ремонта квартиры онлайн за 5 шагов. Без звонков менеджеру — результат сразу на экране.',
  applicationName: 'РемСмета',
  keywords: [
    'калькулятор ремонта',
    'расчёт стоимости ремонта квартиры',
    'смета на ремонт',
    'ремонт квартиры под ключ',
  ],
  authors: [{ name: 'РемСмета' }],
  openGraph: {
    title: 'РемСмета — онлайн-калькулятор стоимости ремонта квартиры',
    description:
      'Узнайте примерную стоимость и сроки ремонта квартиры за 1 минуту. Понятная предварительная смета без звонков.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'РемСмета',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'РемСмета — калькулятор стоимости ремонта',
    description: 'Предварительная смета ремонта квартиры онлайн за 5 шагов.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-surface text-graphite antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
