'use client';

// local imports
import VerificationCodeForm from './VerificationCodeForm';
import NewPasswordForm from './NewPasswordForm';
import SignUpForm from './SignUpForm';

import useSignUp from './hooks/useSignUp';

export default function ForgetPassword() {
  const {
    identifier,
    showSpinner,
    stage,
    enterOtp,
    confirmOtp,
    changePassword
  } = useSignUp();

  return (
    <>
      {stage === 'get-email' && (
        <SignUpForm showSpinner={showSpinner} enterOtp={enterOtp} />
      )}
      {stage === 'otp' && (
        <VerificationCodeForm
          identifier={identifier.id}
          confirmOtp={confirmOtp}
        />
      )}
      {stage === 'get-user-info' && (
        <NewPasswordForm
          showSpinner={showSpinner}
          changePassword={changePassword}
        />
      )}
    </>
  );
}
