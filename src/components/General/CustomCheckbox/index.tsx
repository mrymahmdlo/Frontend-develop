import { Checkbox } from '@mui/material';
import { Icon } from '@/components/General';

export default function CustomCheckbox({ ...props }) {
  return (
    <div>
      <Checkbox
        {...props}
        icon={<Icon name='checkbox' />}
        checkedIcon={<Icon name='checkedCheckbox' />}
      />
    </div>
  );
}
