'use client';

import AddAccount from '@/components/AddAccountModal/AddAccount';
import ReduxProvider from '@/context/ReduxProvider';

export default function Demo() {
  return (
    <>
      <ReduxProvider>
        <AddAccount />
      </ReduxProvider>
    </>
  );
}
