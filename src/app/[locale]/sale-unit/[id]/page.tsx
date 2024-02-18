'use client';
import { AuthContainer, Icon } from '@/components/General';
import SaleUnitById from '@/components/SaleUnit/SaleUnitById';
import Link from 'next/link';

interface Params {
  params: {
    id: number;
    locale: string;
  };
}

export default function SaleUniId(params: Params) {
  return (
    <AuthContainer
      BackComponent={
        <Link href='/sale-unit/my-sale-unit'>
          <Icon name='flashRight' w={18} h={18} view='0 0 24 24' />
          بازگشت
        </Link>
      }
      fillContainer
    >
      <SaleUnitById id={params.params.id} />
    </AuthContainer>
  );
}
