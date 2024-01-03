import { useState } from 'react';

// local imports

type Stages = 'stepOne' | 'stepTwo';



export default function useSaleUnit() {
  const [stage, setStage] = useState<Stages>('stepOne');
//   const [unit, setUnit] = useState();

  function unitOne() {
      setStage('stepTwo');
    //   setUnit(res)
  }

    // function unitTwo(id: string) {
    //   setIdentifier({ ...identifier, id });
    // }

  return {
    stage,
    unitOne
  };
}
