import '@/assets/styleSheets/main.modules.scss';
import ThemeRegistry from '@/lib/ThemeRegistery';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

interface IntProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const locales = ['fa'];

export const metadata: Metadata = {
  title: 'DGB',
  description: 'This is DGB app'
};

export default async function RootLayout({
  children,
  params: { locale }
}: IntProps) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  let messages;
  try {
    messages = (await import(`@/lib/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true} style={{ direction: 'rtl' }}>
        <ThemeRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
