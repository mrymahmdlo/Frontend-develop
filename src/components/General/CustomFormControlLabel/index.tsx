import { FormControlLabel, FormControlLabelProps, alpha } from '@mui/material';

interface IntProps extends FormControlLabelProps {
  label: string;
}

export default function CustomCheckbox({ label, ...props }: IntProps) {
  return (
    <div style={{ direction: 'ltr' }}>
      <FormControlLabel
        {...props}
        label={label}
        sx={(theme) => ({
          '& .MuiTypography-root': {
            color: alpha(theme.palette.gray['700'],1),
            fontWeight: 600
          }
        })}
      />
    </div>
  );
}
