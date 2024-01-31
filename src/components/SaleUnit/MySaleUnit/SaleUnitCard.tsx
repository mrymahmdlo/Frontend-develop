/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DotSpinner } from '@/components/General';
import { useAppDispatch } from '@/context';
import { hideModal, showModal } from '@/context/slices/modalSlice';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import deleteWithToken from '@/utils/deleteWithToken';
import getWithToken from '@/utils/getWithToken';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  CardActionArea,
  Divider,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { activityType, unitType } from '../saleUnitEnum';

const options = [
  {
    label: 'به‌روزرسانی واحد صنفی',
    value: 'UPDATE'
  },
  {
    label: 'حذف واحد صنفی',
    value: 'DELETE'
  }
];
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
  onDeleteSaleUnit?: (saleUnitId: number | undefined) => void;
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
  const [showSpinner, setShowSpinner] = React.useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations();

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

  const deleteSaleUnit = () => {
    setShowSpinner(true);

    deleteWithToken(`/saleUnit/${data?.id}`, 'DELETE')
      .then(() => {
        props.onDeleteSaleUnit && props.onDeleteSaleUnit(data?.id);
        dispatch(hideModal());
        dispatch(
          showSnackbar({
            message: 'واحد صنفی حذف شد',
            severity: 'success'
          })
        );
      })
      .catch((err) => {
        if (err.message) {
          dispatch(
            showSnackbar({
              message: t(err.message),
              severity: 'error'
            })
          );
        } else {
          dispatch(
            showSnackbar({
              message: t('Error 500'),
              severity: 'error'
            })
          );
        }
      })
      .finally(() => setShowSpinner(false));
  };

  const onDelete = () => {
    dispatch(
      showModal({
        modalState: true,
        modalContent: (
          <Grid container display={'grid'} justifyItems={'center'}>
            <Typography>
              آیا از حذف واحد صنفی {data?.name} اطمینان دارید؟
            </Typography>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={deleteSaleUnit}
              sx={{ margin: 2 }}
            >
              {showSpinner ? <DotSpinner /> : 'بله'}
            </Button>
          </Grid>
        )
      })
    );
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    option: { label: string; value: string },
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    option.value === 'DELETE' && onDelete();
    option.value === 'UPDATE' && router.push(`/sale-unit/${data?.id}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClickListItem}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button'
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.value}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, option, index)
                      }
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
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
