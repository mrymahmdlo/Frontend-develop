/* eslint-disable camelcase */
'use client';

import {
  CustomTextField,
  DotSpinner,
  PasswordField,
  SubmitButton,
  TabPanel
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
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LogInCode from './LogInCode';

type InputType = {
  mobile: string;
  password: string;
};

export type TabsValue = 'code' | 'password';

export default function LogInInputs() {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);

  const [tab, setTab] = useState<TabsValue>('password');

  const handleChange = (event: SyntheticEvent, newValue: TabsValue) => {
    setTab(newValue);
  };
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
    apiHandler('/user/login?loginTypeEnum=PASSWORD', 'POST', {
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
            [res.profile.email]: {
              access: res.accessToken,
              refresh: res.refreshToken
            }
          });
        } else {
          newToken = [
            {
              [res.profile.email]: {
                access: res.accessToken,
                refresh: res.refreshToken
              }
            }
          ];
        }

        // Set new token
        setAppToken(newToken);
        // Set current account email
        setCurrentAccountCookie(res.profile.email);

        dispatch(
          showSnackbar({
            message: 'ورود با موفقیت انجام شد',
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

      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Password')}
            value={'password'}
          />
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Code')}
            value={'code'}
          />
        </Tabs>
        <TabPanel
          index={'password'}
          value={tab}
          style={{ width: '100%', margin: '15px 0' }}
        >
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
              {t('Forget Password?')}
            </Link>
            {/* Submit btn */}
            <SubmitButton
              disabled={showSpinner || !watch('mobile') || !watch('password')}
            >
              {showSpinner ? <DotSpinner /> : t('Log in')}
            </SubmitButton>
          </Stack>
        </TabPanel>
        <TabPanel
          index={'code'}
          value={tab}
          style={{ width: '100%', margin: '15px 0' }}
        >
          <LogInCode />
        </TabPanel>
      </Box>
    </Stack>
  );
}
