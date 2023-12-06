import { Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/General';
import { GendersType } from './SendUserInformations';
import { useAppDispatch } from '@/context';
import { hideModal } from '@/context/slices/modalSlice';

export default function Gender({
  onChange
}: {
  onChange: (v: GendersType) => void;
}) {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const styles: SxProps<Theme> = (theme) => ({
    width: '100%',
    backgroundColor: theme.palette.gray['100'],
    boxShadow: 'none',
    '&:active, &:focus, &:hover': {
      backgroundColor: theme.palette.gray['200'],
      boxShadow: 'none'
    }
  });

  // Handle on change
  const onChangeHandler = (value: GendersType) => {
    // Send data to parent
    onChange(value);

    // Close modal
    dispatch(hideModal());
  };

  return (
    <Stack gap='0.75rem'>
      {/* Female */}
      <Button
        color='gray'
        variant='contained'
        data-test-id='female-btn'
        sx={styles}
        onClick={() => onChangeHandler('Female')}
      >
        <Stack flexDirection='row' gap='0.5rem' height='1.5rem'>
          <div>
            <Icon name='women' w={16} h={24} view='0 0 16 24' />
          </div>

          <Typography fontWeight={600}>{t('Female')}</Typography>
        </Stack>
      </Button>

      {/* Male */}
      <Button
        color='gray'
        variant='contained'
        data-test-id='male-btn'
        sx={styles}
        onClick={() => onChangeHandler('Male')}
      >
        <Stack flexDirection='row' gap='0.5rem' height='1.5rem'>
          <div>
            <Icon name='men' w={16} h={24} view='0 0 16 24' />
          </div>

          <Typography fontWeight={600}>{t('Male')}</Typography>
        </Stack>
      </Button>

      {/* Other */}
      <Button
        color='gray'
        variant='contained'
        data-test-id='other-btn'
        sx={styles}
        onClick={() => onChangeHandler('Other')}
      >
        <Stack flexDirection='row' gap='0.5rem' height='1.5rem'>
          <div>
            <Icon name='unisex' />
          </div>

          <Typography fontWeight={600}>{t('Other')}</Typography>
        </Stack>
      </Button>
    </Stack>
  );
}
