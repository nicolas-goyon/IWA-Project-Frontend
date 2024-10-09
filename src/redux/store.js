import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Un exemple de slice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
