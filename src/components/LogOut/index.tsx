import { Icon } from '@/components/General';
import { useAppDispatch } from '@/context';
import { hideAlert, showAlert } from '@/context/slices/alertSlice';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import theme from '@/lib/ThemeRegistery/theme';
import { apiHandler } from '@/utils';
import {
  removeAppToken,
  removeCurrentAccountCookie
} from '@/utils/tokenHandler';
import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import AletContainer from '../General/Alert';

export default function LogOut() {
  const dispatch = useAppDispatch();

  return (
    <>
      <IconButton
        onClick={() =>
          dispatch(
            showAlert({
              alertState: true,
              alertContent: <ModalButton />
            })
          )
        }
        aria-haspopup='true'
        color='inherit'
      >
        <Avatar
          sx={{
            background: 'transparent',
            border: '1px solid ' + theme.palette.gray[100]
          }}
        >
          <Icon name='logOut' h={24} w={24} />
        </Avatar>
      </IconButton>
      <AletContainer />
    </>
  );
}

const ModalButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logOut = async () => {
    apiHandler('/user/logout', 'POST', {}, true)
      .then(() => {
        removeCurrentAccountCookie();
        removeAppToken();
        dispatch(
          showSnackbar({
            message: 'شما از حساب کاربری خود خارج شدید',
            severity: 'success'
          })
        );
        handleClose();
        router.refresh();
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Grid gap={3} container display={'grid'}>
      <Grid item>
        <Typography>آیا میخواهید از حساب کاربری خود خارج شوید؟</Typography>
      </Grid>
      <Grid item display={'flex'} justifyContent={'space-evenly'}>
        <Button
          style={{ height: '2rem' }}
          variant='contained'
          color='primary'
          onClick={logOut}
        >
          بله
        </Button>
        <Button onClick={handleClose} style={{ height: '2rem' }}>
          خیر
        </Button>
      </Grid>
    </Grid>
  );
};
