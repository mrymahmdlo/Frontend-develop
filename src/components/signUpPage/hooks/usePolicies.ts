import { useAppDispatch } from '@/context';
import { showSnackbar } from '@/context/slices/snackbarSlice';
import apiHandler, { IntError } from '@/utils/apiHandler';
import { useEffect, useState } from 'react';

type PoliciesType = 'agreement' | 'cookie' | 'privacy';

type PoliciesStateType = Record<PoliciesType, TrustedHTML>;

export default function usePolicies() {
  const dispatch = useAppDispatch();
  // Policies state
  const initValue = {
    agreement: '',
    cookie: '',
    privacy: ''
  };
  const [policies, setPolicies] = useState<PoliciesStateType>(initValue);

  useEffect(() => {
    const getAllPolicies = async () => {
      try {
        // Get items
        const result = await apiHandler('/api/content/policies/');

        // Update list
        const newList: PoliciesStateType = initValue;

        // Map on results to get values
        result.results.map((item: { body: string; type: PoliciesType }) => {
          newList[item.type] = item.body;
        });

        setPolicies(newList);
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

    getAllPolicies();
  }, []);

  return policies;
}
