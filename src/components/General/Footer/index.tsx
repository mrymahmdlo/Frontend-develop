'use client';

import style from '@/assets/styleSheets/General/Footer.module.scss';
import Icon from '@/components/General/Icon';
import { Container, Divider, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import confirm from '../../../assets/images/Confirm.png';
import logo from '../../../assets/pngs/logo.png';
import NewsLetter from './NewsLetter';
import { links } from './footerList';

interface IntProps {
  isNews: boolean;
}

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
              <Image
                src={logo}
                alt={`logo`}
                loading='lazy'
                style={{ width: '100%', height: 'auto' }}
              />
              <Typography
                mt={2}
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
              <Grid item display={'flex'} xs={12} mt={'16px'} gap={'8px'}>
                <Link
                  href='https://www.youtube.com/@digibargh-m'
                  rel='noopener noreferrer'
                  target='_blank'
                  className={style.Items}
                >
                  <Icon name='grayYoutube' view='0 0 20 17' />
                </Link>
                <Link
                  href='https://www.aparat.com/digibargh_m'
                  rel='noopener noreferrer'
                  target='_blank'
                  className={style.Items}
                >
                  <Icon name='aparat' view='0 0 48 48' />
                </Link>
                {/* <Link href='#' className={style.Items}>
                  <Icon name='grayWhatsApp' />
                </Link> */}
                <Link
                  href='https://www.instagram.com/digibargh_m'
                  rel='noopener noreferrer'
                  target='_blank'
                  className={style.Items}
                >
                  <Icon name='grayInstagram' />
                </Link>
                {/* <Link href='#' className={style.Items}>
                  <Icon name='grayLinkedIn' view='0 0 20 20' />
                </Link> */}
              </Grid>
              <Typography mt={'16px'} fontSize={'14px'} color={'#8E98A8'}>
                © 2023, تمامی حقوق متعلق به وبسایت دیجی برق میباشد
              </Typography>
              <Divider
                style={{ backgroundColor: '#33435A', marginTop: '32px' }}
              />
              <Grid item display={'flex'} xs={12} justifyContent={'start'}>
                <a
                  target='_blank'
                  href='https://trustseal.enamad.ir'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={confirm}
                    alt={`confirm`}
                    loading='lazy'
                    width={100}
                    style={{ marginTop: '1em', cursor: 'pointer' }}
                  />
                </a>
              </Grid>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography mb={'16px'} fontSize={'18px'} fontWeight={600}>
                محصولات
              </Typography>
              <Grid item display={'grid'} className={style.AlignDots}>
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
                شرکت ها
              </Typography>
              <Grid item display={'grid'} className={style.AlignDots}>
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
                لینک های سریع
              </Typography>
              <Grid item display={'grid'} className={style.AlignDots}>
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

            <Grid item xs={12} md={2}>
              <Typography
                component={Link}
                href='/help-center'
                mb={'16px'}
                fontSize={'18px'}
                fontWeight={600}
                underline='hover'
                display={'list-item'}
              >
                سوالات متداول
              </Typography>
          
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
