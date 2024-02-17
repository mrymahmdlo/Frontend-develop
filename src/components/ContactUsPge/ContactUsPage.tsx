'use client';
import { useRouter } from 'next/navigation';

// mui imports
import { Button, Card, Grid, Typography } from '@mui/material';

// local imports
import Icon from '@/components/General/Icon';
// styles
import classes from '@/assets/styleSheets/help-center.module.scss';
import MapComponent from '../General/MapComponent';

export default function ContactUsPage() {
  const router = useRouter();

  function backPreviousPage() {
    router.back();
  }

  return (
    <div className={classes.HelpCenterContainer}>
      <Card className={classes.CardContainer}>
        <Grid
          container
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item container className={classes.TitleContainer}>
            <Grid item xs={1} md={2} container justifyContent={'flex-start'}>
              <Button
                className={classes.BackIconButton}
                onClick={backPreviousPage}
              >
                <Icon name='arrowLeft' view='0 0 26 26' />
              </Button>
            </Grid>
            <Grid
              item
              xs={10}
              md={8}
              container
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Typography className={classes.Title}>
                تماس با دیجی برق
              </Typography>
            </Grid>
            <Grid item xs={1} md={2}></Grid>
          </Grid>
          <Grid item>
            <Typography>
              کاربر گرامی، لطفاً در صورت وجود هرگونه سوال یا ابهامی، پیش از
              ارسال ایمیل یا تماس تلفنی با دیجی بـرق، بخش قوانین و مقررات را
              ملاحظه فرمایید و در صورتی که پاسخ خود را نیافتید، با ما تماس
              بگیرید.
            </Typography>
          </Grid>
          <MapComponent />
        </Grid>
      </Card>
    </div>
  );
}
