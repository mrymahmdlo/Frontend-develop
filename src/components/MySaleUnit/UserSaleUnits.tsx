/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import getWithToken from '@/utils/getWithToken';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function UserSaleUnits() {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  useEffect(() => {
    getWithToken('/saleUnit/user?page=0&size=10', 'GET')
      .then((res: any) => {
        console.log('object', res);
      })
      .catch((err: { message: any }) => {
        if (err.message) {
          dispatch(
            showSnackbar({
              message: t(err.message),
              severity: 'error'
            })
          );
        } else {
          dispatch(
            showSnackbar({
              message: t('Error 500'),
              severity: 'error'
            })
          );
        }
      });
  }, []);

  return <>saxd</>;
}
