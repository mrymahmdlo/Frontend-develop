'use client';

// mui imports
import { Avatar, Grid, IconButton } from '@mui/material';
import { Icon } from '@/components/General';
import theme from '@/lib/ThemeRegistery/theme';

export default function HeaderMenu() {
  // todo
  // add authorized if needed
  const isAuthorized = false;
  if (isAuthorized) {
    return <></>;
  }
  return (
    <Grid container>
      <IconButton aria-haspopup='true' color='inherit'>
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
