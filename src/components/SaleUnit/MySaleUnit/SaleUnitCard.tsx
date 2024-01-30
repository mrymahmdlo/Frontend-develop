/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import getWithToken from '@/utils/getWithToken';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, Divider, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { activityType, unitType } from '../saleUnitEnum';

interface MediaProps {
  loading?: boolean;
  data?: {
    id: number;
    name: string;
    unitType: string;
    activityType: string;
    address: string;
    bio: string;
    streetId: string;
    phoneNumbers: string[];
    saleUnitDocuments: {
      active: boolean;
      attachmentId: number;
      saleUnitDocumentType: string;
    }[];
  };
}

interface Address {
  id: number;
  name: string;
  city: {
    id: number;
    name: string;
    province: {
      id: number;
      name: string;
    };
  };
}

const getUnitTypeLabel = (value: string) => {
  const unitTypeObject = unitType.find((type) => type.value === value);
  return unitTypeObject ? unitTypeObject.label : '';
};

const getActivityTypeLabel = (value: string) => {
  const unitTypeObject = activityType.find((type) => type.value === value);
  return unitTypeObject ? unitTypeObject.label : '';
};

export default function Media(props: MediaProps) {
  const { loading, data } = props;
  const [defaultFile, setDefaultFile] = React.useState<File | null>(null);
  const [defaultPic, setDefaultPic] = React.useState<File | null>(null);
  const [address, setAddress] = React.useState<Address>();

  const router = useRouter();

  React.useEffect(() => {
    if (data?.streetId) {
      getWithToken(`/street/${data?.streetId}`, 'GET')
        .then((res: any) => {
          setAddress(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (data?.saleUnitDocuments) {
      let attachmentAvatarId: number;
      let attachmentNoId: number;
      const fetchImageAvatar = async () => {
        data.saleUnitDocuments
          .filter((k) => k.saleUnitDocumentType === 'PROFILE')
          .map((doc) => (attachmentAvatarId = doc.attachmentId));
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/file/getFile?attachmentId=${attachmentAvatarId}`
          );
          if (response.ok) {
            const blob = await response.blob();
            setDefaultFile(new File([blob], 'filename'));
          } else {
            console.error('Failed to fetch image:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      const fetchImageNo = async () => {
        data.saleUnitDocuments
          .filter((k) => k.saleUnitDocumentType !== 'PROFILE')
          .map((doc) => (attachmentNoId = doc.attachmentId));
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/file/getFile?attachmentId=${attachmentNoId}`
          );
          if (response.ok) {
            const blob = await response.blob();
            setDefaultPic(new File([blob], 'filename'));
          } else {
            console.error('Failed to fetch image:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      fetchImageAvatar();
      fetchImageNo();
    }
  }, []);

  return (
    <Card style={{ width: 'inherit' }} sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea>
        <CardHeader
          // avatar={
          //   loading ? (
          //     <Skeleton
          //       animation='wave'
          //       variant='circular'
          //       width={40}
          //       height={40}
          //     />
          //   ) : (
          //     <Avatar
          //       alt='avatar'
          //       style={{ marginLeft: '0.5rem' }}
          //       src={defaultFile ? URL.createObjectURL(defaultFile) : ''}
          //     />
          //   )
          // }
          action={
            loading ? null : (
              <IconButton
                onClick={() => router.push(`/sale-unit/${data?.id}`)}
                aria-label='settings'
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation='wave'
                height={10}
                width='80%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              data?.name
            )
          }
          subheader={
            loading ? (
              <Skeleton animation='wave' height={10} width='40%' />
            ) : (
              <div style={{ color: '#1da1f3' }}>
                {data?.unitType && getUnitTypeLabel(data?.unitType)}
                <br />
                {data?.activityType && getActivityTypeLabel(data?.activityType)}
              </div>
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation='wave'
            variant='rectangular'
          />
        ) : (
          <CardMedia
            component='img'
            height='140'
            image={defaultFile ? URL.createObjectURL(defaultFile) : ''}
            // image={defaultPic ? URL.createObjectURL(defaultPic) : ''}
          />
        )}
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation='wave'
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation='wave' height={10} width='80%' />
            </React.Fragment>
          ) : (
            <>
              <Typography variant='body2' color='text.secondary' component='p'>
                {data?.bio}
              </Typography>
              {address?.id && (
                <>
                  <Divider />
                  <Grid container display={'flex'} gap={3}>
                    {address.city.province.id && (
                      <Grid item display={'flex'} gap={1}>
                        <Typography fontSize={'small'} color='#1da1f3'>
                          استان
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          component='p'
                        >
                          {address?.city.province.name}
                        </Typography>
                      </Grid>
                    )}

                    {address.city.id && (
                      <Grid item display={'flex'} gap={1}>
                        <Typography fontSize={'small'} color='#1da1f3'>
                          شهر
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          component='p'
                        >
                          {address?.city.name}
                        </Typography>
                      </Grid>
                    )}

                    <Grid item display={'flex'} gap={1}>
                      <Typography fontSize={'small'} color='#1da1f3'>
                        خیابان
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        component='p'
                      >
                        {address?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}

              <Divider />
              <Typography fontSize={'small'} color='#1da1f3'>
                آدرس
              </Typography>
              <Typography variant='body2' color='text.secondary' component='p'>
                {data?.address}
              </Typography>
              <Divider />
              <Typography fontSize={'small'} color='#1da1f3'>
                شماره تماس
              </Typography>
              <Typography variant='body2' color='text.secondary' component='p'>
                <Grid container display={'flex'} xs={12}>
                  {data?.phoneNumbers.map((k, index) => (
                    <Grid item key={index} xs={6}>
                      {k}
                    </Grid>
                  ))}
                </Grid>
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
