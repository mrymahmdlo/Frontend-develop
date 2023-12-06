/* eslint-disable camelcase */
'use client';

import AletContainer from '@/components/General/Alert';
import { useAppDispatch } from '@/context';
import { showAlert } from '@/context/slices/alertSlice';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getAppToken,
  getCurrentAccountCookie,
  setCurrentAccountCookie
} from '@/utils';
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import AddNewAccount from './AddNewAccount';
import { Icon } from '@/components/General';
import { ListOfTokens, TokenType } from '@/utils/tokenHandler';

interface Account {
  full_name?: 'string';
  avatar?: 'string';
  token: 'string';
  email: 'string';
  is_valid: boolean;
}

export default function AddAccount() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      showAlert({
        alertState: true,
        alertContent: <ModalButton />
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        data-testid='add-account-modal'
        onClick={() =>
          dispatch(
            showAlert({
              alertState: true,
              alertContent: <ModalButton />
            })
          )
        }
      >
        Add Account
      </Button>
      <AletContainer />
    </>
  );
}

const ModalButton = () => {
  const [alertContentKey, setAlertContentKey] = useState(0);

  const [account, setAccount] = useState<Account[]>([]);

  const [toggleProgress, setToggleProgress] = useState(false);

  const dispatch = useAppDispatch();

  const t = useTranslations();

  const [refresh_token, setRefreshToken] = useState('');

  const changeCurrentUser = async (userInfo: Account) => {
    setToggleProgress(true);

    apiHandler('/api/auth/refresh/', 'POST', {
      refresh: userInfo.token
    })
      .then((res) => {
        setCurrentAccountCookie(userInfo.email);

        const tokens = getAppToken() as string;
        let newToken: ListOfTokens;

        // eslint-disable-next-line prefer-const
        newToken = JSON.parse(tokens);

        if (tokens) {
          newToken?.map((item) => {
            const email = Object.keys(item)[0];
            if (email === userInfo.email) {
              item[email].refresh = res.refresh;
              item[email].access = res.access;
            }
          });
        }

        setRefreshToken(res.refresh);

        setAlertContentKey(alertContentKey + 1);

        const updatedAccounts = account.map((item) => {
          if (item.token === userInfo.token) {
            return {
              ...item,
              token: res.refresh
            };
          }
          return item;
        });

        setAccount(updatedAccounts);
      })
      .catch((err) => {
        if (err.errors?.length > 0) {
          dispatch(
            showSnackbar({
              message: err.errors.detail as string,
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
        setToggleProgress(false);
      });
  };

  useEffect(() => {
    const tokens = getAppToken() as string;
    if (!tokens) return;
    setToggleProgress(true);

    let newToken: ListOfTokens;
    let refreshes: string[] | undefined;

    // eslint-disable-next-line prefer-const
    newToken = JSON.parse(tokens);

    if (tokens) {
      refreshes = newToken
        ?.filter((i) => Object.keys(i).length > 0)
        .map((item) => {
          const email = Object.keys(item)[0];
          return item[email].refresh;
        });

      const currentAccount = getCurrentAccountCookie() as string;

      // Get user current account token
      const currentToken = JSON.parse(tokens).filter((item: TokenType) => {
        if (item[currentAccount]) return item;
      });

      if (currentToken[0]) {
        // Get access token
        const accessToken = currentToken[0][currentAccount].refresh;

        setRefreshToken(accessToken);
      }
    }

    apiHandler('/api/auth/accounts/', 'POST', {
      tokens: refreshes
    })
      .then((res) => {
        const validAccounts = res.filter(
          (obj: Account) => obj.is_valid === true
        );

        setAccount(validAccounts);
      })
      .catch((err) => {
        if (err.errors?.length > 0) {
          dispatch(
            showSnackbar({
              message: err.errors.detail as string,
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
        setToggleProgress(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container display={'grid'} gap={2} key={alertContentKey}>
      {toggleProgress ? (
        <Stack justifyContent='center' flexDirection='row' width='100%'>
          <CircularProgress />
        </Stack>
      ) : (
        account.map((item, index) => (
          <React.Fragment key={index}>
            <Grid
              data-testid='account-item'
              onClick={() => {
                changeCurrentUser(item);
              }}
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={5}
              style={{ cursor: 'pointer' }}
            >
              <Grid
                item
                sx={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  alt='avatar'
                  src={
                    item.avatar
                      ? process.env.NEXT_PUBLIC_SERVER_URL + item.avatar
                      : ''
                  }
                />
                <Typography fontWeight={'bold'}>{item.full_name}</Typography>
              </Grid>
              <Grid item data-testid='blue-tick-icon'>
                {item.token === refresh_token ? <Icon name='blueTick' /> : null}
              </Grid>
            </Grid>
          </React.Fragment>
        ))
      )}

      <AddNewAccount />
    </Grid>
  );
};
