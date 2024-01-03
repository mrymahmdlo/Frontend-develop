'use client';

import { AuthContainer } from '@/components/General';
import SaleUnit from '@/components/SaleUnit';

export default function onBoarding() {
  return (
    <AuthContainer fillContainer>
      <SaleUnit />
    </AuthContainer>
  );
}
