'use client';

import '@/assets/styleSheets/General/GrayBackground.scss';
import { AuthContainer } from '@/components/General';
import Slider from '@/components/OnBoardingPage/Slider';
import { Grid } from '@mui/material';

export default function HelpCenter() {
  return (
    <>
      <AuthContainer fillContainer>
        <>
          <Grid container p={6}>
            <Slider />
          </Grid>
        </>
      </AuthContainer>
    </>
  );
}
