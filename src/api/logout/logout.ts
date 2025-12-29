import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Api } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';
import { removeToken } from '../token-storage.ts';

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(Api.Logout);
  removeToken();
});
