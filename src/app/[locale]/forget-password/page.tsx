'use client';
import { useTranslations } from 'next-intl';

// local import
import ForgetPassword from '@/components/ForgetPasswordPage';
import AuthContainer from '@/components/General/AuthContainer';
import { Icon } from '@/components/General';
import Link from 'next/link';

export default function ForgetPasswordPage() {
  const t = useTranslations();

  return (
    <AuthContainer
      hideNewsLetter
      BackComponent={
        <Link href='log-in'>
          <Icon name='flashRight' w={18} h={18} view='0 0 24 24' />
          {t('Back to log in')}
        </Link>
      }
    >
      <ForgetPassword />
    </AuthContainer>
  );
}
