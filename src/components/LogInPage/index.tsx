/* eslint-disable camelcase */
'use client';

import {
  CustomTextField,
  DotSpinner,
  PasswordField,
  SubmitButton
} from '@/components/General';
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getAppToken,
  setAppToken,
  setCurrentAccountCookie
} from '@/utils';
import { ListOfTokens } from '@/utils/tokenHandler';
import { logInValidations as validations } from '@/utils/validations/logInValidations';
import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type InputType = {
  mobile: string;
  password: string;
};

export default function LogInInputs() {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);

  // Use react hook form to handle form
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch
  } = useForm<InputType>();

  // Handle on success captcha
  const onSubmit = async () => {
    setShowSpinner(true);
    apiHandler('/user/login', 'POST', {
      mobile: getValues('mobile'),
      password: getValues('password')
    })
      .then((res) => {
        // Get latest tokens if exists
        const tokens = getAppToken();
        let newToken: ListOfTokens;

        if (tokens) {
          newToken = JSON.parse(tokens);
          newToken?.push({
            [res.data.email]: {
              access: res.data.access,
              refresh: res.data.refresh
            }
          });
        } else {
          newToken = [
            {
              [res.data.email]: {
                access: res.data.access,
                refresh: res.data.refresh
              }
            }
          ];
        }

        // Set new token
        setAppToken(newToken);
        // Set current account email
        setCurrentAccountCookie(res.data.email);

        dispatch(
          showSnackbar({
            message: res.Success,
            severity: 'success'
          })
        );
        router.push('/');
      })
      .catch((err) => {
        if (err.errors?.length > 0) {
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
  };

  return (
    <Stack px='12px'>
      <div>
        {/* Modal title */}
        <Typography className='modal-title' variant='h5'>
          {t('Login to DGB')}
        </Typography>

        {/* Login link */}
        <Typography className='login-link-container'>
          <span>{t('Or')} </span>
          <Link href='sign-up'> {t('Sign up')}</Link>
        </Typography>
      </div>
      <br />
      <Stack
        component='form'
        spacing='1.5rem'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Mobile Or Email field */}
        <Controller
          control={control}
          name='mobile'
          rules={validations.mobileOrEmail}
          render={({ field: { onChange, value } }) => (
            <CustomTextField
              inputWidth='26.25rem'
              label={t('Phone number')}
              value={value}
              onChange={(e) => {
                const newValue = e.target.value;
                // Store new value
                onChange(newValue);
              }}
              autoComplete='true'
              errorMessage={errors.mobile?.message}
            />
          )}
        />
        {/* Password field */}
        <Controller
          control={control}
          name='password'
          rules={validations.password}
          render={({ field: { onChange } }) => (
            <PasswordField
              errorMessage={errors.password?.message}
              onChange={(v) => onChange(v)}
            />
          )}
        />

        <Link
          style={{ marginTop: '0.5rem', fontSize: '14px' }}
          href='forget-password'
        >
          Forget Password?
        </Link>
        {/* Submit btn */}
        <SubmitButton
          disabled={showSpinner || !watch('mobile') || !watch('password')}
        >
          {showSpinner ? <DotSpinner /> : t('Log in')}
        </SubmitButton>
      </Stack>

      {/* <Stack
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        gap='0.75rem'
      >
        <Icon
          name='gradiantDivider'
          w={92}
          h={2}
          view='0 0 92 2'
          style={{ transform: 'rotate(180deg)' }}
        />

        <Typography className='separatory-text'>{t('OR')}</Typography>

        <Icon name='gradiantDivider' w={92} h={2} view='0 0 92 2' />
      </Stack>
      <br /> */}
      {/* Authentication provider buttons */}
      {/* <AuthProviderBtns type='log-in' /> */}
    </Stack>
  );
}
