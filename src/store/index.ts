import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer.ts';
import { createAPI } from '../api/api.ts';
import { checkLoginStatusAction } from '../api/login.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkLoginStatusAction());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
