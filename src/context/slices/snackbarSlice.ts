import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IntSlice {
  open?: boolean;
  severity?: AlertColor;
  message: string;
  type?: 'alert' | 'simple';
}

// Initial state
const initialState: IntSlice = {
  open: false,
  severity: 'info',
  message: '',
  type: 'alert'
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<IntSlice>) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'alert';
    },
    hideSnackbar: (state) => {
      state.open = false;
    }
  }
});

// action creators are generated for each case reducer function
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const snackbarReducer = snackbarSlice.reducer;
