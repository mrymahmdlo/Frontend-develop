/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IntSlice {
  value:
    | {
        country_code: string;
        country_name: string;
        regions: {
          subdivision_name: string;
        }[];
      }[]
    | null;
}

// Initial state
const initialState: IntSlice = {
  value: null
};

export const locationsSlice = createSlice({
  name: 'loactions',
  initialState,
  reducers: {
    updateLocations: (state, action: PayloadAction<IntSlice>) => {
      state.value = action.payload.value;
    },
    pushNewLocations: (state, action: PayloadAction<IntSlice>) => {
      const newValue = action.payload.value;

      if (state.value === null && newValue) {
        state.value = [...newValue];
      } else if (state.value && newValue) {
        state.value = [...state.value, ...newValue];
      } else {
        state.value = initialState.value;
      }
    },
    resetLocation: (state) => {
      state.value = null;
    }
  }
});

// action creators are generated for each case reducer function
export const { updateLocations, pushNewLocations, resetLocation } =
  locationsSlice.actions;

export const locationsReducer = locationsSlice.reducer;
