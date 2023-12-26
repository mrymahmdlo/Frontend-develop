'use client';

import { AuthContainer } from '@/components/General';
import { Grid } from '@mui/material';
import Provider from '@/components/OnBoardingPage/Provider';
import Slider from '@/components/OnBoardingPage/Slider';

export default function Home() {
  return (
    <AuthContainer fillContainer hideHeader hideMobileHeader>
      <Grid
        container
        justifyContent={'space-between'}
        alignContent={'center'}
        sx={{ minHeight: '760px' }}
      >
        <Grid item xs={12} md={6}>
          <Slider />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          mt={2}
          container
          justifyContent={'center'}
          alignContent={'center'}
        >
          <Provider />
        </Grid>
      </Grid>
    </AuthContainer>
  );
}
