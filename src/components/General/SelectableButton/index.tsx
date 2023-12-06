import { Button } from '@mui/material';

interface IntSelectableButton {
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
}

export default function SelectableButton({
  children,
  isActive = false,
  onSelect
}: IntSelectableButton) {
  return (
    <Button
      onClick={onSelect}
      color={isActive ? 'primary' : 'gray'}
      sx={(theme) => ({
        p: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px',
        backgroundColor: isActive
          ? theme.palette.primary['500']
          : theme.palette.gray['100'],
        borderColor: isActive
          ? theme.palette.primary['500']
          : theme.palette.gray['200'],
        boxShadow: 'none',
        '&:active, &:focus, &:hover': {
          backgroundColor: isActive
            ? theme.palette.primary['600']
            : theme.palette.gray['200'],
          boxShadow: 'none'
        }
      })}
      variant='contained'
    >
      {children}
    </Button>
  );
}
