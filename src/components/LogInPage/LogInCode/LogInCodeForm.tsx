'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// mui imports
import { Box, Grid, Stack } from '@mui/material';

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

export default function LogInCodeForm(props: ForgetPasswordFormProps) {
  const t = useTranslations();

  const [tab] = useState<TabsValue>('phoneNumber');

  // const handleChange = (event: SyntheticEvent, newValue: TabsValue) => {
  //   setTab(newValue);
  // };

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
  );
}
