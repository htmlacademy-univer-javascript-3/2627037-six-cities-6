import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Api } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';
import { UserAuthType } from '../../types/user-auth-type.ts';
import { UserType } from '../../types/user-type.ts';
import { storeToken } from '../token-storage.ts';

export const loginAction = createAsyncThunk<
  UserType | undefined,
  UserAuthType,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  try {
    const { data } = await api.post<UserType>(Api.Login, { email, password });
    storeToken(data.token);
    return data;
  } catch {
    return undefined;
  }
});

export const checkLoginStatusAction = createAsyncThunk<
  UserType | undefined,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/checkLoginStatus', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<UserType>(Api.Login);
    storeToken(data.token);
    return data;
  } catch {
    return undefined;
  }
});
