'use client';

// mui imports
import { Icon } from '@/components/General';
import theme from '@/lib/ThemeRegistery/theme';
import { Avatar, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HeaderMenu() {
  const isAuthorized = false;
  const router = useRouter();

  if (isAuthorized) {
    return <></>;
  }
  return (
    <Grid container>
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
  );
}
