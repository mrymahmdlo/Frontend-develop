'use client';

import { Icon } from '@/components/General';
import theme from '@/lib/ThemeRegistery/theme';
import { getAppToken } from '@/utils/tokenHandler';
import { Avatar, Button, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HeaderMenu() {
  const router = useRouter();
  const tokens = getAppToken();

  if (tokens) {
    return (
      <Grid container gap={3}>
        <Grid item>
          <Button onClick={() => router.push('/sale-unit')}>
            ثبت واحد صنفی
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => router.push('/profile')}
            aria-haspopup='true'
            color='inherit'
          >
            <Avatar
              sx={{
                background: 'transparent',
                border: '1px solid ' + theme.palette.gray[100]
              }}
            >
              <Icon name='user' h={24} w={24} view='-2 0 28 28' />
            </Avatar>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <Grid>
        <Button onClick={() => router.push('/on-boarding')}>ورود/ثبت نام</Button>
      </Grid>
    </>
  );
}
