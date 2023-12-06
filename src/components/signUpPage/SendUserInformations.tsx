import {
  CustomCheckbox,
  CustomFormControlLabel,
  CustomTextField,
  DotSpinner,
  PasswordField,
  PasswordRuleChecker,
  SelectableTextField,
  SubmitButton
} from '@/components/General';
import { useAppDispatch } from '@/context';
import { showModal } from '@/context/slices/modalSlice';
import { getUserInformationsValidations as validations } from '@/utils/validations/getUserInformationsValidations';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller } from 'react-hook-form';
import CookiePolicy from './CookiePolicy';
import DateOfBirth from './DateOfBirth';
import Gender from './Gender';
import GetLocation from './GetLocation';
import PrivacyPolicy from './PrivacyPolicy';
import UserAgreement from './UserAgreement';
import useGetLocation from './hooks/useGetLocation';
import usePolicies from './hooks/usePolicies';
import useSendUserInformations from './hooks/useSendUserInformations';

export type GendersType = 'Female' | 'Male' | 'Other';

export default function SendUserInformation({
  userEmail
}: {
  userEmail: string;
}) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  // Use useSendUserInformations to handle logic
  const {
    savePassword,
    setSavePassword,
    control,
    handleSubmit,
    errors,
    dateOfBirthFieldValue,
    onSubmit,
    watch,
    showSpinner
  } = useSendUserInformations();
  // Use usePolicies to get policies informations
  const policies = usePolicies();

  // Use useGetLocation
  const { search, setSearch, toggleProgress, updateLocation } =
    useGetLocation();

  // Handle on click link
  const onClickUserLink = (
    component: React.ReactElement,
    label: string | null
  ) => {
    dispatch(
      showModal({
        modalState: true,
        modalHeaderTitle: label ? (
          <Typography className='modal-header-title'>{t(label)}</Typography>
        ) : null,
        modalContent: component
      })
    );
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      px='1.5rem'
      data-test-id='send-user-info'
    >
      <Typography mb='1.5rem' variant='h5'>
        {t('Sign up')}
      </Typography>

      {/* Add username field here but hide it for Save Password */}
      {savePassword && (
        <Box sx={{ display: 'none', height: 0 }}>
          <CustomTextField
            label='username'
            name='username'
            value={userEmail}
            autoComplete='true'
          />
        </Box>
      )}

      <PasswordRuleChecker password={watch('password')} />

      {/* Password field */}
      <Box my='0.25rem' data-test-id='password-field-container'>
        <Controller
          control={control}
          name='password'
          rules={validations.password}
          render={({ field: { onChange } }) => (
            <PasswordField
              errorMessage={errors.password?.message}
              onChange={(v) => onChange(v)}
            />
          )}
        />
      </Box>

      {/* Save password */}
      <Box mb='2.25rem'>
        <CustomFormControlLabel
          control={
            <CustomCheckbox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSavePassword(e.target.checked)
              }
            />
          }
          label={t('Save password')}
        />
      </Box>

      <Stack gap='0.75rem' mb='2rem'>
        {/* Gender field */}
        <div data-test-id='gender-field'>
          <Controller
            control={control}
            name='gender'
            rules={validations.gender}
            render={({ field: { onChange, value } }) => (
              <SelectableTextField
                value={value}
                label={t('Gender')}
                errorMessage={errors.gender?.message}
                onClick={() =>
                  onClickUserLink(<Gender onChange={onChange} />, null)
                }
              />
            )}
          />
        </div>

        {/* Date of birth field */}
        <div data-test-id='date-of-birth-field'>
          <Controller
            control={control}
            name='dateOfBirth'
            rules={validations.dateOfBirth}
            render={({ field: { onChange } }) => (
              <SelectableTextField
                value={dateOfBirthFieldValue}
                label={t('Date of birth')}
                errorMessage={errors.dateOfBirth?.message as string | undefined}
                onClick={() =>
                  onClickUserLink(<DateOfBirth onChange={onChange} />, null)
                }
              />
            )}
          />
        </div>

        {/* Location field */}
        <div data-test-id='location-field'>
          <Controller
            control={control}
            name='location'
            rules={validations.location}
            render={({ field: { onChange, value } }) => (
              <SelectableTextField
                value={value}
                label={t('Location')}
                errorMessage={errors.location?.message}
                onClick={() =>
                  onClickUserLink(
                    <GetLocation
                      onChange={onChange}
                      onSearch={(value) => setSearch(value)}
                      isLoading={toggleProgress}
                      updateLocation={(p) => updateLocation(p)}
                      defaultSearch={search}
                    />,
                    null
                  )
                }
              />
            )}
          />
        </div>
      </Stack>

      <Box mb='1.25rem'>
        <Typography className='text-gray-700' variant='body2' fontWeight={500}>
          {t('Agree DGB')}
        </Typography>

        <Stack gap='0.125rem' direction='row'>
          <Typography
            className='link'
            variant='body2'
            data-test-id='user-agreement-link'
            onClick={() =>
              onClickUserLink(
                <UserAgreement body={policies.agreement} />,
                'User agreement'
              )
            }
          >
            {t('User agreement')},
          </Typography>

          <Typography
            className='link'
            variant='body2'
            data-test-id='privacy-policy-link'
            onClick={() =>
              onClickUserLink(
                <PrivacyPolicy body={policies.privacy} />,
                'Privacy policy'
              )
            }
          >
            {t('Privacy policy')},
          </Typography>

          <Typography variant='body2'>{t('And')}</Typography>

          <Typography
            className='link'
            variant='body2'
            data-test-id='cookie-policy-link'
            onClick={() =>
              onClickUserLink(
                <CookiePolicy body={policies.cookie} />,
                'Cookie policy'
              )
            }
          >
            {t('Cookie policy')}.
          </Typography>
        </Stack>
      </Box>

      {/* Submit btn */}
      <SubmitButton disabled={showSpinner}>
        {showSpinner ? (
          <DotSpinner />
        ) : (
          <Typography fontWeight={600}>{t('Agree & Sign up')}</Typography>
        )}
      </SubmitButton>
    </Box>
  );
}
