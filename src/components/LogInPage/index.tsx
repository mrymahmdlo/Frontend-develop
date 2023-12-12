/* eslint-disable camelcase */
'use client';

import { TabPanel } from '@/components/General';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import LogInCode from './LogInCode';
import LogInPassword from './LogInPassword';

export type TabsValue = 'code' | 'password';

export default function LogInInputs() {
  const t = useTranslations();

  const [tab, setTab] = useState<TabsValue>('password');

  const handleChange = (event: SyntheticEvent, newValue: TabsValue) => {
    setTab(newValue);
  };

  return (
    <Stack px='12px'>
      <div>
        {/* Modal title */}
        <Typography className='modal-title' variant='h5'>
          {t('Login to DGB')}
        </Typography>

        {/* Login link */}
        <Typography className='login-link-container'>
          <span>{t('Or')} </span>
          <Link href='sign-up'> {t('Sign up')}</Link>
        </Typography>
      </div>
      <br />

      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Password')}
            value={'password'}
          />
          <Tab
            sx={{ fontSize: { xs: '14px', sm: '18px' }, textTransform: 'none' }}
            label={t('Code')}
            value={'code'}
          />
        </Tabs>
        <TabPanel
          index={'password'}
          value={tab}
          style={{ width: '100%', margin: '15px 0' }}
        >
          <LogInPassword />
        </TabPanel>
        <TabPanel
          index={'code'}
          value={tab}
          style={{ width: '100%', margin: '15px 0' }}
        >
          <LogInCode />
        </TabPanel>
      </Box>
    </Stack>
  );
}
