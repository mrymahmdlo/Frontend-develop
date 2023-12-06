'use client';

import { CustomTextField, Icon, SubmitButton } from '@/components/General';
import {
  Box,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography,
  debounce
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import useFavoriteMarketStepTwo from './hooks/useFavoriteMarketStepTwo';

export default function FavoriteMarketStepTwo({
  selectedMarket
}: {
  selectedMarket: string[];
}) {
  const t = useTranslations();

  const {
    setSearch,
    onSelectSubmarket,
    onDeselectSubmarket,
    onSubmit,
    selectedSubMarket,
    subMarketsList
  } = useFavoriteMarketStepTwo(selectedMarket);

  // List item styles
  const listItemStyles: SxProps<Theme> = (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '0.75rem',
    border: '1px solid',
    borderColor: theme.palette.gray['200'],
    p: '0.5rem',
    gap: '0.5rem',
    '& > div': {
      height: '2.5rem'
    },
    '& h6': {
      color: theme.palette.gray['700'],
      lineHeight: '21px'
    }
  });

  // Coin name styles
  const coinNameStyles: SxProps<Theme> = (theme) => ({
    color: theme.palette.gray['700'],
    opacity: 0.5
  });

  // Seleced item styles
  const selectedItemStyles: SxProps<Theme> = (theme) => ({
    py: '0.75rem',
    px: '1.5rem',
    alignItems: 'center',
    borderRadius: '0.75rem',
    backgroundColor: theme.palette.gray['100'],
    position: 'relative',
    '& .icon-container': {
      p: '0.25rem',
      borderRadius: '9999px',
      backgroundColor: '#FFF'
    },
    '& .select-icon': {
      position: 'absolute',
      top: '0.125rem',
      right: '0.125rem'
    }
  });

  return (
    <form onSubmit={onSubmit} data-test-id='favorite-markets-step-two'>
      <Stack gap='1.5rem'>
        <Box>
          <CustomTextField
            placeholder={t('Search')}
            borderRadius='99999px'
            inputWidth='26.25rem'
            onChange={debounce(
              (value) => setSearch(value.target.value.toLowerCase()),
              1000
            )}
            InputProps={{
              sx: {
                '& input': {
                  p: '0.688rem 0.25rem',
                  paddingTop: '0.75rem'
                }
              },
              startAdornment: (
                <Icon name='search' w={16} h={16} view='0 0 16 16' />
              )
            }}
          />
        </Box>

        {/* Selected item list */}
        <Stack flexDirection='row'>
          <Swiper
            slidesPerView={2}
            spaceBetween={12}
            breakpoints={{
              570: { slidesPerView: 4 }
            }}
            style={{ width: '100%' }}
          >
            {selectedSubMarket?.map((item, index) => (
              <SwiperSlide key={`selected-${index}`}>
                <Stack
                  data-test-id={`selected-submarket-${index}`}
                  sx={selectedItemStyles}
                  gap='0.5rem'
                  onClick={() => onDeselectSubmarket(item)}
                >
                  <Box
                    className='icon-container'
                    sx={{ width: 40, height: 40, overflow: 'hidden' }}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.sign}`}
                      alt={item.abbreviation}
                    />
                  </Box>

                  <Box
                    className='market-label'
                    textAlign='center'
                    whiteSpace='nowrap'
                    width='80px'
                  >
                    <Typography
                      variant='subtitle2'
                      fontWeight={500}
                      data-test-id='selected-submarket-abbreviation'
                    >
                      {item.abbreviation}
                    </Typography>

                    <Box textOverflow='ellipsis' overflow='hidden'>
                      <Typography
                        variant='caption'
                        fontWeight={500}
                        sx={coinNameStyles}
                        data-test-id='selected-submarket-name'
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className='select-icon'>
                    <Icon name='checkedCircle' w={16} h={16} view='0 0 16 16' />
                  </Box>
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>

        {/* Sub market lists */}
        <Grid container spacing='0.75rem'>
          {subMarketsList
            ?.filter((item, index) => index < 6)
            .map((item, index) => (
              <Grid
                data-test-id={`submarket-${index}`}
                item
                xs={12}
                sm={6}
                key={index}
                onClick={() => onSelectSubmarket(item)}
              >
                <Stack sx={listItemStyles}>
                  <Box sx={{ width: 40, height: 40, overflow: 'hidden' }}>
                    <Image
                      width={40}
                      height={40}
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.sign}`}
                      alt={item.abbreviation}
                    />
                  </Box>

                  <Box className='market-label'>
                    <Typography
                      variant='subtitle2'
                      fontWeight={500}
                      data-test-id='submarket-abbreviation'
                    >
                      {item.abbreviation}
                    </Typography>

                    <Typography
                      data-test-id='submarket-name'
                      variant='caption'
                      fontWeight={500}
                      sx={coinNameStyles}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
        </Grid>

        {/* Submit btn */}
        <SubmitButton>
          <Typography fontWeight={600}>{t('Start')}</Typography>
        </SubmitButton>
      </Stack>
    </form>
  );
}
