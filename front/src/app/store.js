import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './services/api';

export const createStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
  })

export const store = createStore();

export default store;