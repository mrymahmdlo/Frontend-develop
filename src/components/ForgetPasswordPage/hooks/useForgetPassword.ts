import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// local imports
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import apiHandler from '@/utils/apiHandler';
import { TabsValue } from '../ForgetPasswordForm';

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
    apiHandler('/user/forgetPassword', 'POST', {
      mobile: user
    })
      .then(() => {
        dispatch(
          showSnackbar({
            message: t('A new code has been sent to'),
            severity: 'success'
          })
        );
        setStage('send-otp');
      })
      .catch((err:any) => {
        if (err.message) {
          dispatch(
            showSnackbar({
              message: t(err.message),
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

  function changePassword(password: string) {
    if (showSpinner) return;

    if (!identifier.token) return;

    setShowSpinner(true);

    apiHandler('/user/resetPassword', 'PUT', {
      verificationCode: identifier.token,
      // eslint-disable-next-line camelcase
      newPassword: password,
      // eslint-disable-next-line camelcase
      mobile: identifier.id
    })
      .then(() => {
        router.push('/log-in');
      })
      .catch((err:any) => {
        if (err.message) {
          dispatch(
            showSnackbar({
              message: t(err.message),
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
