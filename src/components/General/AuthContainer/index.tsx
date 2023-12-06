'use client';

// mui imports
import { Box, Container, Hidden } from '@mui/material';

// local imports
import Footer from '@/components/General/Footer';
import ReduxProvider from '@/context/ReduxProvider';
import ModalContainer from '@/components/General/Modal';
import AletContainer from '@/components/General/Alert';
import AuthWrapper from './AuthWrapper';
import { CustomSnackbar, NetworkChecker } from '@/components/General';

// styles
import classes from '@/assets/styleSheets/General/AuthContainer.module.scss';

export interface AuthContainerProps {
  children?: React.ReactNode; // main part of container
  title?: React.ReactNode; // change title of mobile form
  BackComponent?: React.ReactNode; // change component of back icon in desktop
  showBackIcon?: boolean; // show back icon in mobile form
  MobileBackComponent?: React.ReactNode; // change component of back icon in mobile
  hideHeader?: boolean; // remove header from desktop
  hideNewsLetter?: boolean; // remove news letter in footer from desktop
  fillContainer?: boolean; // remove right picture from desktop form
  hideMobileHeader?: boolean; // remove header from mobile form
}

export default function AuthContainer(props: AuthContainerProps) {
  return (
    <ReduxProvider>
      <Container className={classes.MainContainer}>
        <AuthWrapper {...props} />
      </Container>
      <Hidden mdDown>
        <Box className={classes.FooterContainer}>
          <Footer isNews={!props.hideNewsLetter} />
        </Box>
      </Hidden>
      <ModalContainer />
      <AletContainer />
      {/* Check user is offline or not */}
      <NetworkChecker />
      {/* Snackbar */}
      <CustomSnackbar />
    </ReduxProvider>
  );
}
