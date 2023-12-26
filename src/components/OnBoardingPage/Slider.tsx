import Carousel from '@/components/General/Carousel';
import { Grid } from '@mui/material';

export default function Slider() {
  const images = [
    {
      src: '/assets/images/slide0.png',
      height: 360,
      width: 512,
      header: 'تبلیغات آسان',
      subHeader: 'نزدیکترین عامل برق به شما',
      text: 'فعالیت مختص خانواده برق'
    },
    {
      src: '/assets/images/slide1.png',
      height: 360,
      width: 512,
      header: 'معرفی مشاغل',
      subHeader: 'تجربه یک حقوق عالی',
      text: 'تبلیغات و معرفی مکانهای کسبی درخانواده بزرگ برق و محصولاتشان'
    },
    {
      src: '/assets/images/slide2.png',
      height: 360,
      width: 512,
      header: 'عاملین برق',
      subHeader: '  الکترونیک ، الکتریک ، صنعت',
      text: 'واردکننده یا صادرکننده تولیدکنندگان'
    }
  ];

  return (
    <Grid container>
      <Carousel images={images} />
    </Grid>
  );
}
