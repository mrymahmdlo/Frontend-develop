/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IntSlice {
  value: {
    country: string;
    country_short: string;
    region: string;
  } | null;
}

// Initial state
const initialState: IntSlice = {
  value: null
};

export const userCurrentLocationSlice = createSlice({
  name: 'userCurrentLocation',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action: PayloadAction<IntSlice>) => {
      state.value = action.payload.value;
    }
  }
});

// action creators are generated for each case reducer function
export const { updateCurrentLocation } = userCurrentLocationSlice.actions;

export const userCurrentLocationReducer = userCurrentLocationSlice.reducer;
