'use client';

import React, { useRef } from 'react';
import GeeTest, { GeeTestRef, GeeTestValidateResult } from 'react-geetest-v4';

interface IntProps {
  onSuccess: (v: GeeTestValidateResult | undefined) => void;
  children: React.ReactNode;
}

export default function GeetestCaptcha({ children, onSuccess }: IntProps) {
  const captchaRef = useRef<GeeTestRef | null>(null);

  return (
    <div>
      <GeeTest
        ref={captchaRef}
        captchaId={`${process.env.NEXT_PUBLIC_CAPTCH_ID}`}
        product={'bind'}
        onSuccess={(result) => {
          onSuccess(result);
        }}
      >
        {children}
      </GeeTest>
    </div>
  );
}
