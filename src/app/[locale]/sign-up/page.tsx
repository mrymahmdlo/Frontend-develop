'use client';
import { useTranslations } from 'next-intl';

// local import
import AuthContainer from '@/components/General/AuthContainer';
import { Icon } from '@/components/General';
import Link from 'next/link';
import ForgetPassword from '@/components/SignUpPage';

export default function SignUpPage() {
  const t = useTranslations();

  return (
    <AuthContainer
      hideNewsLetter
      BackComponent={
        <Link href='/'>
          <Icon name='flashRight' w={18} h={18} view='0 0 24 24' />
          {t('Back to on boarding')}
        </Link>
      }
    >
      <ForgetPassword />
    </AuthContainer>
  );
}
