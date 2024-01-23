import { Icon } from '@/components/General';
import { OutlinedInputProps, Stack, Typography, alpha } from '@mui/material';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';

interface IntProps extends StandardTextFieldProps {
  errorMessage?: string;
  inputWidth?: string;
  borderRadius?: string | number;
  w?: string;
}

export default function CustomTextField({
  errorMessage,
  inputWidth,
  borderRadius = '0.5rem',
  w,
  ...props
}: IntProps) {
  return (
    <div>
      <TextField
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant='filled'
        {...props}
        sx={(theme) => ({
          width: '100%',
          '& label': {
            color: `${alpha(theme.palette.gray.main, 1)} !important`
          },
          '& .MuiFilledInput-root': {
            border: `1px solid`,
            borderColor: errorMessage
              ? alpha(theme.palette.error.main, 1)
              : alpha(theme.palette.gray['100'],1),
            overflow: 'hidden',
            borderRadius: { borderRadius },
            backgroundColor: alpha(theme.palette.gray[200], 1),
            transition: theme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow'
            ]),
            width: w
          },
          '& input': {
            width: inputWidth ? inputWidth : '100%'
          }
        })}
      />

      {/* Error message */}
      {errorMessage && (
        <Stack flexDirection='row' alignItems='center' gap='0.25rem'>
          <Stack>
            <Icon name='error' w={12} h={12} view='0 0 12 12' />
          </Stack>

          <div>
            <Typography variant='caption' className='error-message'>
              {errorMessage}
            </Typography>
          </div>
        </Stack>
      )}
    </div>
  );
}
