import {
  CustomTextField,
  DotSpinner,
  SubmitButton
} from '@/components/General';
import GrayDotSpinner from '@/components/General/DotSpinnerGray';
import MultipleSelect from '@/components/General/MultipleSelect';
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import getWithToken from '@/utils/getWithToken';
import { Button, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { activityType, allUnitGroup, unitType } from '../saleUnitEnum';

interface SaleData {
  unitType: string;
  unitGroup: string;
  activityType: string;
  name: string;
  address: string;
  streetId: string;
  bio: string;
  phoneNumbers: string[];
  licenseNo: string;
  registrationNo: string;
  operationLicenseNo: string;
  merchantCardNo: string;
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

interface EnumProps {
  name: string;
  id: any;
}

export default function SaleUnitById(id: any) {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SaleData>();

  const [showSpinner, setShowSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  const [address, setAddress] = useState<Address>();
  const [streetList, setStreetList] = useState<EnumProps[]>([]);
  const [selectedStreetList, setSelectedStreetList] = useState<string[]>([]);
  const handleSelectedStreetListChange = (newValues: string[]) => {
    setSelectedStreetList(newValues);
  };

  const getUnitTypeLabel = (value: string) => {
    const unitTypeObject = unitType.find((type) => type.value === value);
    return unitTypeObject ? unitTypeObject.label : '';
  };

  const getActivityTypeLabel = (value: string) => {
    const unitTypeObject = activityType.find((type) => type.value === value);
    return unitTypeObject ? unitTypeObject.label : '';
  };

  const getUnitGroupLabel = (value: string) => {
    const unitTypeObject = allUnitGroup.find((type) => type.value === value);
    return unitTypeObject ? unitTypeObject.label : '';
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [...prevPhoneNumbers, '']);
  };

  const handleRemovePhoneNumber = () => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers((prevPhoneNumbers) => prevPhoneNumbers.slice(0, -1));
    }
  };

  const getStreet = (streetId: string) => {
    if (streetId) {
      getWithToken(`/street/${streetId}`, 'GET')
        .then((res: any) => {
          setAddress(res);
          getAllStreet(res.city.id);
          setSelectedStreetList(res.id);
        })
        .catch((err:any) => {
          console.error(err);
        });
    }
  };

  const getAllStreet = (id: string) => {
    getWithToken(`/street/byCity/${id}?page=0&size=50`, 'GET')
      .then((res:any) => {
        setStreetList(res.content);
      })
      .catch((err:any) => {
        console.error('err', err);
      });
  };

  useEffect(() => {
    id.id &&
      getWithToken(`/saleUnit/${id.id}`, 'GET')
        .then((res: any) => {
          console.log(res);
          setData(res);
          setPhoneNumbers(res.phoneNumbers);
          getStreet(res.streetId);
        })
        .catch((err: { message: any }) => {
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
          setLoading(false);
        });
  }, []);

  const onSubmit: SubmitHandler<SaleData> = (form) => {
    const request = {
      ...form,
      id: data?.id,
      streetId: selectedStreetList.toString()
    };
    setShowSpinner(true);
    // const hasChanges = Object.keys(form).some((key) => form[key] !== data[key]);

    // apiHandler('/saleUnit', 'PUT', hasChanges ? request : data, true)
    apiHandler('/saleUnit', 'PUT', request, true)
      .then((res:any) => {
        setData(res);
        setPhoneNumbers(res.phoneNumbers);
        getStreet(res.streetId);
        dispatch(
          showSnackbar({
            message: 'اطلاعات با موفقیت تغییر یافت',
            severity: 'success'
          })
        );
      })
      .catch((err:any) => {
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
      });
  };

  return (
    <>
      {loading ? (
        <GrayDotSpinner />
      ) : (
        <Stack
          component='form'
          spacing='1.5rem'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container pt={6}>
            <Grid item xs={12} md={6} gap={3} container>
              <Controller
                control={control}
                name='unitType'
                defaultValue={data?.unitType}
                render={() => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='نوع واحد صنفی'
                    value={getUnitTypeLabel(data?.unitType)}
                    onChange={() => {}}
                    autoComplete='true'
                    disabled
                    errorMessage={errors.unitType?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name='activityType'
                defaultValue={data?.activityType}
                render={() => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='نوع فعالیت'
                    value={getActivityTypeLabel(data?.activityType)}
                    onChange={() => {}}
                    autoComplete='true'
                    disabled
                    errorMessage={errors.activityType?.message}
                  />
                )}
              />

              {data?.unitGroup && (
                <Controller
                  control={control}
                  name='unitGroup'
                  defaultValue={data?.unitGroup}
                  render={() => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label='گروه واحد صنفی'
                      value={getUnitGroupLabel(data?.unitGroup)}
                      onChange={() => {}}
                      autoComplete='true'
                      disabled
                      errorMessage={errors.unitGroup?.message}
                    />
                  )}
                />
              )}

              {data?.licenseNo && (
                <Controller
                  control={control}
                  name='licenseNo'
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label='شماره پروانه بهره برداری  '
                      value={value}
                      defaultValue={data?.licenseNo}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(newValue);
                      }}
                      autoComplete='true'
                      errorMessage={errors.licenseNo?.message}
                    />
                  )}
                />
              )}

              {data?.registrationNo && (
                <Controller
                  control={control}
                  name='registrationNo'
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label='شماره ثبت شرکت'
                      defaultValue={data?.registrationNo}
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(newValue);
                      }}
                      autoComplete='true'
                      errorMessage={errors.registrationNo?.message}
                    />
                  )}
                />
              )}

              {data?.operationLicenseNo && (
                <Controller
                  control={control}
                  name='operationLicenseNo'
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label='شماره جواز کسب'
                      defaultValue={data?.operationLicenseNo}
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(newValue);
                      }}
                      autoComplete='true'
                      errorMessage={errors.operationLicenseNo?.message}
                    />
                  )}
                />
              )}

              {data?.merchantCardNo && (
                <Controller
                  control={control}
                  name='merchantCardNo'
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label='شماره کارت بازرگانی'
                      defaultValue={data?.merchantCardNo}
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(newValue);
                      }}
                      autoComplete='true'
                      errorMessage={errors.merchantCardNo?.message}
                    />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} gap={3} container>
              <Controller
                control={control}
                name='streetId'
                render={() => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='استان'
                    value={address?.city.province.name}
                    onChange={() => {}}
                    autoComplete='true'
                    disabled
                  />
                )}
              />

              <Controller
                control={control}
                name='streetId'
                render={() => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='شهر'
                    value={address?.city.name}
                    onChange={() => {}}
                    autoComplete='true'
                    disabled
                  />
                )}
              />

              <Controller
                control={control}
                name='streetId'
                render={() => (
                  <>
                    <MultipleSelect
                      label='خیابان'
                      isMulti={false}
                      options={streetList.map((k) => k.id)}
                      showInput={streetList.map((k) => k.name)}
                      value={selectedStreetList}
                      onChange={handleSelectedStreetListChange}
                    />
                  </>
                )}
              />

              <Controller
                control={control}
                name='address'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='آدرس کسب و کار '
                    defaultValue={data?.address}
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
                name='name'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='نام کسب و کار '
                    defaultValue={data?.name}
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

              {phoneNumbers.map(
                (
                  phoneNumber: string | undefined,
                  index: number | undefined
                ) => (
                  <Grid item key={index}>
                    <Controller
                      control={control}
                      name={
                        `phoneNumbers[${index}]` as `phoneNumbers.${number}`
                      }
                      defaultValue={phoneNumber}
                      render={({ field: { onChange, value } }) => (
                        <CustomTextField
                          inputWidth='26.25rem !important'
                          label={index ? `تلفن ${index + 1}` : 'تلفن'}
                          value={value}
                          defaultValue={phoneNumber}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            onChange(newValue);
                          }}
                          autoComplete='true'
                          errorMessage={
                            index ? errors.phoneNumbers?.[index]?.message : ''
                          }
                        />
                      )}
                    />
                  </Grid>
                )
              )}
              <Grid
                item
                width='27.8rem'
                display={'flex'}
                justifyContent={'space-evenly'}
              >
                <Button onClick={handleAddPhoneNumber}>
                  + افزودن شماره تلفن
                </Button>
                <Button
                  onClick={() => handleRemovePhoneNumber()}
                  color='secondary'
                >
                  - حذف شماره تلفن
                </Button>
              </Grid>

              <Controller
                control={control}
                name='bio'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    label='بیوگرافی'
                    value={value}
                    defaultValue={data?.bio}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      onChange(newValue);
                    }}
                    fullWidth
                    w='28rem !important'
                    autoComplete='true'
                    errorMessage={errors.bio?.message}
                    multiline
                    maxRows={4}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6} gap={3} container>
              <SubmitButton width='27.8rem' disabled={showSpinner}>
                {showSpinner ? <DotSpinner /> : 'ثبت تغییرات'}
              </SubmitButton>
            </Grid>
            <Grid item xs={12} md={6} gap={3} container></Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
}
