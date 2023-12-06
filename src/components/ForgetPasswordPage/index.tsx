'use client';

// local imports
import VerificationCodeForm from './VerificationCodeForm';
import NewPasswordForm from './NewPasswordForm';
import ForgetPasswordForm from './ForgetPasswordForm';

import useForgetPassword from './hooks/useForgetPassword';

export default function ForgetPassword() {
  const {
    identifier,
    showSpinner,
    stage,
    enterOtp,
    confirmOtp,
    changePassword
  } = useForgetPassword();

  return (
    <>
      {stage === 'forget-password' && (
        <ForgetPasswordForm showSpinner={showSpinner} enterOtp={enterOtp} />
      )}
      {stage === 'send-otp' && (
        <VerificationCodeForm
          identifier={identifier.id}
          confirmOtp={confirmOtp}
        />
      )}
      {stage === 'reset-password' && (
        <NewPasswordForm
          showSpinner={showSpinner}
          changePassword={changePassword}
        />
      )}
    </>
  );
}
