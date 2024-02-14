'use client';

import classes from '@/assets/styleSheets/General/AuthContainer.module.scss';
import { AuthContainer } from '@/components/General';
import Provider from '@/components/OnBoardingPage/Provider';
import Slider from '@/components/OnBoardingPage/Slider';
import { Grid } from '@mui/material';

export default function onBoarding() {
  return (
    <AuthContainer fillContainer hideHeader hideMobileHeader>
      <Grid
        container
        justifyContent={'space-between'}
        alignContent={'center'}
        sx={{ minHeight: '760px' }}
      >
        <Grid item xs={12} md={6} className={classes.ImageContainer}>
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
