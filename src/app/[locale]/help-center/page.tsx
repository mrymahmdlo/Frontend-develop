'use client';

import Head from 'next/head';
import { useTranslations } from 'next-intl';

// local imports
import Questions from '@/components/HelpCenterPage/Questions';

// styles
import { AuthContainer } from '@/components/General';
import '@/assets/styleSheets/General/GrayBackground.scss';

export default function HelpCenter() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t('Help center')}</title>
      </Head>
      <AuthContainer fillContainer hideMobileHeader>
        <Questions />
      </AuthContainer>
    </>
  );
}
