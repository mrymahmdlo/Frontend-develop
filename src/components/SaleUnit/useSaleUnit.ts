/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// local imports

type Stages = 'stepOne' | 'stepTwo';



export default function useSaleUnit() {
  const [stage, setStage] = useState<Stages>('stepOne');
  const [response, setResponse] = useState<any>(null);
  const [id, setId] = useState<string>("");

  function unitOne(res:any) {
    setStage('stepTwo');
    setResponse(res);
    setId(res.id)
    console.log(res.id);
  }

  return {
    stage,
    unitOne,
    response,
    id
  };
}
