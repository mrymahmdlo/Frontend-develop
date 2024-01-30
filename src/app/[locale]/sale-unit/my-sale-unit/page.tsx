'use client';
import { AuthContainer } from '@/components/General';
import MYSaleUnit from '@/components/SaleUnit/MySaleUnit/index';

export default function MySaleUnit() {
  return (
    <AuthContainer fillContainer>
      <MYSaleUnit />
    </AuthContainer>
  );
}
