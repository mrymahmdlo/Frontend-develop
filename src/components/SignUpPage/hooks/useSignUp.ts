import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// local imports
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import apiHandler from '@/utils/apiHandler';
import { TabsValue } from '../SignUpForm';

type Stages = 'get-email' | 'otp' | 'get-user-info';

type IdentifierType = {
  id: string;
  type: 'email' | 'phoneNumber' | '';
  token?: string;
};

export default function useSignUp() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [stage, setStage] = useState<Stages>('get-email');
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<IdentifierType>({
    id: '',
    type: ''
  });
  const [id, setId] = useState('');

  function enterOtp(user: string, tab: TabsValue) {
    if (showSpinner) return;
    setIdentifier({
      id: user,
      type: tab
    });
    setShowSpinner(true);
    apiHandler('/user/signup', 'POST', {
      mobile: user
    })
      .then((res) => {
        dispatch(
          showSnackbar({
            message: t('A new code has been sent to'),
            severity: 'success'
          })
        );
        setStage('otp');
        setId(res.id);
      })
      .catch((err) => {
        console.log(err);
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
    setStage('get-user-info');
  }

  function changePassword(password: string, repPassword: string) {
    if (showSpinner) return;

    if (!identifier.token) return;

    setShowSpinner(true);

    apiHandler('/user/signup/confirm', 'PUT', {
      verificationCode: identifier.token,
      // eslint-disable-next-line camelcase
      password: password,

      repeatPassword: repPassword,
      // eslint-disable-next-line camelcase
      id: id
    })
      .then(() => {
        router.push('/profile');
      })
      .catch((err) => {
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
