'use client';

import { useTranslations } from 'next-intl';

// mui imports
import { Box, Button, Grid, Stack, Typography, alpha } from '@mui/material';

// local imports
import { CountDownClock, DotSpinner, OtpInput } from '@/components/General';

import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import {
  ListOfTokens,
  apiHandler,
  getAppToken,
  setAppToken,
  setCurrentAccountCookie
} from '@/utils';

import { useRouter } from 'next/navigation';

// style
import classes from '@/assets/styleSheets/forget-password.module.scss';
import useLoginConfirmation from '@/hooks/useLoginConfirmation';
import { useState } from 'react';

interface VerificationCodeFormProps {
  confirmOtp: (token: string) => void;
  identifier: string;
}

export default function VerificationCodeForm({
  identifier
}: VerificationCodeFormProps) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);

  const { isExpired, setIsExpired, otp, onChangeOtp, onResendCode } =
    useLoginConfirmation(identifier);

  const onSubmit = async () => {
    console.log('object');
    setShowSpinner(true);
    apiHandler('/user/login?loginTypeEnum=CODE', 'POST', {
      mobile: identifier,
      password: otp.value
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
    <>
      <Stack component='form' className={classes.VerificationCodeForm}>
        <Box className={classes.MainContainer}>
          <Typography className={classes.Title}>
            {t('Enter confirmation code')}
          </Typography>
          <Typography className={classes.Subtitle}>
            {t('Enter confirmation description')}
            {' ' + identifier}
          </Typography>
        </Box>
        <Grid container justifyContent={'center'} sx={{ width: '100%' }}>
          <OtpInput
            value={otp.value}
            errorMessage={otp.errorMessage}
            onChange={onChangeOtp}
          />
        </Grid>
        <Grid m={2} container justifyContent={'center'}>
          {/* Resend code button */}
          {isExpired ? (
            <Button onClick={onResendCode}>{t('Resend code')}</Button>
          ) : (
            <CountDownClock onComplete={() => setIsExpired(true)} />
          )}
        </Grid>
      </Stack>
      <Button
        disabled={showSpinner}
        onClick={onSubmit}
        variant='contained'
        type='submit'
        sx={(theme) => ({
          width: '100%',
          height: '3rem',
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
            border: `1px solid ${alpha(theme.palette.primary.main, 0)}`,
            color: '#FFF'
          }
        })}
      >
        {showSpinner ? <DotSpinner /> : t('Log in')}{' '}
      </Button>
    </>
  );
}
