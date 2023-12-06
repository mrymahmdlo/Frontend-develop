'use client';

import {
  AuthProviderBtns,
  CustomTextField,
  DotSpinner,
  GeetestCaptcha,
  Icon,
  SubmitButton
} from '@/components/General';
import { signUpValidations as validations } from '@/utils/validations/signUpValidations';
import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import GeetestCaptchaMock from '../General/GeetestCaptcha/Mock';
import useSendEmail from './hooks/useSendEmail';

interface IntProps {
  goToNextStep: (v: string) => void;
}

export default function SignUpStepOne({ goToNextStep }: IntProps) {
  const t = useTranslations();
  // Create captcha btn ref
  const captchaBtnRef = useRef<null | HTMLButtonElement>(null);

  // Use useSendEmail hook
  const {
    onSubmit,
    control,
    handleSubmit,
    errors,
    onSuccessCaptcha,
    watch,
    showSpinner
  } = useSendEmail(goToNextStep, captchaBtnRef);

  const isCypressMode =
    process.env.NEXT_PUBLIC_CYPRESS_MODE === 'true' &&
    process.env.NODE_ENV === 'development';

  return (
    <Stack spacing='1.5rem' px='1.5rem' data-test-id='send-email-form'>
      <div>
        {/* Modal title */}
        <Typography className='modal-title' variant='h5'>
          {t('Sign up to DGB')}
        </Typography>

        {/* Login link */}
        <Typography className='login-link-container'>
          <span>{t('Or')} </span>
          <Link href='log-in'>Log in</Link>
        </Typography>
      </div>

      <Stack
        component='form'
        spacing='1.5rem'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email field */}
        <Controller
          control={control}
          name='email'
          rules={validations.email}
          render={({ field: { onChange, value } }) => (
            <CustomTextField
              label={t('Email')}
              data-test-id='sign-up-email'
              value={value ?? ''}
              onChange={(e) => {
                const newValue = e.target.value;
                // Store new value
                onChange(newValue);
              }}
              errorMessage={errors.email?.message}
            />
          )}
        />

        {/* Submit btn */}
        <SubmitButton disabled={showSpinner || !watch('email')}>
          {showSpinner ? <DotSpinner /> : t('Next')}
        </SubmitButton>
      </Stack>

      {/* Captcha */}
      {isCypressMode ? (
        <GeetestCaptchaMock onSuccess={onSuccessCaptcha}>
          <button ref={captchaBtnRef} style={{ display: 'none' }}></button>
        </GeetestCaptchaMock>
      ) : (
        <GeetestCaptcha onSuccess={onSuccessCaptcha}>
          <button ref={captchaBtnRef} style={{ display: 'none' }}></button>
        </GeetestCaptcha>
      )}

      <Stack
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

      {/* Authentication provider buttons */}
      <AuthProviderBtns />
    </Stack>
  );
}
