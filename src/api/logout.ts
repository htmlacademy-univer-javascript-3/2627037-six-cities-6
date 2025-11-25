import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../store';
import {Api, AuthorizationStatus} from '../const.ts';
import {updateAuthorizationAction, updateUserAction} from '../store/action.ts';
import {removeToken} from './token-storage.ts';

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(Api.Logout);
    removeToken();
    dispatch(updateUserAction(undefined));
    dispatch(updateAuthorizationAction(AuthorizationStatus.NonAuthorized));
  },
);
