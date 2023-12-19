import { Icon } from '@/components/General';
import { useAppDispatch } from '@/context';
import { hideSnackbar, showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getCurrentAccountCookie,
  setAppToken,
  setCurrentAccountCookie
} from '@/utils';
import convertDateFormat from '@/utils/dateFormat';
import { getUserInformationsValidations as validations } from '@/utils/validations/getUserInformationsValidations';
import { Grid, Stack, Typography } from '@mui/material';
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
  name: string;
  family: string;
  birthdate: string;
  email: string;
  nationalKey: string;
  address: string;
  introducerMobile: string;
  file: File | null;
}

interface InfoData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureId: string;
  roles: string[];
}

export default function Profile() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileData>();

  const [showSpinner, setShowSpinner] = useState(false);
  const [id, setId] = useState('');

  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    const isoFormattedDate = convertDateFormat(
      data.birthdate,
      'yyyy/MM/dd',
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    );

    const formData = new FormData();
    formData.append('id', id);
    if (data.address) {
      formData.append('address', data.address);
    }
    if (isoFormattedDate) {
      formData.append('birthdate', isoFormattedDate);
    }
    if (data.email) {
      formData.append('email', data.email);
    }
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.family) {
      formData.append('family', data.family);
    }
    if (data.introducerMobile) {
      formData.append('introducerMobile', data.introducerMobile);
    }
    if (data.nationalKey) {
      formData.append('nationalKey', data.nationalKey);
    }
    if (data.file) {
      formData.append('file', data.file);
    }

    setShowSpinner(true);
    apiHandler('/user', 'PUT', formData, true)
      .then((res) => {
        setAppToken({ access: res.accessToken, refresh: res.refreshToken });
        setCurrentAccountCookie(res.profile);

        dispatch(
          showSnackbar({
            message: 'ورود با موفقیت انجام شد',
            severity: 'success'
          })
        );

        router.push('/');
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
      .finally(() => {
        setShowSpinner(false);
        dispatch(hideSnackbar());
      });
  };

  useEffect(() => {
    const info = getCurrentAccountCookie();
    let newToken: InfoData;

    if (info) {
      newToken = JSON.parse(info);
      setId(newToken.id);
    }
  }, []);

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
          <Grid item md={12} xs={12} m={3} mr={8}>
            <Controller
              name='file'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <AvatarComponent
                  file={field.value}
                  onChange={(file) => field.onChange(file)}
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
          >
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Name')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='introducerMobile'
              rules={validations.mobile}
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Phone number')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.introducerMobile?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='address'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Address')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
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
            xs={12}
            md={6}
            gap={3}
            container
            justifyContent={'center'}
            alignContent={'center'}
          >
            <Controller
              control={control}
              name='family'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Family')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.family?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              rules={validations.email}
              render={({ field: { onChange, value } }) => (
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
              name='nationalKey'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('NationalKey')}
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Store new value
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
            container
            justifyContent={'center'}
            alignContent={'center'}
            md={6}
            xs={6}
            mt={3}
          >
            <Controller
              control={control}
              name='birthdate'
              rules={{ required: true }} //optional
              render={({ field: { onChange, name, value } }) => (
                <>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition='bottom-right'
                    placeholder='لطفا تاریخ را انتخاب کنید'
                    value={value || ''}
                    // eslint-disable-next-line react/jsx-key
                    plugins={[<Toolbar position='bottom' />]} // Wrap the Toolbar in an array
                    onChange={(date) => {
                      onChange(date?.toString());
                    }}
                  />
                  {errors && errors[name] && (
                    <Stack
                      flexDirection='row'
                      alignItems='center'
                      gap='0.25rem'
                      width='27.8rem'
                    >
                      <Stack>
                        <Icon name='error' w={12} h={12} view='0 0 12 12' />
                      </Stack>

                      <div>
                        <Typography variant='caption' className='error-message'>
                          تاریخ را انتخاب کنید{' '}
                        </Typography>
                      </div>
                    </Stack>
                  )}
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
            xs={6}
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
