import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { checkLoginStatusAction, loginAction } from '../../api/login/login.ts';
import { logoutAction } from '../../api/logout/logout.ts';
import { AuthorizationStatus } from '../../const.ts';
import { UserType } from '../../types/user-type.ts';

interface UsersState {
  authorizationStatus: string;
  user?: UserType;
}

const initialState: UsersState = {
  authorizationStatus: AuthorizationStatus.NonAuthorized,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginAction.fulfilled,
        (state: UsersState, action: PayloadAction<UserType | undefined>) => {
          state.user = action.payload;
          state.authorizationStatus =
            state.user !== undefined
              ? AuthorizationStatus.Authorized
              : AuthorizationStatus.NonAuthorized;
        },
      )
      .addCase(logoutAction.fulfilled, (state: UsersState) => {
        state.user = undefined;
        state.authorizationStatus = AuthorizationStatus.NonAuthorized;
      })
      .addCase(
        checkLoginStatusAction.fulfilled,
        (state: UsersState, action: PayloadAction<UserType | undefined>) => {
          state.user = action.payload;
          state.authorizationStatus =
            state.user !== undefined
              ? AuthorizationStatus.Authorized
              : AuthorizationStatus.NonAuthorized;
        },
      );
  },
});

export default usersSlice.reducer;
