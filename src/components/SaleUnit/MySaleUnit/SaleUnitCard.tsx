/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
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
    phoneNumbers: string[];
    saleUnitDocuments: {
      active: boolean;
      attachmentId: number;
      saleUnitDocumentType: string;
    }[];
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
  const router = useRouter();

  React.useEffect(() => {
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
  }, [data]);

  return (
    <Card style={{ width: 'inherit' }} sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation='wave'
              variant='circular'
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt='avatar'
              style={{ marginLeft: '0.5rem' }}
              src={defaultFile ? URL.createObjectURL(defaultFile) : ''}
            />
          )
        }
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
        <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
      ) : (
        <CardMedia
          component='img'
          height='140'
          image={defaultPic ? URL.createObjectURL(defaultPic) : ''}
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
              |{data?.phoneNumbers.map((k) => k + '|')}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
