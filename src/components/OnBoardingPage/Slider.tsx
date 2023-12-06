import Carousel from '@/components/General/Carousel';
import { Grid } from '@mui/material';

export default function Slider() {
  const images = [
    {
      src: '/assets/images/slide0.png',
      height: 360,
      width: 512,
      header: 'Leading',
      subHeader: ' Cryptocurrency exchange',
      text: '500+ cryptocurrency'
    },
    {
      src: '/assets/images/slide1.png',
      height: 360,
      width: 512,
      header: 'Licensed',
      subHeader: ' operation Audited by top firm',
      text: 'Obtained regulatory license from the EU, US, Canada and Australia.Released PoR certification from Mazars and passed the security audit by Certik.'
    },
    {
      src: '/assets/images/slide2.png',
      height: 360,
      width: 512,
      header: 'Largest',
      subHeader: ' Crypto trading community',
      text: 'Auto copy elite traders’ strategies in real time'
    }
  ];

  return (
    <Grid container>
      <Carousel images={images} />
    </Grid>
  );
}
