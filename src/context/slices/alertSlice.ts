import { Breakpoint } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

// Type for alert state
export interface AlertState {
  alertState: boolean; // show/hide dialog
  alertContent: ReactElement | null; // main content
  alertHeaderTitle?: ReactElement | null; // custom header title
  alertMaxWidth?: Breakpoint; // width of alert container
  alertBackIconFunction?: ((...arg: unknown[]) => void) | null;
  // function for back icon in alert
  alertShowAlertClose?: boolean;
  alertAppendActionSheet?: boolean;
}

// Initial state
const initialState: AlertState = {
  alertState: false,
  alertContent: null,
  alertHeaderTitle: null,
  alertMaxWidth: 'md',
  alertBackIconFunction: null,
  alertShowAlertClose: false,
  alertAppendActionSheet: false
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.alertState = true;
      state.alertContent = action.payload.alertContent;
      state.alertHeaderTitle = action.payload.alertHeaderTitle;
      state.alertMaxWidth = action.payload.alertMaxWidth;
      state.alertBackIconFunction = action.payload.alertBackIconFunction;
      state.alertShowAlertClose = action.payload.alertShowAlertClose;
      state.alertAppendActionSheet = action.payload.alertAppendActionSheet;
    },
    // for better config in future changes
    hideAlert: (state) => {
      state.alertState = initialState.alertState;
      state.alertContent = initialState.alertContent;
      state.alertHeaderTitle = initialState.alertHeaderTitle;
      state.alertMaxWidth = initialState.alertMaxWidth;
      state.alertBackIconFunction = initialState.alertBackIconFunction;
      state.alertShowAlertClose = initialState.alertShowAlertClose;
      state.alertAppendActionSheet = initialState.alertAppendActionSheet;
    }
  }
});

// action creators are generated for each case reducer function
export const { showAlert, hideAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
