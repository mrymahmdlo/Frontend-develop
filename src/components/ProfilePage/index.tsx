import { useAppDispatch } from '@/context';
import { hideSnackbar, showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getCurrentAccountCookie,
  setAppToken,
  setCurrentAccountCookie
} from '@/utils';
import { getUserInformationsValidations as validations } from '@/utils/validations/getUserInformationsValidations';
import { Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import { CustomTextField, DotSpinner, SubmitButton } from '../General';
import AvatarComponent from '../General/AvatarInput';

interface FormData {
  name: string;
  family: string;
  birthdate: string;
  email: string;
  nationalKey: string;
  address: string;
  introducerMobile: string;
  file: File | null;
}

export default function Profile() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const [showSpinner, setShowSpinner] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append('address', data.address);
    formData.append('birthdate', data.birthdate);
    formData.append('email', data.email);
    formData.append('name', data.name);
    formData.append('family', data.family);
    formData.append('introducerMobile', data.introducerMobile);
    formData.append('nationalKey', data.nationalKey);
    data.file ? formData.append('file', data.file) : null;

    console.log('data', data);
    const info = getCurrentAccountCookie();
    console.log('info', info);
    setShowSpinner(true);
    apiHandler('/user', 'PUT', formData)
      .then((res) => {
        // Set new token
        setAppToken({ access: res.accessToken, refresh: res.refreshToken });
        // Set current account email
        setCurrentAccountCookie(res.profile);

        dispatch(
          showSnackbar({
            message: 'ورود با موفقیت انجام شد',
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
      .finally(() => {
        setShowSpinner(false);
        router.push('/');
        dispatch(hideSnackbar());
      });
  };

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
                  inputWidth='26.25rem'
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
                  inputWidth='26.25rem'
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
                  inputWidth='26.25rem'
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
                  inputWidth='26.25rem'
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
                  inputWidth='26.25rem'
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
                  inputWidth='26.25rem'
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
                    onChange={(date) => {
                      onChange(date?.toString());
                    }}
                  />
                  {errors && errors[name] && (
                    //if you want to show an error message
                    <span>your error message !</span>
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
            <SubmitButton width='83%' disabled={showSpinner}>
              {showSpinner ? <DotSpinner /> : t('Confirm')}
            </SubmitButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
