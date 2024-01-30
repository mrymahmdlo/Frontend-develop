'use client';
import { AuthContainer } from '@/components/General';

export default function SaleUnitById({ params }: { params: { slug: string } }) {
  console.log(params);
  return (
    <AuthContainer fillContainer>
      <h1>hello</h1>
    </AuthContainer>
  );
}
