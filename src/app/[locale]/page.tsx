import { Grid } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h3>Hi DGB</h3>
      <Grid container gap={2}>
        <Grid item>
          <Link href='/on-boarding'>On boarding</Link>
        </Grid>
        <Grid item>
          <Link href='/sign-up'>Sign up</Link>
        </Grid>
        <Grid item>
          <Link href='/log-in'>Log in</Link>
        </Grid>
        <Grid item>
          <Link href='/forget-password'>Forget Password</Link>
        </Grid>
        <Grid item>
          <Link href='/help-center'>Help Center</Link>
        </Grid>
        <Grid item>
          <Link href='/demo'>Add account</Link>
        </Grid>
      </Grid>
    </main>
  );
}
