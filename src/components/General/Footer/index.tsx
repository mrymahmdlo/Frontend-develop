'use client';

import style from '@/assets/styleSheets/General/Footer.module.scss';
import Icon from '@/components/General/Icon';
import { Container, Divider, Grid, Link, Typography } from '@mui/material';
import NewsLetter from './NewsLetter';
import { links } from './footerList';

interface IntProps {
  isNews: boolean;
}

// todo @Maryam
// icon hover check

function Footer({ isNews }: IntProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: isNews ? '5rem' : '0',
        position: 'relative'
      }}
    >
      {isNews && <NewsLetter />}
      <footer className={style.FooterContainer}>
        <Container>
          <Grid
            container
            display={'flex'}
            justifyContent={'space-between'}
            pt={4}
          >
            <Grid item xs={12} md={2}>
              <Icon name='whiteLogo' w={128} h={42.28} view='0 0 128 43' />
              <Typography
                mt={6}
                fontSize={16}
                fontWeight={500}
                lineHeight={'21px'}
              >
                تمامی کسب‌وکارهای فعال در دیجی برق مدنی افراد شناخته شده و دارای
                هویت کسبی بوده و در زمینه‌های فروشنده ،پخش‌کننده ،تولیدکننده
                ،بازرگان و خدمات دارای مهارت و تجربه میباشند.
                <br />
                اگر شماهم یک فرد صنفی دارای مجوز در این زمینه ها میباشید و علاقه
                مند به توسعه کسب و کارتان هستید همین امروز در سایت دیجی برق مدنی
                ثبت نام کنید.
              </Typography>
              <Divider
                style={{ backgroundColor: '#33435A', marginTop: '32px' }}
              />
              <Grid
                item
                display={'flex'}
                xs={12}
                mt={'16px'}
                gap={'8px'}
                data-test='social-icons'
              >
                <Link href='#' className={style.Items}>
                  <Icon name='grayYoutube' view='0 0 20 17' />
                </Link>
                <Link href='#' className={style.Items}>
                  <Icon name='grayFaceBook' view='0 0 22 22' />
                </Link>
                <Link href='#' className={style.Items}>
                  <Icon name='grayWhatsApp' />
                </Link>
                <Link href='#' className={style.Items}>
                  <Icon name='grayInstagram' />
                </Link>
                <Link href='#' className={style.Items}>
                  <Icon name='grayLinkedIn' view='0 0 20 20' />
                </Link>
              </Grid>
              <Typography mt={'16px'} fontSize={'14px'} color={'#8E98A8'}>
                © 2023, All rights reserved
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography mb={'16px'} fontSize={'18px'} fontWeight={600}>
                Products
              </Typography>
              <Grid
                item
                display={'grid'}
                data-test='product-links'
                className={style.AlignDots}
              >
                {Object.entries(links.Products)
                  .filter((obj) => obj[0] !== 'length')
                  .map(([key, value]) => (
                    <Link
                      key={key}
                      href={value}
                      underline='none'
                      display={'list-item'}
                      m={1}
                      className={style.Items}
                    >
                      {key}
                    </Link>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography mb={'16px'} fontSize={'18px'} fontWeight={600}>
                Company
              </Typography>
              <Grid
                item
                display={'grid'}
                data-test='company-links'
                className={style.AlignDots}
              >
                {Object.entries(links.Company)
                  .filter((obj) => obj[0] !== 'length')
                  .map(([key, value]) => (
                    <Link
                      key={key}
                      href={value}
                      underline='none'
                      display={'list-item'}
                      m={1}
                      className={style.Items}
                    >
                      {key}
                    </Link>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography mb={'16px'} fontSize={'18px'} fontWeight={600}>
                Community
              </Typography>
              <Grid
                item
                display={'grid'}
                data-test='community-links'
                className={style.AlignDots}
              >
                {Object.entries(links.Community)
                  .filter((obj) => obj[0] !== 'length')
                  .map(([key, value]) => (
                    <Link
                      key={key}
                      href={value}
                      underline='none'
                      display={'list-item'}
                      m={1}
                      className={style.Items}
                    >
                      {key}
                    </Link>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography mb={'16px'} fontSize={'18px'} fontWeight={600}>
                For business
              </Typography>
              <Grid
                item
                display={'grid'}
                data-test='business-links'
                className={style.AlignDots}
              >
                {Object.entries(links['For business'])
                  .filter((obj) => obj[0] !== 'length')
                  .map(([key, value]) => (
                    <Link
                      key={key}
                      href={value}
                      underline='none'
                      display={'list-item'}
                      m={1}
                      className={style.Items}
                    >
                      {key}
                    </Link>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
