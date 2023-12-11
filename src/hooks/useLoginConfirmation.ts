'use client';

import { useAppDispatch } from '@/context';
import { hideSnackbar, showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type OtpType = {
  value: string;
  errorMessage: string;
};

export default function useLoginConfirmation(
  userEmail: string
) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  // Is expired otp state
  const [isExpired, setIsExpired] = useState(false);
  // Show spinner
  const [showSpinner, setShowSpinner] = useState(false);
  // Otp value state
  const [otp, setOtp] = useState<OtpType>({
    value: '',
    errorMessage: ''
  });

  // Handle on change OtpInput
  const onChangeOtp = async (value: string) => {
    const newValue = { ...otp, value };
    // Update otp value
    setOtp(newValue);

    if (value.length === 4) {
      if (isExpired) {
        // Handle expiration validation
        setOtp({ ...newValue, errorMessage: t('Otp expired') });
      } else {
        // Show snackbar
        dispatch(
          showSnackbar({
            message: t('In Progress'),
            type: 'simple'
          })
        );

        try {
          // const result = (await apiHandler(
          //   useForgetPasswordURI
          //     ? '/api/auth/forget-password/otp/'
          //     : '/api/auth/signup/verify-otp/',
          //   'POST',
          //   useForgetPasswordURI
          //     ? {
          //         identifier: userEmail,
          //         mobile: value
          //       }
          //     : {
          //         email: userEmail,
          //         token: value
          //       }
          // )) as SuccessOtpResultType;

          // #TODO remove this commont after add account complete
          // Get latest tokens if exists
          // const tokens = getAppToken();
          // let newToken: ListOfTokens;

          // if (tokens) {
          //   newToken = JSON.parse(tokens);
          //   newToken?.push({ [userEmail]: result.data });
          // } else {
          //   newToken = [{ [userEmail]: result.data }];
          // }

          // Set new token
          // const newToken = [{ [userEmail]: result.data }];

          // // Set new token
          // setAppToken(newToken);
          // // Set current account email
          // setCurrentAccountCookie(userEmail);

          // // Go to next step when everythings ok
          // if (result.token) {
          //   goToNextStep(result.token);
          // } else {
          // Go to next step when everythings ok
          setOtp(newValue); // }
        } catch (err) {
          const error = err as IntError;
          let firstError = error.errors;

          if (firstError.constructor === Array) {
            firstError = firstError[0];
          }

          // Set error on otp message
          setOtp({ ...newValue, errorMessage: firstError.detail });
        }

        // Hide snackbar
        dispatch(hideSnackbar());
      }
    }
  };

  // Handle resend code
  const onResendCode = async () => {
    // Remove otp error message
    setOtp({ ...otp, errorMessage: '' });
    // Show spinner
    setShowSpinner(true);

    try {
      await apiHandler(`/user/login/VerificationCode/${userEmail}`, 'POST', {});

      // Show snackbar
      dispatch(
        showSnackbar({
          message: t('A new code has been sent'),
          severity: 'success'
        })
      );

      // Fresh isExpired state
      setIsExpired(false);
    } catch (err) {
      const error = err as IntError;
      const firstError = error.errors;

      // Show snackbar
      dispatch(
        showSnackbar({
          message: firstError.detail,
          severity: 'error'
        })
      );
    }

    // Hide spinner
    setShowSpinner(false);
  };

  return {
    isExpired,
    setIsExpired,
    otp,
    onChangeOtp,
    onResendCode,
    showSpinner
  };
}
