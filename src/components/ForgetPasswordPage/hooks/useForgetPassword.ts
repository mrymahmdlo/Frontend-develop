import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// local imports
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { TabsValue } from '../ForgetPasswordForm';
import apiHandler, { IntErrors } from '@/utils/apiHandler';

type Stages = 'forget-password' | 'send-otp' | 'reset-password';

type IdentifierType = {
  id: string;
  type: 'email' | 'phoneNumber' | '';
  token?: string;
};

export default function useForgetPassword() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [stage, setStage] = useState<Stages>('forget-password');
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<IdentifierType>({
    id: '',
    type: ''
  });

  function enterOtp(user: string, tab: TabsValue) {
    if (showSpinner) return;
    setIdentifier({
      id: user,
      type: tab
    });
    setShowSpinner(true);
    apiHandler('/api/auth/forget-password/', 'POST', {
      identifier: user
    })
      .then(() => {
        dispatch(
          showSnackbar({
            message:
              t('A new code has been sent to') +
              (tab === 'email' ? ' email' : ' phone number'),
            severity: 'success'
          })
        );
        setStage('send-otp');
      })
      .catch((err) => {
        console.log(err);
        const errors = err as IntErrors;
        if (Array.isArray(errors.errors) && err.errors?.length > 0) {
          dispatch(
            showSnackbar({
              message: err.errors[0].detail,
              severity: 'error'
            })
          );
        } else {
          dispatch(
            showSnackbar({
              message: t('Error 500'),
              severity: 'error'
            })
          );
        }
      })
      .finally(() => setShowSpinner(false));
  }

  function confirmOtp(token: string) {
    setIdentifier({ ...identifier, token });
    setStage('reset-password');
  }

  function changePassword(password: string, repPassword: string) {
    if (showSpinner) return;

    if (!identifier.token) return;

    setShowSpinner(true);

    apiHandler('/api/auth/forget-password/change-password/', 'POST', {
      token: identifier.token,
      // eslint-disable-next-line camelcase
      new_password: password,
      // eslint-disable-next-line camelcase
      confirm_password: repPassword
    })
      .then(() => {
        router.push('/log-in');
      })
      .catch((err) => {
        console.log(err);

        const errors = err as IntErrors;
        if (Array.isArray(errors.errors) && err.errors?.length > 0) {
          dispatch(
            showSnackbar({
              message: err.errors[0].detail,
              severity: 'error'
            })
          );
        } else {
          dispatch(
            showSnackbar({
              message: t('Error 500'),
              severity: 'error'
            })
          );
        }
      })
      .finally(() => setShowSpinner(false));
  }

  return {
    identifier,
    showSpinner,
    stage,
    enterOtp,
    confirmOtp,
    changePassword
  };
}