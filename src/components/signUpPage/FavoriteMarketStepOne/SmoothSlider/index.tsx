import { Box } from '@mui/material';
import SmoothSliderCard from './SmoothSliderCard';
import { Icon } from '@/components/General';
import handDrawn from '@/assets/pngs/hand-drawn-nft.png';
import coloredDog from '@/assets/pngs/colored-dog.jpg';
import angryMonkey from '@/assets/pngs/angry-monkey.png';
import Image from 'next/image';

const SliderItems = () => {
  return (
    <>
      <div className='smooth-slide-container'>
        <Box className='smooth-slide'>
          <SmoothSliderCard color='#F7931A'>
            <Icon name='bitcoin' w={48} h={48} view='0 0 48 48' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#00C252' isNft={true}>
            <Image
              src={handDrawn}
              width={108}
              height={108}
              alt='hand drawn nft'
            />
          </SmoothSliderCard>

          <SmoothSliderCard color='#2A5ADA'>
            <Icon name='chainlink' w={48} h={56} view='0 0 48 56' />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide' sx={{ top: '-1.5rem' }}>
          <SmoothSliderCard color='#2A5ADA'>
            <Icon name='chainlink' w={48} h={56} view='0 0 48 56' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#988430' isMini={true}>
            <Icon name='dogecoin' w={48} h={48} view='0 0 48 48' />
          </SmoothSliderCard>

          <SmoothSliderCard color='linear-gradient(212deg, #09F5A7 0%, #49B4C1 33.33%, #9665E2 70.83%, #D921FE 100%)'>
            <Icon name='solana' w={56} h={44} view='0 0 56 44' />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide' sx={{ top: '-6.5rem' }}>
          <SmoothSliderCard color='#ECF0F1'>
            <Icon name='ethereum' w={30} h={48} view='0 0 30 48' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#ffbebc' isNft={true}>
            <Image src={coloredDog} width={92} height={117} alt='dog' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#F00500' isMini={true}>
            <Icon name='shiba' w={48} h={48} view='0 0 48 48' />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide'>
          <SmoothSliderCard color='#50AF95'>
            <Icon name='tether' w={48} h={48} view='0 0 48 48' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#F0B90B'>
            <Icon name='bnb' w={48} h={48} view='0 0 48 48' />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide' sx={{ top: '-6.5rem' }}>
          <SmoothSliderCard color='#ECF0F1'>
            <Icon name='ethereum' w={30} h={48} view='0 0 30 48' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#E31937'>
            <Icon name='tesla' w={56} h={56} view='0 0 56 56' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#191919' isMini={true}>
            <Icon
              name='whiteApple'
              w={46}
              h={56}
              view='0 0 46 56'
              style={{ p: 1 }}
            />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide'>
          <SmoothSliderCard color='#0178ff' isNft={true}>
            <Image src={angryMonkey} width={117} height={117} alt='monkey' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#ECF0F1'>
            <Icon name='ethereum' w={30} h={48} view='0 0 30 48' />
          </SmoothSliderCard>
        </Box>
      </div>

      <div className='smooth-slide-container'>
        <Box className='smooth-slide' sx={{ top: '-1.5rem' }}>
          <SmoothSliderCard color='#FFC95B'>
            <Icon name='decentraland' w={56} h={56} view='0 0 56 56' />
          </SmoothSliderCard>

          <SmoothSliderCard color='#D81F26' isMini={true}>
            <Icon name='netflix' w={56} h={15} view='0 0 56 15' />
          </SmoothSliderCard>

          <SmoothSliderCard color='linear-gradient(212deg, #09F5A7 0%, #49B4C1 33.33%, #9665E2 70.83%, #D921FE 100%)'>
            <Icon name='solana' w={56} h={44} view='0 0 56 44' />
          </SmoothSliderCard>
        </Box>
      </div>
    </>
  );
};

export default function SmoothSlider() {
  return (
    <div className='smooth-slider'>
      <div className='smooth-slide-track'>
        <SliderItems />

        <SliderItems />
      </div>
    </div>
  );
}
