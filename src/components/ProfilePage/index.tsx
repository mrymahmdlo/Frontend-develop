// import { Icon } from '@/components/General';
import { useAppDispatch } from '@/context';
import { hideSnackbar, showSnackbar } from '@/context/slices/snackbarSlice';
import {
  apiHandler,
  getCurrentAccountCookie,
  setAppToken,
  setCurrentAccountCookie
} from '@/utils';
// import { getUserInformationsValidations as validations } from '@/utils/validations/getUserInformationsValidations';
import convertDateFormat from '@/utils/dateFormat';
import { Grid, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
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

// interface InfoData {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   pictureId: string;
//   roles: string[];
// }

export default function Profile() {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProfileData>();


  const [showSpinner, setShowSpinner] = useState(false);
  const [id, setId] = useState('');
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

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
    const isoFormattedDate = convertDateFormat(data.birthdate, 'YYYY/MM/DD');

    if (data.nationalKey) {
      if (data.nationalKey.length === 10 && data.nationalKey.length > 0) {
        const formData = new FormData();
        formData.append('id', id);
        if (data.address) {
          formData.append('address', data.address);
        }
        if (data.birthdate) {
          formData.append(
            'birthdate',
            new Date(isoFormattedDate).toISOString()
          );
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
      } else {
        dispatch(
          showSnackbar({
            message: 'کد ملی معتبر نمیباشد',
            severity: 'info'
          })
        );
      }
    } else {
      const formData = new FormData();
      formData.append('id', id);
      if (data.address) {
        formData.append('address', data.address);
      }
      if (data.birthdate) {
        formData.append('birthdate', new Date(isoFormattedDate).toISOString());
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
    }
  };

  useEffect(() => {
    const info = getCurrentAccountCookie();
    let newToken: ProfileData;

    if (info) {
      newToken = JSON.parse(info);
      setProfile(newToken);
      setId(newToken.id);
    }
  }, []);


 useEffect(() => {
   apiHandler(`/user/${profile.id}`, 'GET', true)
     .then((res) => {
       setProfile(res);

       if (res.pictureId) {
         const fetchImage = async () => {
           try {
             const response = await fetch(
               `${process.env.NEXT_PUBLIC_SERVER_URL}/file/getFile?attachmentId=${res.pictureId}`
             );
             if (response.ok) {
               const blob = await response.blob();
               setDefaultFile(new File([blob], 'filename'));

               // Use setValue to dynamically update the form field
               setValue('file', new File([blob], 'filename'));
             } else {
               console.error('Failed to fetch image:', response.statusText);
             }
           } catch (error) {
             console.error('Error fetching image:', error);
           }
         };

         // Fetch image when component mounts
         fetchImage();
       }
     })
     .catch((err) => {
       console.error('err', err);
     });
 }, [id, setValue]);


  // useEffect(() => {
  //   apiHandler(`/user/${profile.id}`, 'GET', true)
  //     .then((res) => {
  //       setProfile(res);
  //     })
  //     .catch((err) => {
  //       console.error('err', err);
  //     });

  //   if (profile.pictureId) {
  //      const fetchImage = async () => {
  //        try {
  //          const response = await fetch(
  //            `${process.env.NEXT_PUBLIC_SERVER_URL}/file/getFile?attachmentId=${profile.pictureId}`
  //          );
  //          if (response.ok) {
  //            const blob = await response.blob();
  //            setDefaultFile(new File([blob], 'filename'));
  //          } else {
  //            console.error('Failed to fetch image:', response.statusText);
  //          }
  //        } catch (error) {
  //          console.error('Error fetching image:', error);
  //        }
  //      };

  //      // Fetch image when component mounts
  //      fetchImage();
  //   }
  // }, [id]);

  useEffect(() => {
    console.log('object', defaultFile);
  }, [defaultFile]);

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
              defaultValue={defaultFile}
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
              render={({ field: { onChange, value = profile.name } }) => (
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
              name='introducerMobile'
              render={({
                field: { onChange, value = profile.introducerMobile }
              }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label={t('Introducer number')}
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
              render={({ field: { onChange, value = profile.address } }) => (
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
              render={({ field: { onChange, value = profile.family } }) => (
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
              name='email'
              render={({ field: { onChange, value = profile.email } }) => (
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
              render={({
                field: { onChange, value = profile.nationalKey }
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
            container
            justifyContent={'center'}
            alignContent={'center'}
            md={6}
            xs={6}
            mt={3}
          >
            <Typography margin={'auto 0'} ml={1}>
              تاریخ تولد
            </Typography>
            <Controller
              control={control}
              name='birthdate'
              render={({ field: { onChange, value } }) => (
                <>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition='bottom-right'
                    placeholder='لطفا تاریخ را انتخاب کنید'
                    value={value || ''}
                    // eslint-disable-next-line react/jsx-key
                    plugins={[<Toolbar position='bottom' />]}
                    onChange={(date) => {
                      onChange(date);
                    }}
                    style={{ width: '23rem' }}
                  />
                  {/* {errors && errors[name] && (
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
                  )} */}
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
