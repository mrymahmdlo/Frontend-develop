import { useState } from 'react';
import { useTranslations } from 'next-intl';

// local imports

export default function useResetPassword(
  goToNextStep: (v: string, p: string) => void
) {
  const t = useTranslations();

  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [safePassword, setSavePassword] = useState(false);
  const [errorRepPassword, setErrorRepPassword] = useState('');

  function resetPassword() {
    if (password === repPassword) {
      goToNextStep(password, repPassword);
    } else {
      setErrorRepPassword(t('New password is not macthed'));
    }
  }

  return {
    password,
    repPassword,
    safePassword,
    setPassword,
    setRepPassword,
    setSavePassword,
    errorRepPassword,
    resetPassword
  };
}
