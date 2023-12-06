import { useAppDispatch, useAppSelector } from '@/context';
import { updateCurrentLocation } from '@/context/slices/userCurrentLocation';
import { apiHandler } from '@/utils';
import { useEffect } from 'react';

export default function useGetCurrentLocation() {
  const dispatch = useAppDispatch();
  const userCurrentLocation = useAppSelector(
    (state) => state.userCurrentLocation.value
  );

  useEffect(() => {
    if (userCurrentLocation === null) {
      const getCurrentLocation = async () => {
        try {
          // Get items
          const result = await apiHandler(
            `/api/auth/user-location/`,
            'GET',
            null,
            true
          );

          // Update current location
          dispatch(updateCurrentLocation({ value: result }));
        } catch (err) {
          console.log('An error in get user current location');
        }
      };

      getCurrentLocation();
    }
  }, [userCurrentLocation]);
}
