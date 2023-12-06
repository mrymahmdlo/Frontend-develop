'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// mui imports
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// style
import classes from '@/assets/styleSheets/forget-password.module.scss';

// local imports
import {
  CustomTextField,
  SubmitButton,
  TabPanel,
  Icon,
  DotSpinner
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

export default function ForgetPasswordForm(props: ForgetPasswordFormProps) {
  const t = useTranslations();

  const [tab, setTab] = useState<TabsValue>('email');

  const handleChange = (event: SyntheticEvent, newValue: TabsValue) => {
    setTab(newValue);
  };

  const sendEmail: SubmitHandler<InputType> = (formData) => {
    props.enterOtp(
      tab === 'email' ? formData.email : formData.phoneNumber,
      tab
    );
  };

  function checkEntries() {
    if (tab === 'email') return !watch('email');
    else return !watch('phoneNumber');
  }

  // Use react hook form to handle form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<InputType>();

  return (
    <Stack
      component='form'
      className={classes.ForgetPasswordForm}
      onSubmit={handleSubmit(sendEmail)}
    >
      <Box className={classes.LockIconContainer}>
        <Icon name='lock' h={40} w={40} view='0 0 50 50' />
      </Box>
      <Box className={classes.MainContainer}>
        <Typography className={classes.Title}>
          {t('Trouble logging in?')}
        </Typography>
        <Typography className={classes.Subtitle}>
          {tab === 'email'
            ? t('Trouble logging email')
            : t('Trouble logging phone')}
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Email')}
            value={'email'}
          />
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Phone')}
            test-id='phone-tab'
            value={'phoneNumber'}
          />
        </Tabs>
        <TabPanel
          index={'email'}
          value={tab}
          style={{ width: '100%', margin: '15px 0' }}
        >
          {/* Email field */}
          <Controller
            control={control}
            name='email'
            rules={validations.email}
            render={({ field: { onChange, value } }) => (
              <CustomTextField
                inputWidth='26.25rem'
                label={t('Email or username')}
                value={value}
                data-test-id='user_email'
                autoComplete='true'
                onChange={(e) => {
                  const newValue = e.target.value;
                  // Store new value
                  onChange(newValue);
                }}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </TabPanel>
        <TabPanel
          index={'phoneNumber'}
          value={tab}
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
                data-test-id='user_phone'
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
      <Typography
        component={Link}
        href='/help-center'
        className={classes.HelpCenterLink}
      >
        {t('Can’t reset your password?')}
      </Typography>
      <Box className={classes.ButtonContainer}>
        <Grid container>
          {/* Submit btn */}
          <SubmitButton disabled={props.showSpinner || checkEntries()}>
            {props.showSpinner ? <DotSpinner /> : t('Next')}
          </SubmitButton>
        </Grid>
      </Box>
    </Stack>
  );
}
