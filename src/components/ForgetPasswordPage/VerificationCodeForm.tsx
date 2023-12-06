'use client';

import { useTranslations } from 'next-intl';

// mui imports
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// local imports
import { CountDownClock, OtpInput } from '@/components/General';
import { useEmailConfirmation } from '@/hooks';

// style
import classes from '@/assets/styleSheets/forget-password.module.scss';

interface VerificationCodeFormProps {
  confirmOtp: (token: string) => void;
  identifier: string;
}

export default function VerificationCodeForm({
  confirmOtp,
  identifier
}: VerificationCodeFormProps) {
  const t = useTranslations();

  function sendOTP(token?: string) {
    if (token) confirmOtp(token);
  }

  const { isExpired, setIsExpired, otp, onChangeOtp, onResendCode } =
    useEmailConfirmation(identifier, sendOTP, true);

  return (
    <Stack component='form' className={classes.VerificationCodeForm}>
      <br />
      <br />
      <br />
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
      <Grid container justifyContent={'center'}>
        {/* Resend code button */}
        {isExpired ? (
          <Button onClick={onResendCode}>{t('Resend code')}</Button>
        ) : (
          <CountDownClock onComplete={() => setIsExpired(true)} />
        )}
      </Grid>
    </Stack>
  );
}
