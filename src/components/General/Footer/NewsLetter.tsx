import style from '@/assets/styleSheets/General/Footer.module.scss';
import Icon from '@/components/General/Icon';
import { Button, Grid, TextField, Typography } from '@mui/material';

function NewsLetter() {
  return (
    <footer className={style.FooterSearch} data-test='newsletter-section'>
      <Grid display={'flex'} alignItems={'center'} container>
        <Grid
          xs={12}
          sm={12}
          md={7}
          item
          display={'grid'}
          alignItems={'stretch'}
        >
          <Typography
            fontSize={'18px'}
            fontWeight={700}
            className={style.EmailText}
          >
            عضویت در خبرنامه دیجی برق
          </Typography>
          <Typography width={'90%'} className={style.EmailSubText}>
            فقط کمپین ها و تخفیف های ویژه
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={5}
          display={'flex'}
          alignItems={'center'}
          direction={'row-reverse'}
          item
        >
          <TextField
            variant='filled'
            sx={(theme) => ({
              width: '100%',
              '& label': {
                color: `${theme.palette.gray.main} !important`,
                height: '60px',
                right: 0,
                marginRight: '2em',
                direction: 'ltr'
              },
              '& .MuiFilledInput-root': {
                border: `1px solid`,
                borderColor: '#54C2F7',
                overflow: 'hidden',
                borderRadius: '30px',
                backgroundColor: '#54C2F7',
                transition: theme.transitions.create([
                  'border-color',
                  'background-color',
                  'box-shadow'
                ]),
                minWidth: '100%',
                width: 'fit-content',
                height: '48px'
              },
              '& .mui-1ui5kwx-MuiFormControl-root-MuiTextField-root': {
                flexDirection: 'row-reverse !important'
              },
              '& input': {
                width: '100%'
              },
              '&.MuiFilledInput-root:hover': {
                backgroundColor: '#54C2F7 !important',
                borderRadius: '30px'
              }
            })}
            label={
              <Grid
                direction={'row-reverse'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Icon name='sms' text='ایمیل خود را وارد کنید' />
              </Grid>
            }
          />
          <Button className={style.EmailButton}>ارسال</Button>
        </Grid>
      </Grid>
    </footer>
  );
}

export default NewsLetter;
