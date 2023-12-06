import Icon from '@/components/General/Icon';
import { Stack, Typography } from '@mui/material';

interface IntProps {
  label: string;
  isChecked?: boolean;
}

export default function RuleChecker({ label, isChecked = false }: IntProps) {
  return (
    <Stack
      flexDirection='row'
      gap='0.5rem'
      sx={{ opacity: isChecked ? 0.5 : 1, py: '0.125rem' }}
    >
      <Stack alignItems='center'>
        {isChecked ? (
          <Icon name='checkedCircle' w={16} h={16} view='0 0 16 16' />
        ) : (
          <Icon name='circle' w={16} h={16} view='0 0 16 16' />
        )}
      </Stack>

      <Typography className='rule-checker-label' variant='caption'>
        {label}
      </Typography>
    </Stack>
  );
}
