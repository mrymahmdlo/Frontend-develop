'use client';

import Head from 'next/head';
import { useTranslations } from 'next-intl';

//  imports

// styles
import { AuthContainer } from '@/components/General';
import '@/assets/styleSheets/General/GrayBackground.scss';
import ContactUsPage from '@/components/ContactUsPge/ContactUsPage';

export default function ContactUs() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t('Contact Us')}</title>
      </Head>
      <AuthContainer fillContainer hideMobileHeader>
        <ContactUsPage />
      </AuthContainer>
    </>
  );
}
