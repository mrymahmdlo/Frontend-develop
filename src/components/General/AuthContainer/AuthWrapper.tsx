import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// mui imports
import { Box, Grid, Hidden, IconButton } from '@mui/material';

// local imports
import MainHeader from '@/components/General/Header';
import Icon from '@/components/General/Icon';

// styles
import classes from '@/assets/styleSheets/General/AuthContainer.module.scss';

// assets
import Cover from '@/assets/images/Cover.png';
import { AuthContainerProps } from '.';

export default function AuthWrapper(props: AuthContainerProps) {
  const t = useTranslations();

  const router = useRouter();

  function goBackFunction() {
    router.push('/sign-up');
  }

  return (
    <Box className={classes.AuthContainer}>
      <Grid container direction={'column'}>
        <Hidden mdDown>
          <Grid container sx={{ display: props.hideHeader ? 'none' : 'flex' }}>
            <MainHeader />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          {!props.hideMobileHeader && (
            <Box className={props.title ? classes.Header : classes.Header2}>
              {!props.showBackIcon && <Box>{props.MobileBackComponent}</Box>}
              {props.showBackIcon && (
                <IconButton aria-label='back' onClick={goBackFunction}>
                  <Icon name='arrowLeft' w={18} h={18} view='0 0 24 24' />
                </IconButton>
              )}
              {props.title ?? <Icon name='logo' w={90} h={10} />}
              <Box
                width={
                  props.showBackIcon || props.BackComponent ? '26px' : '0px'
                }
              ></Box>
            </Box>
          )}
        </Hidden>
        {props.fillContainer ? (
          props.children
        ) : (
          <Grid container className={classes.AuthContainerBody}>
            <Grid item sm={12} md={6} className={classes.AuthForm}>
              <Box
                className={classes.Children}
                sx={{
                  minWidth: { xs: '300px', sm: '570px', md: '100%' },
                  p: { sm: 2, md: 'initial' },
                  width: '100%',
                  maxWidth: { xs: '280px', sm: '570px', md: '100%' }
                }}
              >
                {props.BackComponent ? (
                  <Hidden mdDown>
                    <Box className={classes.AuthFormLink}>
                      {props.BackComponent}
                    </Box>
                  </Hidden>
                ) : (
                  <Hidden mdDown>
                    <Box className={classes.AuthFormLink}>
                      <Link href={'/sign-up'}>
                        <Icon
                          name='flashRight'
                          w={18}
                          h={18}
                          view='0 0 24 24'
                        />
                        {t('Back to Sign up')}
                      </Link>
                    </Box>
                  </Hidden>
                )}

                {props.children}
              </Box>
            </Grid>
            <Grid item md={6} className={classes.ImageContainer}>
              <Image
                src={Cover}
                alt='auth cover'
                className={classes.ImageCover}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
