'use client';

import React from 'react';
import { GeeTestValidateResult } from 'react-geetest-v4';

interface IntProps {
  onSuccess: (v: GeeTestValidateResult | undefined) => void;
  children: React.ReactNode;
}

export default function GeetestCaptchaMock({ children, onSuccess }: IntProps) {
  return (
    <div>
      <span
        onClick={() => {
          onSuccess({
            // eslint-disable-next-line camelcase
            captcha_id: '0',
            // eslint-disable-next-line camelcase
            captcha_output: '0',
            // eslint-disable-next-line camelcase
            gen_time: '0',
            // eslint-disable-next-line camelcase
            lot_number: '0',
            // eslint-disable-next-line camelcase
            pass_token: '0'
          } as GeeTestValidateResult);
        }}
      >
        {children}
      </span>
    </div>
  );
}
