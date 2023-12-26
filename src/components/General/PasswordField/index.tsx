'use client';

import { CustomTextField, Icon } from '@/components/General';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IntProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  autoComplete?: boolean;
  errorMessage?: string;
  id?: string;
}

export default function PasswordField({
  label = 'Password',
  value,
  onChange,
  autoComplete = true,
  errorMessage,
  id
}: IntProps) {
  const t = useTranslations();
  // Show password state
  const [show, setShow] = useState(false);

  // Handle on click eye-slash
  const onClick = () => {
    setShow((i) => !i);
  };

  return (
    <span style={{ direction: 'ltr' }}>
      <CustomTextField
        id={id}
        errorMessage={errorMessage}
        label={t(label)}
        value={value}
        autoComplete={`${autoComplete}`}
        onChange={onChange ? (value) => onChange(value.target.value) : () => {}}
        type={show ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
              <Icon
                name={show ? 'eye' : 'eyeSlash'}
                w={16}
                h={16}
                view='0 0 16 16'
              />
            </Box>
          )
        }}
      />
    </span>
  );
}
