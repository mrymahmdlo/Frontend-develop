import palette from '@/assets/styleSheets/_palette.module.scss';

export const input = {
  styleOverrides: {
    root: {
      borderRadius: '8px',
      backgroundColor: palette['gray100'],
      ':hover': {
        backgroundColor: palette['gray100']
      },
      ':before': {
        borderBottom: 'none !important'
      },
      ':after': {
        borderBottom: 'none'
      }
    }
  }
} as const;
