import { Button, alpha } from '@mui/material';

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
          ? alpha(theme.palette.primary['500'], 1)
          : alpha(theme.palette.gray['100'], 1),
        borderColor: isActive
          ? alpha(theme.palette.primary['500'], 1)
          : alpha(theme.palette.gray['200'], 1),
        boxShadow: 'none',
        '&:active, &:focus, &:hover': {
          backgroundColor: isActive
            ? alpha(theme.palette.primary['600'], 1)
            : alpha(theme.palette.gray['200'], 1),
          boxShadow: 'none'
        }
      })}
      variant='contained'
    >
      {children}
    </Button>
  );
}
