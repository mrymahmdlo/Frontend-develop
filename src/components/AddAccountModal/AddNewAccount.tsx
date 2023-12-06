'use client';

import { useAppDispatch } from '@/context';
import { hideAlert, showAlert } from '@/context/slices/alertSlice';
import { Avatar, Button, Grid, Typography, alpha } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function AddNewAccount() {
  return (
    <>
      <ModalButton />
    </>
  );
}

const ModalButton = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Button
      onClick={() =>
        dispatch(
          showAlert({
            alertState: true,
            alertContent: (
              <Grid
                container
                width={{ md: 375, xs: '100%' }}
                display={'grid'}
                gap={2}
              >
                <Button
                  href='/log-in'
                  variant='contained'
                  type='submit'
                  onClick={handleClose}
                  sx={(theme) => ({
                    width: '100%',
                    height: '3rem',
                    '&.Mui-disabled': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0
                      )}`,
                      color: '#FFF'
                    }
                  })}
                >
                  <Typography fontWeight={600}>
                    {t('Log in to existing account')}
                  </Typography>
                </Button>
                <Button
                  href='/sign-up'
                  fullWidth
                  variant='outlined'
                  color='primary'
                  onClick={handleClose}
                >
                  <Typography fontWeight={600}>
                    {t('Create a new account')}
                  </Typography>
                </Button>
              </Grid>
            ),
            alertHeaderTitle: (
              <Typography fontWeight={'bold'} sx={{ mb: 2 }}>
                {t('Add Account')}
              </Typography>
            )
          })
        )
      }
      sx={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-start',
        p: 0,
        color: 'black',
        '&:hover': {
          background: 'transparent'
        }
      }}
    >
      <Avatar alt='avatar' src='/images/AvatarPlus.png' />
      <Typography fontWeight={'bold'}>{t('Add Account')}</Typography>
    </Button>
  );
};
