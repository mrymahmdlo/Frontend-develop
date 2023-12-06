import AuthProviderBtns from '@/components/General/AuthProviderBtns';
import { Button, Grid, SxProps } from '@mui/material';

export default function Provider() {
  const SignUpStyles = {
    color: '#fff',
    flex: 1,
    maxHeight: '3rem',
    fontSize: '1rem',
    width: '100%'
  };
  const SignInStyles: SxProps = {
    flex: 1,
    color: '#1da1f3',
    fontSize: '1rem',
    minHeight: '3rem',
    width: '100%',
    borderColor: '#fff'
  };
  return (
    <Grid
      alignItems={'center'}
      gap={'0.75rem'}
      container
      justifyContent={'center'}
    >
      <Grid item xs={12}>
        <Button variant='contained' href='/sign-up' sx={SignUpStyles}>
          Sign up
        </Button>
      </Grid>

      <Grid item xs={12}>
        <AuthProviderBtns />
      </Grid>

      <Grid item xs={12}>
        <Button
          sx={SignInStyles}
          color='primary'
          variant='outlined'
          autoCapitalize='false'
          href='/log-in'
        >
          Log In
        </Button>
      </Grid>
    </Grid>
  );
}
