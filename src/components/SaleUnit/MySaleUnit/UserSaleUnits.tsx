/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import getWithToken from '@/utils/getWithToken';
import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Media from './SaleUnitCard';

export default function UserSaleUnits() {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getWithToken('/saleUnit/user?page=0&size=20', 'GET')
      .then((res: any) => {
        setData(res.content);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Grid container display={'flex'} xs={12} justifyContent={'flex-start'}>
      {loading ? (
        <Media loading={loading} />
      ) : (
        data.map((k, index) => (
          <Grid item key={index} xs={4}>
            <Media loading={loading} data={k} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
