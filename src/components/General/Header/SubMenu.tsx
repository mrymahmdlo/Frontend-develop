'use client';

import { MenuItem, MenuList, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SubMenu() {
  const router = useRouter();

  return (
    <Stack
      direction='row'
      spacing={2}
      style={{
        background: '#8a9ea840',
        borderRadius: '24px',
        padding: '0 12px'
      }}
    >
      <MenuList style={{ display: 'flex' }}>
        <MenuItem style={{ borderRadius: '12px' }}>همیاران دیجی‌برق</MenuItem>
        <MenuItem style={{ borderRadius: '12px' }}>تبلیغات</MenuItem>
        <MenuItem
          onClick={() => router.push('/contact-us')}
          style={{ borderRadius: '12px' }}
        >
          تماس با ما
        </MenuItem>
        <MenuItem style={{ borderRadius: '12px' }}>بلاگ</MenuItem>
        <MenuItem style={{ borderRadius: '12px' }}>صدای مشتری</MenuItem>
        <MenuItem
          onClick={() => router.push('/sale-unit/my-sale-unit')}
          style={{ borderRadius: '12px', color: '#1DA1F3' }}
        >
          واحدهای صنفی من
        </MenuItem>
      </MenuList>
    </Stack>
  );
}
