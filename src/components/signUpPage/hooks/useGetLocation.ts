import { useAppDispatch } from '@/context';
import {
  pushNewLocations,
  updateLocations
} from '@/context/slices/locationsSlice';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import { apiHandler } from '@/utils';
import { IntError } from '@/utils/apiHandler';
import { useEffect, useState } from 'react';

export default function useGetLocation() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [toggleProgress, setToggleProgress] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      // Show progress
      setToggleProgress(true);

      try {
        const uri = search
          ? `/api/auth/location/?name=${search}`
          : '/api/auth/location/?limit=50&offset=0';

        // Get items
        const result = await apiHandler(uri);

        // Update list
        dispatch(updateLocations({ value: result.results }));
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

      // Hide progress
      setToggleProgress(false);
    };

    getLocations();
  }, [search]);

  // Update location
  const updateLocation = async (page: number = 1) => {
    // Show progress
    setToggleProgress(true);

    try {
      const uri = `/api/auth/location/?limit=50&offset=${(page - 1) * 50}`;

      // Get items
      const result = await apiHandler(uri);

      // Update list
      dispatch(pushNewLocations({ value: result.results }));
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

    // Hide progress
    setToggleProgress(false);
  };

  return {
    search,
    setSearch,
    toggleProgress,
    updateLocation
  };
}
