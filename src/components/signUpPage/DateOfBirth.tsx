'use-client';

import { pad } from '@/utils';
import { useTranslations } from 'next-intl';
import { FormEvent, useCallback, useState } from 'react';
import Picker, { PickerValue } from 'react-mobile-picker';
import { SubmitButton } from '@/components/General';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@/context';
import { hideModal } from '@/context/slices/modalSlice';

const getDayArray = (year: number, month: number) => {
  const dayCount = new Date(year, month, 0).getDate();
  return Array.from({ length: dayCount }, (_, i) =>
    String(i + 1).padStart(2, '0')
  );
};

export const selections = {
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
};

export default function DateOfBirth({
  onChange
}: {
  onChange: (v: PickerValue) => void;
}) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  // Now date
  const now = new Date();
  const currentYear = now.getFullYear();

  const [pickerValue, setPickerValue] = useState<PickerValue>({
    year: `${currentYear}`,
    month: '08',
    day: '12'
  });

  const handlePickerChange = useCallback(
    (newValue: PickerValue, key: string) => {
      if (key === 'day') {
        setPickerValue(newValue);
        return;
      }

      const { year, month } = newValue;
      const newDayArray = getDayArray(Number(year), Number(month));
      const newDay = newDayArray.includes(newValue.day)
        ? newValue.day
        : newDayArray[newDayArray.length - 1];
      setPickerValue({ ...newValue, day: newDay });
    },
    []
  );

  // Handle on submit form
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Send data to parent
    onChange(pickerValue);
    // Hide modal
    dispatch(hideModal());
  };

  return (
    <form onSubmit={onSubmit} data-test-id='date-of-birth-modal'>
      <Box mb='1.5rem'>
        <Picker
          className='mobile-picker'
          value={pickerValue}
          onChange={handlePickerChange}
          wheelMode='natural'
          draggable={true}
        >
          {/* Month block */}
          <Picker.Column name='month'>
            {selections.months.map((month, index) => (
              <Picker.Item
                key={month}
                value={pad(index + 1)}
                className={pickerValue.month === pad(index + 1) ? 'active' : ''}
              >
                {({ selected }) => (
                  <div
                    className={
                      selected
                        ? 'font-semibold text-neutral-900'
                        : 'text-neutral-400'
                    }
                  >
                    {month}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>

          {/* Day block */}
          <Picker.Column name='day'>
            {getDayArray(
              Number(pickerValue.year),
              Number(pickerValue.month)
            ).map((day) => (
              <Picker.Item
                key={day}
                value={day}
                className={pickerValue.day === day ? 'active' : ''}
              >
                {({ selected }) => (
                  <div
                    className={
                      selected
                        ? 'font-semibold text-neutral-900'
                        : 'text-neutral-400'
                    }
                  >
                    {day}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>

          {/* Year block */}
          <Picker.Column name='year'>
            {Array.from(
              { length: 100 },
              (_, i) => `${currentYear - 99 + i}`
            ).map((year) => (
              <Picker.Item
                key={year}
                value={year}
                className={pickerValue.year === year ? 'active' : ''}
              >
                {({ selected }) => (
                  <div
                    className={
                      selected
                        ? 'font-semibold text-neutral-900'
                        : 'text-neutral-400'
                    }
                  >
                    {year}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </Box>

      {/* Submit btn */}
      <SubmitButton>
        <Typography fontWeight={600}>{t('Confirm')}</Typography>
      </SubmitButton>
    </form>
  );
}
