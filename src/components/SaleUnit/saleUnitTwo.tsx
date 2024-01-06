/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FileUploader from '../General/FileUploader';

export default function SaleUnitTwo(response: any) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [type, setType] = useState<string>('');
  const router = useRouter();

  const handleUpload = (files: File[]) => {
    console.log('response', response.response);
    console.log(files[0]);
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('saleUnitId', response.response.id);
    formData.append('saleUnitDocumentType', 'PROFILE');

    apiHandler('/saleUnit/setFile', 'PUT', formData, true)
      .then((res) => {
        console.log('res', res);
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
      .then((res) => {
        console.log('res', res);
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

        {response.response?.licenseNo && (
          <FileUploader
            onUpload={handleUploadType}
            title='تصویر پروانه بهره برداری '
          />
        )}
        {response.response?.registrationNo && (
          <FileUploader onUpload={handleUploadType} title='تصویر ثبت شرکت  ' />
        )}
        {response.response?.operationLicenseNo && (
          <FileUploader onUpload={handleUploadType} title='تصویر جواز کسب  ' />
        )}
        {response.response?.merchantCardNo && (
          <FileUploader
            onUpload={handleUploadType}
            title='تصویر کارت بازرگانی'
          />
        )}
      </Grid>
      <Grid mt={3} container justifyContent={'center'}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            router.push('/');
          }}
        >
          صفحه اصلی
        </Button>
      </Grid>
    </>
  );
}
