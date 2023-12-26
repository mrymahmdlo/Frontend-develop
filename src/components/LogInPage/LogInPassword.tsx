'use client';

import {
  CustomTextField,
  DotSpinner,
  PasswordField,
  SubmitButton
} from '@/components/General';
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler, setAppToken, setCurrentAccountCookie } from '@/utils';
import { logInValidations as validations } from '@/utils/validations/logInValidations';
import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type InputType = {
  mobile: string;
  password: string;
};

export default function LogInPassword() {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<InputType>();

  const onSubmit = async () => {
    setShowSpinner(true);
    apiHandler('/user/login?loginTypeEnum=PASSWORD', 'POST', {
      mobile: getValues('mobile'),
      password: getValues('password')
    })
      .then((res) => {
        setAppToken({ access: res.accessToken, refresh: res.refreshToken });
        setCurrentAccountCookie(res.profile);
        dispatch(
          showSnackbar({
            message: 'ورود با موفقیت انجام شد',
            severity: 'success'
          })
        );
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
      .finally(() => {
        setShowSpinner(false);
      });
  };

  return (
    <Stack component='form' spacing='1.5rem' onSubmit={handleSubmit(onSubmit)}>
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
        {t('Forget Password?')}
      </Link>
      {/* Submit btn */}
      <SubmitButton disabled={showSpinner}>
        {showSpinner ? <DotSpinner /> : t('Log in')}
      </SubmitButton>
    </Stack>
  );
}
