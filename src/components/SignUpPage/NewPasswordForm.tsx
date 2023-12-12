'use client';

import { useTranslations } from 'next-intl';

// mui imports
import { Box, Button, Grid, Stack } from '@mui/material';

// local imports
import {
  CustomCheckbox,
  CustomFormControlLabel,
  DotSpinner,
  PasswordField,
  PasswordRuleChecker
} from '@/components/General';

// style
import classes from '@/assets/styleSheets/forget-password.module.scss';
import { patterns } from '@/utils/validations/validationMessageHandler';
import usePasswordSignUp from './hooks/usePasswordSignUp';

interface NewPasswordFormProps {
  changePassword: (password: string, repPassword: string) => void;
  showSpinner: boolean;
}

export default function NewPasswordForm(props: NewPasswordFormProps) {
  const t = useTranslations();

  const {
    password,
    repPassword,
    safePassword,
    setPassword,
    setRepPassword,
    setSavePassword,
    errorRepPassword,
    resetPassword
  } = usePasswordSignUp(props.changePassword);

  return (
    <Stack component='form' className={classes.ResetPasswordForm}>
      <Grid container direction={'column'}>
        <Box>
          <PasswordRuleChecker password={password} />
        </Box>
        <Box my='0.25rem'>
          <PasswordField
            label={t('New password')}
            value={password}
            onChange={setPassword}
          />
        </Box>
        <Box my='0.25rem'>
          <PasswordField
            label={t('Confirm new password')}
            value={repPassword}
            onChange={setRepPassword}
            errorMessage={errorRepPassword}
          />
        </Box>
        {/* Save password */}
        <Box display={'flex'} mb='1.25rem'>
          <CustomFormControlLabel
            control={
              <CustomCheckbox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSavePassword(e.target.checked)
                }
                value={safePassword}
              />
            }
            label={t('Save password')}
          />
        </Box>
      </Grid>
      <Grid container>
        <Button
          variant='contained'
          fullWidth
          color='primary'
          disabled={
            password !== repPassword ||
            !patterns.strongPassword.test(password) ||
            props.showSpinner
          }
          onClick={resetPassword}
          sx={{ minHeight: '51px' }}
        >
          {props.showSpinner ? <DotSpinner /> : t('Next')}
        </Button>
      </Grid>
    </Stack>
  );
}
