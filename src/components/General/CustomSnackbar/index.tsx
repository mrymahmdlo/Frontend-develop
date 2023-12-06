'use client';

import { useAppDispatch, useAppSelector } from '@/context';
import { Alert, Snackbar } from '@mui/material';
import { hideSnackbar } from '@/context/slices/snackbarSlice';
import { Icon } from '@/components/General';
import { useEffect, useState } from 'react';

const AlertIcon = ({ severity }: { severity?: string }) => {
  if (severity === 'error') {
    return <Icon name='danger' />;
  } else if (severity === 'success') {
    return <Icon name='tickCircle' />;
  }
};

export default function CustomSnackbar() {
  const dispatch = useAppDispatch();

  const [windowSize, setWindowSize] = useState(900);

  useEffect(() => {
    if (window) setWindowSize(window.innerWidth);

    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Snackbar redux state
  const snackbar = useAppSelector((state) => state.snackbar);

  // Handle on close snackbar
  const onCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };
  return (
    <>
      {snackbar.type === 'alert' ? (
        <Snackbar
          anchorOrigin={{
            vertical: windowSize <= 900 ? 'bottom' : 'top',
            horizontal: 'center'
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={onCloseSnackbar}
        >
          <Alert
            variant='filled'
            onClose={onCloseSnackbar}
            color={snackbar.severity}
            sx={{
              width: '100%',
              minWidth: '280px',
              borderRadius: '0.75rem',
              '& .MuiAlert-message': {
                color: '#FFF'
              },
              '& .MuiSvgIcon-root': {
                fill: '#FFF'
              }
            }}
            icon={<AlertIcon severity={snackbar.severity} />}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: windowSize <= 900 ? 'bottom' : 'top',
            horizontal: 'center'
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={onCloseSnackbar}
          message={snackbar.message}
        />
      )}
    </>
  );
}
