/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FileUploader from '../General/FileUploader';

export default function SaleUnitTwo(response: any) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [type, setType] = useState<string>('');
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const router = useRouter();

  const handleUpload = (files: File[]) => {
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('saleUnitId', response.response.id);
    formData.append('saleUnitDocumentType', 'PROFILE');

    apiHandler('/saleUnit/setFile', 'PUT', formData, true)
      .then(() => {
        dispatch(
          showSnackbar({
            message: 'فایل با موفقیت بارگذاری شد',
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
      });
  };

  const handleUploadType = (files: File[]) => {
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('saleUnitId', response.response.id);
    formData.append('saleUnitDocumentType', type);

    apiHandler('/saleUnit/setFile', 'PUT', formData, true)
      .then(() => {
        dispatch(
          showSnackbar({
            message: 'فایل با موفقیت بارگذاری شد',
            severity: 'success'
          })
        );
        setIsUpload(true);
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
      });
  };

  useEffect(() => {
    response.response.licenseNo ?? setType('LICENSE_NO');
    response.response.registrationNo ?? setType('REGISTRATION_NO');
    response.response.operationLicenseNo ?? setType('OPERATION_LICENSE_NO');
    response.response.merchantCardNo ?? setType('MERCHANT_CARD_NO');
  }, [response]);

  return (
    <>
      <Grid container gap={1} justifyContent={'space-between'}>
        <FileUploader onUpload={handleUpload} title='تصویر واحد صنفی' />
        {!isUpload && response.response?.licenseNo && (
          <FileUploader
            onUpload={handleUploadType}
            title='تصویر پروانه بهره برداری '
          />
        )}
        {!isUpload && response.response?.registrationNo && (
          <FileUploader onUpload={handleUploadType} title='تصویر ثبت شرکت  ' />
        )}
        {!isUpload && response.response?.operationLicenseNo && (
          <FileUploader onUpload={handleUploadType} title='تصویر جواز کسب  ' />
        )}
        {!isUpload && response.response?.merchantCardNo && (
          <FileUploader
            onUpload={handleUploadType}
            title='تصویر کارت بازرگانی'
          />
        )}
        {isUpload && (
          <Grid container md={5} xs={12} display={'flow'}>
            <Typography
              variant='h6'
              color={'primary'}
              textAlign={'center'}
              mb={3}
            >
              تصویر قبلا بارگذاری شده است
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid mt={3} container justifyContent={'center'}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            router.push('/sale-unit/my-sale-unit');
          }}
        >
          واحدهای صنفی من
        </Button>
      </Grid>
    </>
  );
}
