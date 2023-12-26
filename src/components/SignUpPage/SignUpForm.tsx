'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// mui imports
import { Box, Grid, Stack, Typography } from '@mui/material';

// style
import classes from '@/assets/styleSheets/sign-up.module.scss';

// local imports
import {
  CustomTextField,
  DotSpinner,
  SubmitButton,
  TabPanel
} from '@/components/General';
import { forgetPasswordValidations as validations } from '@/utils/validations/forgetPasswordValidations';

type InputType = {
  email: string;
  phoneNumber: string;
};

interface ForgetPasswordFormProps {
  enterOtp: (user: string, tab: TabsValue) => void;
  showSpinner: boolean;
}

export type TabsValue = 'email' | 'phoneNumber';

export default function SignUpForm(props: ForgetPasswordFormProps) {
  const t = useTranslations();

  const [tab] = useState<TabsValue>('phoneNumber');

  const sendEmail: SubmitHandler<InputType> = (formData) => {
    props.enterOtp(formData.phoneNumber, tab);
  };

  function checkEntries() {
    return !watch('phoneNumber');
  }

  // Use react hook form to handle form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<InputType>();

  return (
    <Stack spacing='1.5rem' px='1.5rem'>
      <div>
        {/* Modal title */}
        <Typography className='modal-title' variant='h5'>
          {t('Sign up to DGB')}
        </Typography>

        {/* Login link */}
        <Typography className='login-link-container'>
          <span>{t('Or')} </span>
          <Link href='log-in'>{t('Log in')}</Link>
        </Typography>
      </div>
      <Stack
        component='form'
        className={classes.ForgetPasswordForm}
        onSubmit={handleSubmit(sendEmail)}
      >
        <Box sx={{ width: '100%' }}>
          <TabPanel
            value={tab}
            index={'phoneNumber'}
            style={{ width: '100%', margin: '15px 0' }}
          >
            {/* Phone Number field */}
            <Controller
              control={control}
              name='phoneNumber'
              rules={validations.phoneNumber}
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem'
                  label={t('Phone number')}
                  value={value}
                  autoComplete='true'
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
                    onChange(newValue);
                  }}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
          </TabPanel>
        </Box>
        <Box className={classes.ButtonContainer}>
          <Grid container>
            {/* Submit btn */}
            <SubmitButton disabled={props.showSpinner || checkEntries()}>
              {props.showSpinner ? <DotSpinner /> : t('Next')}
            </SubmitButton>
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}
