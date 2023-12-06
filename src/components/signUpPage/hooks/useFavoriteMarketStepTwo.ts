import { useAppDispatch } from '@/context';
import { hideModal } from '@/context/slices/modalSlice';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { useTranslations } from 'next-intl';
import { FormEvent, useEffect, useState } from 'react';

type SubmarketsListType = {
  name: string;
  abbreviation: string;
  sign: string;
};

export default function useFavoriteMarketStepTwo(selectedMarket: string[]) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  // Search state
  const [search, setSearch] = useState('');
  // Submarkets list state
  const [subMarketsList, setSubMarketsList] = useState<
    SubmarketsListType[] | []
  >([]);
  // Selected submarkets state
  const [selectedSubMarket, setSelectedSubMarket] = useState<
    SubmarketsListType[] | []
  >([]);

  // Handle on select submarket
  const onSelectSubmarket = (item: SubmarketsListType) => {
    if (selectedSubMarket.filter((i) => i.name === item.name).length > 0) {
      return;
    } else {
      setSelectedSubMarket([...selectedSubMarket, item]);
      // Remove from subMarketsList
      setSubMarketsList(subMarketsList.filter((i) => i.name !== item.name));
    }
  };

  // Handle on deselect submarket
  const onDeselectSubmarket = (item: SubmarketsListType) => {
    setSelectedSubMarket(selectedSubMarket.filter((i) => i.name !== item.name));

    // Return item to subMarketsList
    if (subMarketsList.filter((i) => i.name === item.name).length > 0) {
      return;
    } else {
      setSubMarketsList([...subMarketsList, item]);
    }
  };

  // Handle on submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedSubMarket.length < 2 || selectedSubMarket.length > 5) {
      // An error
      dispatch(
        showSnackbar({
          message: t('Select between 2 and 5'),
          severity: 'error'
        })
      );
    } else {
      const selectedSubMarketsName = selectedSubMarket.map((item) => item.name);

      try {
        // Get items
        await apiHandler(
          `/api/content/markets/tickers/`,
          'POST',
          {
            names: selectedSubMarketsName
          },
          true
        );

        // Hide modal
        dispatch(hideModal());

        // Show success message
        dispatch(
          showSnackbar({
            message: t('Your favorite registed'),
            severity: 'success'
          })
        );
      } catch (err) {
        const error = err as IntError;

        // Show error message to user
        if (error) {
          let firstError = error.errors;

          if (firstError.constructor === Array) {
            firstError = firstError[0];
          }

          dispatch(
            showSnackbar({
              message: firstError.detail as string,
              severity: 'error'
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    const getSubmarkets = async () => {
      try {
        // Get items
        const result = await apiHandler(
          `/api/content/markets/tickers/?name=${search}`,
          'GET',
          null,
          true
        );

        setSubMarketsList(result.results);
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

    getSubmarkets();
  }, [selectedMarket, search]);

  return {
    setSearch,
    onSelectSubmarket,
    onDeselectSubmarket,
    onSubmit,
    selectedSubMarket,
    subMarketsList
  };
}
