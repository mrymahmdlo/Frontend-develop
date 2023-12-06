'use client';
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProviderBtn from './ProviderBtn';

interface IntProps {
  type?: 'sing-up' | 'log-in' | undefined;
}

export default function AuthProviderBtns({ type }: IntProps) {
  const dispatch = useAppDispatch();

  const t = useTranslations();
  // Type of provider
  let providerType = 'Continue';

  if (type === 'sing-up') providerType = 'Sign up';
  else if (type === 'log-in') providerType = 'Log in';

  const [showSpinner, setShowSpinner] = useState(false);
  const [showSpinnerFacebook, setShowSpinnerFacebook] = useState(false);

  const signInWithGoogle = async () => {
    setShowSpinner(true);

    const result = await apiHandler('/api/auth/google/', 'GET');

    if (result.errors) {
      setShowSpinner(false);

      // Handle error
      const error = result.errors[0];

      dispatch(
        showSnackbar({
          message: error.detail as string,
          severity: 'error'
        })
      );
    } else {
      // Go to next step
      window.location.href = result.url;
    }
  };

  const signInWithFacebook = async () => {
    setShowSpinnerFacebook(true);

    const result = await apiHandler('/api/auth/facebook/', 'GET');

    if (result.errors) {
      setShowSpinnerFacebook(false);

      // Handle error
      const error = result.errors[0];

      dispatch(
        showSnackbar({
          message: error.detail as string,
          severity: 'error'
        })
      );
    } else {
      // Go to next step
      window.location.href = result.url;
    }
  };

  return (
    <Stack width={'100%'} gap={'0.75rem'}>
      {/* Apple provider btn */}
      <ProviderBtn
        id='apple-btn'
        iconName='apple'
        label={t(`${providerType} with apple`)}
        onClick={() => console.log('Button clicked')}
        showSpinner={false}
      />

      {/* Google provider btn */}
      <ProviderBtn
        id='google-btn'
        iconName='google'
        label={t(`${providerType} with google`)}
        onClick={signInWithGoogle}
        showSpinner={showSpinner}
      />

      <Stack flexDirection='row' justifyContent='space-between' gap={'0.75rem'}>
        {/* Meta provider btn */}
        <ProviderBtn
          id='meta-btn'
          iconName='meta'
          onClick={signInWithFacebook}
          showSpinner={showSpinnerFacebook}
        />

        {/* Twitter provider btn */}
        <ProviderBtn
          id='twitter-btn'
          iconName='twitter'
          onClick={() => console.log('Button clicked')}
          showSpinner={false}
        />

        {/* LinkedIn provider btn */}
        <ProviderBtn
          id='linkedIn-btn'
          iconName='linkedIn'
          onClick={() => console.log('Button clicked')}
          showSpinner={false}
        />
      </Stack>
    </Stack>
  );
}
