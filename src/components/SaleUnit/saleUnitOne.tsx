/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CustomTextField,
  DotSpinner,
  SubmitButton
} from '@/components/General';
import MultipleSelect from '@/components/General/MultipleSelect';
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import getWithToken from '@/utils/getWithToken';
import { Button, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  activityType,
  unitGroup,
  unitGroupSERVICES,
  unitType
} from './saleUnitEnum';
import GrayDotSpinner from '../General/DotSpinnerGray';

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

interface SaleUnitProps {
  unitOne: (user: string) => void;
}

interface EnumProps {
  name: string;
  id: any;
}

export default function SaleUnitOne(props: SaleUnitProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SaleData>();

  const [showSpinner, setShowSpinner] = useState(false);
  const [isShowGroup, setShowGroup] = useState(false);
  const [isShowActivity, setShowActivity] = useState(true);
  const [isOptionGroup, setOptionGroup] = useState(true);
  const [isMerchantCardNo, setMerchantCardNo] = useState(false);
  const [isOperationLicenseNo, setOperationLicenseNo] = useState(false);
  const [isRegistrationNo, setRegistrationNo] = useState(false);
  const [isLicenseNo, setLicenseNo] = useState(false);
  const [isReal, setReal] = useState(false);
  const [isLegal, setLegal] = useState(false);

  const [selectedUnitType, setSelectedUnitType] = useState<string[]>([]);
  const handleSelectedUnitTypeChange = (newValues: string[]) => {
    setSelectedUnitType(newValues);
    if (newValues[0] === 'PRODUCER' || newValues[0] === 'MERCHANT') {
      setShowGroup(true);
    } else {
      setShowGroup(false);
    }

    if (newValues[0] === 'MERCHANT') {
      setShowActivity(false);
      setMerchantCardNo(true);
    } else {
      setShowActivity(true);
      setMerchantCardNo(false);
    }

    if (
      newValues[0] === 'PRODUCER' ||
      newValues[0] === 'SELLER' ||
      newValues[0] === 'SPREADER'
    ) {
      setOperationLicenseNo(true);
    } else {
      setOperationLicenseNo(false);
    }

    if (newValues[0] === 'SELLER' || newValues[0] === 'SPREADER') {
      setRegistrationNo(true);
    } else {
      setRegistrationNo(false);
    }

    if (newValues[0] === 'PRODUCER') {
      setLicenseNo(true);
    } else {
      setLicenseNo(false);
    }

    if (newValues[0] === 'SERVICES') {
      setOptionGroup(false);
    } else {
      setOptionGroup(true);
    }
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
    if (newValues[0] === 'REAL') {
      setReal(true);
    } else {
      setReal(false);
    }

    if (newValues[0] === 'LEGAL') {
      setLegal(true);
    } else {
      setLegal(false);
    }
  };

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const [proviceList, setProviceList] = useState<EnumProps[]>([]);
  const [selectedProviceList, setSelectedProviceList] = useState<string[]>([]);
  const handleSelectedProviceListChange = (newValues: string[]) => {
    setSelectedProviceList(newValues);
    getWithToken(`/city/byProvince/${newValues}?page=0&size=50`, 'GET')
      .then((res) => {
        setCityList(res.content);
      })
      .catch((err) => {
        console.error('err', err);
      });
  };

  const [cityList, setCityList] = useState<EnumProps[]>([]);
  const [selectedCityList, setSelectedCityList] = useState<string[]>([]);
  const handleSelectedCityListChange = (newValues: string[]) => {
    setSelectedCityList(newValues);
    getWithToken(`/street/byCity/${newValues}?page=0&size=50`, 'GET')
      .then((res) => {
        setStreetList(res.content);
      })
      .catch((err) => {
        console.error('err', err);
      });
  };

  const [streetList, setStreetList] = useState<EnumProps[]>([]);
  const [selectedStreetList, setSelectedStreetList] = useState<string[]>([]);
  const handleSelectedStreetListChange = (newValues: string[]) => {
    setSelectedStreetList(newValues);
  };
  
  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [...prevPhoneNumbers, '']);
  };

  const handleRemovePhoneNumber = () => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers((prevPhoneNumbers) => prevPhoneNumbers.slice(0, -1));
    }
  };

  useEffect(() => {
    getWithToken(`/province?page=0&size=50`, 'GET')
      .then((res) => {
        setProviceList(res.content);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, []);

  const onSubmit: SubmitHandler<SaleData> = (data) => {
    const request = {
      unitType: selectedUnitType[0],
      unitGroup: selectedUnitGroup[0],
      activityType: selectedActivityType[0],
      name: data.name,
      streetId: selectedStreetList.toString(),
      address: data.address,
      bio: data.bio,
      phoneNumbers: data.phoneNumbers,
      merchantCardNo: data.merchantCardNo,
      licenseNo: data.licenseNo,
      operationLicenseNo: data.operationLicenseNo,
      registrationNo: data.registrationNo
    };

    setShowSpinner(true);
    apiHandler('/saleUnit', 'POST', request, true)
      .then((res) => {
        props.unitOne(res);

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

            {isShowActivity ? (
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
            ) : (
              <Controller
                control={control}
                name='activityType'
                render={() => (
                  <>
                    <MultipleSelect
                      label='نوع فعالیت'
                      isMulti={false}
                      options={['LEGAL']}
                      showInput={['حقوقی']}
                      value={selectedActivityType}
                      onChange={handleSelectedActivityTypeChange}
                    />
                  </>
                )}
              />
            )}

            {!isShowGroup ? (
              isOptionGroup ? (
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
              ) : (
                <Controller
                  control={control}
                  name='unitGroup'
                  render={() => (
                    <>
                      <MultipleSelect
                        label='گروه واحد صنفی'
                        isMulti={false}
                        options={unitGroupSERVICES.map((k) => k.value)}
                        showInput={unitGroupSERVICES.map((k) => k.label)}
                        value={selectedUnitGroup}
                        onChange={handleSelectedUnitGroupChange}
                      />
                    </>
                  )}
                />
              )
            ) : null}

            {isLicenseNo && isLegal ? (
              <Controller
                control={control}
                name='licenseNo'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='شماره پروانه بهره برداری  '
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
            ) : null}

            {isRegistrationNo && isLegal ? (
              <Controller
                control={control}
                name='registrationNo'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='شماره ثبت شرکت'
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
            ) : null}

            {isOperationLicenseNo && isReal ? (
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
            ) : null}

            {isMerchantCardNo ? (
              <Controller
                control={control}
                name='merchantCardNo'
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    inputWidth='26.25rem !important'
                    label='شماره کارت بازرگانی'
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
            ) : null}
          </Grid>
          <Grid item xs={12} md={6} gap={3} container>
            {proviceList ? (
              <Controller
                control={control}
                name='streetId'
                render={() => (
                  <>
                    <MultipleSelect
                      label='استان'
                      isMulti={false}
                      options={proviceList.map((k) => k.id)}
                      showInput={proviceList.map((k) => k.name)}
                      value={selectedProviceList}
                      onChange={handleSelectedProviceListChange}
                    />
                  </>
                )}
              />
            ) : (
              <GrayDotSpinner />
            )}

            {cityList ? (
              <Controller
                control={control}
                name='streetId'
                render={() => (
                  <>
                    <MultipleSelect
                      label='شهر'
                      isMulti={false}
                      options={cityList.map((k) => k.id)}
                      showInput={cityList.map((k) => k.name)}
                      value={selectedCityList}
                      onChange={handleSelectedCityListChange}
                    />
                  </>
                )}
              />
            ) : (
              <GrayDotSpinner />
            )}

            {streetList ? (
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
            ) : (
              <GrayDotSpinner />
            )}

            <Controller
              control={control}
              name='address'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  inputWidth='26.25rem !important'
                  label='آدرس کسب و کار '
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
              <Grid item key={index}>
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
              </Grid>
            ))}
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
              {showSpinner ? <DotSpinner /> : t('Next')}
            </SubmitButton>
          </Grid>
          <Grid item xs={12} md={6} gap={3} container></Grid>
        </Grid>
      </Stack>
    </>
  );
}
