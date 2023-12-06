'use client';

import { useAppDispatch } from '@/context';
import { showModal } from '@/context/slices/modalSlice';
import { useEffect } from 'react';
import FavoriteMarketStepOne from '../signUpPage/FavoriteMarketStepOne';

export default function FavoriteMarketModalHandler() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      showModal({ modalState: true, modalContent: <FavoriteMarketStepOne /> })
    );
  }, []);

  return <div></div>;
}
