import { combineReducers } from 'redux';
import { modalReducer } from './slices/modalSlice';
import { alertReducer } from './slices/alertSlice';
import { snackbarReducer } from './slices/snackbarSlice';
import { locationsReducer } from './slices/locationsSlice';
import { userCurrentLocationReducer } from './slices/userCurrentLocation';

const rootReducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  snackbar: snackbarReducer,
  locations: locationsReducer,
  userCurrentLocation: userCurrentLocationReducer
});

export default rootReducer;
