import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { UserType } from '../types/user-type.ts';
import { Api, AuthorizationStatus } from '../const.ts';
import { UserAuthType } from '../types/user-auth-type.ts';
import { updateAuthorizationHandler, updateUserHandler } from '../store/action.ts';
import { storeToken } from './token-storage.ts';

export const loginAction = createAsyncThunk<void, UserAuthType, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserType>(Api.Login, { email, password });
      storeToken(data.token);
      dispatch(updateUserHandler(data));
      dispatch(updateAuthorizationHandler(AuthorizationStatus.Authorized));
    } catch {
      dispatch(updateUserHandler(undefined));
      dispatch(updateAuthorizationHandler(AuthorizationStatus.NonAuthorized));
    }
  },
);

export const checkLoginStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserType>(Api.Login);
    storeToken(data.token);
    dispatch(updateUserHandler(data));
    dispatch(updateAuthorizationHandler(AuthorizationStatus.Authorized));
  },
);
