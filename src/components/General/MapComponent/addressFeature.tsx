'use client';

import { Icon } from '@/components/General';
import { Grid, Typography } from '@mui/material';

export default function AddressFeature() {
  return (
    <>
      <Grid container display={'grid'}>
        <Grid item display={'flex'}>
          <Icon name='phoneNum' h={40} w={40} view='0 0 35 35' />
          <Typography className='color-light'> تلفن ثابت :</Typography>
          <Typography> ۰۱۱-۵۴۲۳۲۴۴۲</Typography>
        </Grid>
        <Grid item display={'flex'}>
          <Icon name='postalCard' h={40} w={40} view='0 0 35 35' />
          <Typography className='color-light'> ایمیل:</Typography>
          <Typography>
            <a href='mailto:info@digibargh-m.com'>info@digibargh-m.com</a>
          </Typography>
        </Grid>
        <Grid item display={'flex'}>
          <Icon name='address' h={40} w={40} view='0 0 35 35' />
          <Typography className='color-light'>آدرس:</Typography>
          <Typography>
            تنکابن،خیابان جمهوری،جنب پمپ بنزین، پلاک ۳۳۹.۰
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
