import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { useTranslations } from 'next-intl';
import { MutableRefObject, useState } from 'react';
import { GeeTestValidateResult } from 'react-geetest-v4';
import { SubmitHandler, useForm } from 'react-hook-form';

type InputType = {
  email: string;
};

export default function useSendEmail(
  goToNextStep: (v: string) => void,
  captchaBtnRef: MutableRefObject<HTMLButtonElement | null>
) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  // Show spinner
  const [showSpinner, setShowSpinner] = useState(false);

  // Handle on submit form
  const onSubmit: SubmitHandler<InputType> = () => {
    // Open captcha
    captchaBtnRef.current?.click();
  };

  // Use react hook form to handle form
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors }
  } = useForm<InputType>();

  // Handle on success captcha
  const onSuccessCaptcha = async (
    captchaResult: GeeTestValidateResult | undefined
  ) => {
    // Show spinner in button value
    setShowSpinner(true);

    const email = getValues('email');

    // @useUnknownInCatchVariables
    try {
      await apiHandler('/api/auth/signup/', 'POST', {
        email: email,
        captcha: {
          // eslint-disable-next-line camelcase
          lot_number: captchaResult?.lot_number,
          // eslint-disable-next-line camelcase
          captcha_output: captchaResult?.captcha_output,
          // eslint-disable-next-line camelcase
          pass_token: captchaResult?.pass_token,
          // eslint-disable-next-line camelcase
          gen_time: captchaResult?.gen_time
        }
      });

      // Go to next step
      goToNextStep(email);
    } catch (err) {
      // Hide spinner
      setShowSpinner(false);

      // Handle error
      const error = err as IntError;
      const firstError = error.errors;

      let message = '';

      if (error.type === 'validation_error') {
        if (firstError.attr.indexOf('captcha') !== -1) {
          // Show captcha error in snackbar
          message = `Captcha: ${firstError.detail}`;
        } else if (firstError.attr.indexOf('email') !== -1) {
          // Show email field error under field
          setError('email', {
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
            message: message,
            severity: 'error'
          })
        );
      }
    }
  };

  return {
    onSubmit,
    control,
    handleSubmit,
    errors,
    showSpinner,
    watch,
    onSuccessCaptcha
  };
}
