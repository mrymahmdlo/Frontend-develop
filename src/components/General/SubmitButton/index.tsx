import { Button, alpha } from '@mui/material';

interface IntProps {
  children: React.ReactNode;
  disabled?: boolean;
  width?: string;
}

export default function SubmitButton({
  children,
  width = '100%',
  disabled = false
}: IntProps) {
  return (
    <Button
      disabled={disabled}
      variant='contained'
      type='submit'
      sx={(theme) => ({
        width: width,
        height: '3rem',
        '&.Mui-disabled': {
          backgroundColor: alpha(theme.palette.primary.main, 0.5),
          border: `1px solid ${alpha(theme.palette.primary.main, 0)}`,
          color: '#FFF'
        }
      })}
    >
      {children}
    </Button>
  );
}
