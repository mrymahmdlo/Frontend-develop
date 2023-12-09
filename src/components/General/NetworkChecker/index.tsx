'use client';

// import useGetCurrentLocation from '@/hooks/useGetCurrentLocation';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function NetworkChecker() {
  // Get user current location :/
  // useGetCurrentLocation();

  const t = useTranslations();
  // Snackbar state
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center'
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    function onlineHandler() {
      // Use is online
      setIsOnline(true);
    }

    function offlineHandler() {
      // User is offline
      setIsOnline(false);
      // Show snackbar
      setState({ ...state, open: true });
    }

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
      open={state.open}
      onClose={() => setState({ ...state, open: false })}
      message={t('You are offline')}
      key={state.vertical + state.horizontal}
    />
  );
}
