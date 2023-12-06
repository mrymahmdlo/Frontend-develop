import { FormControlLabel, FormControlLabelProps } from '@mui/material';

interface IntProps extends FormControlLabelProps {
  label: string;
}

export default function CustomCheckbox({ label, ...props }: IntProps) {
  return (
    <div data-test-id='form-control-label'>
      <FormControlLabel
        {...props}
        label={label}
        sx={(theme) => ({
          '& .MuiTypography-root': {
            color: theme.palette.gray['700'],
            fontWeight: 600
          }
        })}
      />
    </div>
  );
}
