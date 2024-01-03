'use client';

import SaleUnitOne from './saleUnitOne';
import useSaleUnit from './useSaleUnit';

export default function SaleUnit() {
  const { stage, unitOne } = useSaleUnit();

  return (
    <>
      {stage === 'stepOne' && <SaleUnitOne unitOne={unitOne} />}
      {stage === 'stepTwo' && <>jkjkbjkb</>}
    </>
  );
}
