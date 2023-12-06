import palette from '@/assets/styleSheets/_palette.module.scss';

export const buttons = {
  styleOverrides: {
    root: {
      textTransform: 'none',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      fontWeight: '600',
      minHeight: '40px'
    },
    containedPrimary: {
      background: palette['primary500'],
      color: 'white',
      boxShadow: 'none',
      border: '1px solid ' + palette['primary500'],
      ':hover': {
        boxShadow: 'none'
      },
      ':disabled': {
        border: '1px solid ' + palette['primary500'],
        background: palette['primary500'],
        color: 'white',
        opacity: '50%'
      }
    },
    outlinedPrimary: {
      color: palette['gray700'],
      boxShadow: 'none',
      border: '1px solid ' + palette['gray200'],
      ':hover': {
        boxShadow: 'none',
        border: '1px solid ' + palette['gray200']
      }
    },
    outlinedSecondary: {
      color: palette['primary500'],
      boxShadow: 'none',
      border: '1px solid ' + palette['gray200'],
      ':hover': {
        boxShadow: 'none',
        border: '1px solid ' + palette['gray100']
      }
    }
  }
} as const;
