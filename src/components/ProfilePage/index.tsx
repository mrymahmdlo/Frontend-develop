import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getCurrentAccountCookie,
  setCurrentAccountCookie
} from '@/utils';
import {
  gregorianToPersianDate,
  persianToGregorianDate
} from '@/utils/dateFormat';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import Toolbar from 'react-multi-date-picker/plugins/toolbar';
import { CustomTextField, DotSpinner, SubmitButton } from '../General';
import AvatarComponent from '../General/AvatarInput';

interface ProfileData {
  id: string;
  name: string;
  family: string;
  birthdate: string;
  email: string;
  nationalKey: string;
  address: string;
  introducerMobile: string;
  file: File | null;
  pictureId?: string;
}

export default function Profile() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProfileData>();

  const [showSpinner, setShowSpinner] = useState(false);
  const [id, setId] = useState('');
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [profile, setProfile] = useState<ProfileData>({
    id: '',
    name: '',
    family: '',
    nationalKey: '',
    address: '',
    birthdate: '',
    email: '',
    introducerMobile: '',
    file: null
  });

  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    const isoFormattedDate = persianToGregorianDate(
      data.birthdate,
      'YYYY/MM/DD'
    );
    const formData = new FormData();

    formData.append('id', id);
    if (data.address) {
      formData.append('address', data.address);
    } else if (data.address == '') {
      formData.append('address', '');
    }
    if (data.birthdate) {
      formData.append('birthdate', new Date(isoFormattedDate).toISOString());
    } else if (data.birthdate == null) {
      formData.append('birthdate', '');
    }
    if (data.email) {
      formData.append('email', data.email);
    } else if (data.email == '') {
      formData.append('email', '');
    }
    if (data.name) {
      formData.append('name', data.name);
    } else if (data.name == '') {
      formData.append('name', '');
    }
    if (data.family) {
      formData.append('family', data.family);
    } else if (data.family == '') {
      formData.append('family', '');
    }
    if (!profile.introducerMobile) {
      if (data.introducerMobile) {
        formData.append('introducerMobile', data.introducerMobile);
      } else {
        formData.append('introducerMobile', '');
      }
    }
    if (data.nationalKey) {
      formData.append('nationalKey', data.nationalKey);
    } else if (data.nationalKey == '') {
      formData.append('nationalKey', '');
    }
    if (data.file) {
      formData.append('file', data.file);
    } else {
      formData.append('file', '');
    }

    const handleResponse = (res: any) => {
      setCurrentAccountCookie(res);
      setProfile(res);
      setId(res.id);
      dispatch(
        showSnackbar({
          message: 'اطلاعات با موفقیت ثبت شد',
          severity: 'success'
        })
      );
    };

    const handleError = (err: any) => {
      const errorMessage = err.message ? t(err.message) : t('Error 500');
      dispatch(
        showSnackbar({
          message: errorMessage,
          severity: 'error'
        })
      );
    };

    setShowSpinner(true);

    if (data.nationalKey) {
      if (data.nationalKey.length === 10) {
        apiHandler('/user', 'PUT', formData, true)
          .then(handleResponse)
          .catch(handleError)
          .finally(() => {
            setShowSpinner(false);
          });
      } else {
        setShowSpinner(false);
        dispatch(
          showSnackbar({
            message: 'کد ملی معتبر نمیباشد',
            severity: 'info'
          })
        );
      }
    } else {
      apiHandler('/user', 'PUT', formData, true)
        .then(handleResponse)
        .catch(handleError)
        .finally(() => {
          setShowSpinner(false);
        });
    }
  };

  useEffect(() => {
    const info = getCurrentAccountCookie();
    let newToken: ProfileData;

    if (info) {
      newToken = JSON.parse(info);
      setId(newToken.id);
    }
  }, []);

  useEffect(() => {
    if (id)
      apiHandler(`/user/${id}`, 'GET', true)
        .then((res: any) => {
          setProfile(res);
          setBirthDate(gregorianToPersianDate(res.birthdate));

          if (res.pictureId) {
            const fetchImage = async () => {
              try {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/file/getFile?attachmentId=${res.pictureId}`
                );
                if (response.ok) {
                  const blob = await response.blob();
                  setDefaultFile(new File([blob], 'filename'));
                  setValue('file', new File([blob], 'filename'));
                } else {
                  console.error('Failed to fetch image:', response.statusText);
                }
              } catch (error) {
                console.error('Error fetching image:', error);
              }
            };
            fetchImage();
          }
        })
        .catch((err: any) => {
          console.error('err', err);
        });
  }, [id, setValue]);

  return (
    <>
      <Stack
        component='form'
        spacing='1.5rem'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          justifyContent={'space-between'}
          alignContent={'center'}
        >
          <Grid
            item
            md={12}
            xs={12}
            m={3}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Grid item>
              <Controller
                name='file'
                control={control}
                defaultValue={defaultFile}
                render={({ field }) => (
                  <AvatarComponent
                    file={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                )}
              />
            </Grid>
            <Grid item display={'flow'} alignSelf={'center'}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => router.push('/sale-unit/my-sale-unit')}
              >
                واحدهای صنفی من
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            gap={3}
            container
            justifyContent={'center'}
            alignContent={'center'}
            mt={2}
          >
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value = profile?.name } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Name')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='family'
              render={({ field: { onChange, value = profile?.family } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Family')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.family?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='nationalKey'
              render={({
                field: { onChange, value = profile?.nationalKey }
              }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('NationalKey')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.nationalKey?.message}
                />
              )}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            gap={3}
            container
            justifyContent={'center'}
            alignContent={'center'}
            mt={2}
          >
            <Controller
              control={control}
              name='introducerMobile'
              render={({
                field: { onChange, value = profile?.introducerMobile }
              }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Introducer number')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.introducerMobile?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value = profile?.email } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Email')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='address'
              render={({ field: { onChange, value = profile?.address } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Address')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.address?.message}
                />
              )}
            />
          </Grid>

          <Grid
            item
            container
            justifyContent={'center'}
            alignContent={'center'}
            md={6}
            xs={12}
            mt={3}
          >
            <Typography margin={'auto 0'} ml={1}>
              تاریخ تولد
            </Typography>
            <Controller
              control={control}
              name='birthdate'
              render={({ field: { onChange, value = birthDate } }) => (
                <>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition='bottom-right'
                    placeholder='لطفا تاریخ را انتخاب کنید'
                    value={value}
                    // eslint-disable-next-line react/jsx-key
                    plugins={[<Toolbar position='bottom' />]}
                    onChange={(date) => {
                      onChange(date);
                    }}
                    style={{ width: '23rem' }}
                  />
                </>
              )}
            />
          </Grid>

          <Grid
            item
            container
            justifyContent={'center'}
            alignContent={'center'}
            md={6}
            xs={12}
            mt={3}
          >
            <SubmitButton width='27.8rem' disabled={showSpinner}>
              {showSpinner ? <DotSpinner /> : t('Confirm')}
            </SubmitButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
