import { Breakpoint } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

// Type for modal state
export interface ModalState {
  modalState: boolean; // show/hide dialog
  modalContent: ReactElement | null; // main content
  modalActions?: ReactElement; // buttons in footer of modal
  modalHeaderTitle?: ReactElement | null; // custom header title
  modalDisableClose?: boolean; // disable close without choosing an action
  modalMaxWidth?: Breakpoint; // width of modal container
  modalBackIconFunction?: ((...arg: unknown[]) => void) | null;
  // function for back icon in modal
  modalAppendActionSheet?: boolean;
}

// Initial state
const initialState: ModalState = {
  modalState: false,
  modalContent: null,
  modalActions: undefined,
  modalHeaderTitle: null,
  modalDisableClose: false,
  modalMaxWidth: 'md',
  modalBackIconFunction: null,
  modalAppendActionSheet: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      state.modalState = true;
      state.modalContent = action.payload.modalContent;
      state.modalActions = action.payload.modalActions;
      state.modalHeaderTitle = action.payload.modalHeaderTitle;
      state.modalDisableClose = action.payload.modalDisableClose;
      state.modalMaxWidth = action.payload.modalMaxWidth;
      state.modalBackIconFunction = action.payload.modalBackIconFunction;
      state.modalAppendActionSheet = action.payload.modalAppendActionSheet;
    },
    // for better config in future changes
    hideModal: (state) => {
      state.modalState = initialState.modalState;
      state.modalContent = initialState.modalContent;
      state.modalActions = initialState.modalActions;
      state.modalHeaderTitle = initialState.modalHeaderTitle;
      state.modalDisableClose = initialState.modalDisableClose;
      state.modalMaxWidth = initialState.modalMaxWidth;
      state.modalBackIconFunction = initialState.modalBackIconFunction;
      state.modalAppendActionSheet = initialState.modalAppendActionSheet;
    }
  }
});

// action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
