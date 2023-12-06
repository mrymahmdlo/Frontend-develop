import { Box, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

interface IntProps {
  value: string;
  length?: number;
  onChange: (v: string) => void;
  errorMessage?: string;
}

export function matchIsNumeric(text: string) {
  const isNumber = typeof text === 'number';
  const isString = typeof text === 'string';
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

export default function OtpInput({
  value,
  length = 6,
  onChange,
  errorMessage
}: IntProps) {
  const validateChar = (value: string) => {
    return matchIsNumeric(value);
  };

  return (
    <div>
      <MuiOtpInput
        value={value}
        length={length}
        autoFocus
        onChange={onChange}
        validateChar={validateChar}
        sx={(theme) => ({
          gap: '0.5rem',
          justifyContent: 'space-between',
          '& .MuiFormControl-root': {
            width: '3.5rem',
            height: '3.5rem'
          },
          '& .MuiInputBase-root': {
            fontWeight: 500,
            color: errorMessage
              ? theme.palette.error.main
              : theme.palette.gray['700'],
            backgroundColor: errorMessage
              ? theme.palette.error['100']
              : theme.palette.gray['100']
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: errorMessage
              ? theme.palette.error['100']
              : theme.palette.gray['100']
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: errorMessage ? 0 : '1px',
            borderColor: theme.palette.primary
          }
        })}
      />

      {/* Error message */}
      {errorMessage && (
        <Box textAlign='center' mt='0.5rem' lineHeight='1.125rem'>
          <Typography variant='caption' className='error-message'>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </div>
  );
}
