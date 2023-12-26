'use client';

import { Box } from '@mui/material';
import CustomTextField from '@/components/General/CustomTextField';
import Icon from '@/components/General/Icon';

interface IntProps {
  onClick: () => void;
  value: string | undefined;
  label: string;
  errorMessage?: string | undefined;
}

export default function SelectableTextField({
  onClick,
  value,
  label,
  errorMessage
}: IntProps) {
  return (
    <Box
      position='relative'
      onClick={onClick}
    >
      <CustomTextField
        key={value}
        label={label}
        defaultValue={value}
        errorMessage={errorMessage}
        InputProps={{
          endAdornment: (
            <Icon
              test-id='selectable-text-icon'
              name='selectArrow'
              w={16}
              h={16}
              view='0 0 16 16'
            />
          )
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          cursor: 'pointer'
        }}
      ></Box>
    </Box>
  );
}
