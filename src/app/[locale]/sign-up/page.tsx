'use client';

import { AuthContainer, Icon } from '@/components/General';
import EmailConfirmation from '@/components/signUpPage/EmailConfirmation';
import SendUserInformation from '@/components/signUpPage/SendUserInformations';
import SignUpStepOne from '@/components/signUpPage/SignUpStepOne';
import { Box, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import type { Metadata } from 'next';

type Steps = 'get-email' | 'otp' | 'get-user-info';

// #TODO check metadata for seo
// export const metadata: Metadata = {
//   title: 'Sign Up - DGB',
//   description: 'DGB | The World’s Largest Online Trading'
// };

export default function SignUp() {
  const t = useTranslations();
  // Use route
  const route = useRouter();
  // Current step state
  const [currentStep, setCurrentStep] = useState<Steps>('get-email');
  // User email
  const [email, setEmail] = useState('');

  // Handle on click back component
  const onClickBackComponent = () => {
    if (currentStep === 'get-email') route.push('/on-boarding');
    else setCurrentStep('get-email');
  };

  return (
    <AuthContainer
      hideNewsLetter
      BackComponent={
        <Box sx={{ cursor: 'pointer' }} onClick={onClickBackComponent}>
          <Icon name='flashLeft' />
          {currentStep === 'get-email' && t('Back to on boarding')}
          {currentStep === 'otp' && t('Back to Sign up')}
          {currentStep === 'get-user-info' && t('Back to Sign up')}
        </Box>
      }
      MobileBackComponent={
        <IconButton aria-label='back' onClick={onClickBackComponent}>
          <Icon name='arrowLeft' w={18} h={18} view='0 0 24 24' />
        </IconButton>
      }
    >
      {/* Step 1: Get user email */}
      {currentStep === 'get-email' && (
        <SignUpStepOne
          goToNextStep={(email) => {
            setCurrentStep('otp');
            setEmail(email);
          }}
        />
      )}

      {/* Step 2: Confirm email */}
      {currentStep === 'otp' && (
        <EmailConfirmation
          userEmail={email}
          goToNextStep={() => setCurrentStep('get-user-info')}
        />
      )}

      {/* Step 2: Send user informations */}
      {currentStep === 'get-user-info' && (
        <SendUserInformation userEmail={email} />
      )}
    </AuthContainer>
  );
}
