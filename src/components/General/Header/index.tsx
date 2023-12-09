'use client';
import { useState } from 'react';

// mui imports
import { AppBar, Box, Container, Hidden, Link, Toolbar } from '@mui/material';

// local imports
import Icon from '@/components/General/Icon';
import HeaderMenu from './Menu';
import SearchBox from './SearchBox';

// styles
import classes from '@/assets/styleSheets/General/MainHeader.module.scss';
import { useAppSelector } from '@/context';

interface HeaderProps {
  showSearch?: boolean;
}

export default function MainHeader(props: HeaderProps) {
  const [auth] = useState(true);
  // Get user current location to set it as default value
  const userCurrentLocation = useAppSelector(
    (state) => state.userCurrentLocation.value
  );

  return (
    <Hidden mdDown>
      <Box className={classes.HeaderContainer}>
        <AppBar color='inherit' className={classes.HeaderApp}>
          <Container className={classes.Items}>
            <Toolbar disableGutters>
              <Link href='/' className={classes.Logo}>
                <Icon name='logo' w={200} h={20}></Icon>

                {/* Country code */}
                {userCurrentLocation !== null &&
                  userCurrentLocation?.country_short !== '-' && (
                    <span>{userCurrentLocation.country_short}</span>
                  )}
              </Link>
            </Toolbar>
            <Toolbar>{props.showSearch && <SearchBox />}</Toolbar>
            <Toolbar>{auth && <HeaderMenu />}</Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Hidden>
  );
}
