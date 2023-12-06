'use client';

import Icon from '@/components/General/Icon';
import { IconsListType } from '@/components/General/Icon/iconLists';
import { Button, Stack, SxProps } from '@mui/material';
import GrayDotSpinner from '../DotSpinnerGray';

interface IntProps {
  label?: string;
  iconName?: IconsListType;
  id?: string;
  onClick?: () => void;
  showSpinner: boolean;
}

export default function ProviderBtn({
  label,
  iconName,
  id,
  onClick,
  showSpinner
}: IntProps) {
  const styles: SxProps = {
    flex: 1,
    color: 'darkGray.main',
    fontSize: '1rem',
    minHeight: '3rem',
    width: '100%'
  };

  return (
    <Button
      sx={styles}
      color='primary'
      variant='outlined'
      autoCapitalize='false'
      id={id}
      onClick={onClick}
    >
      {showSpinner ? (
        <GrayDotSpinner />
      ) : (
        <Stack flexDirection='row' gap={'0.5rem'}>
          {/* Start icon */}
          {iconName && <Icon name={iconName} />}

          {/* Label */}
          {label && <span>{label}</span>}
        </Stack>
      )}
    </Button>
  );
}
