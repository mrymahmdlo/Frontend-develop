'use client';

import { Stack, Typography } from '@mui/material';
import { Icon } from '@/components/General';
import Countdown from 'react-countdown';
import { useState } from 'react';
import { pad } from '@/utils';

interface IntProps {
  second?: number;
  onComplete: () => void;
}

const CountDownClock = ({ second = 300, onComplete }: IntProps) => {
  const [now] = useState(Date.now());

  return (
    <Stack
      flexDirection='row'
      alignItems='center'
      gap='0.25rem'
      justifyContent='center'
      height='3rem'
    >
      <Stack>
        <Icon name='clock' w={12} h={12} view='0 0 12 12' />
      </Stack>

      <div data-test-id='counter'>
        <Countdown
          date={now + second * 1000}
          onComplete={onComplete}
          renderer={({ minutes, seconds }) => {
            return (
              <Typography className='text-gray-600' variant='caption'>
                {pad(minutes)}:{pad(seconds)}
              </Typography>
            );
          }}
        />
      </div>
    </Stack>
  );
};

export default CountDownClock;
