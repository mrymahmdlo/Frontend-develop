'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// local imports
import { AuthContainer, Icon } from '@/components/General';
import LogInInputs from '@/components/LogInPage';

export default function SignUp() {
  const t = useTranslations();

  return (
    <AuthContainer
      BackComponent={
        <Link href='/'>
          <Icon name='flashRight' w={18} h={18} view='0 0 24 24' />
          {t('Back to on boarding')}
        </Link>
      }
      hideNewsLetter
      hideHeader
    >
      <LogInInputs />
    </AuthContainer>
  );
}
