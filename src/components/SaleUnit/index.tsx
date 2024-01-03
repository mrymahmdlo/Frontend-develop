/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { Button, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomTextField, DotSpinner, SubmitButton } from '../General';
import MultipleSelect from '../General/MultipleSelect';
import { activityType, unitGroup, unitType } from './saleUnitEnum';

interface SaleData {
  unitType: string;
  unitGroup: string;
  activityType: string;
  name: string;
  address: string;
  bio: string;
  phoneNumbers: string[];
  licenseNo: string;
  registrationNo: string;
  operationLicenseNo: string;
}

export default function SaleUnit() {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SaleData>();

  const [showSpinner, setShowSpinner] = useState(false);

  const [selectedUnitType, setSelectedUnitType] = useState<string[]>([]);
  const handleSelectedUnitTypeChange = (newValues: string[]) => {
    setSelectedUnitType(newValues);
  };

  const [selectedUnitGroup, setSelectedUnitGroup] = useState<string[]>([]);
  const handleSelectedUnitGroupChange = (newValues: string[]) => {
    setSelectedUnitGroup(newValues);
  };

  const [selectedActivityType, setSelectedActivityType] = useState<string[]>(
    []
  );
  const handleSelectedActivityTypeChange = (newValues: string[]) => {
    setSelectedActivityType(newValues);
  };

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [...prevPhoneNumbers, '']);
  };

  const handleRemovePhoneNumber = () => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers((prevPhoneNumbers) => prevPhoneNumbers.slice(0, -1));
    }
  };

  const onSubmit: SubmitHandler<SaleData> = (data) => {
    const request = {
      unitType: selectedUnitType[0],
      unitGroup: selectedUnitGroup[0],
      activityType: selectedActivityType[0],
      name: data.name,
      address: data.address,
      bio: data.bio,
      phoneNumbers: data.phoneNumbers
    };

    console.log('request', request);

    setShowSpinner(true);
    apiHandler('/saleUnit', 'POST', request, true)
      .then((res) => {
        console.log('res', res);
        dispatch(
          showSnackbar({
            message: 'اطلاعات با موفقیت ثبت شد',
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
      });
  };

  useEffect(() => {}, []);

  return (
    <>
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
              render={() => (
                <>
                  <MultipleSelect
                    label='نوع واحد صنفی'
                    isMulti={false}
                    options={unitType.map((k) => k.value)}
                    showInput={unitType.map((k) => k.label)}
                    value={selectedUnitType}
                    onChange={handleSelectedUnitTypeChange}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name='unitGroup'
              render={() => (
                <>
                  <MultipleSelect
                    label='گروه واحد صنفی'
                    isMulti={false}
                    options={unitGroup.map((k) => k.value)}
                    showInput={unitGroup.map((k) => k.label)}
                    value={selectedUnitGroup}
                    onChange={handleSelectedUnitGroupChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name='activityType'
              render={() => (
                <>
                  <MultipleSelect
                    label='نوع فعالیت'
                    isMulti={false}
                    options={activityType.map((k) => k.value)}
                    showInput={activityType.map((k) => k.label)}
                    value={selectedActivityType}
                    onChange={handleSelectedActivityTypeChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='نام کسب و کار '
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

            {phoneNumbers.map((phoneNumber, index) => (
              <div key={index}>
                <Controller
                  control={control}
                  name={`phoneNumbers[${index}]` as `phoneNumbers.${number}`}
                  defaultValue={phoneNumber}
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      inputWidth='26.25rem !important'
                      label={`تلفن ${index + 1}`}
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(newValue);
                      }}
                      autoComplete='true'
                      errorMessage={errors.phoneNumbers?.[index]?.message}
                    />
                  )}
                />
              </div>
            ))}
            <Grid item xs={12} display={'flex'} justifyContent={'space-evenly'}>
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
          </Grid>
          <Grid item xs={12} md={6} gap={3} container>
            <Controller
              control={control}
              name='address'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='آدرس کسب و کار'
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
            <Controller
              control={control}
              name='licenseNo'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='شماره پروانه کسب و کار '
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onChange(newValue);
                  }}
                  autoComplete='true'
                  errorMessage={errors.licenseNo?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='registrationNo'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='شماره ثبت'
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
            <Controller
              control={control}
              name='operationLicenseNo'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='شماره جواز کسب'
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
            <Controller
              control={control}
              name='bio'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  label='بیوگرافی'
                  value={value}
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

          <Grid item container justifyContent={'center'} md={12} xs={12} mt={3}>
            <SubmitButton width='27.8rem' disabled={showSpinner}>
              {showSpinner ? <DotSpinner /> : t('Confirm')}
            </SubmitButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
