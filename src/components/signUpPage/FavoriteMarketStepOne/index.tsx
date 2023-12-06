'use client';

import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { SelectableButton, SubmitButton } from '@/components/General';
import SmoothSlider from './SmoothSlider';
import { FormEvent, useEffect, useState } from 'react';
import { showModal } from '@/context/slices/modalSlice';
import FavoriteMarketStepTwo from '../FavoriteMarketStepTwo';
import { useAppDispatch } from '@/context';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { showSnackbar } from '@/context/slices/snackbarSlice';

type ItemType = {
  name: string;
};

export default function FavoriteMarketStepOne() {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  // Selected items state
  const [selectedItems, setSelectedItem] = useState<string[]>([]);
  // List of items
  const [items, setItems] = useState<ItemType[] | undefined>();

  // Handle on submit form
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selectedItems.length < 2 || selectedItems.length > 5) {
      // An error
      dispatch(
        showSnackbar({
          message: t('Select between 2 and 5'),
          severity: 'error'
        })
      );
    } else {
      dispatch(
        showModal({
          modalState: true,
          modalContent: <FavoriteMarketStepTwo selectedMarket={selectedItems} />
        })
      );
    }
  };

  // Handle on select item
  const onSelectItem = (item: string) => {
    if (selectedItems.includes(item))
      setSelectedItem(selectedItems.filter((i) => i !== item));
    else setSelectedItem([...selectedItems, item]);
  };

  useEffect(() => {
    const getAllMarkets = async () => {
      try {
        // Get items
        const result = await apiHandler(
          '/api/content/markets/',
          'GET',
          null,
          true
        );

        setItems(result.results);
      } catch (err) {
        const error = err as IntError;

        // Show error message to user
        if (error) {
          dispatch(
            showSnackbar({
              message: error.errors.detail as string,
              severity: 'error'
            })
          );
        }
      }
    };

    getAllMarkets();
  }, []);

  return (
    <form onSubmit={onSubmit} data-test-id='favorite-markets-step-one'>
      <Stack gap='1.5rem'>
        <div>
          {/* Modal title */}
          <Typography className='modal-title' variant='h5'>
            {t('Favorite market')}
          </Typography>

          <Typography className='choose-favorite'>
            <span>{t('Choose your favorite markets')}</span>
          </Typography>
        </div>

        {/* Smooth slider */}
        <SmoothSlider />

        {/* Selectable items */}
        <Stack gap='0.5rem' flexDirection='row' width='21rem' flexWrap='wrap'>
          {items?.map((item, index) => (
            <div data-test-id={`market-item-${index}`} key={index}>
              <SelectableButton
                isActive={selectedItems.includes(item.name)}
                onSelect={() => onSelectItem(item.name)}
              >
                {item.name}
              </SelectableButton>
            </div>
          ))}
        </Stack>

        {/* Submit btn */}
        <SubmitButton>
          <Typography fontWeight={600}>{t('Next')}</Typography>
        </SubmitButton>
      </Stack>
    </form>
  );
}
