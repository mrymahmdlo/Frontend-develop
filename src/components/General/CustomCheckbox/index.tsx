import { Checkbox } from '@mui/material';
import { Icon } from '@/components/General';

export default function CustomCheckbox({ ...props }) {
  return (
    <div data-test-id='checkbox'>
      <Checkbox
        {...props}
        icon={<Icon name='checkbox' />}
        checkedIcon={<Icon name='checkedCheckbox' />}
      />
    </div>
  );
}
