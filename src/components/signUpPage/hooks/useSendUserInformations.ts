import { useAppDispatch, useAppSelector } from '@/context';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { GendersType } from '../SendUserInformations';
import { PickerValue } from 'react-mobile-picker';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { selections } from '../DateOfBirth';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { showSnackbar } from '@/context/slices/snackbarSlice';

type InputType = {
  password: string;
  gender: GendersType;
  location: string;
  dateOfBirth: PickerValue;
};

export default function useSendUserInformations() {
  // Get user current location to set it as default value
  const userCurrentLocation = useAppSelector(
    (state) => state.userCurrentLocation.value
  );
  // Create default value for location
  const locationDefault =
    userCurrentLocation !== null && userCurrentLocation?.country !== '-'
      ? `${userCurrentLocation.region}, ${userCurrentLocation.country}`
      : '';
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const router = useRouter();
  // Save password
  const [savePassword, setSavePassword] = useState(false);
  // Show spinner
  const [showSpinner, setShowSpinner] = useState(false);

  // Use react hook form to handle form
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<InputType>({
    defaultValues: { password: '', location: locationDefault }
  });

  // Date of brith field value creator
  const dateOfBirthFieldValue = `${
    watch('dateOfBirth')
      ? `${selections.months[parseInt(watch('dateOfBirth').month) - 1]} ${
          watch('dateOfBirth').day
        }, ${watch('dateOfBirth').year}`
      : ''
  }`;

  // Handle on submit form
  const onSubmit: SubmitHandler<InputType> = async (formData) => {
    // Show spinner in button value
    setShowSpinner(true);
    const birth = formData.dateOfBirth;

    try {
      await apiHandler(
        '/api/auth/signup/detail/',
        'POST',
        {
          password: formData.password,
          profile: {
            gender: formData.gender.toLowerCase(),
            birthday: `${birth.year}-${birth.month}-${birth.day}`,
            region: {
              // eslint-disable-next-line camelcase
              subdivision_name: formData.location.split(',')[0].trim()
            }
          }
        },
        true
      );

      // #TODO redirect to correct route
      router.push('/dashboard');
    } catch (err) {
      // Hide spinner
      setShowSpinner(false);

      if (err !== 'An error occured when fetch token') {
        const error = err as IntError;
        let firstError = error.errors;

        let message = '';

        if (firstError.constructor === Array) {
          firstError = firstError[0];
        }

        if (error.type === 'validation_error') {
          if (firstError.attr.indexOf('subdivision_name') !== -1) {
            // Show location field error under field
            setError('location', {
              message: firstError.detail.replace('subdivision_name', 'location')
            });
          } else if (firstError.attr.indexOf('password') !== -1) {
            // Show password field error under field
            setError('password', {
              message: firstError.detail
            });
          } else if (firstError.attr.indexOf('gender') !== -1) {
            // Show gender field error under field
            setError('gender', {
              message: firstError.detail
            });
          } else if (firstError.attr.indexOf('birthday') !== -1) {
            // Show birthday field error under field
            setError('dateOfBirth', {
              message: firstError.detail
            });
          } else {
            // If an unknown error occured
            message = t('An error occured');
          }
        } else {
          // Other errors should display in snackbar
          message = firstError.detail;
        }
        // Show error message to user
        if (message) {
          dispatch(
            showSnackbar({
              message: message as string,
              severity: 'error'
            })
          );
        }
      } else {
        dispatch(
          showSnackbar({
            message: t('An error occured'),
            severity: 'error'
          })
        );
      }
    }
  };

  return {
    savePassword,
    setSavePassword,
    control,
    handleSubmit,
    errors,
    dateOfBirthFieldValue,
    onSubmit,
    watch,
    showSpinner
  };
}
