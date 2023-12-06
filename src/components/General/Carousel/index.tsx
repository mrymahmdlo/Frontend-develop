'use client';

import Icon from '@/components/General/Icon';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageData {
  src: string;
  height: number;
  width: number;
  header: string;
  subHeader: string;
  text: string;
}
interface CarouselProps {
  images: ImageData[];
}

const slideStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

function Carousel({ images }: CarouselProps) {
  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Icon name='logo' w={256} h={100} view='0 0 120 50' />
      </Container>
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Container
              style={slideStyle}
              sx={{
                img: {
                  maxWidth: '90%',
                  height: 'auto'
                }
              }}
            >
              <Image
                src={image.src}
                alt={`Slide ${index + 1}`}
                loading='lazy'
                width={image.width}
                height={image.height}
              />
              <div className='swiper-lazy-preloader'></div>
            </Container>
            <div style={{ paddingBottom: '10px' }}>
              <Typography
                variant='h6'
                sx={{ textAlign: { xs: 'left', sm: 'center' } }}
              >
                {image.header}
              </Typography>
              <Typography
                variant='h6'
                sx={{ textAlign: { xs: 'left', sm: 'center' } }}
              >
                {image.subHeader}
              </Typography>
              <Typography
                fontSize={18}
                sx={{
                  textAlign: { xs: 'left', sm: 'center' },
                  fontSize: { xs: '14px', sm: '18px' }
                }}
              >
                {image.text}
              </Typography>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
