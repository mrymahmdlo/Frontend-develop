/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AuthContainer } from '@/components/General';
import SaleUnitById from '@/components/SaleUnit/SaleUnitById';

interface Params {
  params: {
    id: number;
    locale: string;
  };
}

export default function SaleUniId(params: Params) {
  return (
    <AuthContainer fillContainer>
      <SaleUnitById id={params.params.id} />
    </AuthContainer>
  );
}
