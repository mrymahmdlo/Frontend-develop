'use client';

import SaleUnitOne from './saleUnitOne';
import SaleUnitTwo from './saleUnitTwo';
import useSaleUnit from './useSaleUnit';

export default function SaleUnit() {
  const { stage, unitOne, response } = useSaleUnit();
  
  return (
    <>
      {stage === 'stepOne' && <SaleUnitOne unitOne={unitOne} />}
      {stage === 'stepTwo' && <SaleUnitTwo response={response} />}
    </>
  );
}
