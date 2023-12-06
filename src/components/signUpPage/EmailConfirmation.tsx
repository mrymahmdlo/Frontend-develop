import { OtpInput, CountDownClock } from '@/components/General';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEmailConfirmation } from '@/hooks';

interface IntProps {
  goToNextStep: () => void;
  userEmail: string;
}

export default function EmailConfirmation({
  goToNextStep,
  userEmail
}: IntProps) {
  const t = useTranslations();
  // Use useEmailConfirmation hook
  const {
    isExpired,
    setIsExpired,
    otp,
    onChangeOtp,
    onResendCode,
    showSpinner
  } = useEmailConfirmation(userEmail, goToNextStep);

  return (
    <Stack gap='1.5rem' px='1.5rem'>
      <Box textAlign='center'>
        <Typography data-test-id='email-confirmation-title' variant='h5'>
          {t('Enter confirmation code')}
        </Typography>

        <Typography
          data-test-id='email-confirmation-desc'
          fontSize='1.125rem'
          className='text-gray-600'
        >
          {t('Enter confirmation description')} {userEmail}
        </Typography>
      </Box>

      {/* Otp input */}
      <OtpInput
        value={otp.value}
        errorMessage={otp.errorMessage}
        onChange={onChangeOtp}
      />

      {/* Resend code button */}
      {isExpired ? (
        <Button disabled={showSpinner} onClick={onResendCode}>
          {t('Resend code')}
        </Button>
      ) : (
        <CountDownClock onComplete={() => setIsExpired(true)} />
      )}
    </Stack>
  );
}
