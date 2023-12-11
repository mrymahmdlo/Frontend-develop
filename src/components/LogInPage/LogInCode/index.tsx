'use client';

// local imports
import LogInCodeForm from './LogInCodeForm';
import VerificationCodeForm from './VerificationCodeForm';

import useForgetPassword from './hooks/useForgetPassword';

export default function LogInCode() {
  const {
    identifier,
    showSpinner,
    stage,
    enterOtp,
    confirmOtp,
  } = useForgetPassword();

  return (
    <>
      {stage === 'forget-password' && (
        <LogInCodeForm showSpinner={showSpinner} enterOtp={enterOtp} />
      )}
      {stage === 'send-otp' && (
        <VerificationCodeForm
          identifier={identifier.id}
          confirmOtp={confirmOtp}
        />
      )}
    </>
  );
}
